"use client";

import CollectionEditor from "@/components/admin/collection-editor";

export default function AdminMedalsPage() {
  return (
    <CollectionEditor
      collectionName="medals"
      title="Medals & Badges"
      displayField="platform"
      fields={[
        { name: "platform", label: "Platform", type: "text", required: true, placeholder: "LeetCode" },
        { name: "achievement", label: "Achievement", type: "text", required: true, placeholder: "Knight Badge" },
        { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Describe the achievement..." },
        { name: "color", label: "Accent Color (hex)", type: "text", required: true, placeholder: "#fbbf24" },
        { name: "iconUrl", label: "Icon URL", type: "url", placeholder: "https://..." },
        { name: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
