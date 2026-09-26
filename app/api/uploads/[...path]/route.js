import { getStore } from "@netlify/blobs";

export async function GET(request, { params }) {
  const { path } = await params;
  const key = path.join("/");

  const store = getStore("uploads");
  const result = await store.getWithMetadata(key, { type: "arrayBuffer" });

  if (!result) {
    return new Response("Not found", { status: 404 });
  }

  const { data, metadata } = result;
  return new Response(data, {
    headers: {
      "Content-Type": metadata?.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
