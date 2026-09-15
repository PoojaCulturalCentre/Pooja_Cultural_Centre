"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-radial-maroon"
    >
      {/* Mandala ornaments */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -top-16 -left-16 w-72 h-72 sm:w-96 sm:h-96 text-gold/20 animate-spin-slow"
      >
        <MandalaShape />
      </svg>
      <svg
        viewBox="0 0 200 200"
        className="absolute -bottom-24 -right-16 w-80 h-80 sm:w-[28rem] sm:h-[28rem] text-gold/15 animate-spin-slow-reverse"
      >
        <MandalaShape />
      </svg>

      <Petals />

      <div className="relative z-10 section-container flex flex-col items-center text-center pt-24 pb-16">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          <motion.p
            variants={item}
            className="flex items-center gap-2 text-gold-light/90 tracking-[0.35em] uppercase text-xs sm:text-sm mb-5"
          >
            <i className="inline-block">✺</i> Welcome to
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-shimmer animate-shimmer mb-6 leading-tight px-2"
          >
            Pooja Cultural Centre
          </motion.h1>

          <motion.p variants={item} className="text-cream/85 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
            Where Tradition Meets Grace — a home for the timeless art of{" "}
            <span className="text-gold-light font-semibold">Bharathanatyam</span>
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <a href="#classes" className="btn btn-gold">
              🪷 Explore Classes
            </a>
            <a href="#gallery" className="btn btn-outline">
              ▶ Watch Performances
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
      </div>
    </section>
  );
}

function MandalaShape() {
  return (
    <g stroke="currentColor" fill="none" strokeWidth="0.6">
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="80" />
      <circle cx="100" cy="100" r="64" />
      <path d="M100 4 L100 196" />
      <path d="M4 100 L196 100" />
      <path d="M29 29 L171 171" />
      <path d="M171 29 L29 171" />
      <g fill="currentColor" stroke="none">
        <circle cx="100" cy="20" r="3" />
        <circle cx="100" cy="180" r="3" />
        <circle cx="20" cy="100" r="3" />
        <circle cx="180" cy="100" r="3" />
        <circle cx="41" cy="41" r="3" />
        <circle cx="159" cy="159" r="3" />
        <circle cx="159" cy="41" r="3" />
        <circle cx="41" cy="159" r="3" />
      </g>
    </g>
  );
}
