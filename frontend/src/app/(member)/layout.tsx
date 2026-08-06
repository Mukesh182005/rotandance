import { RequireSession } from "@/components/layout/require-session";
import { MemberShell } from "@/components/layout/member-shell";

export default function MemberGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireSession portal="member">
      <MemberShell>{children}</MemberShell>
    </RequireSession>
  );
}
