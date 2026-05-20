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
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "active"
            ? "bg-status-active"
            : status === "low"
            ? "bg-status-low"
            : "bg-status-out"
        }`}
      />
      {labels[status]}
    </span>
  );
}

function StockBar({ stock, maxStock }: { stock: number; maxStock: number }) {
  const percentage = Math.min((stock / maxStock) * 100, 100);
  const barColor =
    percentage > 50
      ? "bg-status-active"
      : percentage > 20
      ? "bg-status-low"
      : "bg-status-out";

  return (
    <div className="flex items-center gap-3">
      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="font-mono text-sm text-text-secondary">{stock}</span>
    </div>
  );
}

export default function ProductTable() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.status === activeFilter);

  return (
    <div className="bg-background-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="font-syne font-semibold text-lg text-text-primary">
          Inventory
        </h2>

        {/* Filter Chips */}
        <div className="flex items-center gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeFilter === option.value
                  ? "bg-accent-lime/10 text-accent-lime border border-accent-lime/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                Item
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                Stock
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border/50 hover:bg-white/[0.02] transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {product.name}
                    </p>
                    <p className="text-xs font-mono text-text-muted mt-0.5">
                      {product.sku}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StockBar stock={product.stock} maxStock={product.maxStock} />
                </td>
                <td className="px-6 py-4">
                  <StatusPill status={product.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-mono text-sm text-text-primary">
                    {formatCurrency(product.price)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-text-muted">
          Showing {filteredProducts.length} of {products.length} items
        </span>
      </div>
    </div>
  );
}
