"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "My daughter has blossomed in confidence and grace since joining. The teachers are patient, skilled, and truly passionate about the art form.",
    name: "Anitha Krishnan",
    role: "Parent, Beginner Batch",
  },
  {
    quote:
      "My Arangetram at Pooja Cultural Centre was the proudest day of my life. Every rehearsal felt like a gift from my guru.",
    name: "Meera Sundaram",
    role: "Student, Arangetram 2023",
  },
  {
    quote:
      "As an adult learner, I never thought I'd dance on stage. This academy made it possible with so much warmth and encouragement.",
    name: "Divya Raman",
    role: "Adult Batch Student",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-gradient-to-b from-maroon to-maroon-dark">
      <div className="section-container text-center">
        <span className="section-tag center !text-gold-light">Kind Words</span>
        <h2 className="section-title center !text-cream">What Our Families Say</h2>

        <div className="relative max-w-2xl mx-auto mt-12 bg-cream rounded-3xl shadow-2xl px-8 sm:px-14 py-14 min-h-[260px] flex items-center">
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
                &ldquo;{TESTIMONIALS[index].quote}&rdquo;
              </p>
              <h4 className="font-semibold text-ink">{TESTIMONIALS[index].name}</h4>
              <span className="text-sm text-gold-dark">{TESTIMONIALS[index].role}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {TESTIMONIALS.map((_, i) => (
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
