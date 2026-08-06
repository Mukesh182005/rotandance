"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";

export default function CertificatesPage() {
  const router = useRouter();
  const session = useAuthStore((s) => s.session);

  React.useEffect(() => {
    router.replace(session?.portal === "member" ? "/me" : "/admin");
  }, [session, router]);

  return null;
}
