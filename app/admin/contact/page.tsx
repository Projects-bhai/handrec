"use client";

import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Check, Save } from "lucide-react";

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [codechef, setCodechef] = useState("");
  const [codeforces, setCodeforces] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, "contact", "main"));
      if (snap.exists()) {
        const d = snap.data();
        setEmail(d.email || "");
        setPhone(d.phone || "");
        setLocation(d.location || "");
        setGithub(d.socials?.github || "");
        setLinkedin(d.socials?.linkedin || "");
        setTwitter(d.socials?.twitter || "");
        setLeetcode(d.socials?.leetcode || "");
        setCodechef(d.socials?.codechef || "");
        setCodeforces(d.socials?.codeforces || "");
      }
    } catch {
      // empty
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(
      doc(db, "contact", "main"),
      {
        email,
        phone,
        location,
        socials: { github, linkedin, twitter, leetcode, codechef, codeforces },
      },
      { merge: true }
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = {
    background: "rgba(0,240,255,0.04)",
    border: "1px solid rgba(0,240,255,0.1)",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2
          size={24}
          className="animate-spin"
          style={{ color: "var(--neon-cyan)" }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold text-foreground">Contact Info</h1>
        {saved && (
          <span
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              color: "#22c55e",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <Check size={12} />
            Saved
          </span>
        )}
      </div>

      <form
        onSubmit={handleSave}
        className="glass rounded-xl p-6"
        style={{ boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)" }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground outline-none" style={inputStyle} placeholder="you@email.com" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground outline-none" style={inputStyle} placeholder="+91-XXXXXXXXXX" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground outline-none" style={inputStyle} placeholder="City, Country" />
          </div>
        </div>

        <h3 className="mt-6 mb-3 text-sm font-medium" style={{ color: "var(--neon-purple)" }}>
          Social Profiles
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs text-muted-foreground">GitHub</label>
            <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground outline-none" style={inputStyle} placeholder="https://github.com/..." />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-muted-foreground">LinkedIn</label>
            <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground outline-none" style={inputStyle} placeholder="https://linkedin.com/in/..." />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-muted-foreground">Twitter / X</label>
            <input type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground outline-none" style={inputStyle} placeholder="https://twitter.com/..." />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-muted-foreground">LeetCode</label>
            <input type="url" value={leetcode} onChange={(e) => setLeetcode(e.target.value)} className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground outline-none" style={inputStyle} placeholder="https://leetcode.com/..." />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-muted-foreground">CodeChef</label>
            <input type="url" value={codechef} onChange={(e) => setCodechef(e.target.value)} className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground outline-none" style={inputStyle} placeholder="https://codechef.com/users/..." />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-muted-foreground">Codeforces</label>
            <input type="url" value={codeforces} onChange={(e) => setCodeforces(e.target.value)} className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground outline-none" style={inputStyle} placeholder="https://codeforces.com/profile/..." />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium disabled:opacity-60"
            style={{
              background: "var(--neon-cyan)",
              color: "var(--primary-foreground)",
            }}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
