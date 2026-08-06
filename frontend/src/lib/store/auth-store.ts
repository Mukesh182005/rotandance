"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session } from "@/lib/data";

interface AuthState {
  session: Session | null;
  hasHydrated: boolean;
  login: (session: Session) => void;
  logout: () => void;
  updateSession: (partial: Partial<Session>) => void;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      hasHydrated: false,
      login: (session) => set({ session }),
      logout: () => set({ session: null }),
      updateSession: (partial) =>
        set((state) => ({
          session: state.session ? { ...state.session, ...partial } : null,
        })),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "rcaems-session",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
