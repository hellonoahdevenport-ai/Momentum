export type DemoRole = "learner" | "educator" | "owner";

export const ROLE_COOKIE = "casebook_demo_role";

export function isDemoRole(value: string | undefined): value is DemoRole {
  return value === "learner" || value === "educator" || value === "owner";
}

export const ROLE_LABELS: Record<DemoRole, string> = {
  learner: "Learner",
  educator: "Educator",
  owner: "Owner / builder",
};

/**
 * IMPORTANT: this is a demo-only, client-settable role switch with no
 * server-side account system behind it — anyone can change the cookie and
 * change what they can see. It exists so a single reviewer can preview all
 * three surfaces locally. Before this product stores any real account or
 * learner data, replace this with real authentication and server-enforced,
 * database-backed role checks (see the launch handoff notes).
 */
