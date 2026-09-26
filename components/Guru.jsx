"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GURU_AVATAR_PHOTO } from "@/lib/photos";
import SocialIcon, { SOCIAL_LINKS } from "./SocialIcon";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Guru() {
  const { t } = useLanguage();
  const phoneHref = t.contact.phone.replace(/\s+/g, "");

  return (
    <section id="guru" className="py-24 sm:py-32 relative overflow-hidden bg-maroon">
      <Image
        src={GURU_AVATAR_PHOTO.src}
        alt={GURU_AVATAR_PHOTO.alt}
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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mt-10 bg-cream rounded-3xl shadow-2xl px-8 py-12 sm:px-12 text-left"
        >
          <div className="text-center mb-8">
            <div className="relative w-28 h-28 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold animate-spin-slow" />
              <div className="absolute inset-2 rounded-full overflow-hidden bg-gold-gradient">
                <Image
                  src={GURU_AVATAR_PHOTO.src}
                  alt={GURU_AVATAR_PHOTO.alt}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-maroon-dark">{t.guru.name}</h3>
            <p className="text-gold-dark font-semibold text-sm mt-1 tracking-wide uppercase">
              {t.guru.role}
            </p>
          </div>

          <p className="text-ink/70 leading-relaxed mb-8">{t.guru.intro}</p>

          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-heading text-lg font-bold text-maroon-dark mb-3">
                {t.guru.lineageTitle}
              </h4>
              <ul className="space-y-3">
                {t.guru.lineage.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-ink/70 leading-relaxed">
                    <span className="text-gold-dark shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-bold text-maroon-dark mb-3">
                {t.guru.achievementsTitle}
              </h4>
              <ul className="space-y-3">
                {t.guru.achievements.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-ink/70 leading-relaxed">
                    <span className="text-gold-dark shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-heading text-lg font-bold text-maroon-dark mb-2">
              {t.guru.scienceTitle}
            </h4>
            <p className="text-ink/70 leading-relaxed text-sm">{t.guru.scienceBio}</p>
          </div>

          <p className="text-ink/70 leading-relaxed mb-6">{t.guru.closing}</p>

          <blockquote className="font-heading italic text-lg text-maroon border-l-4 border-gold pl-4 mb-8">
            &ldquo;{t.guru.quote}&rdquo;
          </blockquote>

          <div className="flex flex-wrap items-center justify-between gap-4 bg-maroon/5 rounded-2xl px-6 py-5">
            <p className="text-sm text-ink/70">
              {t.guru.contactNote}{" "}
              <a href={`tel:${phoneHref}`} className="font-bold text-maroon-dark hover:text-gold-dark transition-colors">
                {t.contact.phone}
              </a>
            </p>
            <div className="flex justify-center gap-4">
              {SOCIAL_LINKS.filter((s) => s.platform !== "whatsapp").map(({ platform, label, href }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-maroon/10 text-maroon-dark flex items-center justify-center hover:bg-gold hover:text-maroon-dark hover:-translate-y-1 transition-all duration-300"
                >
                  <SocialIcon platform={platform} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
