import Sidebar from "@/components/inventory/Sidebar";
import StatCards from "@/components/inventory/StatCards";
import ProductTable from "@/components/inventory/ProductTable";
import CategoryBreakdown from "@/components/inventory/CategoryBreakdown";
import AlertsPanel from "@/components/inventory/AlertsPanel";
import { Search, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />

      <main className="lg:ml-16 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-xl border-b border-border px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 pt-0 lg:pt-0">
            {/* Left spacer for mobile hamburger */}
            <div className="w-10 lg:w-0" />

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Cari barang..."
                  className="w-40 sm:w-52 pl-8 pr-3 py-2 bg-bg-card border border-border rounded-lg text-[12px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-accent text-bg-primary rounded-lg text-[12px] font-semibold hover:brightness-110 active:scale-95 transition-all">
                <Plus size={14} strokeWidth={2.5} />
                <span className="hidden sm:inline">Tambah</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-text-primary">Dashboard</h1>
            <p className="text-[13px] text-text-muted mt-0.5">Pantau inventaris dan stok barang</p>
          </div>

          {/* Grid */}
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 min-w-0 space-y-6">
              <StatCards />
              <ProductTable />
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
