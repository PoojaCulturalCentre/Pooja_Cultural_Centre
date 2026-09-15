"use client";

import { motion } from "framer-motion";

export default function Guru() {
  return (
    <section id="guru" className="py-24 sm:py-32 bg-gradient-to-b from-maroon-dark to-maroon relative overflow-hidden">
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
          Our Founder
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title center !text-cream"
        >
          Meet the Guru
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

          <h3 className="font-heading text-2xl font-bold text-maroon-dark">Smt. Pooja Rajan</h3>
          <p className="text-gold-dark font-semibold text-sm mb-5 tracking-wide uppercase">
            Founder &amp; Artistic Director
          </p>
          <p className="text-ink/70 leading-relaxed mb-6">
            A senior disciple of the Kalakshetra tradition with over two decades of stage and
            teaching experience, Smt. Pooja Rajan has trained hundreds of students across three
            generations, choreographed award-winning productions, and performed on prestigious
            stages across the world.
          </p>
          <blockquote className="font-heading italic text-lg text-maroon border-l-4 border-gold pl-4 text-left mb-6">
            &ldquo;Dance is prayer in motion — every mudra a word, every Adavu a heartbeat.&rdquo;
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
