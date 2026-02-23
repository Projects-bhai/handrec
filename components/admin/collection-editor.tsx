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
import CrudForm, { type FieldConfig } from "./crud-form";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface CollectionEditorProps {
  collectionName: string;
  title: string;
  fields: FieldConfig[];
  displayField?: string;
}

export default function CollectionEditor({
  collectionName,
  title,
  fields,
  displayField = "title",
}: CollectionEditorProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      let q;
      try {
        q = query(collection(db, collectionName), orderBy("order", "asc"));
        const snap = await getDocs(q);
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        q = collection(db, collectionName);
        const snap = await getDocs(q);
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSave = async (data: Record<string, unknown>) => {
    const id =
      (editing?.id as string) || `${collectionName}_${Date.now()}`;
    if (isNew) {
      data.order = items.length;
    }
    await setDoc(doc(db, collectionName, id), data, { merge: true });
    setEditing(null);
    setIsNew(false);
    await loadItems();
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    await deleteDoc(doc(db, collectionName, id));
    setDeleting(null);
    await loadItems();
  };

  if (editing || isNew) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold text-foreground">
          {isNew ? `Add ${title}` : `Edit ${title}`}
        </h1>
        <div
          className="glass rounded-xl p-6"
          style={{ boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)" }}
        >
          <CrudForm
            fields={fields}
            initialData={editing || {}}
            onSubmit={handleSave}
            onCancel={() => {
              setEditing(null);
              setIsNew(false);
            }}
            submitLabel={isNew ? "Create" : "Update"}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <button
          onClick={() => {
            setIsNew(true);
            setEditing(null);
          }}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all"
          style={{
            background: "var(--neon-cyan)",
            color: "var(--primary-foreground)",
          }}
        >
          <Plus size={16} />
          Add New
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
      ) : items.length === 0 ? (
        <div
          className="glass flex flex-col items-center gap-3 rounded-xl py-16 text-center"
          style={{ boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)" }}
        >
          <p className="text-muted-foreground">
            No items yet. Click "Add New" to get started.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id as string}
              className="glass flex items-center justify-between rounded-xl px-5 py-4 transition-all"
              style={{ boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)" }}
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {(item[displayField] as string) ||
                    (item.institution as string) ||
                    (item.company as string) ||
                    (item.platform as string) ||
                    (item.category as string) ||
                    (item.id as string)}
                </p>
                {item.period && (
                  <p className="text-xs text-muted-foreground">
                    {item.period as string}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditing(item)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                  style={{ background: "rgba(0,240,255,0.05)" }}
                  aria-label="Edit item"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id as string)}
                  disabled={deleting === (item.id as string)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-red-400"
                  style={{ background: "rgba(239,68,68,0.05)" }}
                  aria-label="Delete item"
                >
                  {deleting === (item.id as string) ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
