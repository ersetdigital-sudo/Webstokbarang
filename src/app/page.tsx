import Sidebar from "@/components/inventory/Sidebar";
import StatCards from "@/components/inventory/StatCards";
import ProductTable from "@/components/inventory/ProductTable";
import CategoryBreakdown from "@/components/inventory/CategoryBreakdown";
import AlertsPanel from "@/components/inventory/AlertsPanel";
import { Search, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="w-full md:ml-[72px] flex-1 p-4 pt-16 md:pt-6 md:p-6 lg:p-8">
        {/* Top Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8">
          <div>
            <h1 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
              Inventory Dashboard
            </h1>
            <p className="text-xs md:text-sm text-text-secondary mt-1">
              Manage and monitor your stock in real-time
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full sm:w-56 pl-9 pr-4 py-2 bg-background-card border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-lime/30 transition-colors"
              />
            </div>

            {/* Add Button */}
            <button className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 bg-accent-lime text-background-main rounded-xl text-sm font-semibold hover:bg-accent-lime/90 transition-colors">
              <Plus size={16} />
              <span className="hidden sm:inline">Add Item</span>
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
          {/* Left Section - Main Content */}
          <div className="flex-1 space-y-4 md:space-y-6 min-w-0">
            {/* Stat Cards */}
            <StatCards />

            {/* Product Table */}
            <ProductTable />
          </div>

          {/* Right Panel - visible on all screens, stacks below on mobile */}
          <aside className="w-full xl:w-72 flex-shrink-0 space-y-4">
            <CategoryBreakdown />
            <AlertsPanel />
          </aside>
        </div>
      </main>
    </div>
  );
}
