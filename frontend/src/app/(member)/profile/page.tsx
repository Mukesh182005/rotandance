"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Award,
  Droplet,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldQuestion,
  Target,
  CalendarDays,
} from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store/auth-store";
import { MEMBER_PROFILE, RECENT_ACTIVITY, type Achievement } from "@/lib/data";
import { cn } from "@/lib/utils";

const ACH_ICON: Record<Achievement["icon"], typeof Award> = {
  medal: Award,
  drop: Droplet,
  shield: ShieldQuestion,
  target: Target,
};

interface ProfileForm {
  email: string;
  phone: string;
  location: string;
}

export default function ProfilePage() {
  const session = useAuthStore((s) => s.session)!;
  const [editing, setEditing] = React.useState(false);
  const [profile, setProfile] = React.useState<ProfileForm>({
    email: MEMBER_PROFILE.email,
    phone: MEMBER_PROFILE.phone,
    location: MEMBER_PROFILE.location,
  });

  const { register, handleSubmit, reset } = useForm<ProfileForm>({
    defaultValues: profile,
  });

  const onSave = handleSubmit((values) => {
    setProfile(values);
    setEditing(false);
    toast.success("Profile updated");
  });

  return (
    <>
      <Topbar title="Profile" session={session} />

      <div className="flex-1 pb-10">
        <div
          className="relative h-[150px]"
          style={{
            background:
              "radial-gradient(120% 200% at 15% 0, rgba(193,39,90,0.55), rgba(60,16,32,0.5)), linear-gradient(120deg, #3a0f20, #0b0b0c)",
          }}
        >
          <Button
            variant="outline"
            className="bg-background/55 absolute top-4 right-5 gap-2 rounded-full border-white/16 backdrop-blur-md"
            onClick={() => {
              if (editing) {
                reset(profile);
              }
              setEditing((v) => !v);
            }}
          >
            <Pencil className="h-3.5 w-3.5" /> {editing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="-mt-9 px-5 lg:px-7">
          <div className="flex items-end gap-5">
            <Avatar className="border-background h-[104px] w-[104px] rounded-[28px] border-4 shadow-2xl">
              <AvatarFallback className="brand-gradient font-heading rounded-[24px] text-[34px] font-bold text-white">
                {session.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-heading text-[23px] font-bold">{session.name}</span>
                <span className="border-brand/45 bg-brand/20 text-brand-pink-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold">
                  {session.role}
                </span>
              </div>
              <div className="text-text-dim mt-1 text-[13px]">
                {session.memberId} · {session.department}, 2nd Year · Member since Aug
                2024
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            <ProfileStat
              label="Attendance"
              value={`${Math.round((MEMBER_PROFILE.eventsAttended / MEMBER_PROFILE.eventsTotal) * 100)}%`}
            />
            <ProfileStat label="Events" value={MEMBER_PROFILE.eventsAttended} />
            <ProfileStat label="Volunteer h" value={MEMBER_PROFILE.volunteerHours} />
            <ProfileStat label="Badges" value={MEMBER_PROFILE.badges} highlight />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr]">
            <div className="glass-card p-5">
              <div className="font-heading mb-4 text-[15px] font-semibold">Details</div>
              {editing ? (
                <form onSubmit={onSave} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" {...register("phone")} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" {...register("location")} />
                  </div>
                  <Button type="submit" className="brand-gradient w-full text-white">
                    Save changes
                  </Button>
                </form>
              ) : (
                <div className="text-text-muted flex flex-col gap-3.5 text-[13px]">
                  <div className="flex items-center gap-3">
                    <Mail className="text-text-dim h-4 w-4" /> {profile.email}
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-text-dim h-4 w-4" /> {profile.phone}
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-text-dim h-4 w-4" /> {profile.location}
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="text-text-dim h-4 w-4" /> Joined{" "}
                    {MEMBER_PROFILE.joined}
                  </div>
                </div>
              )}

              <div className="font-heading mt-6 mb-3.5 text-[15px] font-semibold">
                Badge Shelf
              </div>
              <div className="flex gap-2.5">
                {(["medal", "drop", "shield"] as Achievement["icon"][]).map((icon) => {
                  const Icon = ACH_ICON[icon];
                  return (
                    <span
                      key={icon}
                      className="brand-gradient flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_8px_18px_-8px_rgba(158,27,71,0.8)]"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  );
                })}
                <span className="font-heading text-text-dim flex h-11 w-11 items-center justify-center rounded-full border bg-white/5 text-xs font-bold">
                  +3
                </span>
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="font-heading mb-4 text-[15px] font-semibold">
                Recent Activity
              </div>
              <div className="flex flex-col">
                {RECENT_ACTIVITY.map((item, i) => (
                  <div key={item.id} className="flex gap-3.5">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          item.active
                            ? "bg-brand-hover shadow-[0_0_8px_var(--brand-hover)]"
                            : "bg-white/25",
                        )}
                      />
                      {i < RECENT_ACTIVITY.length - 1 ? (
                        <span className="w-0.5 flex-1 bg-white/8" />
                      ) : null}
                    </div>
                    <div className="pb-4">
                      <div className="text-[13px] font-semibold">{item.label}</div>
                      <div className="text-text-dim mt-0.5 text-[11.5px]">
                        {item.meta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileStat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={cn("glass-card p-4", highlight && "border-brand/28")}>
      <div className="text-text-dim text-xs">{label}</div>
      <div
        className={cn(
          "font-heading mt-1 text-2xl font-bold",
          highlight && "text-brand-pink",
        )}
      >
        {value}
      </div>
    </div>
  );
}
