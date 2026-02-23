"use client";

import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CrudForm, { type FieldConfig } from "./crud-form";
import { Loader2, Check } from "lucide-react";

interface SingletonEditorProps {
  collectionName: string;
  docId: string;
  title: string;
  fields: FieldConfig[];
}

export default function SingletonEditor({
  collectionName,
  docId,
  title,
  fields,
}: SingletonEditorProps) {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, collectionName, docId));
      if (snap.exists()) {
        setData(snap.data());
      }
    } catch {
      // Use empty data on error
    } finally {
      setLoading(false);
    }
  }, [collectionName, docId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async (formData: Record<string, unknown>) => {
    await setDoc(doc(db, collectionName, docId), formData, { merge: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    await loadData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2
          size={24}
          className="animate-spin"
          style={{ color: "var(--neon-cyan)" }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {saved && (
          <span
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              color: "#22c55e",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <Check size={12} />
            Saved
          </span>
        )}
      </div>
      <div
        className="glass rounded-xl p-6"
        style={{ boxShadow: "inset 0 1px 0 rgba(0,240,255,0.05)" }}
      >
        <CrudForm
          fields={fields}
          initialData={data}
          onSubmit={handleSave}
          onCancel={() => loadData()}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
