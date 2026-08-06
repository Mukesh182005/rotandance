"use client";

import * as React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar as CalendarIcon,
  Cpu,
  GraduationCap,
  HeartHandshake,
  Leaf,
  MapPin,
  Plus,
  Sparkles,
  Users as UsersIcon,
} from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/lib/store/auth-store";
import { useAppStore } from "@/lib/store/app-store";
import type { EventStatus } from "@/lib/data";
import { cn } from "@/lib/utils";

const TYPE_ICON: Record<string, typeof UsersIcon> = {
  Community: HeartHandshake,
  Meeting: UsersIcon,
  Technical: Cpu,
  Environment: Leaf,
  Service: Sparkles,
  Club: GraduationCap,
};

const FILTERS: ("All" | EventStatus)[] = ["All", "Upcoming", "Live", "Past"];

const schema = z.object({
  title: z.string().min(2, "Give the event a name"),
  type: z.string().min(1, "Pick a category"),
  date: z.string().min(2, "e.g. Aug 24"),
  time: z.string().min(2, "e.g. 4:00 PM"),
  venue: z.string().min(2, "Where is it happening?"),
});
type FormValues = z.infer<typeof schema>;

export default function EventsPage() {
  const session = useAuthStore((s) => s.session)!;
  const events = useAppStore((s) => s.events);
  const addEvent = useAppStore((s) => s.addEvent);

  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All");
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: "Meeting" },
  });

  const filtered = events.filter((e) => {
    if (filter !== "All" && e.status !== filter) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const onSubmit = handleSubmit((values) => {
    addEvent({
      title: values.title,
      type: values.type,
      date: values.date,
      time: values.time,
      venue: values.venue,
      status: "Upcoming",
      attendeeInitials: [],
      attendeeExtra: 0,
    });
    toast.success("Event created", { description: values.title });
    reset({ title: "", type: "Meeting", date: "", time: "", venue: "" });
    setOpen(false);
  });

  return (
    <>
      <Topbar title="Events" searchPlaceholder="Search events…" session={session}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="brand-gradient gap-2 rounded-full text-white">
              <Plus className="h-4 w-4" /> Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new event</DialogTitle>
              <DialogDescription>
                It&apos;ll appear at the top of the list as Upcoming.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="title">Event name</Label>
                <Input
                  id="title"
                  placeholder="Tree Plantation Drive"
                  {...register("title")}
                />
                {errors.title ? (
                  <p className="text-destructive text-xs">{errors.title.message}</p>
                ) : null}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select
                    defaultValue="Meeting"
                    onValueChange={(v) => setValue("type", v, { shouldValidate: true })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(TYPE_ICON).map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" placeholder="Aug 24" {...register("date")} />
                  {errors.date ? (
                    <p className="text-destructive text-xs">{errors.date.message}</p>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" placeholder="4:00 PM" {...register("time")} />
                  {errors.time ? (
                    <p className="text-destructive text-xs">{errors.time.message}</p>
                  ) : null}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="venue">Venue</Label>
                  <Input id="venue" placeholder="Seminar Hall 2" {...register("venue")} />
                  {errors.venue ? (
                    <p className="text-destructive text-xs">{errors.venue.message}</p>
                  ) : null}
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="brand-gradient w-full text-white"
                >
                  {isSubmitting ? "Creating…" : "Create Event"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Topbar>

      <div className="flex-1 space-y-5 px-5 py-6 lg:px-7">
        <div className="flex flex-wrap items-center gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "text-text-muted rounded-full px-4 py-2 text-[12.5px] font-semibold",
                filter === f
                  ? "brand-gradient text-white shadow-[0_8px_20px_-8px_rgba(158,27,71,0.8)]"
                  : "border bg-white/[0.03]",
              )}
            >
              {f === "All" ? "All Events" : f}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-text-dim text-[12.5px]">
            {events.length} events this semester
          </span>
          <div className="hidden items-center gap-2 rounded-xl border bg-white/[0.03] px-3 py-2 sm:flex">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="h-auto w-40 border-0 bg-transparent p-0 text-[13px] shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card text-text-dim p-14 text-center text-sm">
            No events match this filter yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => {
              const Icon = TYPE_ICON[e.type] ?? CalendarIcon;
              const past = e.status === "Past";
              return (
                <div
                  key={e.id}
                  className={cn(
                    "glass-card overflow-hidden p-0",
                    e.status === "Live" &&
                      "border-brand/35 shadow-[0_0_40px_-18px_rgba(158,27,71,0.7)]",
                    past && "opacity-80",
                  )}
                >
                  <div
                    className="relative flex h-24 items-start justify-between p-3.5"
                    style={{
                      background:
                        e.status === "Live"
                          ? "radial-gradient(120% 140% at 20% 0, rgba(193,39,90,0.55), rgba(60,16,32,0.6))"
                          : "linear-gradient(135deg, rgba(60,60,66,0.5), rgba(20,20,24,0.6))",
                    }}
                  >
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-bold backdrop-blur-md",
                        e.status === "Live"
                          ? "border-brand/50 bg-background/55 text-brand-pink-2"
                          : "bg-background/55 text-text-muted border-white/15",
                      )}
                    >
                      {e.status === "Live" ? <span className="live-dot" /> : null}
                      {e.status === "Past" ? "COMPLETED" : e.status.toUpperCase()}
                    </span>
                    <Icon className="h-6 w-6 text-white/85" />
                  </div>
                  <div className="p-4">
                    <div
                      className={cn(
                        "font-heading text-[15px] font-semibold",
                        past && "text-text-muted",
                      )}
                    >
                      {e.title}
                    </div>
                    <div className="text-text-dim mt-2 flex items-center gap-2 text-[12px]">
                      <CalendarIcon className="h-[13px] w-[13px]" /> {e.date} · {e.time}
                    </div>
                    {e.venue !== "—" ? (
                      <div className="text-text-dim mt-1.5 flex items-center gap-2 text-[12px]">
                        <MapPin className="h-[13px] w-[13px]" /> {e.venue}
                      </div>
                    ) : null}
                    <div className="mt-3.5 flex items-center justify-between">
                      {past ? (
                        <span className="text-text-faint text-[11px]">
                          {e.attendedCount} attended
                        </span>
                      ) : (
                        <div className="flex">
                          {e.attendeeInitials.map((init, i) => (
                            <Avatar
                              key={i}
                              className="h-[26px] w-[26px] border-2"
                              style={{
                                marginLeft: i ? -8 : 0,
                                borderColor: "var(--card)",
                              }}
                            >
                              <AvatarFallback className="brand-gradient font-heading text-[9px] font-bold text-white">
                                {init}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {e.attendeeExtra ? (
                            <span
                              className="text-text-muted flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 bg-white/8 text-[9px] font-semibold"
                              style={{ marginLeft: -8, borderColor: "var(--card)" }}
                            >
                              +{e.attendeeExtra}
                            </span>
                          ) : null}
                        </div>
                      )}
                      <span className="text-text-muted text-[11px] font-semibold">
                        {e.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
