import { getStore } from "@netlify/blobs";
import crypto from "crypto";
import path from "path";

function uploadsStore() {
  return getStore("uploads");
}

export async function saveUploadedFile(file, subdir) {
  const ext = path.extname(file.name || "");
  const filename = `${crypto.randomUUID()}${ext}`;
  const key = `${subdir}/${filename}`;

  const bytes = Buffer.from(await file.arrayBuffer());
  await uploadsStore().set(key, bytes, { metadata: { contentType: file.type } });

  return `/api/uploads/${key}`;
}

export async function deleteUploadedFile(url) {
  if (!url || !url.startsWith("/api/uploads/")) return;
  const key = url.replace("/api/uploads/", "");
  try {
    await uploadsStore().delete(key);
  } catch {
    // already gone - ignore
  }
}
