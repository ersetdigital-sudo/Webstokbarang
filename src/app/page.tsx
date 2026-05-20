import Sidebar from "@/components/inventory/Sidebar";
import StatCards from "@/components/inventory/StatCards";
import ProductTable from "@/components/inventory/ProductTable";
import CategoryBreakdown from "@/components/inventory/CategoryBreakdown";
import AlertsPanel from "@/components/inventory/AlertsPanel";
import { Search, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-surface-primary">
      <Sidebar />

      {/* Konten utama */}
      <main className="lg:ml-[78px] min-h-screen px-4 pt-20 pb-8 sm:px-6 lg:px-8 lg:pt-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="font-heading text-[22px] sm:text-[26px] font-bold text-content-primary tracking-tight">
              Dashboard Inventaris
            </h1>
            <p className="text-[13px] text-content-tertiary mt-1">
              Kelola dan pantau stok barang secara real-time
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Pencarian */}
            <div className="relative flex-1 sm:flex-none">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-content-tertiary" />
              <input
                type="text"
                placeholder="Cari barang..."
                className="w-full sm:w-52 pl-9 pr-4 py-2.5 bg-surface-secondary border border-line-primary rounded-xl text-[13px] text-content-primary placeholder:text-content-tertiary focus:outline-none focus:border-lime-accent/30 focus:ring-1 focus:ring-lime-accent/10 transition-all"
              />
            </div>

            {/* Tombol tambah */}
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-lime-accent text-surface-primary rounded-xl text-[13px] font-semibold hover:brightness-110 active:scale-[0.97] transition-all">
              <Plus size={15} strokeWidth={2.5} />
              <span className="hidden sm:inline">Tambah</span>
            </button>
          </div>
        </header>

        {/* Grid layout */}
        <div className="flex flex-col xl:flex-row gap-5 lg:gap-6">
          {/* Kiri: Cards + Tabel */}
          <div className="flex-1 min-w-0 space-y-5 lg:space-y-6">
            <StatCards />
            <ProductTable />
          </div>

          {/* Kanan: Kategori + Peringatan */}
          <aside className="w-full xl:w-[290px] flex-shrink-0 space-y-4">
            <CategoryBreakdown />
            <AlertsPanel />
          </aside>
        </div>
      </main>
    </div>
  );
}
