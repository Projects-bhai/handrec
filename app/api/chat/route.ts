import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

const DEFAULT_SYSTEM_PROMPT = `You are an AI assistant on Satyam Chandra's portfolio website. You are knowledgeable about Satyam's background, skills, and projects. Be helpful, concise, and professional. If asked about things unrelated to Satyam or his work, politely redirect the conversation. Keep responses brief and to the point - typically 2-4 sentences unless more detail is requested.`;

const DEFAULT_CONTEXT = `Satyam Chandra is a full-stack developer and competitive programmer. He has experience with React, Next.js, Node.js, Python, and cloud technologies. He is passionate about clean code, system design, and building high-performance web applications. He is an active competitive programmer on platforms like LeetCode, CodeChef, and Codeforces. He is open to new opportunities and collaborations.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Build conversation for Gemini
    const systemInstruction = `${DEFAULT_SYSTEM_PROMPT}\n\nContext about Satyam:\n${DEFAULT_CONTEXT}`;

    const geminiMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })
    );

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, I couldn't generate a response right now.";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
