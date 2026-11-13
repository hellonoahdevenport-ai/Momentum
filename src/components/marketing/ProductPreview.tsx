export default function ProductPreview() {
  return (
    <div className="track-medicine mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_24px_60px_-20px_rgba(23,34,55,0.25)]">
      <div className="border-b border-border px-5 py-3.5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
            Blood &amp; Immune
          </span>
          <span className="font-data text-[11px] text-foreground-dim">6:42</span>
        </div>
        <h3 className="mt-2.5 text-[17px] font-bold text-foreground">Maya Chen</h3>
        <p className="text-xs text-foreground-dim">24-year-old graduate student · fatigue, 6 weeks</p>
        <div className="mt-3 flex gap-2">
          {["Brief", "Interview", "Evidence", "Reasoning", "Plan", "Debrief"].map((s, i) => (
            <span
              key={s}
              className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold ${
                i === 1 ? "bg-accent text-white" : i < 1 ? "text-accent" : "text-foreground-dim"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 px-5 py-4">
        <div className="self-start rounded-2xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5 text-[13px] leading-snug text-foreground">
          I&rsquo;ve just been so tired for like six weeks now &mdash; and lately I get out of breath going up a flight
          of stairs.
        </div>
        <div className="self-end rounded-2xl rounded-br-sm bg-accent-soft px-3.5 py-2.5 text-[13px] leading-snug text-foreground">
          Have your periods changed at all recently?
        </div>
        <div className="self-start rounded-2xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5 text-[13px] leading-snug text-foreground">
          Actually, yeah &mdash; they&rsquo;ve been really heavy the last few months.
        </div>
      </div>
      <div className="border-t border-border bg-surface-2/60 px-5 py-3.5">
        <div className="flex items-center gap-2 rounded-xl bg-surface px-3.5 py-2.5 text-[13px] text-foreground-dim">
          Ask Maya something&hellip;
          <span className="ml-auto rounded-lg bg-accent px-3 py-1.5 text-[11px] font-bold text-white">Ask</span>
        </div>
      </div>
    </div>
  );
}
