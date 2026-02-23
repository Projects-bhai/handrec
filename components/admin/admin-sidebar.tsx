"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard,
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  FolderOpen,
  Award,
  Trophy,
  Mail,
  Bot,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/hero", icon: Sparkles },
  { label: "About", href: "/admin/about", icon: User },
  { label: "Education", href: "/admin/education", icon: GraduationCap },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Certifications", href: "/admin/certifications", icon: Award },
  { label: "Medals", href: "/admin/medals", icon: Trophy },
  { label: "Contact", href: "/admin/contact", icon: Mail },
  { label: "Chatbot", href: "/admin/chatbot", icon: Bot },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
      style={{
        background: "#0d0d14",
        borderRight: "1px solid rgba(0,240,255,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          <span
            className="font-mono text-sm font-bold tracking-wider"
            style={{ color: "var(--neon-cyan)" }}
          >
            {"<Admin />"}
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "text-[var(--neon-cyan)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={
                  isActive
                    ? {
                        background: "rgba(0,240,255,0.08)",
                        boxShadow: "inset 0 0 0 1px rgba(0,240,255,0.1)",
                      }
                    : { background: "transparent" }
                }
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4">
        <a
          href="/"
          className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          title={collapsed ? "View Portfolio" : undefined}
        >
          <ChevronLeft size={18} className="shrink-0" />
          {!collapsed && <span>View Portfolio</span>}
        </a>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-red-400"
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
