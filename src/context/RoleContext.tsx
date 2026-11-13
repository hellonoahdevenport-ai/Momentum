"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ROLE_COOKIE, isDemoRole, type DemoRole } from "@/lib/role";

interface RoleValue {
  role: DemoRole;
  setRole: (role: DemoRole) => void;
  ready: boolean;
}

const RoleContext = createContext<RoleValue>({ role: "learner", setRole: () => {}, ready: false });

function readCookieRole(): DemoRole {
  if (typeof document === "undefined") return "learner";
  const match = document.cookie.match(new RegExp(`${ROLE_COOKIE}=([^;]+)`));
  const value = match?.[1];
  return isDemoRole(value) ? value : "learner";
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [role, setRoleState] = useState<DemoRole>("learner");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRoleState(readCookieRole());
    setReady(true);
  }, []);

  function setRole(next: DemoRole) {
    setRoleState(next);
    document.cookie = `${ROLE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 30}`;
    router.refresh();
  }

  return <RoleContext.Provider value={{ role, setRole, ready }}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleValue {
  return useContext(RoleContext);
}
