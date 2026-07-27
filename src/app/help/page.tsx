"use client";

import { useState } from "react";
import { Phone, Globe, ShieldAlert, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { COUNTRY_HELP, GLOBAL_RESOURCES } from "@/content/help-resources";

// Deliberately NOT behind AuthGuard/DashboardShell: emergency and support resources
// must be reachable by anyone, logged in or not.
export default function HelpPage() {
  const [selected, setSelected] = useState(COUNTRY_HELP[0].countryCode);
  const country = COUNTRY_HELP.find((c) => c.countryCode === selected) ?? COUNTRY_HELP[0];

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="font-display text-3xl font-semibold">Find Help</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Real organizations and helplines, ready when you need them. This list is a starting
          point, not a complete directory — if nothing here fits, Child Helpline International and
          Find A Helpline (below) cover most countries worldwide.
        </p>

        <Card className="mt-6 border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-danger)]" />
            <div>
              <p className="font-semibold text-[var(--color-text)]">
                If you or someone else is in immediate danger
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Contact your local emergency number right now —{" "}
                <span className="font-semibold text-[var(--color-text)]">
                  {country.emergencyNumber}
                </span>{" "}
                in {country.countryName}. Don&apos;t wait for a chat response first.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">
            Select your country
          </label>
          <div className="relative">
            <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-3 pl-10 pr-4 text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
            >
              {COUNTRY_HELP.map((c) => (
                <option key={c.countryCode} value={c.countryCode}>
                  {c.countryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {country.resources.map((r) => (
            <Card key={r.name} className="p-5">
              <h3 className="font-display font-semibold">{r.name}</h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{r.description}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                {r.phone && (
                  <span className="flex items-center gap-1.5 text-[var(--color-accent)]">
                    <Phone className="h-3.5 w-3.5" />
                    {r.phone}
                  </span>
                )}
                {r.website && (
                  <a
                    href={r.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Visit website
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>

        <h2 className="mt-10 font-display text-xl font-semibold">Global organizations</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {GLOBAL_RESOURCES.map((r) => (
            <Card key={r.name} className="p-5">
              <h3 className="font-display font-semibold">{r.name}</h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{r.description}</p>
              <a
                href={r.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-1.5 text-sm text-[var(--color-accent)] hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Visit website
              </a>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-xs text-[var(--color-text-muted)]">
          Helpline details are checked periodically but can change. If a number doesn&apos;t
          connect, try the organization&apos;s website above or Find A Helpline for the latest
          listings.
        </p>
      </div>
      <Footer />
    </>
  );
}
