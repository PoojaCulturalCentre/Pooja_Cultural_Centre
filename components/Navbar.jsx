"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const LINK_HREFS = ["#home", "#about", "#guru", "#classes", "#gallery", "#events", "#testimonials", "#contact"];
const LINK_KEYS = ["home", "about", "guru", "classes", "gallery", "events", "testimonials", "contact"];

const menuContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const menuItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = LINK_HREFS.map((href, i) => ({ href, label: t.nav[LINK_KEYS[i]] }));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-maroon-dark/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.25)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto w-full max-w-[100rem] px-6 sm:px-8 flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2 group shrink-0 whitespace-nowrap">
          <span className="text-gold text-xl group-hover:rotate-180 transition-transform duration-700">
            ✦
          </span>
          <span className="font-heading font-bold text-cream text-lg sm:text-xl">
            Pooja <em className="text-gold not-italic font-heading italic">Cultural Centre</em>
          </span>
        </a>

        <nav className="hidden xl:flex items-center gap-3.5 shrink-0">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-cream/90 text-[0.78rem] font-medium tracking-wide whitespace-nowrap hover:text-gold transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-4 shrink-0">
          <LanguageSwitcher />
          <a href="#contact" className="btn btn-gold !py-2.5 !px-5 text-xs whitespace-nowrap">
            {t.nav.bookFreeClass}
          </a>
        </div>

        <button
          className="xl:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center shrink-0"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[2px] bg-gold block origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-[2px] bg-gold block"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[2px] bg-gold block origin-center"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="xl:hidden overflow-hidden bg-maroon-dark/98 backdrop-blur-md border-t border-cream/10"
          >
            <motion.div
              variants={menuContainer}
              initial="hidden"
              animate="show"
              className="max-w-md mx-auto flex flex-col gap-1.5 px-6 py-6"
            >
              <motion.div variants={menuItem} className="flex justify-center pb-4 mb-2 border-b border-cream/10">
                <LanguageSwitcher variant="mobile" />
              </motion.div>

              {links.map((link) => (
                <motion.a
                  key={link.href}
                  variants={menuItem}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-cream/90 text-[0.95rem] font-medium hover:bg-cream/10 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                  <span className="text-gold/50">→</span>
                </motion.a>
              ))}

              <motion.a
                variants={menuItem}
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn-gold justify-center mt-4 !py-3"
              >
                {t.nav.bookFreeClass}
              </motion.a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
