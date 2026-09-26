"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const POLL_INTERVAL_MS = 8000;

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const res = await fetch("/api/admin/messages/unread-count");
        if (!res.ok || cancelled) return;
        const { count } = await res.json();
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

  return (
    <Link
      href="/admin/messages"
      aria-label={unreadCount > 0 ? `${unreadCount} unread messages` : "Messages"}
      className="relative w-9 h-9 shrink-0 rounded-full border border-cream/30 flex items-center justify-center hover:bg-cream/10 transition-colors"
    >
      <span className="text-base">🔔</span>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[1.15rem] h-[1.15rem] px-1 rounded-full bg-gold text-maroon-dark text-[0.6rem] font-bold flex items-center justify-center">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
