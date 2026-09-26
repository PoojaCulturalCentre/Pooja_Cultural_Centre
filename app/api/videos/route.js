import { query } from "@/lib/db";

export async function GET() {
  const rows = await query(
    "SELECT id, title, duration, url FROM videos WHERE deleted_at IS NULL AND active = 1 ORDER BY id DESC"
  );
  return Response.json(rows);
}
