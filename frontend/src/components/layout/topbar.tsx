"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import type { Session } from "@/lib/data";
import { LogOut, Settings, User } from "lucide-react";

export function Topbar({
  title,
  searchPlaceholder,
  session,
  children,
}: {
  title: string;
  searchPlaceholder?: string;
  session: Session;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="flex h-16 items-center gap-3 border-b px-5 lg:px-7">
      <div className="font-heading text-base font-semibold">{title}</div>
      {searchPlaceholder ? (
        <div className="ml-2 hidden max-w-70 flex-1 items-center gap-2 rounded-xl border bg-white/[0.03] px-3 py-2 md:flex">
          <Search className="text-text-dim h-[15px] w-[15px]" />
          <span className="text-text-faint truncate text-[13px]">
            {searchPlaceholder}
          </span>
        </div>
      ) : null}
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        {children}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="cursor-pointer">
              <Avatar className="h-10 w-10 border">
                <AvatarFallback className="brand-gradient font-heading text-[13px] font-bold text-white">
                  {session.initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="font-heading text-sm font-semibold">{session.name}</div>
              <div className="text-text-dim text-xs font-normal">
                {session.role} · {session.department}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={session.portal === "admin" ? "/settings" : "/profile"}>
                <User className="h-4 w-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                logout();
                router.replace("/");
              }}
            >
              <LogOut className="h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
