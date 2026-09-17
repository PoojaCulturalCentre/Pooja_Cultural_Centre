import { MESSAGES } from "@/lib/mockAdminData";

export default function AdminMessagesPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-6 sm:px-8 pt-8 pb-4">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-dark">Messages</h1>
        <p className="text-ink/50 text-sm">{MESSAGES.length} recent enquiries.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-3">
          {MESSAGES.map((m) => (
            <div key={m.id} className="flex items-center justify-between border-t border-ink/5 pt-3 first:border-t-0 first:pt-0">
              <div>
                <div className="font-medium text-ink text-sm">{m.from}</div>
                <div className="text-ink/50 text-xs">{m.subject}</div>
              </div>
              <span className="text-ink/40 text-xs">{m.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
