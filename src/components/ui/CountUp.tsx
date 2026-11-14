"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ value, durationMs = 800, className }: { value: number; durationMs?: number; className?: string }) {
  const [display, setDisplay] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const from = 0;
    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - pct, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (pct < 1) frame.current = requestAnimationFrame(tick);
    }
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value, durationMs]);

  return <span className={className}>{display}</span>;
}
