import Link from "next/link";
import { query } from "@/lib/db";
import { formatRelativeTime } from "@/lib/formatRelativeTime";

export const dynamic = "force-dynamic";

async function getOverviewData() {
  const [studentCount, classCount, messageCount, students, classes, messages] = await Promise.all([
    query("SELECT COUNT(*) AS count FROM students WHERE status = 'Active'"),
    query("SELECT COUNT(*) AS count FROM classes"),
    query("SELECT COUNT(*) AS count FROM messages"),
    query("SELECT id, name, batch FROM students ORDER BY id LIMIT 5"),
    query("SELECT id, name, students FROM classes ORDER BY id LIMIT 5"),
    query(
      "SELECT id, sender_name AS `from`, subject, created_at FROM messages ORDER BY created_at DESC LIMIT 5"
    ),
  ]);

  const stats = [
    { label: "Total Students", value: studentCount[0].count, icon: "🧑‍🎓" },
    { label: "Active Classes", value: classCount[0].count, icon: "🩰" },
    { label: "Upcoming Events", value: 3, icon: "🎉" },
    { label: "New Messages", value: messageCount[0].count, icon: "✉️" },
  ];

  return { stats, students, classes, messages };
}

export default async function AdminOverviewPage() {
  const { stats: STATS, students: STUDENTS, classes: CLASSES, messages: MESSAGES } = await getOverviewData();

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-6 sm:px-8 pt-8 pb-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-dark">Admin Dashboard</h1>
          <p className="text-ink/50 text-sm">Overview of the academy's activity.</p>
        </div>
       
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white border border-ink/5 rounded-2xl shadow-card p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-heading font-bold text-2xl text-maroon-dark">{s.value}</div>
              <div className="text-ink/50 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <PreviewCard title="Students" href="/admin/students">
            {STUDENTS.slice(0, 5).map((st) => (
              <div key={st.id} className="flex items-center justify-between border-t border-ink/5 pt-3 first:border-t-0 first:pt-0">
                <div className="font-medium text-ink text-sm">{st.name}</div>
                <span className="text-ink/50 text-xs">{st.batch}</span>
              </div>
            ))}
          </PreviewCard>

          <PreviewCard title="Classes" href="/admin/classes">
            {CLASSES.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between border-t border-ink/5 pt-3 first:border-t-0 first:pt-0">
                <div className="font-medium text-ink text-sm">{c.name}</div>
                <span className="text-xs font-semibold text-maroon bg-maroon/10 px-2.5 py-1 rounded-full">
                  {c.students}
                </span>
              </div>
            ))}
          </PreviewCard>

          <PreviewCard title="Messages" href="/admin/messages">
            {MESSAGES.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-center justify-between border-t border-ink/5 pt-3 first:border-t-0 first:pt-0">
                <div className="font-medium text-ink text-sm">{m.from}</div>
                <span className="text-ink/40 text-xs">{formatRelativeTime(m.created_at)}</span>
              </div>
            ))}
          </PreviewCard>
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ title, href, children }) {
  return (
    <section className="bg-white rounded-2xl shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg text-maroon-dark">{title}</h2>
        <Link href={href} className="text-xs font-semibold text-maroon hover:text-gold-dark transition-colors">
          View all →
        </Link>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
