"use client";

import { useState } from "react";
import { products, type Product, type ProductStatus } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

type Filter = "all" | "low" | "out";

const tabs: { label: string; value: Filter }[] = [
  { label: "Semua", value: "all" },
  { label: "Menipis", value: "low" },
  { label: "Habis", value: "out" },
];

const statusMap: Record<ProductStatus, { label: string; cls: string }> = {
  active: { label: "Tersedia", cls: "text-green bg-green-muted" },
  low: { label: "Menipis", cls: "text-yellow bg-yellow-muted" },
  out: { label: "Habis", cls: "text-red bg-red-muted" },
};

function Badge({ status }: { status: ProductStatus }) {
  const s = statusMap[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${s.cls}`}>
      {s.label}
    </span>
  );
}

function MobileRow({ p }: { p: Product }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border-subtle last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-text-primary truncate">{p.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] font-mono text-text-muted">{p.sku}</span>
          <Badge status={p.status} />
        </div>
      </div>
      <div className="text-right pl-3">
        <p className="text-[13px] font-mono font-medium text-text-primary">{formatCurrency(p.price)}</p>
        <p className="text-[11px] text-text-muted mt-0.5">Stok: {p.stock}</p>
      </div>
    </div>
  );
}

export default function ProductTable() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = filter === "all" ? products : products.filter((p) => p.status === filter);

  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-b border-border">
        <h2 className="text-[14px] font-heading font-semibold text-text-primary">Daftar Inventaris</h2>
        <div className="flex gap-1 p-0.5 bg-bg-elevated rounded-lg">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-all ${
                filter === t.value
                  ? "bg-bg-card text-text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 py-1">
        {list.length === 0 ? (
          <p className="py-8 text-center text-text-muted text-sm">Tidak ada data</p>
        ) : (
          list.map((p) => <MobileRow key={p.id} p={p} />)
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-text-muted border-b border-border-subtle">
              <th className="px-4 py-2.5 font-medium">Barang</th>
              <th className="px-4 py-2.5 font-medium">Kategori</th>
              <th className="px-4 py-2.5 font-medium">Stok</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium text-right">Harga</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-b border-border-subtle last:border-0 hover:bg-bg-hover/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-[13px] font-medium text-text-primary">{p.name}</p>
                  <p className="text-[11px] font-mono text-text-muted">{p.sku}</p>
                </td>
                <td className="px-4 py-3 text-[12px] text-text-secondary">{p.category}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-bg-elevated rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          p.stock / p.maxStock > 0.5 ? "bg-green" : p.stock / p.maxStock > 0.15 ? "bg-yellow" : "bg-red"
                        }`}
                        style={{ width: `${Math.min((p.stock / p.maxStock) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-[12px] font-mono text-text-secondary">{p.stock}</span>
                  </div>
                </td>
                <td className="px-4 py-3"><Badge status={p.status} /></td>
                <td className="px-4 py-3 text-right text-[12px] font-mono text-text-primary">{formatCurrency(p.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border-subtle">
        <p className="text-[11px] text-text-muted">{list.length} dari {products.length} barang</p>
      </div>
    </div>
  );
}
