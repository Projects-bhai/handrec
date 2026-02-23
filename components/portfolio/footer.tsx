"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-8"
      style={{
        background: "var(--background)",
        borderTop: "1px solid rgba(0,240,255,0.06)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <a
            href="#hero"
            className="font-mono text-sm font-bold tracking-wider"
            style={{ color: "var(--neon-cyan)" }}
          >
            {"<SC />"}
          </a>
          <p className="text-sm text-muted-foreground">
            {`Designed & Built by Satyam Chandra | ${year}`}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with Next.js, React Three Fiber & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
