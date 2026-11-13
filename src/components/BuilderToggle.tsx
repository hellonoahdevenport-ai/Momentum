"use client";

import { useBuilderMode } from "@/context/BuilderModeContext";

export default function BuilderToggle() {
  const { builderMode, setBuilderMode, ready } = useBuilderMode();
  if (!ready) return null;

  return (
    <button
      onClick={() => setBuilderMode(!builderMode)}
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold shadow-lg transition ${
        builderMode
          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
          : "bg-white text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
      }`}
      title="Builder mode unlocks every unit for you, regardless of progress."
    >
      <span className={`h-2 w-2 rounded-full ${builderMode ? "bg-emerald-400" : "bg-slate-400"}`} />
      Builder mode: {builderMode ? "ON" : "off"}
    </button>
  );
}
