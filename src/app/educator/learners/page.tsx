import Badge from "@/components/ui/Badge";

const SAMPLE_ROSTER = [
  { name: "Sample learner A", cases: 3, avgScore: 78 },
  { name: "Sample learner B", cases: 1, avgScore: 55 },
  { name: "Sample learner C", cases: 5, avgScore: 88 },
];

export default function EducatorLearnersPage() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Learners</h2>
      <Badge tone="warn" className="mt-2">
        Sample data
      </Badge>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
        There’s no multi-user roster yet — progress today lives only in each learner’s own browser. The table below
        is illustrative sample data showing what a cohort roster will look like once real accounts exist.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs font-bold uppercase tracking-wide text-foreground-dim">
              <th className="py-2 pr-4">Learner</th>
              <th className="py-2 pr-4">Cases attempted</th>
              <th className="py-2">Average score</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_ROSTER.map((r) => (
              <tr key={r.name} className="border-b border-border text-foreground">
                <td className="py-2.5 pr-4">{r.name}</td>
                <td className="py-2.5 pr-4">{r.cases}</td>
                <td className="py-2.5">{r.avgScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
