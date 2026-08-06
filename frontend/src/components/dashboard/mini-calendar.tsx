"use client";

import * as React from "react";
import {
  addMonths,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function MiniCalendar({ eventDays }: { eventDays: number[] }) {
  const [cursor, setCursor] = React.useState(() => new Date());
  const today = new Date();

  const monthStart = startOfMonth(cursor);
  const monthEnd = endOfMonth(cursor);
  const leadBlanks = getDay(monthStart);
  const daysInMonth = monthEnd.getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: leadBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="glass-card p-5">
      <div className="mb-3.5 flex items-center justify-between">
        <div className="font-heading text-[15px] font-semibold">
          {format(cursor, "MMMM yyyy")}
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setCursor((c) => subMonths(c, 1))}
            className="text-text-dim hover:text-foreground"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setCursor((c) => addMonths(c, 1))}
            className="text-text-dim hover:text-foreground"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mb-1.5 grid grid-cols-7 gap-[3px]">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="text-text-faint text-center text-[9.5px] font-semibold">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-[3px]">
        {cells.map((d, i) => {
          if (d == null) return <div key={i} />;
          const date = new Date(cursor.getFullYear(), cursor.getMonth(), d);
          const isToday = isSameDay(date, today);
          const hasEvent = eventDays.includes(d);
          return (
            <div
              key={i}
              className={cn(
                "text-text-muted relative flex h-[30px] items-center justify-center rounded-lg text-[11.5px]",
                isToday &&
                  "brand-gradient font-bold text-white shadow-[0_6px_16px_-6px_rgba(158,27,71,0.9)]",
              )}
            >
              {d}
              {hasEvent && !isToday ? (
                <span className="bg-brand-hover absolute bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
