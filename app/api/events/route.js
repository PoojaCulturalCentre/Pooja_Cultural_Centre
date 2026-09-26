import { query } from "@/lib/db";

export async function GET() {
  const rows = await query(
    "SELECT id, title, place, description, event_date FROM events WHERE deleted_at IS NULL AND active = 1 AND event_date >= CURDATE() ORDER BY event_date ASC"
  );
  return Response.json(rows);
}
