"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { HeroData } from "@/lib/types";
import { ArrowDown, FileText } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-16 w-16 animate-spin rounded-full border-2 border-transparent"
        style={{ borderTopColor: "var(--neon-cyan)" }}
      />
    </div>
  ),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface HeroSectionProps {
  data: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Grid overlay */}
      <div className="bg-grid-pattern absolute inset-0 z-[1]" />

      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0,240,255,0.05) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span
              className="inline-block rounded-full px-4 py-1.5 font-mono text-xs font-medium tracking-wider"
              style={{
                color: "var(--neon-cyan)",
                background: "rgba(0, 240, 255, 0.08)",
                border: "1px solid rgba(0, 240, 255, 0.15)",
              }}
            >
              {"// Available for opportunities"}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-4 text-balance text-5xl font-bold leading-tight tracking-tight md:text-7xl"
          >
            <span className="text-foreground">{"Hi, I'm "}</span>
            <span
              className="neon-text"
              style={{ color: "var(--neon-cyan)" }}
            >
              {data.title}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-3 text-lg font-medium md:text-xl"
            style={{ color: "var(--neon-purple)" }}
          >
            {data.subtitle}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-lg"
          >
            {data.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a
              href={data.ctaLink}
              className="group inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-[var(--primary-foreground)] transition-all"
              style={{
                background: "var(--neon-cyan)",
                boxShadow: "0 0 20px rgba(0,240,255,0.3)",
              }}
            >
              {data.ctaText}
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
            {data.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all"
                style={{
                  color: "var(--neon-cyan)",
                  border: "1px solid rgba(0, 240, 255, 0.3)",
                  background: "rgba(0, 240, 255, 0.05)",
                }}
              >
                <FileText size={16} />
                Resume
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div
          className="flex h-10 w-6 items-start justify-center rounded-full p-1"
          style={{ border: "1px solid rgba(0, 240, 255, 0.3)" }}
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2 w-1 rounded-full"
            style={{ background: "var(--neon-cyan)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
