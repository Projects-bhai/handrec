"use client";

import { motion } from "framer-motion";
import type { EducationItem } from "@/lib/types";
import { GraduationCap } from "lucide-react";

interface EducationSectionProps {
  data: EducationItem[];
}

export default function EducationSection({ data }: EducationSectionProps) {
  return (
    <section
      id="education"
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
            {"// 02. Education"}
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Academic Journey
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div
            className="absolute left-8 top-0 h-full w-[2px] md:left-1/2 md:-translate-x-[1px]"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--neon-cyan), transparent)",
            }}
          />

          <div className="flex flex-col gap-12">
            {data.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start gap-8 md:items-center`}
              >
                {/* Dot */}
                <div
                  className="absolute left-8 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full md:left-1/2"
                  style={{
                    background: "var(--neon-cyan)",
                    boxShadow: "0 0 12px rgba(0,240,255,0.5)",
                  }}
                />

                {/* Card */}
                <div
                  className={`ml-16 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div
                    className="glass rounded-xl p-6"
                    style={{
                      boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)",
                    }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <GraduationCap
                        size={18}
                        style={{ color: "var(--neon-cyan)" }}
                      />
                      <span
                        className="font-mono text-xs tracking-wider"
                        style={{ color: "var(--neon-cyan)" }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-foreground">
                      {item.institution}
                    </h3>
                    <p
                      className="mb-2 text-sm font-medium"
                      style={{ color: "var(--neon-purple)" }}
                    >
                      {item.degree}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    {item.grade && (
                      <div
                        className="mt-3 inline-block rounded-md px-3 py-1 font-mono text-xs font-medium"
                        style={{
                          color: "var(--neon-cyan)",
                          background: "rgba(0,240,255,0.08)",
                        }}
                      >
                        {item.grade}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
