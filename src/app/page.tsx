import Link from "next/link";
import {
  Bot,
  BookOpen,
  GraduationCap,
  LifeBuoy,
  MessageCircleHeart,
  ShieldCheck,
  Lock,
  HeartHandshake,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const stats = [
  { value: "1 in 5", label: "children experience some form of abuse before adulthood" },
  { value: "70%+", label: "of survivors say they told no one for over a year" },
  { value: "24/7", label: "SafeBridge AI is available, with zero judgment" },
  { value: "100%", label: "of conversations stay private to you" },
];

const features = [
  {
    icon: Bot,
    title: "AI Companion",
    desc: "A calm, judgment-free chat that listens first. Its tone and guidance adapt to your age, and it always points toward real human help when it matters.",
  },
  {
    icon: BookOpen,
    title: "Private Journal",
    desc: "Write down what happened, how you feel, or what you're not ready to say out loud yet. Fully private, with optional AI reflection summaries.",
  },
  {
    icon: GraduationCap,
    title: "Learn",
    desc: "Clear, age-appropriate lessons on safe touch, consent, bullying, online safety, and healing — written so anyone can understand them.",
  },
  {
    icon: LifeBuoy,
    title: "Find Help",
    desc: "Verified helplines, NGOs, and emergency contacts for your country, including WHO and UNICEF resources, in one place.",
  },
];

const steps = [
  {
    title: "Start a safe conversation",
    desc: "Sign up in under a minute. Tell us your age group so we can tailor everything to you — nothing else is required.",
  },
  {
    title: "Talk, write, or learn at your pace",
    desc: "Use the AI Companion to talk something through, journal privately, or explore a Learn topic — whatever feels right today.",
  },
  {
    title: "Get connected to real support",
    desc: "When you're ready — or if you're ever in danger — SafeBridge AI helps you find a trusted adult, a local NGO, or emergency services.",
  },
];

const voices = [
  {
    quote:
      "I didn't know how to say it out loud to anyone. Typing it first made it feel possible.",
    context: "Composite account, Teen user",
  },
  {
    quote:
      "The journal helped me notice my own patterns before I brought them to my counselor.",
    context: "Composite account, Young Adult user",
  },
  {
    quote:
      "My son used the Learn section to understand what 'safe touch' means. It gave us a way to talk about it together.",
    context: "Composite account, Parent",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden px-6 pt-20 pb-28 md:pt-28 md:pb-36">
          <div
            aria-hidden
            className="breathing-orb pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.35),rgba(20,184,166,0.15)_55%,transparent_75%)] blur-3xl"
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/60 px-4 py-1.5 text-xs text-[var(--color-text-secondary)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              Private. Judgment-free. Never a replacement for real help.
            </div>
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              You&apos;re never alone.
              <br />
              <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                Your first safe conversation starts here.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)]">
              SafeBridge AI helps children, teens, and adults safely express difficult
              experiences, privately document their thoughts, learn about abuse awareness, and
              connect with trusted organizations — one small step at a time.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup">
                <Button size="lg">Start your first conversation</Button>
              </Link>
              <Link href="/help">
                <Button size="lg" variant="secondary">
                  I need help right now
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-[var(--color-text-muted)]">
              If you are in immediate danger, please contact local emergency services first.
            </p>
          </div>
        </section>

        {/* MISSION */}
        <section className="border-y border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)]/40 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Our mission</h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              Most people who experience abuse or hardship tell no one for a long time — often
              because the first step feels too big. SafeBridge AI exists to make that first step
              smaller: a private, always-available space to put words to what&apos;s happening,
              understand it, and be guided toward real people who can help. We built this because
              the gap between &quot;something is wrong&quot; and &quot;someone I trust knows&quot;
              is where the most harm happens — and where the least support exists.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label} className="p-6 text-center">
                <div className="font-display text-3xl font-semibold text-[var(--color-accent)]">
                  {s.value}
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{s.label}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                Everything starts with one safe space
              </h2>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                Four tools, built to meet you exactly where you are.
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <Card key={f.title} hover className="p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/15">
                    <f.icon className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {f.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="border-y border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)]/40 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-semibold md:text-4xl">How it works</h2>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                A typed sequence, because the order genuinely matters here.
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-accent)]/50 font-display text-sm text-[var(--color-accent)]">
                    {i + 1}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                What people tell us
              </h2>
              <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                Composite accounts reflecting common experiences shared with our team — not
                verbatim quotes from identifiable individuals.
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {voices.map((v) => (
                <Card key={v.quote} className="p-6">
                  <HeartHandshake className="h-5 w-5 text-[var(--color-accent)]" />
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    &quot;{v.quote}&quot;
                  </p>
                  <p className="mt-4 text-xs text-[var(--color-text-muted)]">{v.context}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <Card glass className="mx-auto flex max-w-4xl flex-col items-center gap-4 p-10 text-center">
            <Lock className="h-8 w-8 text-[var(--color-accent)]" />
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              Your first conversation is private, and it&apos;s free.
            </h2>
            <p className="max-w-lg text-sm text-[var(--color-text-secondary)]">
              No one else sees what you write unless you choose to share it. Start whenever
              you&apos;re ready.
            </p>
            <Link href="/signup" className="mt-2">
              <Button size="lg">
                <MessageCircleHeart className="h-4 w-4" />
                Start your first conversation
              </Button>
            </Link>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
