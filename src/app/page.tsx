import Sidebar from "@/components/inventory/Sidebar";
import StatCards from "@/components/inventory/StatCards";
import TrendChart from "@/components/inventory/TrendChart";
import RecentTransactions from "@/components/inventory/RecentTransactions";
import CategoryBreakdown from "@/components/inventory/CategoryBreakdown";
import AlertsPanel from "@/components/inventory/AlertsPanel";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0e14] relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-[#1856FF]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] bg-[#07CA6B]/[0.03] rounded-full blur-[120px]" />
      </div>
      <Sidebar />
      <main className="lg:ml-[200px] min-h-screen relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-sm text-white/50 mt-1">Pantau inventaris dan stok barang kamu.</p>
          </div>
          <StatCards />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <TrendChart />
              <RecentTransactions />
            </div>
            <aside className="space-y-6">
              <CategoryBreakdown />
              <AlertsPanel />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
