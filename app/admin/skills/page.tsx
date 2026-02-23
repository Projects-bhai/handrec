"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Save,
} from "lucide-react";

interface SkillItem {
  name: string;
  proficiency: number;
}

interface SkillCategory {
  id: string;
  category: string;
  items: SkillItem[];
  order: number;
}

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SkillCategory | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Form state
  const [categoryName, setCategoryName] = useState("");
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillProf, setNewSkillProf] = useState(80);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "skills"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setCategories(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }) as SkillCategory)
      );
    } catch {
      try {
        const snap = await getDocs(collection(db, "skills"));
        setCategories(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as SkillCategory)
        );
      } catch {
        setCategories([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openEditor = (cat?: SkillCategory) => {
    if (cat) {
      setEditing(cat);
      setCategoryName(cat.category);
      setSkills([...cat.items]);
      setIsNew(false);
    } else {
      setEditing(null);
      setCategoryName("");
      setSkills([]);
      setIsNew(true);
    }
  };

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    setSkills((prev) => [
      ...prev,
      { name: newSkillName.trim(), proficiency: newSkillProf },
    ]);
    setNewSkillName("");
    setNewSkillProf(80);
  };

  const removeSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const id = editing?.id || `skills_${Date.now()}`;
    await setDoc(doc(db, "skills", id), {
      category: categoryName,
      items: skills,
      order: isNew ? categories.length : (editing?.order ?? 0),
    });
    setEditing(null);
    setIsNew(false);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "skills", id));
    await loadData();
  };

  if (editing || isNew) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold text-foreground">
          {isNew ? "Add Skill Category" : "Edit Skill Category"}
        </h1>
        <div
          className="glass rounded-xl p-6"
          style={{ boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)" }}
        >
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Category Name <span style={{ color: "var(--neon-cyan)" }}>*</span>
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Frontend"
              className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none"
              style={{
                background: "rgba(0,240,255,0.04)",
                border: "1px solid rgba(0,240,255,0.1)",
              }}
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Skills
            </label>
            <div className="flex flex-col gap-2 mb-3">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg px-3 py-2"
                  style={{
                    background: "rgba(0,240,255,0.04)",
                    border: "1px solid rgba(0,240,255,0.06)",
                  }}
                >
                  <span className="flex-1 text-sm text-foreground">
                    {skill.name}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--neon-cyan)" }}
                  >
                    {skill.proficiency}%
                  </span>
                  <button
                    onClick={() => removeSkill(i)}
                    className="text-muted-foreground hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Skill name"
                className="flex-1 rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none"
                style={{
                  background: "rgba(0,240,255,0.04)",
                  border: "1px solid rgba(0,240,255,0.1)",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <input
                type="number"
                min={0}
                max={100}
                value={newSkillProf}
                onChange={(e) => setNewSkillProf(parseInt(e.target.value) || 0)}
                className="w-20 rounded-lg px-3 py-2 text-sm text-foreground outline-none"
                style={{
                  background: "rgba(0,240,255,0.04)",
                  border: "1px solid rgba(0,240,255,0.1)",
                }}
              />
              <button
                onClick={addSkill}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium"
                style={{
                  color: "var(--neon-cyan)",
                  background: "rgba(0,240,255,0.08)",
                  border: "1px solid rgba(0,240,255,0.15)",
                }}
              >
                <Plus size={14} />
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                setEditing(null);
                setIsNew(false);
              }}
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-muted-foreground"
              style={{
                background: "rgba(0,240,255,0.04)",
                border: "1px solid rgba(0,240,255,0.1)",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium"
              style={{
                background: "var(--neon-cyan)",
                color: "var(--primary-foreground)",
              }}
            >
              <Save size={14} />
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Skills</h1>
        <button
          onClick={() => openEditor()}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
          style={{
            background: "var(--neon-cyan)",
            color: "var(--primary-foreground)",
          }}
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2
            size={24}
            className="animate-spin"
            style={{ color: "var(--neon-cyan)" }}
          />
        </div>
      ) : categories.length === 0 ? (
        <div
          className="glass flex flex-col items-center gap-3 rounded-xl py-16 text-center"
          style={{ boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)" }}
        >
          <p className="text-muted-foreground">
            No skill categories yet. Click "Add Category" to get started.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="glass flex items-center justify-between rounded-xl px-5 py-4"
              style={{ boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)" }}
            >
              <div>
                <p className="font-medium text-foreground">{cat.category}</p>
                <p className="text-xs text-muted-foreground">
                  {cat.items.length} skills
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditor(cat)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
                  style={{ background: "rgba(0,240,255,0.05)" }}
                  aria-label="Edit category"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-red-400"
                  style={{ background: "rgba(239,68,68,0.05)" }}
                  aria-label="Delete category"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
