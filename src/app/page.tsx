import Sidebar from "@/components/inventory/Sidebar";
import StatCards from "@/components/inventory/StatCards";
import TrendChart from "@/components/inventory/TrendChart";
import RecentTransactions from "@/components/inventory/RecentTransactions";
import CategoryBreakdown from "@/components/inventory/CategoryBreakdown";
import AlertsPanel from "@/components/inventory/AlertsPanel";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1a1023] relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-[#E8C848]/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] bg-[#F43F5E]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-[#4ADE80]/[0.02] rounded-full blur-[100px]" />
      </div>
      <Sidebar />
      <main className="lg:ml-[200px] min-h-screen relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#faf5ff] tracking-tight">Dashboard</h1>
            <p className="text-sm text-[#faf5ff]/40 mt-1">Pantau inventaris dan stok barang kamu.</p>
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
