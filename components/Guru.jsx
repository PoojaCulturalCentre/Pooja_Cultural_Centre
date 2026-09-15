"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GURU_EYE_PHOTO } from "@/lib/photos";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Guru() {
  const { t } = useLanguage();
  return (
    <section id="guru" className="py-24 sm:py-32 relative overflow-hidden bg-maroon">
      <Image
        src={GURU_EYE_PHOTO.src}
        alt={GURU_EYE_PHOTO.alt}
        fill
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/85 via-maroon/75 to-maroon-dark/90" />

      <svg viewBox="0 0 200 200" className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] text-gold/5 animate-spin-slow">
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>

      <div className="section-container relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-tag center !text-gold-light"
        >
          {t.guru.tag}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title center !text-cream"
        >
          {t.guru.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto mt-10 bg-cream rounded-3xl shadow-2xl px-8 py-12"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold animate-spin-slow" />
            <div className="absolute inset-2 rounded-full bg-gold-gradient flex items-center justify-center text-4xl">
              🙏
            </div>
          </div>

          <h3 className="font-heading text-2xl font-bold text-maroon-dark">{t.guru.name}</h3>
          <p className="text-gold-dark font-semibold text-sm mb-5 tracking-wide uppercase">
            {t.guru.role}
          </p>
          <p className="text-ink/70 leading-relaxed mb-6">{t.guru.bio}</p>
          <blockquote className="font-heading italic text-lg text-maroon border-l-4 border-gold pl-4 text-left mb-6">
            &ldquo;{t.guru.quote}&rdquo;
          </blockquote>

          <div className="flex justify-center gap-4">
            {["IG", "YT", "FB"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-10 h-10 rounded-full bg-maroon/10 text-maroon-dark flex items-center justify-center text-xs font-bold hover:bg-gold hover:text-maroon-dark hover:-translate-y-1 transition-all duration-300"
              >
                {s}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
