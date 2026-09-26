import { query } from "@/lib/db";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/uploads";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const title = formData.get("title")?.toString().trim();
      const category = formData.get("category")?.toString().trim();
      const activeRaw = formData.get("active");
      const file = formData.get("file");

      const updates = [];
      const values = [];

      if (title) {
        updates.push("title = ?");
        values.push(title);
      }
      if (category) {
        updates.push("category = ?");
        values.push(category);
      }
      if (activeRaw !== null) {
        updates.push("active = ?");
        values.push(activeRaw === "true" ? 1 : 0);
      }

      if (file instanceof File && file.size > 0) {
        if (!file.type.startsWith("image/")) {
          return Response.json({ error: "File must be an image." }, { status: 400 });
        }
        const [existing] = await query("SELECT url FROM images WHERE id = ?", [id]);
        const newUrl = await saveUploadedFile(file, "images");
        updates.push("url = ?");
        values.push(newUrl);
        if (existing?.url) await deleteUploadedFile(existing.url);
      }

      if (updates.length > 0) {
        values.push(id);
        await query(`UPDATE images SET ${updates.join(", ")} WHERE id = ?`, values);
      }

      const [row] = await query("SELECT id, title, category, url, active FROM images WHERE id = ?", [id]);
      return Response.json({ ...row, active: !!row.active });
    }

    const { active } = await request.json();
    await query("UPDATE images SET active = ? WHERE id = ?", [active ? 1 : 0, id]);
    return Response.json({ id: Number(id), active });
  } catch (err) {
    console.error("Image update failed:", err);
    return Response.json({ error: `Update failed: ${err.message}` }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await query("UPDATE images SET deleted_at = NOW() WHERE id = ?", [id]);
    return Response.json({ id: Number(id), deleted: true });
  } catch (err) {
    console.error("Image delete failed:", err);
    return Response.json({ error: `Delete failed: ${err.message}` }, { status: 500 });
  }
}
