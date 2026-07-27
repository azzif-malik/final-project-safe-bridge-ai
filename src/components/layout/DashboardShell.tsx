"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bot,
  BookOpen,
  GraduationCap,
  LifeBuoy,
  LayoutGrid,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { AuthGuard } from "@/components/layout/AuthGuard";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/companion", label: "AI Companion", icon: Bot },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/help", label: "Find Help", icon: LifeBuoy },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, logOut } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logOut();
    router.push("/");
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)]/40 px-4 py-6 md:flex">
          <Link href="/dashboard" className="mb-8 flex items-center gap-2 px-2 font-display text-lg font-semibold">
            <ShieldCheck className="h-6 w-6 text-[var(--color-accent)]" />
            SafeBridge AI
          </Link>
          <nav className="flex flex-1 flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-[var(--color-primary)]/15 text-[var(--color-text)]"
                      : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-[var(--color-text)]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto space-y-3 border-t border-[var(--color-border)]/60 pt-4">
            {profile?.displayName && (
              <p className="px-2 text-xs text-[var(--color-text-muted)]">
                Signed in as <span className="text-[var(--color-text-secondary)]">{profile.displayName}</span>
              </p>
            )}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-white/5 hover:text-[var(--color-danger)]"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </aside>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-lg py-2 md:hidden">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] ${
                  active ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 pb-20 md:pb-0">{children}</main>
      </div>
    </AuthGuard>
  );
}
