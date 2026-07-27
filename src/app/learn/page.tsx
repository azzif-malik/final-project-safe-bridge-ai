"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { LEARN_TOPICS } from "@/content/learn-topics";
import { useAuth } from "@/lib/auth-context";

export default function LearnPage() {
  const { profile } = useAuth();
  const tier = profile?.ageTier;

  const recommended = tier ? LEARN_TOPICS.filter((t) => t.ageTiers.includes(tier)) : LEARN_TOPICS;
  const rest = LEARN_TOPICS.filter((t) => !recommended.includes(t));

  return (
    <DashboardShell>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-display text-3xl font-semibold">Learn</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Clear, honest lessons on safety, consent, and healing — written so anyone can understand
          them.
        </p>

        {tier && (
          <p className="mt-6 text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
            Recommended for you
          </p>
        )}
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((topic) => (
            <Link key={topic.slug} href={`/learn/${topic.slug}`}>
              <Card hover className="h-full p-6">
                <div className="text-3xl">{topic.emoji}</div>
                <h3 className="mt-3 font-display font-semibold">{topic.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">
                  {topic.shortDescription}
                </p>
              </Card>
            </Link>
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <p className="mt-10 text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              More topics
            </p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((topic) => (
                <Link key={topic.slug} href={`/learn/${topic.slug}`}>
                  <Card hover className="h-full p-6 opacity-80">
                    <div className="text-3xl">{topic.emoji}</div>
                    <h3 className="mt-3 font-display font-semibold">{topic.title}</h3>
                    <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">
                      {topic.shortDescription}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardShell>
  );
}
