"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import type { Portal } from "@/lib/data";
import { Compass } from "lucide-react";

export function RequireSession({
  portal,
  children,
}: {
  portal: Portal | "any";
  children: React.ReactNode;
}) {
  const router = useRouter();
  const session = useAuthStore((s) => s.session);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const allowed = !!session && (portal === "any" || session.portal === portal);

  React.useEffect(() => {
    if (!hasHydrated) return;
    if (!session) {
      router.replace("/");
      return;
    }
    if (portal !== "any" && session.portal !== portal) {
      router.replace(session.portal === "admin" ? "/admin" : "/me");
    }
  }, [hasHydrated, session, portal, router]);

  if (!hasHydrated || !allowed) {
    return (
      <div className="bg-background flex min-h-svh items-center justify-center">
        <div className="text-text-dim flex flex-col items-center gap-3">
          <Compass className="text-brand-hover h-7 w-7 animate-spin" />
          <p className="font-heading text-sm">Loading RCAEMS…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
