"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CHECKIN_LOG,
  EVENTS,
  MEMBERS,
  type CheckIn,
  type ClubEvent,
  type Member,
} from "@/lib/data";

let uid = 0;
export function nextId(prefix: string) {
  uid += 1;
  return `${prefix}-${Date.now().toString(36)}-${uid}`;
}

interface AppState {
  events: ClubEvent[];
  members: Member[];
  checkins: CheckIn[];
  present: number;
  rsvps: Record<string, boolean>;
  addEvent: (event: Omit<ClubEvent, "id">) => void;
  addMember: (member: Omit<Member, "id">) => void;
  addCheckin: (checkin: Omit<CheckIn, "id">) => void;
  bumpPresent: () => void;
  toggleRsvp: (eventId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      events: EVENTS,
      members: MEMBERS,
      checkins: CHECKIN_LOG,
      present: 84,
      rsvps: { e1: true },
      addEvent: (event) =>
        set({ events: [{ ...event, id: nextId("evt") }, ...get().events] }),
      addMember: (member) =>
        set({ members: [{ ...member, id: nextId("mem") }, ...get().members] }),
      addCheckin: (checkin) =>
        set({ checkins: [{ ...checkin, id: nextId("chk") }, ...get().checkins] }),
      bumpPresent: () => set((s) => ({ present: s.present >= 128 ? 96 : s.present + 1 })),
      toggleRsvp: (eventId) =>
        set((s) => ({ rsvps: { ...s.rsvps, [eventId]: !s.rsvps[eventId] } })),
    }),
    { name: "rcaems-app-data" },
  ),
);
