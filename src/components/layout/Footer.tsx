import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]/60">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-display text-lg font-semibold">
              <ShieldCheck className="h-5 w-5 text-[var(--color-accent)]" />
              SafeBridge AI
            </div>
            <p className="mt-3 max-w-xs text-sm text-[var(--color-text-secondary)]">
              An AI-powered first safe conversation for children, teens, and adults navigating
              difficult experiences. Not a replacement for professional care.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--color-text)]">Product</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li><Link href="/#features" className="hover:text-[var(--color-text)]">Features</Link></li>
              <li><Link href="/companion" className="hover:text-[var(--color-text)]">AI Companion</Link></li>
              <li><Link href="/learn" className="hover:text-[var(--color-text)]">Learn</Link></li>
              <li><Link href="/journal" className="hover:text-[var(--color-text)]">Journal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--color-text)]">Support</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li><Link href="/help" className="hover:text-[var(--color-text)]">Find Help</Link></li>
              <li><Link href="/about" className="hover:text-[var(--color-text)]">About</Link></li>
              <li><Link href="/about#responsible-ai" className="hover:text-[var(--color-text)]">Responsible AI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--color-text)]">In danger now?</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              If you or someone else is in immediate danger, contact local emergency services
              right away.
            </p>
            <Link
              href="/help"
              className="mt-2 inline-block text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              View emergency contacts →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)]/60 pt-6 text-xs text-[var(--color-text-muted)] md:flex-row">
          <p>© {new Date().getFullYear()} SafeBridge AI. Built for safety, not for diagnosis.</p>
          <p>SafeBridge AI does not replace therapists, doctors, lawyers, or emergency services.</p>
        </div>
      </div>
    </footer>
  );
}
