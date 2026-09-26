import { query } from "@/lib/db";

export async function GET() {
  const rows = await query("SELECT COUNT(*) AS count FROM messages WHERE is_read = 0");
  return Response.json({ count: rows[0].count });
}
