"use client";

import SingletonEditor from "@/components/admin/singleton-editor";

export default function AdminHeroPage() {
  return (
    <SingletonEditor
      collectionName="hero"
      docId="main"
      title="Hero Section"
      fields={[
        { name: "title", label: "Name / Title", type: "text", required: true, placeholder: "Satyam Chandra" },
        { name: "subtitle", label: "Subtitle", type: "text", required: true, placeholder: "Full-Stack Developer" },
        { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Brief introduction..." },
        { name: "ctaText", label: "CTA Button Text", type: "text", placeholder: "View My Work" },
        { name: "ctaLink", label: "CTA Button Link", type: "text", placeholder: "#projects" },
        { name: "resumeUrl", label: "Resume URL", type: "url", placeholder: "https://..." },
      ]}
    />
  );
}
