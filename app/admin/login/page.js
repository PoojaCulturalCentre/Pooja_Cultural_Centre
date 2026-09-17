"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(username.trim(), password);
    if (ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <main className="min-h-screen bg-radial-maroon flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm bg-cream rounded-2xl shadow-card p-8">
        <Link href="/" className="flex items-center gap-2 mb-6 w-fit">
          <span className="text-gold text-xl">✦</span>
          <span className="font-heading font-bold text-lg text-maroon-dark">
            Pooja <em className="text-gold not-italic italic">Cultural Centre</em>
          </span>
        </Link>

        <h1 className="font-heading font-bold text-2xl text-maroon-dark mb-1">Admin Login</h1>
        <p className="text-ink/60 text-sm mb-6">Sign in to manage the academy.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="w-full rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {error && <p className="text-maroon text-xs font-medium">{error}</p>}

          <button type="submit" className="btn btn-gold mt-2">
            Log In
          </button>
        </form>

        <p className="text-ink/40 text-[0.7rem] text-center mt-6">
          Demo credentials — username: <span className="font-semibold">pooja</span>, password:{" "}
          <span className="font-semibold">qwerty</span>
        </p>
      </div>
    </main>
  );
}
