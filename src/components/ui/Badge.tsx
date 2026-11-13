const TONES = {
  accent: "bg-accent-soft text-accent",
  coral: "bg-coral-soft text-coral",
  teal: "bg-teal-soft text-teal",
  violet: "bg-violet-soft text-violet",
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  bad: "bg-bad-soft text-bad",
  neutral: "bg-surface-2 text-foreground-dim",
} as const;

export default function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
