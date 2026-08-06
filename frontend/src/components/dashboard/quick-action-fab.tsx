"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, Plus, UserPlus, ScanLine } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ACTIONS = [
  { key: "event", label: "Create Event", icon: CalendarPlus, href: "/events" },
  { key: "attendance", label: "Attendance Log", icon: ScanLine, href: "/attendance" },
  { key: "member", label: "Add Member", icon: UserPlus, href: "/members" },
];

export function QuickActionFab() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <div className="fixed right-6 bottom-[84px] z-30 flex flex-col items-end gap-3.5 lg:right-9 lg:bottom-9">
      {open
        ? ACTIONS.map((action) => (
            <button
              key={action.key}
              type="button"
              onClick={() => {
                setOpen(false);
                toast.info(action.label, { description: "Heading over now…" });
                router.push(action.href);
              }}
              className="flex items-center gap-2.5"
            >
              <span className="bg-popover/95 text-foreground rounded-full border px-3.5 py-2 text-[12.5px] font-semibold shadow-lg backdrop-blur-md">
                {action.label}
              </span>
              <span className="border-brand/40 bg-brand/16 text-brand-pink flex h-[46px] w-[46px] items-center justify-center rounded-full border">
                <action.icon className="h-[19px] w-[19px]" />
              </span>
            </button>
          ))
        : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="brand-gradient flex h-[60px] w-[60px] items-center justify-center rounded-full text-white shadow-[0_16px_40px_-10px_rgba(158,27,71,0.9)]"
        aria-label="Quick actions"
      >
        <Plus
          className={cn("h-[26px] w-[26px] transition-transform", open && "rotate-45")}
        />
      </button>
    </div>
  );
}
