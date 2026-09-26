import { query } from "@/lib/db";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const { author_name, role, quote, active } = await request.json();

  const updates = [];
  const values = [];

  if (author_name !== undefined) {
    updates.push("author_name = ?");
    values.push(author_name.trim());
  }
  if (role !== undefined) {
    updates.push("role = ?");
    values.push(role?.trim() || null);
  }
  if (quote !== undefined) {
    updates.push("quote = ?");
    values.push(quote.trim());
  }
  if (active !== undefined) {
    updates.push("active = ?");
    values.push(active ? 1 : 0);
  }

  if (updates.length > 0) {
    values.push(id);
    await query(`UPDATE testimonials SET ${updates.join(", ")} WHERE id = ?`, values);
  }

  const [row] = await query(
    "SELECT id, author_name, role, quote, active FROM testimonials WHERE id = ?",
    [id]
  );
  return Response.json({ ...row, active: !!row.active });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await query("UPDATE testimonials SET deleted_at = NOW() WHERE id = ?", [id]);
  return Response.json({ id: Number(id), deleted: true });
}
