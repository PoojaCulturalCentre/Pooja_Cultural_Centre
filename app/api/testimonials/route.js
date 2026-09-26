import { query } from "@/lib/db";

export async function GET() {
  const rows = await query(
    "SELECT id, author_name, role, quote FROM testimonials WHERE deleted_at IS NULL AND active = 1 ORDER BY id DESC"
  );
  return Response.json(rows);
}
