"use client";

import { useState } from "react";
import { Loader2, X, Plus } from "lucide-react";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "url" | "tags" | "toggle";
  placeholder?: string;
  required?: boolean;
}

interface CrudFormProps {
  fields: FieldConfig[];
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export default function CrudForm({
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: CrudFormProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(
    () => {
      const data: Record<string, unknown> = {};
      for (const field of fields) {
        if (field.type === "tags") {
          data[field.name] = initialData[field.name] || [];
        } else if (field.type === "toggle") {
          data[field.name] = initialData[field.name] || false;
        } else if (field.type === "number") {
          data[field.name] = initialData[field.name] ?? 0;
        } else {
          data[field.name] = initialData[field.name] || "";
        }
      }
      return data;
    }
  );
  const [tagInput, setTagInput] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = (fieldName: string) => {
    const tag = tagInput[fieldName]?.trim();
    if (!tag) return;
    const current = (formData[fieldName] as string[]) || [];
    if (!current.includes(tag)) {
      handleChange(fieldName, [...current, tag]);
    }
    setTagInput((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const removeTag = (fieldName: string, tag: string) => {
    const current = (formData[fieldName] as string[]) || [];
    handleChange(
      fieldName,
      current.filter((t) => t !== tag)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {field.label}
            {field.required && (
              <span style={{ color: "var(--neon-cyan)" }}> *</span>
            )}
          </label>

          {field.type === "text" || field.type === "url" ? (
            <input
              type={field.type}
              required={field.required}
              value={(formData[field.name] as string) || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:ring-1"
              style={{
                background: "rgba(0,240,255,0.04)",
                border: "1px solid rgba(0,240,255,0.1)",
              }}
            />
          ) : field.type === "textarea" ? (
            <textarea
              required={field.required}
              rows={4}
              value={(formData[field.name] as string) || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="w-full resize-none rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:ring-1"
              style={{
                background: "rgba(0,240,255,0.04)",
                border: "1px solid rgba(0,240,255,0.1)",
              }}
            />
          ) : field.type === "number" ? (
            <input
              type="number"
              required={field.required}
              value={(formData[field.name] as number) ?? 0}
              onChange={(e) =>
                handleChange(field.name, parseInt(e.target.value) || 0)
              }
              className="w-full rounded-lg px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:ring-1"
              style={{
                background: "rgba(0,240,255,0.04)",
                border: "1px solid rgba(0,240,255,0.1)",
              }}
            />
          ) : field.type === "toggle" ? (
            <button
              type="button"
              onClick={() =>
                handleChange(field.name, !formData[field.name])
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                formData[field.name] ? "" : ""
              }`}
              style={{
                background: formData[field.name]
                  ? "var(--neon-cyan)"
                  : "rgba(0,240,255,0.1)",
              }}
            >
              <span
                className={`block h-5 w-5 rounded-full transition-transform ${
                  formData[field.name]
                    ? "translate-x-5"
                    : "translate-x-0.5"
                }`}
                style={{
                  background: formData[field.name]
                    ? "var(--primary-foreground)"
                    : "var(--muted-foreground)",
                }}
              />
            </button>
          ) : field.type === "tags" ? (
            <div>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {((formData[field.name] as string[]) || []).map(
                  (tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-xs"
                      style={{
                        color: "var(--neon-cyan)",
                        background: "rgba(0,240,255,0.06)",
                        border: "1px solid rgba(0,240,255,0.1)",
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(field.name, tag)}
                        className="ml-0.5 text-muted-foreground hover:text-foreground"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput[field.name] || ""}
                  onChange={(e) =>
                    setTagInput((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag(field.name);
                    }
                  }}
                  placeholder={field.placeholder || "Add tag..."}
                  className="flex-1 rounded-lg px-4 py-2 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:ring-1"
                  style={{
                    background: "rgba(0,240,255,0.04)",
                    border: "1px solid rgba(0,240,255,0.1)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => addTag(field.name)}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all"
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
          ) : null}
        </div>
      ))}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground"
          style={{
            background: "rgba(0,240,255,0.04)",
            border: "1px solid rgba(0,240,255,0.1)",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-60"
          style={{
            background: "var(--neon-cyan)",
            color: "var(--primary-foreground)",
          }}
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
