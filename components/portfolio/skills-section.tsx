"use client";

import { motion } from "framer-motion";
import type { SkillCategory } from "@/lib/types";

interface SkillsSectionProps {
  data: SkillCategory[];
}

function SkillBar({ name, proficiency, delay }: { name: string; proficiency: number; delay: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">{name}</span>
        <span
          className="font-mono text-xs"
          style={{ color: "var(--neon-cyan)" }}
        >
          {proficiency}%
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ background: "rgba(0,240,255,0.06)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))`,
            boxShadow: "0 0 8px rgba(0,240,255,0.3)",
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  return (
    <section
      id="skills"
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
            {"// 04. Skills"}
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Technical Arsenal
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {data.map((category, ci) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="glass rounded-xl p-6"
              style={{
                boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)",
              }}
            >
              <h3
                className="mb-5 font-mono text-sm font-medium tracking-wider"
                style={{ color: "var(--neon-purple)" }}
              >
                {category.category}
              </h3>
              <div className="flex flex-col gap-4">
                {category.items.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    proficiency={skill.proficiency}
                    delay={0.2 + si * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
