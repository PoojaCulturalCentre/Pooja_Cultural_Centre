"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MandalaShape from "./Mandala";
import { GALLERY_PHOTOS } from "@/lib/photos";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const EVENTS_BG = GALLERY_PHOTOS.find((p) => p.id === "temple") ?? GALLERY_PHOTOS[0];

const EVENT_KEYS = [
  { key: "navratri", date: "05", month: "OCT" },
  { key: "arangetrams", date: "18", month: "NOV" },
  { key: "natyanjaliWinter", date: "21", month: "DEC" },
  { key: "pongal", date: "14", month: "JAN" },
];

export default function Events() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yTop = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [60, -80]);

  return (
    <section id="events" ref={ref} className="relative py-24 sm:py-32 bg-maroon-dark overflow-hidden">
      <Image
        src={EVENTS_BG.src}
        alt={EVENTS_BG.alt}
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/90 via-maroon-dark/85 to-maroon-dark/95" />

      <motion.svg
        style={{ y: yTop }}
        viewBox="0 0 200 200"
        className="absolute -top-24 -left-16 w-72 h-72 sm:w-96 sm:h-96 text-gold/10 animate-spin-slow pointer-events-none"
      >
        <MandalaShape />
      </motion.svg>
      <motion.svg
        style={{ y: yBottom }}
        viewBox="0 0 200 200"
        className="absolute -bottom-28 -right-20 w-64 h-64 sm:w-80 sm:h-80 text-gold/10 animate-spin-slow-reverse pointer-events-none"
      >
        <MandalaShape />
      </motion.svg>

      <div className="section-container relative z-10">
        <span className="section-tag center block text-center !text-gold-light">{t.events.tag}</span>
        <h2 className="section-title center !text-cream">{t.events.title}</h2>

        <div className="relative mt-16 max-w-3xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] timeline-line hidden sm:block" />

          <div className="flex flex-col gap-10">
            {EVENT_KEYS.map((e, i) => (
              <motion.div
                key={e.key}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative sm:w-1/2 ${i % 2 === 0 ? "sm:pr-10 sm:self-start sm:text-right" : "sm:pl-10 sm:self-end"}`}
              >
                <span
                  className={`hidden sm:flex absolute top-2 ${
                    i % 2 === 0 ? "-right-3" : "-left-3"
                  } w-6 h-6 rounded-full bg-gold border-4 border-maroon-dark shadow-md`}
                />
                <div className="bg-white rounded-2xl shadow-card p-6 flex gap-5 items-start hover:shadow-gold transition-shadow duration-300">
                  <div className={`flex flex-col items-center justify-center bg-maroon text-cream rounded-xl w-16 h-16 shrink-0 ${i % 2 === 0 ? "sm:order-2" : ""}`}>
                    <span className="font-body font-bold text-xl leading-none">{e.date}</span>
                    <span className="text-[0.65rem] tracking-widest">{e.month}</span>
                  </div>
                  <div className={i % 2 === 0 ? "sm:order-1 sm:text-right" : ""}>
                    <h3 className="font-heading font-bold text-lg text-maroon-dark mb-1">{t.events.items[e.key].title}</h3>
                    <p className="text-xs text-gold-dark font-semibold mb-2">📍 {t.events.items[e.key].place}</p>
                    <p className="text-sm text-ink/60">{t.events.items[e.key].desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
