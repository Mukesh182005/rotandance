"use client";

import * as React from "react";
import { Award, Droplet, ShieldQuestion, Target } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { useAuthStore } from "@/lib/store/auth-store";
import { useAppStore } from "@/lib/store/app-store";
import { ACHIEVEMENTS, EVENTS, MEMBER_PROFILE, type Achievement } from "@/lib/data";
import { cn } from "@/lib/utils";

const ACH_ICON: Record<Achievement["icon"], typeof Award> = {
  medal: Award,
  drop: Droplet,
  shield: ShieldQuestion,
  target: Target,
};

export default function MemberHomePage() {
  const session = useAuthStore((s) => s.session)!;
  const rsvps = useAppStore((s) => s.rsvps);
  const toggleRsvp = useAppStore((s) => s.toggleRsvp);

  const attendancePct = Math.round(
    (MEMBER_PROFILE.eventsAttended / MEMBER_PROFILE.eventsTotal) * 100,
  );
  const upcoming = EVENTS.filter((e) => e.status !== "Past").slice(0, 3);

  return (
    <>
      <Topbar title="Home" session={session} />

      <div className="flex-1 space-y-5 px-5 py-6 lg:px-7">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            Hi, {session.name.split(" ")[0]}
          </h1>
          <p className="text-text-dim mt-1 text-[13.5px]">
            You&apos;re on a {MEMBER_PROFILE.streak}-event streak. Keep showing up for the
            club!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="glass-card border-brand/24 flex flex-col sm:flex-row items-center gap-6 p-6">
            <div
              className="relative flex h-[130px] w-[130px] shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(var(--brand-hover) 0% ${attendancePct}%, rgba(255,255,255,0.07) ${attendancePct}% 100%)`,
                boxShadow: "0 0 40px -12px rgba(193,39,90,0.6)",
              }}
            >
              <div className="flex h-[102px] w-[102px] flex-col items-center justify-center rounded-full bg-[#121014]">
                <span className="font-heading text-3xl font-extrabold">
                  {attendancePct}%
                </span>
                <span className="text-text-dim mt-1 text-[10.5px]">attendance</span>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-heading text-lg font-semibold">This semester</div>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <dt className="text-text-dim text-xs">Events attended</dt>
                  <dd className="font-semibold text-base mt-1">
                    {MEMBER_PROFILE.eventsAttended} / {MEMBER_PROFILE.eventsTotal}
                  </dd>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <dt className="text-text-dim text-xs">Volunteer hours</dt>
                  <dd className="font-semibold text-base mt-1">{MEMBER_PROFILE.volunteerHours} h</dd>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <dt className="text-text-dim text-xs">Current streak</dt>
                  <dd className="text-brand-pink font-semibold text-base mt-1">
                    {MEMBER_PROFILE.streak} events
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="glass-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-heading text-[15px] font-semibold">
                Upcoming for you
              </div>
              <span className="text-brand-hover text-xs font-semibold">See all</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {upcoming.map((e, i) => {
                const rsvped = !!rsvps[e.id];
                return (
                  <div
                    key={e.id}
                    className={cn(
                      "flex items-center gap-3.5 rounded-2xl border p-3",
                      i === 0
                        ? "border-brand/25 bg-brand/8"
                        : "border-white/6 bg-white/2",
                    )}
                  >
                    <div className="border-brand/30 bg-brand/16 text-brand-pink flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border">
                      <span className="text-[9px] leading-none">
                        {e.date.split(" ")[0].toUpperCase()}
                      </span>
                      <span className="font-heading text-[15px] leading-none font-bold">
                        {e.date.split(" ")[1]}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-semibold">{e.title}</div>
                      <div className="text-text-dim text-[11.5px]">
                        {e.time} · {i === 0 ? "You're volunteering" : e.venue}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleRsvp(e.id)}
                      className={cn(
                        "shrink-0 rounded-full px-3 py-1.5 text-[10.5px] font-bold",
                        rsvped
                          ? "border-brand/45 bg-brand/20 text-brand-pink-2 border"
                          : "text-brand-hover",
                      )}
                    >
                      {rsvped ? "RSVP'd" : "RSVP"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="font-heading mb-4 text-[15px] font-semibold">
              Achievements
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((a) => {
                const Icon = ACH_ICON[a.icon];
                return (
                  <div
                    key={a.id}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center",
                      a.earned
                        ? "border-brand/22 bg-brand/8"
                        : "border-white/6 bg-white/2",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-[42px] w-[42px] items-center justify-center rounded-full",
                        a.earned
                          ? "brand-gradient text-white"
                          : "text-text-dim bg-white/6",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={cn(
                        "text-[11.5px] font-semibold",
                        !a.earned && "text-text-dim",
                      )}
                    >
                      {a.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
