import Link from "next/link";
import { ECG_RHYTHMS } from "@/lib/ecg/rhythms";
import EcgStrip from "@/components/EcgStrip";
import Badge from "@/components/ui/Badge";

export const metadata = { title: "ECG practice" };

export default function EcgLibraryPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <Badge tone="warn">Needs clinical review</Badge>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-foreground">ECG rhythm practice</h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
        Procedurally generated, stylized rhythm strips for pattern-recognition practice — not real patient data, and
        not a clinically validated ECG simulator. Identify the rhythm, then the appropriate next step.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {ECG_RHYTHMS.map((r, i) => (
          <Link key={r.id} href={`/app/ecg/${r.id}`} className="card-lift block rounded-2xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-base font-bold text-foreground">{r.shortLabel}</span>
              <span className="text-xs text-foreground-dim">{r.patientContext}</span>
            </div>
            <div className="mt-3">
              <EcgStrip waveform={r.waveform} seed={i + 1} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
