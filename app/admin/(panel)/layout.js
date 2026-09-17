"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPanelLayout({ children }) {
  const { user, ready, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isAuthenticated) router.replace("/admin/login");
  }, [ready, isAuthenticated, router]);

  if (!ready || !isAuthenticated) {
    return <main className="h-screen flex items-center justify-center text-ink/50">Loading...</main>;
  }

  return (
    <div className="h-screen overflow-hidden bg-gold/10 p-4 sm:p-6 flex gap-4 sm:gap-6">
      <AdminSidebar />

      <div className="flex-1 min-w-0 bg-white rounded-3xl shadow-card overflow-hidden flex flex-col">
        <header className="shrink-0 z-20 bg-maroon-dark text-cream rounded-t-3xl">
          <div className="px-6 sm:px-8 flex items-center justify-between py-5">
            <span className="font-heading font-bold text-lg md:hidden">
              Pooja <em className="text-gold not-italic italic">Cultural Centre</em>
            </span>
            <span className="hidden md:block text-sm text-cream/70">Admin Panel</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-cream/70">
                Welcome, <span className="font-semibold text-gold">{user.name}</span>
              </span>
              <button
                onClick={() => {
                  logout();
                  router.push("/admin/login");
                }}
                className="rounded-full border border-cream/30 px-4 py-1.5 text-xs font-semibold hover:bg-cream/10 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
}
