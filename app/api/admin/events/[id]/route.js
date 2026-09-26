import { query } from "@/lib/db";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const { title, place, description, event_date, active } = await request.json();

  const updates = [];
  const values = [];

  if (title !== undefined) {
    updates.push("title = ?");
    values.push(title.trim());
  }
  if (place !== undefined) {
    updates.push("place = ?");
    values.push(place.trim());
  }
  if (description !== undefined) {
    updates.push("description = ?");
    values.push(description?.trim() || null);
  }
  if (event_date !== undefined) {
    updates.push("event_date = ?");
    values.push(event_date);
  }
  if (active !== undefined) {
    updates.push("active = ?");
    values.push(active ? 1 : 0);
  }

  if (updates.length > 0) {
    values.push(id);
    await query(`UPDATE events SET ${updates.join(", ")} WHERE id = ?`, values);
  }

  const [row] = await query(
    "SELECT id, title, place, description, event_date, active FROM events WHERE id = ?",
    [id]
  );
  return Response.json({ ...row, active: !!row.active });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await query("UPDATE events SET deleted_at = NOW() WHERE id = ?", [id]);
  return Response.json({ id: Number(id), deleted: true });
}
