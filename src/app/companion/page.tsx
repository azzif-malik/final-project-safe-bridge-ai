"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, Bot, ShieldAlert, Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth-context";
import type { ChatMessage } from "@/lib/types";

const SUGGESTED_PROMPTS = [
  "Something happened and I don't know who to tell.",
  "I feel really anxious and I don't know why.",
  "Can you help me understand what 'safe touch' means?",
  "Someone at school is bullying me. What can I do?",
];

function newId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function CompanionPage() {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I'm glad you're here. This is a private, judgment-free space — you can share as much or as little as you want. I'm not a therapist or a replacement for a trusted adult, but I'm here to listen and help you figure out a next step. What's on your mind?",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: newId(),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ageTier: profile?.ageTier ?? null,
          history: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: "assistant",
          content: data.reply,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch {
      setError("Couldn't reach the AI Companion. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardShell>
      <div className="mx-auto flex h-screen max-w-4xl flex-col px-4 py-6 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/15">
              <Bot className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
            <div>
              <h1 className="font-display font-semibold">AI Companion</h1>
              <p className="text-xs text-[var(--color-text-muted)]">
                Private · Not a replacement for professional care
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/30 p-4 md:p-6">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user"
                    ? "bg-[var(--color-primary)] text-white"
                    : "border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)]"
                }`}
              >
                {m.role === "assistant" ? (
                  <div className="prose-companion">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p>{m.content}</p>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Typing…
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 p-3 text-sm text-[var(--color-text-secondary)]">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-danger)]" />
              {error}
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {messages.length <= 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3.5 py-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/60 hover:text-[var(--color-text)]"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="mt-4 flex items-end gap-3"
        >
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            rows={1}
            placeholder="Type what's on your mind…"
            className="max-h-32 min-h-[52px]"
          />
          <Button type="submit" disabled={loading || !input.trim()} size="md">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">
          In immediate danger? Contact local emergency services now — don&apos;t wait for a reply here.
        </p>
      </div>
    </DashboardShell>
  );
}
