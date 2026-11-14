"use client";

export default function LineChart({
  points,
  height = 160,
  color = "var(--accent)",
}: {
  points: { label: string; value: number }[];
  height?: number;
  color?: string;
}) {
  if (points.length === 0) {
    return <div className="flex h-40 items-center justify-center text-sm text-foreground-dim">No data yet.</div>;
  }
  const width = Math.max(240, points.length * 56);
  const padX = 24;
  const padY = 16;
  const max = 100;
  const min = 0;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const coords = points.map((p, i) => {
    const x = points.length === 1 ? padX + innerW / 2 : padX + (i / (points.length - 1)) * innerW;
    const y = padY + innerH - ((p.value - min) / (max - min)) * innerH;
    return { x, y, ...p };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${padY + innerH} L ${coords[0].x} ${padY + innerH} Z`;

  return (
    <div className="scrollbar-thin overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-40" style={{ width }} role="img" aria-label="Score trend over attempts">
        {[0, 25, 50, 75, 100].map((g) => {
          const y = padY + innerH - (g / 100) * innerH;
          return <line key={g} x1={padX} y1={y} x2={width - padX} y2={y} stroke="var(--border)" strokeWidth={1} />;
        })}
        <path d={areaPath} fill={color} opacity={0.08} />
        <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        {coords.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r={4} fill="var(--surface)" stroke={color} strokeWidth={2.5} />
            <text x={c.x} y={height - 2} textAnchor="middle" fontSize={9} fill="var(--foreground-dim)">
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
