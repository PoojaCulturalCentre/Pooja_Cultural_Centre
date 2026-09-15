"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-radial-maroon"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <div className="flex flex-col items-center gap-5">
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-gold">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                className="animate-spin-slow origin-center"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                className="animate-spin-slow-reverse origin-center"
              />
              <circle
                cx="50"
                cy="50"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="animate-spin-slow origin-center"
              />
            </svg>
            <p className="font-heading text-gold-light tracking-[0.3em] text-sm uppercase">
              Pooja Cultural Centre
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
