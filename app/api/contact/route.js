import { query } from "@/lib/db";

export async function POST(request) {
  const { name, email, interest, message } = await request.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  await query(
    "INSERT INTO messages (sender_name, email, subject, body, is_read) VALUES (?, ?, ?, ?, 0)",
    [name.trim(), email.trim(), interest?.trim() || "General enquiry", message.trim()]
  );

  return Response.json({ ok: true }, { status: 201 });
}
