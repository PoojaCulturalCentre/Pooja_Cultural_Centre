import { STUDENTS } from "@/lib/mockAdminData";

export default function AdminStudentsPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-6 sm:px-8 pt-8 pb-4">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-dark">Students</h1>
        <p className="text-ink/50 text-sm">{STUDENTS.length} enrolled students.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-card p-6">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-left text-ink/40 text-xs uppercase tracking-wide">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Batch</th>
                <th className="py-2 pr-4">Joined</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {STUDENTS.map((st) => (
                <tr key={st.id} className="border-t border-ink/5">
                  <td className="py-2.5 pr-4 font-medium text-ink">{st.name}</td>
                  <td className="py-2.5 pr-4 text-ink/60">{st.batch}</td>
                  <td className="py-2.5 pr-4 text-ink/60">{st.joined}</td>
                  <td className="py-2.5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        st.status === "Active" ? "bg-green-100 text-green-700" : "bg-ink/10 text-ink/50"
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
