"use client";

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export default function HeatmapCalendar({ counts, weeks = 12 }: { counts: Record<string, number>; weeks?: number }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days: Date[] = [];
  const totalDays = weeks * 7;
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  // Pad to start on Sunday for a clean grid
  const startPad = days[0].getDay();
  const padded: (Date | null)[] = [...Array(startPad).fill(null), ...days];

  const max = Math.max(1, ...Object.values(counts));

  function levelFor(count: number): string {
    if (count === 0) return "var(--surface-2)";
    const pct = count / max;
    if (pct > 0.75) return "var(--accent)";
    if (pct > 0.45) return "var(--accent)";
    if (pct > 0.15) return "var(--accent-soft)";
    return "var(--accent-soft)";
  }
  function opacityFor(count: number): number {
    if (count === 0) return 1;
    const pct = count / max;
    return 0.4 + pct * 0.6;
  }

  const columns: (Date | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) columns.push(padded.slice(i, i + 7));

  return (
    <div className="scrollbar-thin overflow-x-auto">
      <div className="flex gap-1" role="img" aria-label="Activity over the last few weeks">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1">
            {col.map((d, di) => {
              if (!d) return <div key={di} className="h-3 w-3" />;
              const count = counts[dayKey(d)] ?? 0;
              return (
                <div
                  key={di}
                  title={`${d.toLocaleDateString()}: ${count} attempt${count === 1 ? "" : "s"}`}
                  className="h-3 w-3 rounded-sm"
                  style={{ background: levelFor(count), opacity: opacityFor(count) }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
