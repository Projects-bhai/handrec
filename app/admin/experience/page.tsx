"use client";

import CollectionEditor from "@/components/admin/collection-editor";

export default function AdminExperiencePage() {
  return (
    <CollectionEditor
      collectionName="experience"
      title="Experience"
      displayField="company"
      fields={[
        { name: "company", label: "Company", type: "text", required: true, placeholder: "Company name" },
        { name: "role", label: "Role / Position", type: "text", required: true, placeholder: "Full-Stack Developer" },
        { name: "period", label: "Time Period", type: "text", required: true, placeholder: "Jun 2024 - Aug 2024" },
        { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Describe your work..." },
        { name: "techStack", label: "Tech Stack", type: "tags", placeholder: "Add technology..." },
        { name: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
