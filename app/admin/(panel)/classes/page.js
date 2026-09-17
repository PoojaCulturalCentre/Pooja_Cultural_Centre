import { CLASSES } from "@/lib/mockAdminData";

export default function AdminClassesPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-6 sm:px-8 pt-8 pb-4">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-dark">Classes</h1>
        <p className="text-ink/50 text-sm">{CLASSES.length} running batches.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-3">
          {CLASSES.map((c) => (
            <div key={c.id} className="flex items-center justify-between border-t border-ink/5 pt-3 first:border-t-0 first:pt-0">
              <div>
                <div className="font-medium text-ink text-sm">{c.name}</div>
                <div className="text-ink/50 text-xs">{c.schedule}</div>
              </div>
              <span className="text-xs font-semibold text-maroon bg-maroon/10 px-2.5 py-1 rounded-full">
                {c.students} students
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
