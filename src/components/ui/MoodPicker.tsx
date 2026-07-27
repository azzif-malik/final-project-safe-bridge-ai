import clsx from "clsx";
import type { Mood } from "@/lib/types";

export const MOODS: { id: Mood; emoji: string; label: string }[] = [
  { id: "happy", emoji: "😊", label: "Happy" },
  { id: "calm", emoji: "😌", label: "Calm" },
  { id: "sad", emoji: "😢", label: "Sad" },
  { id: "anxious", emoji: "😰", label: "Anxious" },
  { id: "angry", emoji: "😠", label: "Angry" },
  { id: "confused", emoji: "😕", label: "Confused" },
  { id: "scared", emoji: "😨", label: "Scared" },
  { id: "hopeful", emoji: "🌱", label: "Hopeful" },
];

export function MoodPicker({
  value,
  onChange,
}: {
  value: Mood | null;
  onChange: (mood: Mood) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {MOODS.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onChange(m.id)}
          className={clsx(
            "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
            value === m.id
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15 text-[var(--color-text)]"
              : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]"
          )}
        >
          <span>{m.emoji}</span>
          {m.label}
        </button>
      ))}
    </div>
  );
}

export function moodEmoji(mood: Mood) {
  return MOODS.find((m) => m.id === mood)?.emoji ?? "📝";
}
