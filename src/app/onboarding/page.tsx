"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Baby, Smile, GraduationCap, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";
import type { AgeTier } from "@/lib/types";

const tiers: { id: AgeTier; label: string; range: string; icon: typeof Baby; desc: string }[] = [
  {
    id: "child",
    label: "Child",
    range: "8–12 years old",
    icon: Baby,
    desc: "Simple words, gentle pacing, always with a trusted adult in mind.",
  },
  {
    id: "teen",
    label: "Teen",
    range: "13–17 years old",
    icon: Smile,
    desc: "Direct, respectful, and honest — without talking down to you.",
  },
  {
    id: "young_adult",
    label: "Young Adult",
    range: "18–24 years old",
    icon: GraduationCap,
    desc: "Practical guidance as you navigate independence and new decisions.",
  },
  {
    id: "adult",
    label: "Adult",
    range: "25+ years old",
    icon: Briefcase,
    desc: "Straightforward support, resources, and no unnecessary hand-holding.",
  },
];

export default function OnboardingPage() {
  const { completeOnboarding } = useAuth();
  const router = useRouter();
  const [selected, setSelected] = useState<AgeTier | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (!selected) return;
    setLoading(true);
    try {
      await completeOnboarding(selected);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div
        aria-hidden
        className="breathing-orb pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.3),rgba(20,184,166,0.12)_55%,transparent_75%)] blur-3xl"
      />
      <div className="relative w-full max-w-3xl text-center">
        <ShieldCheck className="mx-auto h-8 w-8 text-[var(--color-accent)]" />
        <h1 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
          Which age group fits you?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-secondary)]">
          This helps us tune how the AI Companion talks with you and what resources we recommend.
          You can&apos;t get this "wrong" — pick the one that fits best.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const active = selected === tier.id;
            return (
              <Card
                key={tier.id}
                onClick={() => setSelected(tier.id)}
                className={`cursor-pointer p-6 text-left transition-all ${
                  active
                    ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
                    : "hover:border-[var(--color-text-muted)]"
                }`}
              >
                <Icon className="h-6 w-6 text-[var(--color-primary)]" />
                <h3 className="mt-3 font-display text-lg font-semibold">
                  {tier.label} <span className="text-[var(--color-text-muted)] font-normal text-sm">({tier.range})</span>
                </h3>
                <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">{tier.desc}</p>
              </Card>
            );
          })}
        </div>

        <Button
          size="lg"
          className="mt-10"
          disabled={!selected || loading}
          onClick={handleContinue}
        >
          {loading ? "Setting things up…" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
