"use client";

import { motion } from "framer-motion";
import type { ExperienceItem } from "@/lib/types";
import { Briefcase } from "lucide-react";

interface ExperienceSectionProps {
  data: ExperienceItem[];
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="relative py-24 md:py-32"
      style={{ background: "var(--background)" }}
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
            {"// 03. Experience"}
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Work Experience
          </h2>
        </motion.div>

        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {data.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass group rounded-xl p-6 transition-all hover:border-[rgba(0,240,255,0.2)]"
              style={{
                boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)",
              }}
            >
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "rgba(0,240,255,0.1)" }}
                  >
                    <Briefcase
                      size={18}
                      style={{ color: "var(--neon-cyan)" }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {item.role}
                    </h3>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--neon-purple)" }}
                    >
                      {item.company}
                    </p>
                  </div>
                </div>
                <span
                  className="font-mono text-xs tracking-wider"
                  style={{ color: "var(--neon-cyan)" }}
                >
                  {item.period}
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md px-2.5 py-1 font-mono text-xs"
                    style={{
                      color: "var(--neon-cyan)",
                      background: "rgba(0,240,255,0.06)",
                      border: "1px solid rgba(0,240,255,0.1)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
