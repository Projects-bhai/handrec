"use client";

import CollectionEditor from "@/components/admin/collection-editor";

export default function AdminCertificationsPage() {
  return (
    <CollectionEditor
      collectionName="certifications"
      title="Certifications"
      displayField="title"
      fields={[
        { name: "title", label: "Certification Title", type: "text", required: true, placeholder: "AWS Cloud Practitioner" },
        { name: "issuer", label: "Issuer", type: "text", required: true, placeholder: "Amazon Web Services" },
        { name: "date", label: "Date", type: "text", required: true, placeholder: "2024" },
        { name: "credentialUrl", label: "Credential URL", type: "url", placeholder: "https://..." },
        { name: "imageUrl", label: "Image URL", type: "url", placeholder: "https://..." },
        { name: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
