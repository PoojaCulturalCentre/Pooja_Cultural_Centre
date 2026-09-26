import { query } from "@/lib/db";
import { formatRelativeTime } from "@/lib/formatRelativeTime";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const MESSAGES = await query(
    "SELECT id, sender_name AS `from`, email, subject, body, is_read, created_at FROM messages ORDER BY created_at DESC"
  );

  const unreadIds = MESSAGES.filter((m) => !m.is_read).map((m) => m.id);
  if (unreadIds.length > 0) {
    await query(`UPDATE messages SET is_read = 1 WHERE id IN (${unreadIds.map(() => "?").join(",")})`, unreadIds);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-6 sm:px-8 pt-8 pb-4">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-dark">Messages</h1>
        <p className="text-ink/50 text-sm">{MESSAGES.length} recent enquiries.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-4">
          {MESSAGES.map((m) => (
            <div key={m.id} className="flex items-start justify-between gap-4 border-t border-ink/5 pt-4 first:border-t-0 first:pt-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {!m.is_read && <span className="w-2 h-2 rounded-full bg-maroon shrink-0" />}
                  <span className="font-medium text-ink text-sm">{m.from}</span>
                  {m.email && <span className="text-ink/40 text-xs">({m.email})</span>}
                </div>
                <div className="text-ink/70 text-xs font-semibold mt-1">{m.subject}</div>
                {m.body && <div className="text-ink/50 text-xs mt-1 line-clamp-2">{m.body}</div>}
              </div>
              <span className="shrink-0 text-ink/40 text-xs">{formatRelativeTime(m.created_at)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
