import { query } from "@/lib/db";

export async function GET() {
  const rows = await query(
    "SELECT id, title, place, description, event_date, active FROM events WHERE deleted_at IS NULL ORDER BY event_date ASC"
  );
  return Response.json(rows.map((e) => ({ ...e, active: !!e.active })));
}

export async function POST(request) {
  const { title, place, description, event_date } = await request.json();

  if (!title?.trim() || !place?.trim() || !event_date) {
    return Response.json({ error: "Title, place, and date are required." }, { status: 400 });
  }

  const result = await query(
    "INSERT INTO events (title, place, description, event_date, active) VALUES (?, ?, ?, ?, 1)",
    [title.trim(), place.trim(), description?.trim() || null, event_date]
  );

  return Response.json(
    { id: result.insertId, title: title.trim(), place: place.trim(), description: description?.trim() || null, event_date, active: true },
    { status: 201 }
  );
}
