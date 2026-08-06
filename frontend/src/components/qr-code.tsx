"use client";

import * as React from "react";

/**
 * Deterministic, decorative "QR-style" glyph. It is not a real scannable QR
 * code — it reproduces the look used throughout the RCAEMS design (finder
 * squares + a pseudo-random dot field seeded per event/member) with a tiny
 * linear congruential generator so the same seed always renders identically.
 */
export function QrCode({ seed, className }: { seed: number; className?: string }) {
  const cells = React.useMemo(() => buildQr(seed), [seed]);

  return (
    <svg
      viewBox={`0 0 ${GRID} ${GRID}`}
      width="100%"
      height="100%"
      className={className}
      style={{ display: "block" }}
      role="img"
      aria-label="QR code"
    >
      {cells}
    </svg>
  );
}

const GRID = 25;

function buildQr(seed: number) {
  const n = GRID;
  const cell = 1;
  const rects: React.ReactNode[] = [];
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if ((x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9)) continue;
      if (rnd() > 0.52) {
        rects.push(
          <rect
            key={`${x}-${y}`}
            x={x * cell + cell * 0.12}
            y={y * cell + cell * 0.12}
            width={cell * 0.76}
            height={cell * 0.76}
            rx={cell * 0.22}
            className="fill-foreground/85"
          />,
        );
      }
    }
  }

  const finder = (gx: number, gy: number, key: string) => {
    rects.push(
      <rect
        key={`fb-${key}`}
        x={gx * cell}
        y={gy * cell}
        width={cell * 7}
        height={cell * 7}
        rx={cell * 1.6}
        fill="none"
        stroke="var(--brand-hover)"
        strokeWidth={cell}
      />,
    );
    rects.push(
      <rect
        key={`fi-${key}`}
        x={(gx + 2) * cell}
        y={(gy + 2) * cell}
        width={cell * 3}
        height={cell * 3}
        rx={cell * 0.9}
        fill="var(--brand-hover)"
      />,
    );
  };
  finder(0, 0, "tl");
  finder(n - 7, 0, "tr");
  finder(0, n - 7, "bl");

  return rects;
}
