"use client";

import SingletonEditor from "@/components/admin/singleton-editor";

export default function AdminAboutPage() {
  return (
    <SingletonEditor
      collectionName="about"
      docId="main"
      title="About Section"
      fields={[
        { name: "bio", label: "Bio", type: "textarea", required: true, placeholder: "Write about yourself..." },
        { name: "details", label: "Key Details / Highlights", type: "tags", placeholder: "Add a detail point..." },
        { name: "imageUrl", label: "Profile Image URL", type: "url", placeholder: "https://..." },
      ]}
    />
  );
}
