import { RoleProvider } from "@/context/RoleContext";
import { ToastProvider } from "@/context/ToastContext";
import AppNav from "@/components/app/AppNav";
import ToastHost from "@/components/app/ToastHost";
import CommandPalette from "@/components/app/CommandPalette";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <ToastProvider>
        <AppNav />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
        <ToastHost />
        <CommandPalette />
      </ToastProvider>
    </RoleProvider>
  );
}
