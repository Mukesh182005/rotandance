"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function AttendanceTrendChart({ data }: { data: { m: string; v: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
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
          domain={[55, 100]}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}%`}
          tick={{ fill: "var(--text-faint)", fontSize: 10 }}
          width={40}
        />
        <Tooltip
          cursor={{ stroke: "var(--brand-hover)", strokeDasharray: "3 3" }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="glass-card rounded-lg border px-3 py-2 text-xs shadow-xl">
                <div className="font-heading text-foreground font-bold">
                  {payload[0].value}%
                </div>
                <div className="text-text-dim">{label}</div>
              </div>
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="v"
          stroke="var(--brand-hover)"
          strokeWidth={2.5}
          fill="url(#attendanceFill)"
          dot={{
            r: 3.5,
            fill: "var(--background)",
            stroke: "var(--brand-hover)",
            strokeWidth: 2,
          }}
          activeDot={{ r: 5, fill: "#fff", stroke: "var(--brand-hover)", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
