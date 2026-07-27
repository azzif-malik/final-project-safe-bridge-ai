"use client";

import { useEffect, useState } from "react";
import { Plus, Sparkles, Trash2, Pencil, X, Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, TextArea, Label } from "@/components/ui/Input";
import { MoodPicker, moodEmoji } from "@/components/ui/MoodPicker";
import { useAuth } from "@/lib/auth-context";
import {
  subscribeToJournal,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from "@/lib/journal";
import type { JournalEntry, Mood } from "@/lib/types";

export default function JournalPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editing, setEditing] = useState<JournalEntry | null>(null);
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<Mood | null>(null);
  const [summarizing, setSummarizing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToJournal(user.uid, setEntries);
    return () => unsub();
  }, [user]);

  function openNew() {
    setEditing(null);
    setTitle("");
    setContent("");
    setMood(null);
    setComposing(true);
  }

  function openEdit(entry: JournalEntry) {
    setEditing(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
    setComposing(true);
  }

  async function handleSave() {
    if (!user || !mood || !content.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        await updateJournalEntry(editing.id, { title, content, mood });
      } else {
        await createJournalEntry(user.uid, title || "Untitled entry", content, mood);
      }
      setComposing(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleSummarize(entry: JournalEntry) {
    setSummarizing(entry.id);
    try {
      const res = await fetch("/api/journal-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: entry.content }),
      });
      const data = await res.json();
      if (res.ok) {
        await updateJournalEntry(entry.id, { aiSummary: data.summary });
      }
    } finally {
      setSummarizing(null);
    }
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">Journal</h1>
            <p className="mt-1 text-[var(--color-text-secondary)]">
              Fully private. Only you can see what you write here.
            </p>
          </div>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4" />
            New entry
          </Button>
        </div>

        {composing && (
          <Card className="mb-8 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">
                {editing ? "Edit entry" : "New entry"}
              </h2>
              <button onClick={() => setComposing(false)} aria-label="Close">
                <X className="h-4 w-4 text-[var(--color-text-muted)]" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="title">Title (optional)</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give this entry a name"
                />
              </div>
              <div>
                <Label>How are you feeling?</Label>
                <MoodPicker value={mood} onChange={setMood} />
              </div>
              <div>
                <Label htmlFor="content">What&apos;s on your mind?</Label>
                <TextArea
                  id="content"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write freely — nothing here needs to be perfect or complete."
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setComposing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving || !mood || !content.trim()}>
                  {saving ? "Saving…" : "Save entry"}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {entries.length === 0 && !composing ? (
          <Card className="p-10 text-center text-[var(--color-text-secondary)]">
            No entries yet. Your journal is empty and totally private — write your first entry
            whenever you&apos;re ready.
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{moodEmoji(entry.mood)}</span>
                    <div>
                      <h3 className="font-display font-semibold">{entry.title}</h3>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {new Date(entry.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(entry)} aria-label="Edit entry">
                      <Pencil className="h-4 w-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)]" />
                    </button>
                    <button onClick={() => deleteJournalEntry(entry.id)} aria-label="Delete entry">
                      <Trash2 className="h-4 w-4 text-[var(--color-text-muted)] hover:text-[var(--color-danger)]" />
                    </button>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-[var(--color-text-secondary)]">
                  {entry.content}
                </p>

                {entry.aiSummary ? (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-3 text-sm text-[var(--color-text-secondary)]">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                    {entry.aiSummary}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3"
                    onClick={() => handleSummarize(entry)}
                    disabled={summarizing === entry.id}
                  >
                    {summarizing === entry.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                    Get an AI reflection
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
