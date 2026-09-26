import { query } from "@/lib/db";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/uploads";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const title = formData.get("title")?.toString().trim();
      const duration = formData.get("duration")?.toString().trim();
      const activeRaw = formData.get("active");
      const file = formData.get("file");

      const updates = [];
      const values = [];

      if (title) {
        updates.push("title = ?");
        values.push(title);
      }
      if (duration) {
        updates.push("duration = ?");
        values.push(duration);
      }
      if (activeRaw !== null) {
        updates.push("active = ?");
        values.push(activeRaw === "true" ? 1 : 0);
      }

      if (file instanceof File && file.size > 0) {
        if (!file.type.startsWith("video/")) {
          return Response.json({ error: "File must be a video." }, { status: 400 });
        }
        const [existing] = await query("SELECT url FROM videos WHERE id = ?", [id]);
        const newUrl = await saveUploadedFile(file, "videos");
        updates.push("url = ?");
        values.push(newUrl);
        if (existing?.url) await deleteUploadedFile(existing.url);
      }

      if (updates.length > 0) {
        values.push(id);
        await query(`UPDATE videos SET ${updates.join(", ")} WHERE id = ?`, values);
      }

      const [row] = await query("SELECT id, title, duration, url, active FROM videos WHERE id = ?", [id]);
      return Response.json({ ...row, active: !!row.active });
    }

    const { active } = await request.json();
    await query("UPDATE videos SET active = ? WHERE id = ?", [active ? 1 : 0, id]);
    return Response.json({ id: Number(id), active });
  } catch (err) {
    console.error("Video update failed:", err);
    return Response.json({ error: `Update failed: ${err.message}` }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await query("UPDATE videos SET deleted_at = NOW() WHERE id = ?", [id]);
    return Response.json({ id: Number(id), deleted: true });
  } catch (err) {
    console.error("Video delete failed:", err);
    return Response.json({ error: `Delete failed: ${err.message}` }, { status: 500 });
  }
}
