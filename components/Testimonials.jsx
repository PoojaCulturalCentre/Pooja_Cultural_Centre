"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const TESTIMONIAL_KEYS = ["t1", "t2", "t3"];

export default function Testimonials() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % TESTIMONIAL_KEYS.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const current = t.testimonials.items[TESTIMONIAL_KEYS[index]];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-gradient-to-b from-maroon to-maroon-dark">
      <div className="section-container text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-tag center !text-gold-light"
        >
          {t.testimonials.tag}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title center !text-cream"
        >
          {t.testimonials.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative max-w-2xl mx-auto mt-12 bg-cream rounded-3xl shadow-2xl px-8 sm:px-14 py-14 min-h-[260px] flex items-center"
        >
          <span className="absolute top-6 left-7 text-6xl text-gold/30 font-heading">&ldquo;</span>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              <p className="font-heading italic text-lg sm:text-xl text-maroon-dark leading-relaxed mb-6">
                &ldquo;{current.quote}&rdquo;
              </p>
              <h4 className="font-semibold text-ink">{t.testimonials.studentName}</h4>
              <span className="text-sm text-gold-dark">{current.role}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center gap-3 mt-8">
          {TESTIMONIAL_KEYS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-gold" : "w-2.5 bg-cream/40 hover:bg-cream/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
