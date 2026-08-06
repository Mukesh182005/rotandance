import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  value,
  label,
  hint,
  live,
  highlight,
  className,
}: {
  icon?: LucideIcon;
  value: React.ReactNode;
  label: string;
  hint?: string;
  live?: boolean;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass-card relative overflow-hidden p-5",
        highlight && "border-brand/30 shadow-[0_0_40px_-16px_rgba(158,27,71,0.6)]",
        className,
      )}
    >
      {live ? (
        <div className="text-brand-pink absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-semibold">
          <span className="live-dot" />
          LIVE
        </div>
      ) : null}
      {Icon ? (
        <div className="border-brand/30 bg-brand/15 text-brand-pink flex h-10 w-10 items-center justify-center rounded-xl border">
          <Icon className="h-[19px] w-[19px]" />
        </div>
      ) : null}
      <div className="font-heading mt-3.5 text-[28px] leading-none font-bold">
        {value}
      </div>
      <div className="text-text-muted mt-1 text-[13px]">{label}</div>
      {hint ? (
        <div className="text-brand-hover mt-2 text-[11.5px] font-semibold">{hint}</div>
      ) : null}
    </div>
  );
}
