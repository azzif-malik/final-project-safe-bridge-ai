import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, detectCrisisSignal, CRISIS_APPEND_NOTICE } from "@/lib/gemini-prompts";
import type { AgeTier } from "@/lib/types";

// This route is the ONLY place the Gemini API key is used. It never reaches the client.
// The system prompt is assembled here from a fixed, server-side lookup — the client can only
// send its age tier, never arbitrary instructions.

interface ChatRequestBody {
  ageTier: AgeTier | null;
  history: { role: "user" | "assistant"; content: string }[];
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY is not configured on the server. Add it to your .env.local to enable the AI Companion.",
      },
      { status: 500 }
    );
  }

  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { ageTier, history } = body;
  if (!Array.isArray(history) || history.length === 0) {
    return NextResponse.json({ error: "Message history is required." }, { status: 400 });
  }

  const lastUserMessage = [...history].reverse().find((m) => m.role === "user")?.content ?? "";
  const crisisDetected = detectCrisisSignal(lastUserMessage);

  const systemPrompt = buildSystemPrompt(ageTier);

  // Gemini's REST API expects "contents" with role user/model, and a separate systemInstruction.
  const contents = history.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { error: "The AI Companion is temporarily unavailable. Please try again shortly." },
        { status: 502 }
      );
    }

    const data = await response.json();
    let reply: string =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ??
      "";

    if (!reply) {
      reply =
        "I'm having trouble responding right now. If this is urgent, please visit the Find Help page or contact emergency services.";
    }

    if (crisisDetected && !reply.includes("Find Help")) {
      reply += CRISIS_APPEND_NOTICE;
    }

    return NextResponse.json({ reply, crisisDetected });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong reaching the AI Companion." },
      { status: 500 }
    );
  }
}
