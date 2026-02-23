"use client";

import { motion } from "framer-motion";
import type { AboutData } from "@/lib/types";
import { User, Zap, Code2, Globe } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Clean Code" },
  { icon: Zap, label: "Fast Learner" },
  { icon: Globe, label: "Open Source" },
  { icon: User, label: "Team Player" },
];

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-24 md:py-32" style={{ background: "var(--background)" }}>
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
            {"// 01. About Me"}
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Get To Know Me
          </h2>
        </motion.div>

        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
          {/* Left side - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <p className="mb-6 leading-relaxed text-muted-foreground md:text-lg">
              {data.bio}
            </p>
            <ul className="flex flex-col gap-3">
              {data.details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--neon-cyan)" }}
                  />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right side - Highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid w-full grid-cols-2 gap-4 lg:w-auto lg:shrink-0"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass flex flex-col items-center gap-3 rounded-xl p-6 text-center transition-all"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)",
                }}
              >
                <item.icon
                  size={28}
                  style={{ color: "var(--neon-cyan)" }}
                />
                <span className="text-sm font-medium text-foreground">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
