"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { CheckCircle2, Trophy, Users, TrendingUp, CalendarDays } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/components/stat-card";
import { MiniCalendar } from "@/components/dashboard/mini-calendar";
import { QuickActionFab } from "@/components/dashboard/quick-action-fab";
import { AttendanceTrendChart } from "@/components/charts/attendance-trend-chart";
import { GrowthChart } from "@/components/charts/growth-chart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import { useAppStore } from "@/lib/store/app-store";
import {
  ATTENDANCE_TREND,
  DASHBOARD_STATS,
  EVENTS,
  GROWTH_TREND,
  TOP_VOLUNTEERS,
} from "@/lib/data";

export default function AdminDashboardPage() {
  const session = useAuthStore((s) => s.session)!;
  const present = useAppStore((s) => s.present);
  const bumpPresent = useAppStore((s) => s.bumpPresent);
  const checkins = useAppStore((s) => s.checkins);

  React.useEffect(() => {
    const t = setInterval(bumpPresent, 2600);
    return () => clearInterval(t);
  }, [bumpPresent]);

  const pct = Math.round((present / DASHBOARD_STATS.capacity) * 100);
  const eventDays = React.useMemo(
    () =>
      EVENTS.filter((e) => e.status !== "Past").map((e) => Number(e.date.split(" ")[1])),
    [],
  );

  return (
    <>
      <Topbar title="Dashboard" searchPlaceholder="Search anything…" session={session}>
        <Button
          variant="outline"
          className="border-brand/40 bg-brand/14 text-brand-pink hidden gap-2 rounded-full sm:flex"
        >
          <TrendingUp className="h-4 w-4" /> Quick Action
        </Button>
      </Topbar>

      <div className="flex-1 space-y-5 px-5 py-6 lg:px-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">
              Good {timeOfDay()}, {session.name.split(" ")[0]}
            </h1>
            <p className="text-text-dim mt-1 text-[13.5px]">
              {format(new Date(), "EEEE, d MMMM yyyy")} · Here&apos;s what&apos;s
              happening in your club today.
            </p>
          </div>
          <span className="border-brand/40 bg-brand/14 text-brand-pink inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12.5px] font-semibold">
            <span className="live-dot" /> Blood Donation Camp · Live
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={Users}
            value={DASHBOARD_STATS.totalMembers}
            label="Total Members"
            hint="↑ 6 this month"
          />
          <StatCard
            icon={CheckCircle2}
            value={
              <>
                {present}
                <span className="text-text-dim ml-1 text-[17px] font-semibold">
                  / {DASHBOARD_STATS.capacity}
                </span>
              </>
            }
            label="Present Today"
            hint="Checking in now…"
            live
            highlight
          />
          <StatCard
            icon={TrendingUp}
            value={`${DASHBOARD_STATS.attendanceRate}%`}
            label="Attendance Rate"
            hint="↑ 4% vs last month"
          />
          <StatCard
            icon={CalendarDays}
            value={DASHBOARD_STATS.upcomingEvents}
            label="Upcoming Events"
            hint="Next: Aug 05 · GBM"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <div className="font-heading text-[15px] font-semibold">
                  Attendance Trend
                </div>
                <span className="text-text-dim text-[11.5px]">
                  Last 6 months · hover for detail
                </span>
              </div>
              <div className="mt-2 h-[220px]">
                <AttendanceTrendChart data={ATTENDANCE_TREND} />
              </div>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <div className="font-heading text-[15px] font-semibold">
                  Monthly Growth
                </div>
                <span className="text-text-dim text-[11.5px]">New members joined</span>
              </div>
              <div className="mt-2 h-[220px]">
                <GrowthChart data={GROWTH_TREND} />
              </div>
            </div>
          </div>

          <div className="glass-card border-brand/25 flex flex-col p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-heading text-[15px] font-semibold">
                Live Attendance
              </div>
              <span className="text-brand-pink flex items-center gap-1.5 text-[11px] font-semibold">
                <span className="live-dot" /> Live
              </span>
            </div>
            <div className="font-heading text-[44px] leading-none font-extrabold">
              {present}
              <span className="text-text-dim text-xl font-semibold">
                {" "}
                /{DASHBOARD_STATS.capacity}
              </span>
            </div>
            <p className="text-text-dim my-3 text-[12.5px]">
              members present · Blood Donation Camp
            </p>
            <Progress
              value={pct}
              className="[&_[data-slot=progress-indicator]]:from-brand-hover [&_[data-slot=progress-indicator]]:to-brand h-2 [&_[data-slot=progress-indicator]]:bg-gradient-to-r"
            />
            <div className="bg-border my-4 h-px" />
            <div className="text-text-dim mb-3 text-[11px] font-semibold tracking-wide uppercase">
              Recent check-ins
            </div>
            <div className="flex flex-col gap-3">
              {checkins.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center gap-2.5">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="brand-gradient font-heading text-[11px] font-bold text-white">
                      {c.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold">{c.name}</div>
                    <div className="text-text-dim text-[11px]">
                      {c.department} · {c.time}
                    </div>
                  </div>
                  <span className="border-brand/30 bg-brand/16 text-brand-pink rounded-full border px-2.5 py-1 text-[10.5px] font-semibold">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
          <div className="glass-card p-5">
            <div className="font-heading mb-4 flex items-center gap-2 text-[15px] font-semibold">
              <Trophy className="text-gold h-4 w-4" /> Top Volunteers
            </div>
            <div className="flex flex-col gap-3.5">
              {TOP_VOLUNTEERS.map((v, i) => (
                <div key={v.name} className="flex items-center gap-3">
                  <span className="font-heading text-brand-hover w-4 text-[13px] font-bold">
                    {i + 1}
                  </span>
                  <Avatar className="h-[30px] w-[30px]">
                    <AvatarFallback className="brand-gradient font-heading text-[11px] font-bold text-white">
                      {v.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold">{v.name}</div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                      <div
                        className="brand-gradient h-full"
                        style={{
                          width: `${Math.round((v.hours / TOP_VOLUNTEERS[0].hours) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-text-muted text-[12px] font-semibold">
                    {v.hours}h
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-heading text-[15px] font-semibold">Recent Events</div>
              <Link href="/events" className="text-brand-hover text-xs font-semibold">
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {EVENTS.slice(0, 4).map((e) => (
                <div key={e.id} className="flex items-center gap-3">
                  <div className="border-brand/30 bg-brand/14 text-brand-pink flex h-9 w-9 items-center justify-center rounded-[11px] border">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold">{e.title}</div>
                    <div className="text-text-dim text-[11px]">
                      {e.type} · {e.date}
                    </div>
                  </div>
                  <StatusPill status={e.status} />
                </div>
              ))}
            </div>
          </div>

          <MiniCalendar eventDays={eventDays} />
        </div>
      </div>

      <QuickActionFab />
    </>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Live: "text-brand-pink bg-brand/18 border-brand/40",
    Upcoming: "text-text-muted bg-white/5 border-white/10",
    Past: "text-text-dim bg-white/4 border-white/10",
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${styles[status] ?? styles.Upcoming}`}
    >
      {status === "Past" ? "Done" : status}
    </span>
  );
}

function timeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}
