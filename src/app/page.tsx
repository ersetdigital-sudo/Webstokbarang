import Sidebar from "@/components/inventory/Sidebar";
import StatCards from "@/components/inventory/StatCards";
import TrendChart from "@/components/inventory/TrendChart";
import RecentTransactions from "@/components/inventory/RecentTransactions";
import CategoryBreakdown from "@/components/inventory/CategoryBreakdown";
import AlertsPanel from "@/components/inventory/AlertsPanel";
import NewProducts from "@/components/inventory/NewProducts";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      <main className="lg:ml-16 min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Dashboard</h1>
            <p className="text-sm text-zinc-500 mt-1">Pantau inventaris dan stok barang kamu.</p>
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
              <NewProducts />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
