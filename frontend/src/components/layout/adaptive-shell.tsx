"use client";

import type * as React from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useAuthStore } from "@/lib/store/auth-store";
import { NAV, BOTTOM_NAV } from "@/lib/data";

/** Shell for routes shared between both portals (Certificates, Notifications, Settings). */
export function AdaptiveShell({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((s) => s.session);
  if (!session) return null;
  const isAdmin = session.portal === "admin";

  return (
    <div className="flex min-h-svh">
      <AppSidebar
        items={isAdmin ? NAV.admin : NAV.member}
        subtitle={isAdmin ? "Atria IT · Admin" : "Atria IT · Member"}
        session={session}
      />
      <div className="flex min-w-0 flex-1 flex-col pb-[68px] lg:pb-0">{children}</div>
      <BottomNav items={isAdmin ? BOTTOM_NAV.admin : BOTTOM_NAV.member} />
    </div>
  );
}
