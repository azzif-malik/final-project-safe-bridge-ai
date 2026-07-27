import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { getTopicBySlug, LEARN_TOPICS } from "@/content/learn-topics";

export function generateStaticParams() {
  return LEARN_TOPICS.map((t) => ({ slug: t.slug }));
}

export default async function LearnTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Learn
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-card)] text-3xl">
            {topic.emoji}
          </div>
          <h1 className="font-display text-3xl font-semibold">{topic.title}</h1>
        </div>

        <div className="mt-8 space-y-4">
          {topic.sections.map((section) => (
            <Card key={section.heading} className="p-6">
              <h2 className="font-display font-semibold text-[var(--color-accent)]">
                {section.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {section.body}
              </p>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-6 text-sm text-[var(--color-text-secondary)]">
          If anything here feels close to your own experience, you don&apos;t have to sit with it
          alone.{" "}
          <Link href="/companion" className="text-[var(--color-accent)] hover:underline">
            Talk to the AI Companion
          </Link>{" "}
          or{" "}
          <Link href="/help" className="text-[var(--color-accent)] hover:underline">
            find real support
          </Link>
          .
        </Card>
      </div>
    </DashboardShell>
  );
}
