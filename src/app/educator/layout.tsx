import Link from "next/link";
import { getServerRole } from "@/lib/getServerRole";
import { RoleProvider } from "@/context/RoleContext";
import RoleSwitcher from "@/components/app/RoleSwitcher";
import EducatorNav from "@/components/app/EducatorNav";
import UnauthorizedNotice from "@/components/app/UnauthorizedNotice";

export const metadata = { robots: { index: false, follow: false } };

export default async function EducatorLayout({ children }: { children: React.ReactNode }) {
  const role = await getServerRole();
  if (role !== "educator" && role !== "owner") {
    return (
      <RoleProvider>
        <UnauthorizedNotice requiredRole="educator or owner" />
      </RoleProvider>
    );
  }

  return (
    <RoleProvider>
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <Link href="/app" className="focus-ring font-display text-sm font-bold text-accent">
              &larr; Back to learner app
            </Link>
            <h1 className="font-display mt-1 text-xl font-bold text-foreground">Educator workspace</h1>
          </div>
          <RoleSwitcher compact />
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-3 sm:px-8">
          <EducatorNav />
        </div>
      </header>
      <main className="mx-auto max-w-6xl flex-1 px-5 py-8 sm:px-8">{children}</main>
    </RoleProvider>
  );
}
