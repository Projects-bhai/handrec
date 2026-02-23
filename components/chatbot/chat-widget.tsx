"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import type { ChatMessage } from "@/lib/types";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Satyam's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].filter(
            (m) => m.role === "user" || m.role === "assistant"
          ),
        }),
      });

      const data = await res.json();
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again later.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass mb-4 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl"
            style={{
              boxShadow:
                "0 0 30px rgba(0,240,255,0.1), 0 20px 60px rgba(0,0,0,0.5)",
              border: "1px solid rgba(0,240,255,0.15)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "rgba(0,240,255,0.05)",
                borderBottom: "1px solid rgba(0,240,255,0.1)",
              }}
            >
              <div className="flex items-center gap-2">
                <Bot size={18} style={{ color: "var(--neon-cyan)" }} />
                <span className="text-sm font-semibold text-foreground">
                  AI Assistant
                </span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: "#22c55e",
                    boxShadow: "0 0 6px rgba(34,197,94,0.5)",
                  }}
                />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background:
                          msg.role === "user"
                            ? "rgba(139,92,246,0.15)"
                            : "rgba(0,240,255,0.1)",
                      }}
                    >
                      {msg.role === "user" ? (
                        <User size={14} style={{ color: "var(--neon-purple)" }} />
                      ) : (
                        <Bot size={14} style={{ color: "var(--neon-cyan)" }} />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "text-foreground"
                          : "text-foreground"
                      }`}
                      style={{
                        background:
                          msg.role === "user"
                            ? "rgba(139,92,246,0.12)"
                            : "rgba(0,240,255,0.06)",
                        border: `1px solid ${
                          msg.role === "user"
                            ? "rgba(139,92,246,0.15)"
                            : "rgba(0,240,255,0.08)"
                        }`,
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "rgba(0,240,255,0.1)" }}
                    >
                      <Bot size={14} style={{ color: "var(--neon-cyan)" }} />
                    </div>
                    <div
                      className="flex items-center gap-1 rounded-xl px-3.5 py-2.5"
                      style={{
                        background: "rgba(0,240,255,0.06)",
                        border: "1px solid rgba(0,240,255,0.08)",
                      }}
                    >
                      <Loader2
                        size={14}
                        className="animate-spin"
                        style={{ color: "var(--neon-cyan)" }}
                      />
                      <span className="text-xs text-muted-foreground">
                        Thinking...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div
              className="p-3"
              style={{ borderTop: "1px solid rgba(0,240,255,0.1)" }}
            >
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "rgba(0,240,255,0.04)",
                  border: "1px solid rgba(0,240,255,0.1)",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all disabled:opacity-30"
                  style={{
                    background: "var(--neon-cyan)",
                    color: "var(--primary-foreground)",
                  }}
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full transition-all"
        style={{
          background: isOpen
            ? "var(--neon-purple)"
            : "var(--neon-cyan)",
          boxShadow: isOpen
            ? "var(--neon-purple-glow)"
            : "var(--neon-cyan-glow)",
          color: "var(--primary-foreground)",
        }}
        aria-label={isOpen ? "Close chat" : "Open AI assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
