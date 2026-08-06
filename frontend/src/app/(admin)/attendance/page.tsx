"use client";

import * as React from "react";
import { toast } from "sonner";
import { CheckCircle2, Search, ShieldCheck, UserCheck } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/lib/store/auth-store";
import { useAppStore } from "@/lib/store/app-store";
import {
  DASHBOARD_STATS,
  LIVE_EVENT,
  MEMBERS,
  type CheckIn,
} from "@/lib/data";

const STATUS_STYLES: Record<CheckIn["status"], string> = {
  Present: "text-brand-pink bg-brand/16 border-brand/30",
  Volunteer: "text-brand-pink-2 bg-brand/22 border-brand/45",
  Late: "text-text-muted bg-white/5 border-white/12",
  Absent: "text-text-dim bg-white/3 border-white/10",
};

export default function AttendancePage() {
  const session = useAuthStore((s) => s.session)!;
  const checkins = useAppStore((s) => s.checkins);
  const present = useAppStore((s) => s.present);
  const bumpPresent = useAppStore((s) => s.bumpPresent);
  const addCheckin = useAppStore((s) => s.addCheckin);

  const [search, setSearch] = React.useState("");

  const checkedInNames = React.useMemo(
    () => new Set(checkins.map((c) => c.name)),
    [checkins],
  );

  const notYetIn = MEMBERS.filter((m) => !checkedInNames.has(m.name)).filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  function markPresent(
    name: string,
    initials: string,
    department: string,
    method: CheckIn["method"],
  ) {
    addCheckin({
      name,
      initials,
      department,
      time: nowLabel(),
      method,
      status: "Present",
    });
    bumpPresent();
    toast.success(`${name} checked in`, { description: method });
  }

  return (
    <>
      <Topbar
        title="Attendance"
        searchPlaceholder="Search member to mark…"
        session={session}
      />

      <div className="flex-1 space-y-5 px-5 py-6 lg:px-7">
        {/* session banner */}
        <div
          className="glass-card border-brand/28 flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
          style={{ boxShadow: "0 0 50px -20px rgba(158,27,71,0.7)" }}
        >
          <div className="border-brand/40 bg-brand/18 text-brand-pink flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="font-heading text-[19px] font-bold">{LIVE_EVENT.title}</div>
              <span className="border-brand/50 bg-brand/20 text-brand-pink-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold">
                <span className="live-dot" /> LIVE
              </span>
            </div>
            <div className="text-text-dim mt-1 text-[13px]">
              {LIVE_EVENT.type} · {LIVE_EVENT.venue} · {LIVE_EVENT.window} · Coordinator:{" "}
              {LIVE_EVENT.coordinator}
            </div>
          </div>
          <div className="text-right">
            <div className="font-heading text-[30px] leading-none font-extrabold">
              {present}
              <span className="text-text-dim text-base font-semibold">
                /{DASHBOARD_STATS.capacity}
              </span>
            </div>
            <div className="text-text-dim mt-1 text-[11.5px]">checked in</div>
          </div>
          <Button variant="outline" className="shrink-0 rounded-full">
            End Session
          </Button>
        </div>

        <div className="space-y-5">
          <div className="glass-card p-4">
            <div className="mb-3.5 flex items-center justify-between">
              <div className="font-heading text-sm font-bold">Manual Member Check-in</div>
              <span className="text-text-dim text-xs">Admin Verification</span>
            </div>
            <div className="mb-3 flex items-center gap-2 rounded-xl border bg-white/[0.03] px-3 py-2">
              <Search className="text-text-dim h-[15px] w-[15px]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search member by name to mark attendance…"
                className="placeholder:text-text-faint flex-1 bg-transparent text-[13px] outline-none"
              />
            </div>
            <div className="flex max-h-72 flex-col gap-1.5 overflow-y-auto">
              {notYetIn.length === 0 ? (
                <p className="text-text-dim py-6 text-center text-sm">
                  Everyone matching &ldquo;{search}&rdquo; is already checked in.
                </p>
              ) : (
                notYetIn.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-3 rounded-xl px-2.5 py-2 hover:bg-white/[0.03]"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="brand-gradient font-heading text-[11px] font-bold text-white">
                        {m.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold">{m.name}</div>
                      <div className="text-text-dim text-[11px]">
                        {m.department} · {m.memberId}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-brand/40 bg-brand/14 text-brand-pink rounded-full"
                      onClick={() =>
                        markPresent(m.name, m.initials, m.department, "Manual")
                      }
                    >
                      Mark Present
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-card overflow-hidden p-0">
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <div className="font-heading text-[15px] font-semibold">Check-in Log</div>
              <span className="text-text-dim text-[11.5px]">Auto-refreshing</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="text-[10.5px] tracking-wide uppercase">
                  <TableHead>Member</TableHead>
                  <TableHead>Dept</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkins.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="brand-gradient font-heading text-[10px] font-bold text-white">
                            {c.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[13px] font-semibold">{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-text-muted">{c.department}</TableCell>
                    <TableCell className="text-text-muted">{c.time}</TableCell>
                    <TableCell className="text-text-dim">{c.method}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10.5px] font-semibold ${STATUS_STYLES[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

function nowLabel() {
  const d = new Date();
  return `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function formatCountdown(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
