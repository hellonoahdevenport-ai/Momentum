"use client";

import { useRole } from "@/context/RoleContext";
import { ROLE_LABELS, type DemoRole } from "@/lib/role";

const ROLES: DemoRole[] = ["learner", "educator", "owner"];

export default function RoleSwitcher({ compact = false }: { compact?: boolean }) {
  const { role, setRole, ready } = useRole();
  if (!ready) return <div className="h-9 w-32 rounded-lg bg-surface-2" />;

  return (
    <label className="flex items-center gap-2">
      {!compact && <span className="text-[11px] font-bold uppercase tracking-wide text-foreground-dim">Previewing as</span>}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as DemoRole)}
        className="focus-ring rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-foreground"
        aria-label="Preview role"
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>
            {ROLE_LABELS[r]}
          </option>
        ))}
      </select>
    </label>
  );
}
