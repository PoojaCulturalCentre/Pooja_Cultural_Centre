"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  { icon: "🪭", caption: "Arangetram 2024", grad: "from-maroon to-rose-800" },
  { icon: "🕉️", caption: "Natyanjali Festival", grad: "from-amber-700 to-maroon" },
  { icon: "🙏", caption: "Guru Vandana", grad: "from-orange-700 to-red-900" },
  { icon: "🎶", caption: "Thillana Ensemble", grad: "from-maroon to-purple-900" },
  { icon: "🛕", caption: "Temple Festival", grad: "from-yellow-700 to-maroon" },
  { icon: "⭐", caption: "Annual Day", grad: "from-red-800 to-orange-800" },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-white">
      <div className="section-container">
        <span className="section-tag center block text-center">Moments</span>
        <h2 className="section-title center">Gallery of Grace</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {ITEMS.map((item, i) => (
            <motion.button
              key={item.caption}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              onClick={() => setActive(item)}
              className={`relative h-56 rounded-2xl overflow-hidden bg-gradient-to-br ${item.grad} group cursor-pointer text-left`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-80 group-hover:scale-125 transition-transform duration-500">
                {item.icon}
              </div>
              <div className="absolute inset-0 gallery-overlay opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-4 left-5 text-cream font-heading font-semibold text-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {item.caption}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/85 flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className={`relative w-full max-w-2xl aspect-video rounded-2xl bg-gradient-to-br ${active.grad} flex flex-col items-center justify-center gap-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-8xl">{active.icon}</span>
              <p className="text-cream font-heading text-2xl font-semibold">{active.caption}</p>
              <button
                onClick={() => setActive(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gold text-maroon-dark font-bold text-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
