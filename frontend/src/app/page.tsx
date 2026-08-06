"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/auth-store";
import { useSettingsStore } from "@/lib/store/settings-store";
import { DEMO_ADMIN, DEMO_MEMBER, SUPER_ADMIN, SUPER_ADMIN_CREDENTIALS, type Portal } from "@/lib/data";

const schema = z.object({
  username: z.string().min(2, "Enter your username or email"),
  password: z.string().min(1, "Enter your password"),
});
type FormValues = z.infer<typeof schema>;

const BACKGROUND_STYLES = {
  "Rotaract Glow":
    "radial-gradient(900px 520px at 22% 18%, rgba(193,39,90,0.30), transparent 55%), radial-gradient(760px 620px at 88% 92%, rgba(120,20,55,0.28), transparent 55%), radial-gradient(600px 600px at 60% 40%, rgba(158,27,71,0.16), transparent 60%), var(--background)",
  "Deep Midnight":
    "radial-gradient(900px 520px at 50% 20%, rgba(30,30,40,0.8), #09090b 70%)",
  "Royal Gold Accent":
    "radial-gradient(800px 500px at 20% 20%, rgba(231,192,99,0.25), transparent 55%), radial-gradient(700px 600px at 80% 80%, rgba(193,39,90,0.25), transparent 55%), var(--background)",
  "Glassmorphism Dark":
    "linear-gradient(135deg, rgba(15,15,20,0.95), rgba(8,8,12,0.98))",
};

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const session = useAuthStore((s) => s.session);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const loginDesign = useSettingsStore((s) => s.loginPageDesign);

  const [mounted, setMounted] = React.useState(false);
  const [portal, setPortal] = React.useState<Portal>("admin");
  const [showPw, setShowPw] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (loginDesign?.defaultPortalTab) {
      setPortal(loginDesign.defaultPortalTab);
    }
  }, [loginDesign?.defaultPortalTab]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: "presidentnigesh@racatria.org", password: "12345678" },
  });

  React.useEffect(() => {
    if (hasHydrated && session) {
      router.replace(session.portal === "admin" ? "/admin" : "/me");
    }
  }, [hasHydrated, session, router]);

  if (!mounted) {
    return (
      <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-10">
        <div className="glass-panel relative w-full max-w-[440px] px-8 py-10 shadow-2xl sm:px-10 flex items-center justify-center min-h-[460px]">
          <div className="font-heading text-brand-pink text-sm font-semibold animate-pulse">
            Loading portal...
          </div>
        </div>
      </main>
    );
  }

  const onSubmit = handleSubmit(async (data) => {
    await new Promise((r) => setTimeout(r, 500));
    const inputUser = data.username.toLowerCase().trim();

    if (
      inputUser === SUPER_ADMIN_CREDENTIALS.email ||
      inputUser === "presidentnigesh" ||
      inputUser === "superadmin" ||
      inputUser.includes("nigesh")
    ) {
      if (data.password && data.password !== SUPER_ADMIN_CREDENTIALS.password && data.password !== "rotaract2026") {
        toast.error("Invalid password", {
          description: `Super Admin password is ${SUPER_ADMIN_CREDENTIALS.password}`,
        });
        return;
      }
      login(SUPER_ADMIN);
      toast.success(`Welcome back, ${SUPER_ADMIN.name}`, {
        description: "Super Admin console unlocked.",
      });
      router.push("/admin");
      return;
    }

    const demo = portal === "admin" ? DEMO_ADMIN : DEMO_MEMBER;
    login(demo);
    toast.success(`Welcome back, ${demo.name.split(" ")[0]}`, {
      description:
        portal === "admin" ? "Admin console unlocked." : "Member portal unlocked.",
    });
    router.push(portal === "admin" ? "/admin" : "/me");
  });

  return (
    <main
      suppressHydrationWarning
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-10"
      style={{
        background: BACKGROUND_STYLES[loginDesign?.loginBackgroundStyle || "Rotaract Glow"] || BACKGROUND_STYLES["Rotaract Glow"],
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[520px] w-[520px] opacity-40"
        style={{ animation: "rc-spin 90s linear infinite" }}
      >
        <RingArt />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[460px] w-[460px] opacity-30"
        style={{ animation: "rc-spin 130s linear infinite reverse" }}
      >
        <RingArt />
      </div>

      <div suppressHydrationWarning className="glass-panel relative w-full max-w-[440px] px-8 py-10 shadow-2xl sm:px-10">
        <div className="mb-7 flex items-center justify-between gap-3">
          <div className="relative h-14 w-full max-w-[260px] flex items-center justify-start">
            <Image
              src="/rotaract-official-logo.png"
              alt="Rotaract Atria Institute of Technology Official Logo"
              width={260}
              height={56}
              className="object-contain object-left drop-shadow-md brightness-110 contrast-105"
              priority
            />
          </div>
          <div className="bg-brand/30 h-10 w-px shrink-0" />
          <div className="font-heading text-brand-hover text-[12px] leading-[1.15] font-extrabold italic uppercase whitespace-pre-line shrink-0 text-right">
            {loginDesign.loginSubheading || "CREATE\nLASTING\nIMPACT"}
          </div>
        </div>

        <p className="font-heading mb-6 text-center text-[15px] font-bold tracking-[3px] uppercase">
          {loginDesign.loginTitle || "SIGN IN"}
        </p>

        {loginDesign.showPortalTabs && (
          <Tabs
            value={portal}
            onValueChange={(v) => setPortal(v as Portal)}
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin">
                <ShieldCheck className="h-3.5 w-3.5" /> Admin portal
              </TabsTrigger>
              <TabsTrigger value="member">
                <User className="h-3.5 w-3.5" /> Member portal
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="username">Username / Email</Label>
            <div className="relative">
              <User className="text-text-dim absolute top-1/2 left-3.5 h-[17px] w-[17px] -translate-y-1/2" />
              <Input
                id="username"
                placeholder={portal === "admin" ? "presidentnigesh@racatria.org" : "rohan.mehta"}
                className="pl-10"
                autoComplete="username"
                {...register("username")}
              />
            </div>
            {errors.username ? (
              <p className="text-destructive text-xs">{errors.username.message}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="text-text-dim absolute top-1/2 left-3.5 h-[17px] w-[17px] -translate-y-1/2" />
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                className="px-10"
                autoComplete="current-password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="text-text-dim hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? (
                  <EyeOff className="h-[18px] w-[18px]" />
                ) : (
                  <Eye className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>
            {errors.password ? (
              <p className="text-destructive text-xs">{errors.password.message}</p>
            ) : (
              <p className="text-text-faint text-[11.5px]">
                {loginDesign.loginNoticeText || "Super Admin: presidentnigesh@racatria.org | 12345678"}
              </p>
            )}
            <div className="pt-1 text-right">
              <span className="text-brand-hover cursor-not-allowed text-[12.5px] font-semibold">
                forgot password?
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="brand-gradient h-[46px] w-full rounded-2xl text-[15px] font-bold text-white shadow-[0_16px_38px_-10px_rgba(158,27,71,0.85)]"
          >
            {isSubmitting ? "Signing in…" : (loginDesign.loginButtonLabel || "Sign In")}
          </Button>

          <p className="text-text-faint text-center text-[12.5px]">
            New member?{" "}
            <span className="text-brand-hover cursor-not-allowed font-semibold">
              Request access
            </span>
          </p>
        </form>
      </div>
    </main>
  );
}

function RingArt() {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" fill="none">
      <circle
        cx="300"
        cy="300"
        r="292"
        stroke="rgba(231,192,99,0.5)"
        strokeWidth="16"
        strokeDasharray="5 27"
      />
      <circle cx="300" cy="300" r="270" stroke="rgba(231,192,99,0.2)" strokeWidth="2" />
      <circle cx="300" cy="300" r="250" stroke="rgba(193,39,90,0.45)" strokeWidth="2" />
      <circle
        cx="300"
        cy="300"
        r="158"
        stroke="rgba(231,192,99,0.35)"
        strokeWidth="9"
        strokeDasharray="4 22"
      />
      <circle cx="300" cy="300" r="140" stroke="rgba(193,39,90,0.4)" strokeWidth="2" />
      <circle cx="300" cy="300" r="70" stroke="rgba(231,192,99,0.3)" strokeWidth="2" />
    </svg>
  );
}
