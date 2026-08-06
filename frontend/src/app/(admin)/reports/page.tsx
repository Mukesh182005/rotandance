"use client";

import * as React from "react";
import { toast } from "sonner";
import { CalendarDays, Download, RefreshCw } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AttendanceTrendChart } from "@/components/charts/attendance-trend-chart";
import { GrowthChart } from "@/components/charts/growth-chart";
import { useAuthStore } from "@/lib/store/auth-store";
import {
  ATTENDANCE_TREND,
  DEPARTMENT_BREAKDOWN,
  GROWTH_TREND,
  REPORT_STATS,
} from "@/lib/data";

export default function ReportsPage() {
  const session = useAuthStore((s) => s.session)!;
  const [loading, setLoading] = React.useState(false);
  const maxDept = Math.max(...DEPARTMENT_BREAKDOWN.map((d) => d.count));

  function reload() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1900);
  }

  return (
    <>
      <Topbar title="Reports & Analytics" session={session}>
        <span className="text-text-muted hidden items-center gap-2 rounded-xl border bg-white/[0.03] px-3.5 py-2 text-[12.5px] sm:flex">
          <CalendarDays className="h-3.5 w-3.5" />{" "}
          {new Date().toLocaleDateString(undefined, { month: "short", year: "numeric" })}
        </span>
        <Button
          variant="outline"
          onClick={reload}
          className="border-brand/40 bg-brand/14 text-brand-pink gap-2 rounded-xl"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Reload
        </Button>
        <Button
          className="brand-gradient gap-2 rounded-xl text-white"
          onClick={() => {
            toast.info("Preparing export…", {
              description: "Opening the print dialog — choose “Save as PDF”.",
            });
            setTimeout(() => window.print(), 400);
          }}
        >
          <Download className="h-3.5 w-3.5" /> Export PDF
        </Button>
      </Topbar>

      <div className="flex-1 space-y-5 px-5 py-6 lg:px-7 print:px-0">
        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[104px] rounded-2xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
              <Skeleton className="h-[280px] rounded-2xl" />
              <Skeleton className="h-[280px] rounded-2xl" />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <ReportStat
                label="Avg Attendance"
                value={`${REPORT_STATS.avgAttendance}%`}
                hint="↑ 4% vs last month"
              />
              <ReportStat
                label="Events Held"
                value={REPORT_STATS.eventsHeld}
                hint="This semester"
              />
              <ReportStat
                label="Volunteer Hours"
                value={REPORT_STATS.volunteerHours.toLocaleString()}
                hint="↑ 210 this month"
              />
              <ReportStat
                label="Retention"
                value={`${REPORT_STATS.retention}%`}
                hint="Stable"
                muted
              />
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.55fr_1fr]">
              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <div className="font-heading text-[15px] font-semibold">
                    Attendance Trend
                  </div>
                  <span className="text-text-dim text-[11.5px]">
                    Last 6 months · hover
                  </span>
                </div>
                <div className="mt-2 h-[240px]">
                  <AttendanceTrendChart data={ATTENDANCE_TREND} />
                </div>
              </div>
              <div className="glass-card p-5">
                <div className="font-heading mb-4 text-[15px] font-semibold">
                  By Department
                </div>
                <div className="flex flex-col gap-3.5">
                  {DEPARTMENT_BREAKDOWN.map((d) => (
                    <div key={d.dept}>
                      <div className="mb-1.5 flex justify-between text-xs">
                        <span className="text-text-muted">{d.dept}</span>
                        <span className="text-text-dim">{d.count}</span>
                      </div>
                      <div className="h-[7px] overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="brand-gradient h-full rounded-full"
                          style={{ width: `${Math.round((d.count / maxDept) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <div className="font-heading text-[15px] font-semibold">
                  Monthly Growth
                </div>
                <span className="text-text-dim text-[11.5px]">
                  New members joined · hover
                </span>
              </div>
              <div className="mt-2 h-[220px]">
                <GrowthChart data={GROWTH_TREND} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function ReportStat({
  label,
  value,
  hint,
  muted,
}: {
  label: string;
  value: React.ReactNode;
  hint: string;
  muted?: boolean;
}) {
  return (
    <div className="glass-card p-4 sm:p-5">
      <div className="text-text-dim text-xs">{label}</div>
      <div className="font-heading mt-1.5 text-[28px] font-bold">{value}</div>
      <div
        className={`mt-1.5 text-[11.5px] font-semibold ${muted ? "text-text-dim" : "text-brand-pink"}`}
      >
        {hint}
      </div>
    </div>
  );
}
