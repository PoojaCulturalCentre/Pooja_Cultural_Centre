"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MandalaShape from "./Mandala";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GALLERY_PHOTOS } from "@/lib/photos";

const CLASS_KEYS = [
  { key: "beginners", icon: "🌱" },
  { key: "intermediate", icon: "🙏" },
  { key: "advanced", icon: "⭐" },
  { key: "arangetram", icon: "🎓" },
  { key: "adult", icon: "👤" },
  { key: "online", icon: "🎥" },
];

export default function Classes() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yTop = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [60, -80]);

  return (
    <section id="classes" ref={ref} className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="absolute inset-0 flex">
        {GALLERY_PHOTOS.map((photo) => (
          <div key={photo.id} className="relative flex-1 h-full">
            <Image src={photo.src} alt="" fill sizes="17vw" className="object-cover grayscale" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-cream/90" />

      <motion.svg
        style={{ y: yTop }}
        viewBox="0 0 200 200"
        className="absolute -top-24 -right-20 w-72 h-72 sm:w-96 sm:h-96 text-maroon/5 animate-spin-slow pointer-events-none"
      >
        <MandalaShape />
      </motion.svg>
      <motion.svg
        style={{ y: yBottom }}
        viewBox="0 0 200 200"
        className="absolute -bottom-28 -left-20 w-64 h-64 sm:w-80 sm:h-80 text-gold/10 animate-spin-slow-reverse pointer-events-none"
      >
        <MandalaShape />
      </motion.svg>

      <div className="section-container relative z-10">
        <span className="section-tag center block text-center">{t.classes.tag}</span>
        <h2 className="section-title center">{t.classes.title}</h2>
        <p className="section-desc center">{t.classes.desc}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
          {CLASS_KEYS.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, x: i % 3 === 0 ? -60 : i % 3 === 2 ? 60 : 0, y: i % 3 === 1 ? 50 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl p-8 shadow-card border border-maroon/5 hover:border-gold/40 hover:shadow-gold transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {c.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-maroon-dark mb-2">{t.classes.items[c.key].title}</h3>
              <p className="text-ink/65 text-sm leading-relaxed mb-3">{t.classes.items[c.key].desc}</p>
              <a href="#contact" className="card-link">
                {t.classes.enroll} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
