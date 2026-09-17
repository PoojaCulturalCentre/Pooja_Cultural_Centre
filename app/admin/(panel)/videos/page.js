"use client";

import { useState } from "react";
import { VIDEOS } from "@/lib/mockAdminData";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState(VIDEOS);

  const toggle = (id) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, active: !v.active } : v)));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-6 sm:px-8 pt-8 pb-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-dark">Video Management</h1>
          <p className="text-ink/50 text-sm">Show or hide videos on the website.</p>
        </div>
        <span className="rounded-full bg-gold/15 text-gold-dark text-xs font-semibold px-3 py-1.5">
          Mock data — uploads and layout to be finalized later
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-3">
          {videos.map((v) => (
            <div key={v.id} className="flex items-center justify-between gap-4 border-t border-ink/5 pt-3 first:border-t-0 first:pt-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-11 h-11 shrink-0 rounded-xl bg-maroon/10 flex items-center justify-center text-lg">
                  🎬
                </span>
                <div className="min-w-0">
                  <div className="font-medium text-ink text-sm truncate">{v.title}</div>
                  <div className="text-ink/50 text-xs">{v.duration}</div>
                </div>
              </div>
              <button
                onClick={() => toggle(v.id)}
                className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  v.active ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-ink/10 text-ink/50 hover:bg-ink/15"
                }`}
              >
                {v.active ? "Active" : "Hidden"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
