"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, configured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!configured || loading) return;
    if (!user) {
      router.replace("/login");
    } else if (profile && !profile.onboardingComplete) {
      router.replace("/onboarding");
    }
  }, [user, profile, loading, configured, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[var(--color-text-secondary)]">
        Loading your safe space…
      </div>
    );
  }

  // In demo mode (no Firebase configured) we let the UI render so the app can be
  // previewed without live credentials.
  if (!configured) return <>{children}</>;

  if (!user) return null;

  return <>{children}</>;
}
