import { ShieldCheck, Heart, Eye, BookOpenCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-[var(--color-accent)]" />
          <h1 className="mt-4 font-display text-4xl font-semibold">About SafeBridge AI</h1>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            You&apos;re never alone. Your first safe conversation starts here.
          </p>
        </div>

        <div className="mt-14 space-y-10">
          <section>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[var(--color-primary)]" />
              <h2 className="font-display text-xl font-semibold">Our mission</h2>
            </div>
            <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
              SafeBridge AI exists to shrink the distance between &quot;something is wrong&quot;
              and &quot;someone I trust knows.&quot; Most people who experience abuse, bullying, or
              serious hardship go a long time before telling anyone — often because the first step
              feels too big, too scary, or too shameful to take alone. We built a private, always
              available space where that first step can be smaller: type it, journal it, learn
              about it, and then be guided toward real people and real organizations who can help.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-[var(--color-primary)]" />
              <h2 className="font-display text-xl font-semibold">Our vision</h2>
            </div>
            <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
              A world where no child, teen, or adult has to sit with a difficult experience in
              silence because they didn&apos;t know where to start. We see SafeBridge AI as a
              bridge — never a destination — connecting people to trusted adults, licensed
              professionals, NGOs, and emergency services faster and with less friction than
              exists today.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-[var(--color-primary)]" />
              <h2 className="font-display text-xl font-semibold">Why this project exists</h2>
            </div>
            <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
              Abuse awareness resources are often written for adults, buried in dense language, or
              simply hard to find in the moment someone needs them. Meanwhile, AI chat interfaces
              have shown that a private, judgment-free conversation can lower the barrier to
              opening up. SafeBridge AI combines both: age-appropriate education and a companion
              built specifically to listen without judgment and route people toward real help,
              rather than trying to be the help itself.
            </p>
          </section>

          <section id="responsible-ai">
            <Card className="border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6">
              <h2 className="font-display text-xl font-semibold text-[var(--color-accent)]">
                Our Responsible AI statement
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                <li>
                  <strong className="text-[var(--color-text)]">We are not a replacement.</strong>{" "}
                  The AI Companion does not replace therapists, doctors, lawyers, or emergency
                  services. It is designed to be a first conversation, not a final one.
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">No diagnosis, ever.</strong> The AI
                  is instructed never to diagnose a mental health condition or offer legal advice,
                  and to always encourage professional support for anything clinical or legal.
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">Safety over engagement.</strong>{" "}
                  When a conversation signals immediate danger or self-harm risk, the product is
                  designed to interrupt normal conversation and surface real crisis resources
                  immediately, rather than optimizing for keeping the chat going.
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">Age-appropriate by design.</strong>{" "}
                  Tone, vocabulary, and guidance adapt to the age group someone selects, without
                  ever compromising on the core safety rules above.
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">Privacy first.</strong> Journal
                  entries and conversations are private to each account. We do not sell data or use
                  it to train external models.
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">Ongoing review.</strong> As an early
                  MVP, our safety prompts and flows should be reviewed by clinical, legal, and
                  child-safety professionals before any large-scale deployment. We treat this as an
                  ongoing responsibility, not a one-time checkbox.
                </li>
              </ul>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
