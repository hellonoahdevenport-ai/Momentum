"use client";

export default function RadarChart({ axes, size = 260 }: { axes: { label: string; value: number }[]; size?: number }) {
  const center = size / 2;
  const radius = size / 2 - 36;
  const n = axes.length;

  // Math.cos/Math.sin aren't guaranteed bit-identical across JS engines
  // (Node vs browser), which caused a hydration mismatch here — rounding
  // to 2 decimal places keeps server and client output identical.
  function round(n: number): number {
    return Math.round(n * 100) / 100;
  }
  function pointFor(i: number, value: number) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = (Math.max(0, Math.min(100, value)) / 100) * radius;
    return { x: round(center + r * Math.cos(angle)), y: round(center + r * Math.sin(angle)) };
  }
  function labelPoint(i: number) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = radius + 18;
    return { x: round(center + r * Math.cos(angle)), y: round(center + r * Math.sin(angle)) };
  }

  const dataPath = axes.map((a, i) => pointFor(i, a.value)).map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto" style={{ width: size, height: size }} role="img" aria-label="Competency coverage by system">
      {[25, 50, 75, 100].map((ring) => {
        const ringPoints = axes.map((_, i) => pointFor(i, ring));
        const d = ringPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
        return <path key={ring} d={d} fill="none" stroke="var(--border)" strokeWidth={1} />;
      })}
      {axes.map((a, i) => {
        const p = pointFor(i, 100);
        return <line key={a.label} x1={center} y1={center} x2={p.x} y2={p.y} stroke="var(--border)" strokeWidth={1} />;
      })}
      <path d={dataPath} fill="var(--accent)" fillOpacity={0.18} stroke="var(--accent)" strokeWidth={2} strokeLinejoin="round" />
      {axes.map((a, i) => {
        const p = pointFor(i, a.value);
        return <circle key={a.label} cx={p.x} cy={p.y} r={3} fill="var(--accent)" />;
      })}
      {axes.map((a, i) => {
        const lp = labelPoint(i);
        return (
          <text key={a.label} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize={10} fill="var(--foreground-dim)">
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}
