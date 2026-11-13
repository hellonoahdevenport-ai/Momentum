import BuilderToggle from "@/components/BuilderToggle";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1">
      {children}
      <BuilderToggle />
    </div>
  );
}
