"use client";

import { useState } from "react";
import { products, type Product, type ProductStatus } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

type FilterType = "all" | "low" | "out";

const filters: { label: string; value: FilterType }[] = [
  { label: "Semua", value: "all" },
  { label: "Stok Menipis", value: "low" },
  { label: "Stok Habis", value: "out" },
];

function StatusBadge({ status }: { status: ProductStatus }) {
  const config = {
    active: { bg: "bg-state-success/10", text: "text-state-success", dot: "bg-state-success", label: "Tersedia" },
    low: { bg: "bg-state-warning/10", text: "text-state-warning", dot: "bg-state-warning", label: "Menipis" },
    out: { bg: "bg-state-danger/10", text: "text-state-danger", dot: "bg-state-danger", label: "Habis" },
  };
  const c = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function StockIndicator({ stock, maxStock }: { stock: number; maxStock: number }) {
  const pct = maxStock > 0 ? Math.min((stock / maxStock) * 100, 100) : 0;
  const color = pct > 50 ? "bg-state-success" : pct > 15 ? "bg-state-warning" : "bg-state-danger";

  return (
    <div className="flex items-center gap-2.5">
      <div className="w-16 h-[5px] bg-surface-tertiary rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-xs text-content-secondary min-w-[28px]">{stock}</span>
    </div>
  );
}

function MobileCard({ product }: { product: Product }) {
  const pct = product.maxStock > 0 ? Math.min((product.stock / product.maxStock) * 100, 100) : 0;
  const color = pct > 50 ? "bg-state-success" : pct > 15 ? "bg-state-warning" : "bg-state-danger";

  return (
    <div className="px-4 py-4 border-b border-line-primary/60 last:border-b-0 hover:bg-surface-tertiary/30 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-content-primary truncate">{product.name}</p>
          <p className="text-[11px] font-mono text-content-tertiary mt-0.5">{product.sku}</p>
        </div>
        <StatusBadge status={product.status} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-content-tertiary px-2 py-0.5 rounded-md bg-surface-tertiary">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-1 bg-surface-tertiary rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[11px] font-mono text-content-secondary">{product.stock}</span>
          </div>
        </div>
        <span className="font-mono text-xs font-medium text-content-primary">
          {formatCurrency(product.price)}
        </span>
      </div>
    </div>
  );
}

export default function ProductTable() {
  const [active, setActive] = useState<FilterType>("all");
  const filtered = active === "all" ? products : products.filter((p) => p.status === active);

  return (
    <div className="bg-surface-secondary border border-line-primary rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-line-primary">
        <h2 className="font-heading font-semibold text-[15px] text-content-primary">
          Daftar Inventaris
        </h2>
        <div className="flex items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
                active === f.value
                  ? "bg-lime-dim text-lime-accent border-lime-accent/20"
                  : "text-content-tertiary hover:text-content-secondary border-transparent hover:bg-surface-tertiary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {filtered.length === 0 ? (
          <p className="text-center py-8 text-content-tertiary text-sm">Tidak ada data</p>
        ) : (
          filtered.map((p) => <MobileCard key={p.id} product={p} />)
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line-primary">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-content-tertiary uppercase tracking-wider">Barang</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-content-tertiary uppercase tracking-wider">Kategori</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-content-tertiary uppercase tracking-wider">Stok</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-content-tertiary uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-3 text-[11px] font-medium text-content-tertiary uppercase tracking-wider">Harga</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-line-primary/40 hover:bg-surface-tertiary/20 transition-colors">
                <td className="px-5 py-3.5">
                  <p className="text-[13px] font-medium text-content-primary">{product.name}</p>
                  <p className="text-[11px] font-mono text-content-tertiary mt-0.5">{product.sku}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-[12px] text-content-secondary">{product.category}</span>
                </td>
                <td className="px-5 py-3.5">
                  <StockIndicator stock={product.stock} maxStock={product.maxStock} />
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className="font-mono text-[12px] text-content-primary">{formatCurrency(product.price)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-line-primary">
        <p className="text-[11px] text-content-tertiary">
          Menampilkan {filtered.length} dari {products.length} barang
        </p>
      </div>
    </div>
  );
}
