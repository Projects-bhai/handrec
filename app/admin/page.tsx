"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Award,
  Trophy,
  Wrench,
} from "lucide-react";

const collectionStats = [
  { name: "Education", collection: "education", icon: GraduationCap, color: "#00f0ff" },
  { name: "Experience", collection: "experience", icon: Briefcase, color: "#8b5cf6" },
  { name: "Skills", collection: "skills", icon: Wrench, color: "#06b6d4" },
  { name: "Projects", collection: "projects", icon: FolderOpen, color: "#22c55e" },
  { name: "Certifications", collection: "certifications", icon: Award, color: "#f59e0b" },
  { name: "Medals", collection: "medals", icon: Trophy, color: "#ec4899" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadStats() {
      const results: Record<string, number> = {};
      for (const stat of collectionStats) {
        try {
          const snap = await getDocs(collection(db, stat.collection));
          results[stat.collection] = snap.size;
        } catch {
          results[stat.collection] = 0;
        }
      }
      setStats(results);
    }
    loadStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles size={24} style={{ color: "var(--neon-cyan)" }} />
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Manage your portfolio content from here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collectionStats.map((stat) => (
          <a
            key={stat.collection}
            href={`/admin/${stat.collection}`}
            className="glass group rounded-xl p-5 transition-all hover:border-[rgba(0,240,255,0.2)]"
            style={{
              boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <span
                className="font-mono text-2xl font-bold"
                style={{ color: stat.color }}
              >
                {stats[stat.collection] ?? "-"}
              </span>
            </div>
            <h3 className="text-sm font-medium text-foreground">
              {stat.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {stats[stat.collection] === 1
                ? "1 item"
                : `${stats[stat.collection] ?? 0} items`}
            </p>
          </a>
        ))}
      </div>

      <div
        className="glass mt-8 rounded-xl p-6"
        style={{
          boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)",
        }}
      >
        <h2 className="mb-2 text-lg font-semibold text-foreground">
          Quick Start Guide
        </h2>
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li>
            {"1. Use the sidebar to navigate to each section's editor."}
          </li>
          <li>
            {"2. Add, edit, or delete items for each portfolio section."}
          </li>
          <li>
            {"3. Changes reflect on the public portfolio in real-time."}
          </li>
          <li>
            {"4. Upload images via the media upload fields in each editor."}
          </li>
          <li>
            {"5. Configure the AI Chatbot context from the Chatbot page."}
          </li>
        </ul>
      </div>
    </div>
  );
}
