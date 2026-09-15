"use client";

import { motion } from "framer-motion";

const CLASSES = [
  {
    icon: "🌱",
    title: "Beginners (Ages 5+)",
    desc: "Foundations of posture, Adavus, rhythm and basic mudras in a fun, nurturing environment.",
  },
  {
    icon: "🙏",
    title: "Intermediate",
    desc: "Jatiswarams, Shabdams and expanded repertoire with focus on Nritta precision.",
  },
  {
    icon: "⭐",
    title: "Advanced & Repertoire",
    desc: "Varnams, Padams and Abhinaya training to build emotive, mature storytelling.",
  },
  {
    icon: "🎓",
    title: "Arangetram Preparation",
    desc: "One-on-one intensive coaching to prepare for your solo debut performance.",
  },
  {
    icon: "👤",
    title: "Adult Batches",
    desc: "Never too late — dedicated weekend batches for adult learners of all levels.",
  },
  {
    icon: "🎥",
    title: "Online Classes",
    desc: "Live, interactive sessions for students learning from anywhere in the world.",
  },
];

export default function Classes() {
  return (
    <section id="classes" className="py-24 sm:py-32 bg-cream">
      <div className="section-container">
        <span className="section-tag center block text-center">Programs</span>
        <h2 className="section-title center">Our Classes</h2>
        <p className="section-desc center">
          Structured programs for every age and skill level — from curious beginners to
          accomplished performers.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
          {CLASSES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl p-8 shadow-card border border-maroon/5 hover:border-gold/40 hover:shadow-gold transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {c.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-maroon-dark mb-2">{c.title}</h3>
              <p className="text-ink/65 text-sm leading-relaxed mb-3">{c.desc}</p>
              <a href="#contact" className="card-link">
                Enroll Now →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
