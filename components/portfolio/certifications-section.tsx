"use client";

import { motion } from "framer-motion";
import type { CertificationItem } from "@/lib/types";
import { Award, ExternalLink } from "lucide-react";

interface CertificationsSectionProps {
  data: CertificationItem[];
}

export default function CertificationsSection({ data }: CertificationsSectionProps) {
  return (
    <section
      id="certifications"
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
            {"// 07. Certifications"}
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Credentials
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass group rounded-xl p-5 transition-all"
              style={{
                boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)",
              }}
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "rgba(139,92,246,0.1)" }}
              >
                <Award
                  size={20}
                  style={{ color: "var(--neon-purple)" }}
                />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                {cert.title}
              </h3>
              <p className="mb-1 text-xs text-muted-foreground">{cert.issuer}</p>
              <p
                className="mb-3 font-mono text-xs"
                style={{ color: "var(--neon-cyan)" }}
              >
                {cert.date}
              </p>
              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={`View ${cert.title} credential`}
                >
                  <ExternalLink size={12} />
                  View Credential
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
