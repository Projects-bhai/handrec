"use client";

import CollectionEditor from "@/components/admin/collection-editor";

export default function AdminProjectsPage() {
  return (
    <CollectionEditor
      collectionName="projects"
      title="Projects"
      displayField="title"
      fields={[
        { name: "title", label: "Project Title", type: "text", required: true, placeholder: "My Project" },
        { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Describe the project..." },
        { name: "techStack", label: "Tech Stack", type: "tags", placeholder: "Add technology..." },
        { name: "imageUrl", label: "Image URL", type: "url", placeholder: "https://..." },
        { name: "liveUrl", label: "Live Demo URL", type: "url", placeholder: "https://..." },
        { name: "githubUrl", label: "GitHub URL", type: "url", placeholder: "https://github.com/..." },
        { name: "featured", label: "Featured Project", type: "toggle" },
        { name: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
