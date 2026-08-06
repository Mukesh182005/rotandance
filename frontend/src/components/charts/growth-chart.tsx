"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function GrowthChart({ data }: { data: { m: string; v: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-hover)" />
            <stop offset="100%" stopColor="var(--brand-dark)" />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="m"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--text-dim)", fontSize: 11 }}
          dy={6}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--text-faint)", fontSize: 10 }}
          width={32}
        />
        <Tooltip
          cursor={{ fill: "var(--accent)", opacity: 0.15 }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="glass-card rounded-lg border px-3 py-2 text-xs shadow-xl">
                <div className="font-heading text-foreground font-bold">
                  +{payload[0].value}
                </div>
                <div className="text-text-dim">{label}</div>
              </div>
            );
          }}
        />
        <Bar dataKey="v" fill="url(#growthFill)" radius={[6, 6, 0, 0]} maxBarSize={38} />
      </BarChart>
    </ResponsiveContainer>
  );
}
