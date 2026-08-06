import { RequireSession } from "@/components/layout/require-session";
import { AdaptiveShell } from "@/components/layout/adaptive-shell";

export default function SharedGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireSession portal="any">
      <AdaptiveShell>{children}</AdaptiveShell>
    </RequireSession>
  );
}
