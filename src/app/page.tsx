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
      <main className="ml-[72px] flex-1 p-6 lg:p-8">
        {/* Top Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-syne text-2xl font-bold text-text-primary">
              Inventory Dashboard
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Manage and monitor your stock in real-time
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-56 pl-9 pr-4 py-2 bg-background-card border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-lime/30 transition-colors"
              />
            </div>

            {/* Add Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-accent-lime text-background-main rounded-xl text-sm font-semibold hover:bg-accent-lime/90 transition-colors">
              <Plus size={16} />
              Add Item
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex gap-6">
          {/* Left Section - Main Content */}
          <div className="flex-1 space-y-6 min-w-0">
            {/* Stat Cards */}
            <StatCards />

            {/* Product Table */}
            <ProductTable />
          </div>

          {/* Right Panel */}
          <aside className="w-72 flex-shrink-0 space-y-4 hidden xl:block">
            <CategoryBreakdown />
            <AlertsPanel />
          </aside>
        </div>
      </main>
    </div>
  );
}
