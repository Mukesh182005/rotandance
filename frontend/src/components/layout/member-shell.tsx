"use client";

import type * as React from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useAuthStore } from "@/lib/store/auth-store";
import { NAV, BOTTOM_NAV } from "@/lib/data";

export function MemberShell({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((s) => s.session);
  if (!session) return null;

  return (
    <div
      className="flex min-h-svh"
      style={{
        backgroundImage:
          "radial-gradient(700px 380px at 100% -5%, rgba(158,27,71,0.12), transparent 55%)",
      }}
    >
      <AppSidebar items={NAV.member} subtitle="Atria IT · Member" session={session} />
      <div className="flex min-w-0 flex-1 flex-col pb-[68px] lg:pb-0">{children}</div>
      <BottomNav items={BOTTOM_NAV.member} />
    </div>
  );
}
