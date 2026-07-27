"use client";

import Link from "next/link";
import { Bot, BookOpen, GraduationCap, LifeBuoy, ArrowRight } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/auth-context";
import { AGE_TIER_LABELS } from "@/lib/types";

const cards = [
  {
    href: "/companion",
    icon: Bot,
    emoji: "🤖",
    title: "AI Companion",
    desc: "Talk something through, at your own pace, with zero judgment.",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    href: "/journal",
    icon: BookOpen,
    emoji: "📖",
    title: "Journal",
    desc: "Write privately. Track your mood. Look back when you're ready.",
    color: "from-teal-500/20 to-teal-500/5",
  },
  {
    href: "/learn",
    icon: GraduationCap,
    emoji: "📚",
    title: "Learn",
    desc: "Clear lessons on safety, consent, and healing, built for your age group.",
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    href: "/help",
    icon: LifeBuoy,
    emoji: "🆘",
    title: "Find Help",
    desc: "Real helplines and organizations, ready when you need them.",
    color: "from-red-500/20 to-red-500/5",
  },
];

export default function DashboardPage() {
  const { profile } = useAuth();
  const firstName = profile?.displayName?.split(" ")[0];

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-semibold md:text-4xl">
            {firstName ? `Welcome back, ${firstName}.` : "Welcome back."}
          </h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            {profile?.ageTier
              ? `You're set up as ${AGE_TIER_LABELS[profile.ageTier]}. Everything below is tuned for you.`
              : "This is your private space. Pick up where you left off, or start something new."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.href} href={c.href}>
                <Card hover className={`group relative overflow-hidden bg-gradient-to-br p-8 ${c.color}`}>
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-card)] text-2xl">
                      {c.emoji}
                    </div>
                    <ArrowRight className="h-5 w-5 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-accent)]" />
                  </div>
                  <h2 className="mt-6 font-display text-xl font-semibold">{c.title}</h2>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{c.desc}</p>
                </Card>
              </Link>
            );
          })}
        </div>

        <Card className="mt-10 border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 p-6">
          <p className="text-sm text-[var(--color-text-secondary)]">
            <strong className="text-[var(--color-text)]">In immediate danger?</strong> Don&apos;t
            wait for a response here.{" "}
            <Link href="/help" className="text-[var(--color-accent)] hover:underline">
              Go to Find Help
            </Link>{" "}
            for emergency numbers in your country, or contact local emergency services directly.
          </p>
        </Card>
      </div>
    </DashboardShell>
  );
}
