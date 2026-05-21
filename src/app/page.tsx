import Sidebar from "@/components/inventory/Sidebar";
import StatCards from "@/components/inventory/StatCards";
import TrendChart from "@/components/inventory/TrendChart";
import RecentTransactions from "@/components/inventory/RecentTransactions";
import CategoryBreakdown from "@/components/inventory/CategoryBreakdown";
import AlertsPanel from "@/components/inventory/AlertsPanel";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neo-bg">
      <Sidebar />
      <main className="lg:ml-[200px] min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neo-text tracking-tight">Dashboard</h1>
            <p className="text-sm text-neo-muted mt-1">Pantau inventaris dan stok barang kamu.</p>
          </div>
          <StatCards />

          {/* Baris 1: Tren Transaksi + Analisa Penjualan — sejajar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendChart />
            <CategoryBreakdown />
          </div>

          {/* Baris 2: Transaksi Terbaru + Peringatan — sejajar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentTransactions />
            <AlertsPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
