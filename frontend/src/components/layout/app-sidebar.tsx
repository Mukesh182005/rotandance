"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { NavIcon } from "@/components/layout/nav-icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/auth-store";
import type { Session } from "@/lib/data";

interface NavItem {
  key: string;
  label: string;
  href: string;
  badge?: number;
}

export function AppSidebar({
  items,
  subtitle,
  session,
}: {
  items: NavItem[];
  subtitle: string;
  session: Session;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return (
    <aside className="bg-sidebar sticky top-0 hidden h-svh w-[250px] shrink-0 flex-col gap-1 border-r px-4 py-6 lg:flex">
      <Logo subtitle={subtitle} className="px-2 pb-6" />
      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "text-text-dim hover:text-foreground relative flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-white/[0.04]",
                active && "from-brand/25 to-brand/5 text-foreground bg-gradient-to-r",
              )}
              style={
                active
                  ? {
                      boxShadow:
                        "inset 0 0 0 1px rgba(193,39,90,0.28), inset 3px 0 0 var(--brand-hover)",
                    }
                  : undefined
              }
            >
              <span className="flex items-center gap-3">
                <NavIcon
                  name={item.key}
                  className={cn("h-[18px] w-[18px]", active && "text-brand-pink")}
                />
                {item.label}
              </span>
              {item.badge ? (
                <Badge className="bg-brand h-4 min-w-4 rounded-full px-1.5 text-[10px] text-white">
                  {item.badge}
                </Badge>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-2.5 rounded-2xl border bg-white/[0.03] p-3">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="brand-gradient font-heading text-[11px] font-bold text-white">
            {session.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12.5px] font-semibold">{session.name}</div>
          <div className="text-text-dim truncate text-[10.5px]">{session.role}</div>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            router.replace("/");
          }}
          className="text-text-dim hover:text-brand-hover transition-colors"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
