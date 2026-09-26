import { query } from "@/lib/db";
import { saveUploadedFile } from "@/lib/uploads";

export async function GET() {
  const rows = await query(
    "SELECT id, title, category, url, active FROM images WHERE deleted_at IS NULL ORDER BY id"
  );
  return Response.json(rows.map((img) => ({ ...img, active: !!img.active })));
}

export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const file = formData.get("file");

  if (!title || !category || !(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Title, category, and an image file are required." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "File must be an image." }, { status: 400 });
  }

  const url = await saveUploadedFile(file, "images");
  const result = await query(
    "INSERT INTO images (title, category, url, active) VALUES (?, ?, ?, 1)",
    [title, category, url]
  );

  return Response.json({ id: result.insertId, title, category, url, active: true }, { status: 201 });
}
