import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ComingSoon({
  icon: Icon,
  title,
  description,
  backHref,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  backHref: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-24 text-center">
      <div className="brand-gradient flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-[0_16px_40px_-14px_rgba(158,27,71,0.9)]">
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <h1 className="font-heading text-xl font-bold">{title}</h1>
        <p className="text-text-dim mx-auto mt-2 max-w-sm text-sm">{description}</p>
      </div>
      <Button asChild className="brand-gradient text-white">
        <Link href={backHref}>Back to dashboard</Link>
      </Button>
    </div>
  );
}
