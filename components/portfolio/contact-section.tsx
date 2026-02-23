"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ContactData } from "@/lib/types";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send } from "lucide-react";

interface ContactSectionProps {
  data: ContactData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens mailto link as a simple contact method
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.open(`mailto:${data.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const socialIcons: Record<string, React.ReactNode> = {
    github: <Github size={20} />,
    linkedin: <Linkedin size={20} />,
    twitter: <Twitter size={20} />,
  };

  return (
    <section
      id="contact"
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
            {"// 08. Contact"}
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            {"Let's Connect"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have a project in mind or just want to chat? Reach out!
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "rgba(0,240,255,0.1)" }}
              >
                <Mail size={20} style={{ color: "var(--neon-cyan)" }} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a
                  href={`mailto:${data.email}`}
                  className="text-foreground transition-colors hover:text-[var(--neon-cyan)]"
                >
                  {data.email}
                </a>
              </div>
            </div>

            {data.phone && (
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "rgba(0,240,255,0.1)" }}
                >
                  <Phone size={20} style={{ color: "var(--neon-cyan)" }} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground">{data.phone}</p>
                </div>
              </div>
            )}

            {data.location && (
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "rgba(0,240,255,0.1)" }}
                >
                  <MapPin size={20} style={{ color: "var(--neon-cyan)" }} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground">{data.location}</p>
                </div>
              </div>
            )}

            {/* Social links */}
            <div className="mt-4 flex gap-3">
              {Object.entries(data.socials).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-[var(--neon-cyan)]"
                    style={{
                      background: "rgba(0,240,255,0.05)",
                      border: "1px solid rgba(0,240,255,0.1)",
                    }}
                    aria-label={`Visit ${platform} profile`}
                  >
                    {socialIcons[platform] || (
                      <span className="text-xs font-mono uppercase">
                        {platform.slice(0, 2)}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="glass flex flex-col gap-4 rounded-xl p-6"
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-muted-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:ring-1"
                style={{
                  background: "rgba(0,240,255,0.04)",
                  border: "1px solid rgba(0,240,255,0.1)",
                }}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:ring-1"
                style={{
                  background: "rgba(0,240,255,0.04)",
                  border: "1px solid rgba(0,240,255,0.1)",
                }}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                className="w-full resize-none rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:ring-1"
                style={{
                  background: "rgba(0,240,255,0.04)",
                  border: "1px solid rgba(0,240,255,0.1)",
                }}
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all"
              style={{
                color: "var(--primary-foreground)",
                background: sent
                  ? "var(--neon-purple)"
                  : "var(--neon-cyan)",
                boxShadow: sent
                  ? "var(--neon-purple-glow)"
                  : "var(--neon-cyan-glow)",
              }}
            >
              <Send size={16} />
              {sent ? "Message Sent!" : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
