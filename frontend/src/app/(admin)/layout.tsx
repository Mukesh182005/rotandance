import { RequireSession } from "@/components/layout/require-session";
import { AdminShell } from "@/components/layout/admin-shell";

export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireSession portal="admin">
      <AdminShell>{children}</AdminShell>
    </RequireSession>
  );
}
