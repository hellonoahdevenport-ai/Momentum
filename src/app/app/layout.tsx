import { RoleProvider } from "@/context/RoleContext";
import AppNav from "@/components/app/AppNav";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <AppNav />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
    </RoleProvider>
  );
}
