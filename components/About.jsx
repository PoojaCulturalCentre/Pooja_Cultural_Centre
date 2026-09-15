"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { to: 20, label: "Years of Legacy" },
  { to: 500, label: "Students Trained" },
  { to: 120, label: "Performances" },
  { to: 35, label: "Awards Won" },
];

export default function About() {
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
            <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-maroon to-maroon-dark shadow-card flex items-center justify-center overflow-hidden">
              <span className="text-8xl drop-shadow-[0_4px_18px_rgba(212,175,55,0.45)]">💃</span>
              <div className="absolute inset-3 rounded-[1.2rem] border border-gold/30" />
            </div>
            {/* Corner accents */}
            {["-top-2 -left-2 border-t-2 border-l-2", "-top-2 -right-2 border-t-2 border-r-2", "-bottom-2 -left-2 border-b-2 border-l-2", "-bottom-2 -right-2 border-b-2 border-r-2"].map(
              (pos, i) => (
                <span key={i} className={`absolute w-8 h-8 border-gold ${pos}`} />
              )
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="absolute -bottom-6 -right-2 sm:right-6 bg-white rounded-2xl shadow-gold px-5 py-4 flex items-center gap-3"
          >
            <span className="text-2xl">🏆</span>
            <div>
              <strong className="block font-heading text-lg text-maroon-dark leading-none">20+</strong>
              <span className="text-xs text-ink/60">Years Legacy</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="section-tag">About Us</span>
          <h2 className="section-title">
            Preserving a 2,000-Year-Old
            <br /> Art Form With Love
          </h2>
          <p className="section-desc">
            Pooja Cultural Centre is a sanctuary for the classical Indian dance form of
            Bharathanatyam. Rooted in tradition and taught with modern warmth, our academy
            nurtures students of every age to discover rhythm, storytelling and grace through
            Natya. From the first Adavu to a graceful Arangetram, we walk every step with you.
          </p>
          <p className="section-desc">
            Our curriculum blends the rigor of the Guru-Shishya Parampara with structured,
            joyful learning — building not just dancers, but confident performers and storytellers.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="text-left">
                <div className="font-heading text-3xl font-bold text-maroon-dark">
                  <AnimatedCounter to={s.to} />
                </div>
                <p className="text-xs sm:text-sm text-ink/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <a href="#guru" className="btn btn-maroon">
            Meet Our Guru →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
