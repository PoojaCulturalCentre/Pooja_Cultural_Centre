"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { GALLERY_PHOTOS } from "@/lib/photos";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import MandalaShape from "./Mandala";

export default function Gallery() {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yTop = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section id="gallery" ref={ref} className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <motion.svg
        style={{ y: yTop }}
        viewBox="0 0 200 200"
        className="absolute -top-20 -left-24 w-72 h-72 sm:w-96 sm:h-96 text-gold/10 animate-spin-slow pointer-events-none"
      >
        <MandalaShape />
      </motion.svg>
      <motion.svg
        style={{ y: yBottom }}
        viewBox="0 0 200 200"
        className="absolute -bottom-24 -right-16 w-64 h-64 sm:w-80 sm:h-80 text-maroon/5 animate-spin-slow-reverse pointer-events-none"
      >
        <MandalaShape />
      </motion.svg>

      <div className="section-container relative z-10">
        <span className="section-tag center block text-center">{t.gallery.tag}</span>
        <h2 className="section-title center">{t.gallery.title}</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {GALLERY_PHOTOS.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: i % 3 === 0 ? -50 : i % 3 === 2 ? 50 : 0, y: i % 3 === 1 ? 40 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: "easeOut" }}
              onClick={() => setActive(item)}
              className="relative h-56 rounded-2xl overflow-hidden group cursor-pointer text-left"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 gallery-overlay opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-4 left-5 text-cream font-heading font-semibold text-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {t.gallery.captions[item.id]}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/85 flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5 flex items-end justify-between gap-4">
                <p className="text-cream font-heading text-xl sm:text-2xl font-semibold">{t.gallery.captions[active.id]}</p>
                <a
                  href={active.credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/60 text-xs whitespace-nowrap hover:text-gold transition-colors"
                >
                  {t.gallery.photoBy}: {active.credit.name}
                </a>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gold text-maroon-dark font-bold text-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
