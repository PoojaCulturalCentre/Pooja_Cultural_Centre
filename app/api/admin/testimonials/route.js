import { query } from "@/lib/db";

export async function GET() {
  const rows = await query(
    "SELECT id, author_name, role, quote, active FROM testimonials WHERE deleted_at IS NULL ORDER BY id DESC"
  );
  return Response.json(rows.map((t) => ({ ...t, active: !!t.active })));
}

export async function POST(request) {
  const { author_name, role, quote } = await request.json();

  if (!author_name?.trim() || !quote?.trim()) {
    return Response.json({ error: "Author name and quote are required." }, { status: 400 });
  }

  const result = await query(
    "INSERT INTO testimonials (author_name, role, quote, active) VALUES (?, ?, ?, 1)",
    [author_name.trim(), role?.trim() || null, quote.trim()]
  );

  return Response.json(
    { id: result.insertId, author_name: author_name.trim(), role: role?.trim() || null, quote: quote.trim(), active: true },
    { status: 201 }
  );
}
