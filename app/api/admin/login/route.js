import bcrypt from "bcryptjs";
import { query } from "@/lib/db";

export async function POST(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return Response.json({ error: "Username and password are required." }, { status: 400 });
  }

  const rows = await query(
    "SELECT id, username, password_hash, name FROM admin_users WHERE username = ?",
    [username]
  );

  const admin = rows[0];
  if (!admin) {
    return Response.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    return Response.json({ error: "Invalid username or password." }, { status: 401 });
  }

  return Response.json({ username: admin.username, name: admin.name });
}
