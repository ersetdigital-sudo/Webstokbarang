"use client";

import { useState } from "react";
import { products, type Product, type ProductStatus } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

type FilterType = "all" | "low" | "out";

const filterOptions: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Low Stock", value: "low" },
  { label: "Out of Stock", value: "out" },
];

function StatusPill({ status }: { status: ProductStatus }) {
  const styles = {
    active: "bg-status-active/10 text-status-active",
    low: "bg-status-low/10 text-status-low",
    out: "bg-status-out/10 text-status-out",
  };

  const labels = {
    active: "Active",
    low: "Low Stock",
    out: "Out of Stock",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${styles[status]}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          status === "active" ? "bg-status-active" : status === "low" ? "bg-status-low" : "bg-status-out"
        }`}
      />
      {labels[status]}
    </span>
  );
}

function StockBar({ stock, maxStock }: { stock: number; maxStock: number }) {
  const pct = Math.min((stock / maxStock) * 100, 100);
  const color = pct > 50 ? "bg-status-active" : pct > 20 ? "bg-status-low" : "bg-status-out";

  return (
    <div className="flex items-center gap-2">
      <div className="w-14 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-xs text-txt-secondary">{stock}</span>
    </div>
  );
}

/* Mobile: Card layout for each product */
function MobileProductCard({ product }: { product: Product }) {
  const pct = Math.min((product.stock / product.maxStock) * 100, 100);
  const color = pct > 50 ? "bg-status-active" : pct > 20 ? "bg-status-low" : "bg-status-out";

  return (
    <div className="p-4 border-b border-border-main/50 last:border-b-0 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-txt-primary truncate">{product.name}</p>
          <p className="text-[10px] font-mono text-txt-muted mt-0.5">{product.sku}</p>
        </div>
        <StatusPill status={product.status} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-txt-muted bg-white/5 px-2 py-0.5 rounded">{product.category}</span>
          <div className="flex items-center gap-1.5">
            <div className="w-10 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[11px] font-mono text-txt-secondary">{product.stock}</span>
          </div>
        </div>
        <span className="font-mono text-xs font-medium text-txt-primary">{formatCurrency(product.price)}</span>
      </div>
    </div>
  );
}

export default function ProductTable() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProducts =
    activeFilter === "all" ? products : products.filter((p) => p.status === activeFilter);

  return (
    <div className="bg-bg-card border border-border-main rounded-2xl overflow-hidden">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border-main">
        <h2 className="font-heading font-semibold text-base sm:text-lg text-txt-primary">
          Inventory
        </h2>
        <div className="flex items-center gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                activeFilter === opt.value
                  ? "bg-accent-lime/10 text-accent-lime border-accent-lime/20"
                  : "text-txt-secondary hover:text-txt-primary hover:bg-white/5 border-transparent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: Card view */}
      <div className="block md:hidden">
        {filteredProducts.map((product) => (
          <MobileProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Desktop: Table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-main">
              <th className="text-left px-6 py-3 text-xs font-medium text-txt-muted uppercase tracking-wider">Item</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-txt-muted uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-txt-muted uppercase tracking-wider">Stock</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-txt-muted uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-txt-muted uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-border-main/50 hover:bg-white/[0.015] transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-txt-primary">{product.name}</p>
                  <p className="text-xs font-mono text-txt-muted mt-0.5">{product.sku}</p>
                </td>
                <td className="px-6 py-4 text-sm text-txt-secondary">{product.category}</td>
                <td className="px-6 py-4"><StockBar stock={product.stock} maxStock={product.maxStock} /></td>
                <td className="px-6 py-4"><StatusPill status={product.status} /></td>
                <td className="px-6 py-4 text-right font-mono text-sm text-txt-primary">{formatCurrency(product.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 border-t border-border-main">
        <span className="text-[11px] sm:text-xs text-txt-muted">
          Showing {filteredProducts.length} of {products.length} items
        </span>
      </div>
    </div>
  );
}
