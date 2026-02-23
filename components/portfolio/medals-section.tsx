"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { MedalItem } from "@/lib/types";
import { Trophy } from "lucide-react";

const MedalCoin = dynamic(() => import("@/components/three/medal-coin"), {
  ssr: false,
  loading: () => (
    <div className="flex h-40 w-40 items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-transparent"
        style={{ borderTopColor: "var(--neon-cyan)" }}
      />
    </div>
  ),
});

interface MedalsSectionProps {
  data: MedalItem[];
}

export default function MedalsSection({ data }: MedalsSectionProps) {
  return (
    <section
      id="medals"
      className="relative py-24 md:py-32"
      style={{ background: "#0d0d14" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span
            className="mb-3 inline-block font-mono text-sm tracking-wider"
            style={{ color: "var(--neon-cyan)" }}
          >
            {"// 06. Achievements"}
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Medals & Badges
          </h2>
          <p className="mt-3 text-muted-foreground">
            Competitive programming achievements across platforms
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((medal, i) => (
            <motion.div
              key={medal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass group flex flex-col items-center rounded-xl p-6 text-center transition-all"
              style={{
                boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)",
              }}
            >
              {/* 3D Coin */}
              <div className="mb-4 h-40 w-40">
                <MedalCoin
                  platform={medal.platform}
                  color={medal.color}
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Trophy size={16} style={{ color: medal.color }} />
                <h3
                  className="text-lg font-bold"
                  style={{ color: medal.color }}
                >
                  {medal.platform}
                </h3>
              </div>
              <p className="mb-2 font-medium text-foreground">
                {medal.achievement}
              </p>
              <p className="text-sm text-muted-foreground">
                {medal.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
