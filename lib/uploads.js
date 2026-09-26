import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

export async function saveUploadedFile(file, subdir) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name || "");
  const filename = `${crypto.randomUUID()}${ext}`;
  const dir = path.join(UPLOAD_ROOT, subdir);

  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);

  return `/uploads/${subdir}/${filename}`;
}

export async function deleteUploadedFile(url) {
  if (!url || !url.startsWith("/uploads/")) return;
  try {
    await unlink(path.join(process.cwd(), "public", url));
  } catch {
    // already gone - ignore
  }
}
