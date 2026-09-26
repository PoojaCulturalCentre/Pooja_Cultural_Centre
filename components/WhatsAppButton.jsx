"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SocialIcon, { SOCIAL_LINKS } from "./SocialIcon";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const whatsapp = SOCIAL_LINKS.find((s) => s.platform === "whatsapp");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center"
        >
          <SocialIcon platform="whatsapp" className="w-6 h-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
