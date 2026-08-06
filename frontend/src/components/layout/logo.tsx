import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ subtitle, className }: { subtitle?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative h-8 w-36 shrink-0 flex items-center justify-start">
        <Image
          src="/rotaract-official-logo.png"
          alt="Rotaract Atria Institute of Technology Official Logo"
          width={144}
          height={32}
          className="object-contain object-left"
          priority
        />
      </div>
      {subtitle ? (
        <div className="text-text-dim text-[10px] font-semibold border-l border-white/10 pl-2">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
