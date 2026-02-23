"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { ProjectItem } from "@/lib/types";
import { ExternalLink, Github, Star } from "lucide-react";

interface ProjectsSectionProps {
  data: ProjectItem[];
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 15);
    setRotateY((centerX - x) / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card group"
      style={{
        transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <div
        className="glass relative flex h-full flex-col overflow-hidden rounded-xl transition-all"
        style={{
          boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)",
          borderColor: "rgba(0,240,255,0.08)",
        }}
      >
        {project.featured && (
          <div
            className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
            style={{
              color: "var(--neon-cyan)",
              background: "rgba(0,240,255,0.1)",
              border: "1px solid rgba(0,240,255,0.2)",
            }}
          >
            <Star size={12} fill="currentColor" />
            Featured
          </div>
        )}

        {/* Image placeholder - shows gradient when no image */}
        <div
          className="relative h-48 w-full"
          style={{
            background: project.imageUrl
              ? `url(${project.imageUrl}) center/cover`
              : `linear-gradient(135deg, rgba(0,240,255,0.1) 0%, rgba(139,92,246,0.1) 100%)`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, var(--glass-bg) 100%)",
            }}
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded px-2 py-0.5 font-mono text-[10px] font-medium"
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

          <div className="flex items-center gap-3">
            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github size={16} />
                Code
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: "var(--neon-cyan)" }}
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
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
            {"// 05. Projects"}
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Featured Work
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {data.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
