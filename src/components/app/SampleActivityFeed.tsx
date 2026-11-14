import Badge from "@/components/ui/Badge";

interface Row {
  name: string;
  action: string;
  when: string;
}

const ROWS: Row[] = [
  { name: "Sample learner A", action: "completed this case — scored 88", when: "14 min ago" },
  { name: "Sample learner B", action: "is working through the evidence stage", when: "22 min ago" },
  { name: "Sample learner C", action: "completed this case — scored 71", when: "1 hr ago" },
];

export default function SampleActivityFeed({ activeCount = 3 }: { activeCount?: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-2 p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-good" />
          {activeCount} learners active today
        </span>
        <Badge tone="neutral">Sample data</Badge>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {ROWS.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-2 text-xs">
            <span className="text-foreground-dim">
              <span className="font-semibold text-foreground">{r.name}</span> {r.action}
            </span>
            <span className="font-data flex-none text-foreground-dim">{r.when}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
