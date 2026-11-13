import { cookies } from "next/headers";
import { ROLE_COOKIE, isDemoRole, type DemoRole } from "./role";

/** Server-side read of the demo role cookie. See role.ts for why this is
 * not real authorization. */
export async function getServerRole(): Promise<DemoRole> {
  const store = await cookies();
  const value = store.get(ROLE_COOKIE)?.value;
  return isDemoRole(value) ? value : "learner";
}
