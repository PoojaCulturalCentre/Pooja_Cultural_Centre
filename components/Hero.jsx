"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO_PHOTO } from "@/lib/photos";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import MandalaShape from "./Mandala";

function Petals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 14,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 10,
    }));
    setPetals(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yTopMandala = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yBottomMandala = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-radial-maroon"
    >
      {/* Background photograph */}
      <div className="absolute inset-0">
        <Image
          src={HERO_PHOTO.src}
          alt={HERO_PHOTO.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(138,26,50,0.72)_0%,rgba(63,10,23,0.9)_70%)]" />
      </div>

      {/* Mandala ornaments */}
      <motion.svg
        style={{ y: yTopMandala }}
        viewBox="0 0 200 200"
        className="absolute -top-16 -left-16 w-72 h-72 sm:w-96 sm:h-96 text-gold/20 animate-spin-slow"
      >
        <MandalaShape />
      </motion.svg>
      <motion.svg
        style={{ y: yBottomMandala }}
        viewBox="0 0 200 200"
        className="absolute -bottom-24 -right-16 w-80 h-80 sm:w-[28rem] sm:h-[28rem] text-gold/15 animate-spin-slow-reverse"
      >
        <MandalaShape />
      </motion.svg>

      <Petals />

      <motion.div
        style={{ y: yContent, opacity: contentOpacity }}
        className="relative z-10 section-container flex flex-col items-center text-center pt-24 pb-16"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          <motion.p
            variants={item}
            className="flex items-center gap-2 text-gold-light/90 tracking-[0.35em] uppercase text-xs sm:text-sm mb-5"
          >
            <i className="inline-block">✺</i> {t.hero.kicker}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-shimmer animate-shimmer mb-6 leading-tight px-2"
          >
            Pooja Cultural Centre
          </motion.h1>

          <motion.p variants={item} className="text-cream/85 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
            {t.hero.subtitlePrefix}{" "}
            <span className="text-gold-light font-semibold">{t.hero.subtitleWord}</span>
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <a href="#classes" className="btn btn-gold">
              🪷 {t.hero.exploreClasses}
            </a>
            <a href="#gallery" className="btn btn-outline">
              ▶ {t.hero.watchPerformances}
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className="ghungroo"
                style={{
                  animation: `ghungrooSway 1.6s ease-in-out ${i * 0.12}s infinite`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
