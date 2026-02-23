"use client";

import CollectionEditor from "@/components/admin/collection-editor";

export default function AdminEducationPage() {
  return (
    <CollectionEditor
      collectionName="education"
      title="Education"
      displayField="institution"
      fields={[
        { name: "institution", label: "Institution", type: "text", required: true, placeholder: "University name" },
        { name: "degree", label: "Degree", type: "text", required: true, placeholder: "B.Tech in CS" },
        { name: "period", label: "Time Period", type: "text", required: true, placeholder: "2021 - 2025" },
        { name: "description", label: "Description", type: "textarea", placeholder: "Details about your studies..." },
        { name: "grade", label: "Grade / CGPA", type: "text", placeholder: "8.5 CGPA" },
        { name: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
