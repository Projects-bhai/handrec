"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--background)" }}
    >
      <div
        className="glass w-full max-w-md rounded-2xl p-8"
        style={{
          boxShadow: "0 0 40px rgba(0,240,255,0.08)",
          border: "1px solid rgba(0,240,255,0.1)",
        }}
      >
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
            style={{ background: "rgba(0,240,255,0.1)" }}
          >
            <Lock size={24} style={{ color: "var(--neon-cyan)" }} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage your portfolio
          </p>
        </div>

        {error && (
          <div
            className="mb-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#fca5a5",
            }}
          >
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-sm text-muted-foreground"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:ring-1"
                style={{
                  background: "rgba(0,240,255,0.04)",
                  border: "1px solid rgba(0,240,255,0.1)",
                }}
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-sm text-muted-foreground"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:ring-1"
                style={{
                  background: "rgba(0,240,255,0.04)",
                  border: "1px solid rgba(0,240,255,0.1)",
                }}
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg py-3 font-medium transition-all disabled:opacity-60"
            style={{
              background: "var(--neon-cyan)",
              color: "var(--primary-foreground)",
              boxShadow: "var(--neon-cyan-glow)",
            }}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
