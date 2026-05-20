import Sidebar from "@/components/inventory/Sidebar";
import StatCards from "@/components/inventory/StatCards";
import RecentTransactions from "@/components/inventory/RecentTransactions";
import CategoryBreakdown from "@/components/inventory/CategoryBreakdown";
import AlertsPanel from "@/components/inventory/AlertsPanel";
import ThemeToggle from "@/components/inventory/ThemeToggle";
import { Bell, User } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-16 min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">
            <div className="w-10 lg:w-0" />
            <div className="flex items-center gap-1.5">
              <button className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted transition-colors">
                <Bell size={16} className="text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
              </button>
              <ThemeToggle />
              <button className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <User size={14} className="text-accent" />
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 px-4 sm:px-6 py-8 space-y-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Pantau inventaris dan stok barang kamu.</p>
          </div>
          <StatCards />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2"><RecentTransactions /></div>
            <div className="space-y-6"><CategoryBreakdown /><AlertsPanel /></div>
          </div>
        </div>
      </main>
    </div>
  );
}
