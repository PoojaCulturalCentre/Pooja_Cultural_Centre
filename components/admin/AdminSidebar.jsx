"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import pccLogo from "@/app/images/pcc_logo.png";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "📊", href: "/admin/dashboard" },
  { key: "students", label: "Students", icon: "🧑‍🎓", href: "/admin/students" },
  { key: "classes", label: "Classes", icon: "🩰", href: "/admin/classes" },
  { key: "messages", label: "Messages", icon: "✉️", href: "/admin/messages" },
  { key: "videos", label: "Videos", icon: "🎬", href: "/admin/videos" },
  { key: "images", label: "Images", icon: "🖼️", href: "/admin/images" },
];

const SOON_ITEMS = [
  { key: "events", label: "Events", icon: "🎉" },
  { key: "settings", label: "Settings", icon: "⚙️" },
];

const POLL_INTERVAL_MS = 8000;

export default function AdminSidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [notification, setNotification] = useState(null);
  const previousCountRef = useRef(0);
  const hasFetchedOnceRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const res = await fetch("/api/admin/messages/unread-count");
        if (!res.ok || cancelled) return;
        const { count } = await res.json();

        if (hasFetchedOnceRef.current && count > previousCountRef.current) {
          setNotification(
            count - previousCountRef.current === 1
              ? "New message received"
              : `${count - previousCountRef.current} new messages received`
          );
          setTimeout(() => setNotification(null), 4000);
        }

        previousCountRef.current = count;
        hasFetchedOnceRef.current = true;
        setUnreadCount(count);
      } catch {
        // network hiccup - ignore, next poll will retry
      }
    };

    poll();
    const interval = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const q = query.trim().toLowerCase();
  const navItems = useMemo(
    () => (q ? NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(q)) : NAV_ITEMS),
    [q]
  );
  const soonItems = useMemo(
    () => (q ? SOON_ITEMS.filter((item) => item.label.toLowerCase().includes(q)) : SOON_ITEMS),
    [q]
  );

  return (
    <aside
      className="hidden md:flex flex-col w-64 shrink-0
      h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)]
      rounded-3xl bg-maroon-dark text-cream/80 shadow-2xl p-5"
    >
      <div className="shrink-0 flex items-center gap-3 px-1 mb-5">
        <span className="w-10 h-10 shrink-0 rounded-full bg-cream flex items-center justify-center overflow-hidden">
          <Image src={pccLogo} alt="Pooja Cultural Centre" className="w-8 h-8 object-contain" priority />
        </span>
        <div className="min-w-0">
          <div className="font-heading font-semibold text-cream text-sm truncate">Pooja Cultural Centre</div>
          <div className="text-cream/40 text-xs">Admin</div>
        </div>
      </div>

      <div className="shrink-0 relative mb-5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40 text-sm">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search modules..."
          className="w-full rounded-xl bg-cream/10 pl-9 pr-3 py-2 text-sm text-cream placeholder-cream/40 outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-dark pr-1">
        <span className="px-1 text-[0.65rem] uppercase tracking-wider text-cream/30 mb-2 block">Main</span>
        <nav className="flex flex-col gap-1 mb-6">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-gold/15 text-gold" : "text-cream/70 hover:bg-cream/5 hover:text-cream"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.key === "messages" && unreadCount > 0 && (
                  <span className="shrink-0 min-w-[1.25rem] h-5 px-1.5 rounded-full bg-maroon text-cream text-[0.65rem] font-bold flex items-center justify-center">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {soonItems.length > 0 && (
          <>
            <span className="px-1 text-[0.65rem] uppercase tracking-wider text-cream/30 mb-2 block">Coming soon</span>
            <div className="flex flex-col gap-1">
              {soonItems.map((item) => (
                <span
                  key={item.key}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-cream/30 cursor-not-allowed"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>
          </>
        )}

        {navItems.length === 0 && soonItems.length === 0 && (
          <p className="px-1 text-cream/30 text-xs">No modules match "{query}".</p>
        )}
      </div>

      <div className="shrink-0 mt-5 pt-5 border-t border-cream/10">
        <div className="rounded-2xl bg-cream/5 p-4">
          
          <Link
            href="/"
            className="block text-center rounded-full bg-gold-gradient text-maroon-dark text-xs font-semibold py-2 hover:scale-[1.02] transition-transform"
          >
            Back to Website
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-[17rem] md:translate-x-0 bg-maroon text-cream px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 z-[95] text-sm font-medium"
          >
            ✉️ {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
