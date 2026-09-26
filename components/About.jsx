"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_PHOTO } from "@/lib/photos";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="section-container grid md:grid-cols-2 gap-14 md:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-80 sm:w-80 sm:h-96">
            {/* Rotating dashed ring */}
            <div className="absolute -inset-4 rounded-[2rem] mandala-ring animate-spin-slow" />
            {/* Frame */}
            <div className="absolute inset-0 rounded-[1.5rem] shadow-card overflow-hidden">
              <Image
                src={ABOUT_PHOTO.src}
                alt={ABOUT_PHOTO.alt}
                fill
                sizes="(max-width: 640px) 288px, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/70 via-transparent to-transparent" />
              <div className="absolute inset-3 rounded-[1.2rem] border border-gold/30" />
            </div>
            {/* Corner accents */}
            {["-top-2 -left-2 border-t-2 border-l-2", "-top-2 -right-2 border-t-2 border-r-2", "-bottom-2 -left-2 border-b-2 border-l-2", "-bottom-2 -right-2 border-b-2 border-r-2"].map(
              (pos, i) => (
                <span key={i} className={`absolute w-8 h-8 border-gold ${pos}`} />
              )
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="section-tag">{t.about.tag}</span>
          <h2 className="section-title">
            {t.about.titleLine1}
            <br /> {t.about.titleLine2}
          </h2>
          <p className="section-desc">{t.about.desc1}</p>
          <p className="section-desc mb-8">{t.about.desc2}</p>

          <a href="#guru" className="btn btn-maroon">
            {t.about.cta} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
