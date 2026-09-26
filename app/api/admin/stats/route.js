import { query } from "@/lib/db";

export async function GET() {
  const [[{ count: students }]] = [await query("SELECT COUNT(*) AS count FROM students WHERE status = 'Active'")];
  const [[{ count: classes }]] = [await query("SELECT COUNT(*) AS count FROM classes")];
  const [[{ count: messages }]] = [await query("SELECT COUNT(*) AS count FROM messages")];

  return Response.json([
    { label: "Total Students", value: students, icon: "🧑‍🎓" },
    { label: "Active Classes", value: classes, icon: "🩰" },
    { label: "Upcoming Events", value: 3, icon: "🎉" },
    { label: "New Messages", value: messages, icon: "✉️" },
  ]);
}
