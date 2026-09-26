import { query } from "@/lib/db";
import { saveUploadedFile } from "@/lib/uploads";

export async function GET() {
  const rows = await query(
    "SELECT id, title, duration, url, active FROM videos WHERE deleted_at IS NULL ORDER BY id"
  );
  return Response.json(rows.map((v) => ({ ...v, active: !!v.active })));
}

export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get("title")?.toString().trim();
  const duration = formData.get("duration")?.toString().trim();
  const file = formData.get("file");

  if (!title || !duration || !(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Title, duration, and a video file are required." }, { status: 400 });
  }
  if (!file.type.startsWith("video/")) {
    return Response.json({ error: "File must be a video." }, { status: 400 });
  }

  const url = await saveUploadedFile(file, "videos");
  const result = await query(
    "INSERT INTO videos (title, duration, url, active) VALUES (?, ?, ?, 1)",
    [title, duration, url]
  );

  return Response.json({ id: result.insertId, title, duration, url, active: true }, { status: 201 });
}
