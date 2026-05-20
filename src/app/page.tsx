import Sidebar from "@/components/inventory/Sidebar";
import StatCards from "@/components/inventory/StatCards";
import RecentTransactions from "@/components/inventory/RecentTransactions";
import CategoryBreakdown from "@/components/inventory/CategoryBreakdown";
import AlertsPanel from "@/components/inventory/AlertsPanel";
import ThemeToggle from "@/components/inventory/ThemeToggle";
import { Bell, User } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />

      <main className="lg:ml-16 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-xl border-b border-border px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="w-10 lg:w-0" />
            <div className="flex items-center gap-1">
              {/* Notifikasi */}
              <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors">
                <Bell size={16} strokeWidth={1.7} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red rounded-full" />
              </button>

              {/* Toggle theme */}
              <ThemeToggle />

              {/* Avatar profil */}
              <button className="ml-1 w-8 h-8 rounded-full bg-bg-elevated border border-border hover:border-border-hover flex items-center justify-center transition-colors">
                <User size={14} className="text-text-secondary" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-text-primary">Dashboard</h1>
            <p className="text-[13px] text-text-muted mt-0.5">Pantau inventaris dan stok barang</p>
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 min-w-0 space-y-6">
              <StatCards />
              <RecentTransactions />
            </div>
            <aside className="w-full xl:w-[280px] flex-shrink-0 space-y-4">
              <CategoryBreakdown />
              <AlertsPanel />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
