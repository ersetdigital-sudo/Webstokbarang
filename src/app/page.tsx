import Sidebar from "@/components/inventory/Sidebar";
import StatCards from "@/components/inventory/StatCards";
import ProductTable from "@/components/inventory/ProductTable";
import CategoryBreakdown from "@/components/inventory/CategoryBreakdown";
import AlertsPanel from "@/components/inventory/AlertsPanel";
import { Search, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-bg-main">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area - offset for sidebar on desktop */}
      <main className="lg:ml-[72px] min-h-screen p-4 pt-16 sm:p-6 sm:pt-16 lg:pt-6 lg:p-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-txt-primary">
              Inventory Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-txt-secondary mt-1">
              Manage and monitor your stock in real-time
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full sm:w-56 pl-9 pr-4 py-2.5 bg-bg-card border border-border-main rounded-xl text-sm text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-accent-lime/40 transition-colors"
              />
            </div>

            {/* Add Item button */}
            <button className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-accent-lime text-bg-main rounded-xl text-sm font-semibold hover:brightness-110 transition-all">
              <Plus size={16} strokeWidth={2.5} />
              <span className="hidden sm:inline">Add Item</span>
            </button>
          </div>
        </header>

        {/* Main grid layout */}
        <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
          {/* Left: Stats + Table */}
          <div className="flex-1 min-w-0 space-y-4 lg:space-y-6">
            <StatCards />
            <ProductTable />
          </div>

          {/* Right: Categories + Alerts */}
          <aside className="w-full xl:w-[280px] flex-shrink-0 space-y-4">
            <CategoryBreakdown />
            <AlertsPanel />
          </aside>
        </div>
      </main>
    </div>
  );
}
