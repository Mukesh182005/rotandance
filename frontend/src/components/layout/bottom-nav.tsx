"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "@/components/layout/nav-icon";
import { cn } from "@/lib/utils";

interface BottomNavItem {
  key: string;
  label: string;
  href: string;
  icon: string;
}

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="bg-background/90 fixed inset-x-0 bottom-0 z-40 flex h-[68px] items-center justify-around border-t px-2 pb-2 backdrop-blur-xl lg:hidden">
      {items.map((item) => {
        const active = pathname === item.href;
        const isScan = item.key === "scan";
        if (isScan) {
          return (
            <Link
              key={item.key}
              href={item.href}
              className="relative -top-3.5 flex flex-col items-center gap-1"
            >
              <span className="brand-gradient border-background flex h-[52px] w-[52px] items-center justify-center rounded-full border-[3px] text-white shadow-[0_12px_30px_-8px_rgba(158,27,71,0.95)]">
                <NavIcon name={item.icon} className="h-6 w-6" />
              </span>
              <span className="text-brand-pink text-[9.5px] font-semibold">
                {item.label}
              </span>
            </Link>
          );
        }
        return (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "text-text-dim flex flex-col items-center gap-1",
              active && "text-brand-hover",
            )}
          >
            <NavIcon name={item.icon} className="h-[22px] w-[22px]" />
            <span className={cn("text-[9.5px]", active && "font-semibold")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
