import { NextRequest, NextResponse } from "next/server";

const SUMMARY_SYSTEM_PROMPT = `
You write brief, gentle reflections on private journal entries for a support platform.
Rules:
- Never diagnose or use clinical/diagnostic language (no "this sounds like depression/anxiety
  disorder/trauma response").
- Never judge, shame, or blame the writer.
- Reflect back the emotional themes you notice, in 2-3 short sentences, in a warm, plain tone.
- If the entry describes danger, abuse, or self-harm, gently note that this seems important to
  share with a trusted adult or professional, without being alarmist.
- Do not give advice or instructions. This is a reflection, not a recommendation.
`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  const { content } = await req.json();
  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "Journal content is required." }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SUMMARY_SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: content }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 200 },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Couldn't generate a summary right now." }, { status: 502 });
    }

    const data = await response.json();
    const summary: string =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ??
      "";

    return NextResponse.json({ summary: summary || "No summary available." });
  } catch (err) {
    console.error("Journal summary error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
