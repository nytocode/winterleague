import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <header className="flex justify-between">
        <Sidebar />
      </header>
      <div className="flex-1 overflow-y-auto p-3 space-y-4">{children}</div>
    </div>
  );
}
