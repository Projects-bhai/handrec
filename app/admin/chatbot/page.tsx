"use client";

import SingletonEditor from "@/components/admin/singleton-editor";

export default function AdminChatbotPage() {
  return (
    <SingletonEditor
      collectionName="settings"
      docId="chatbot"
      title="AI Chatbot Settings"
      fields={[
        {
          name: "contextDocument",
          label: "Context Document",
          type: "textarea",
          required: true,
          placeholder: "Paste your resume/bio/context document here. The AI will use this to answer questions about you.",
        },
        {
          name: "systemPrompt",
          label: "System Prompt (optional override)",
          type: "textarea",
          placeholder: "Custom system prompt for the chatbot. Leave empty to use the default.",
        },
        {
          name: "enabled",
          label: "Chatbot Enabled",
          type: "toggle",
        },
      ]}
    />
  );
}
