"use client";

import { Package, TrendingUp, AlertTriangle, Ban } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function StatCards() {
  const total = products.length;
  const value = products.reduce((s, p) => s + p.price * p.stock, 0);
  const low = products.filter((p) => p.status === "low").length;
  const out = products.filter((p) => p.status === "out").length;

  const cards = [
    { label: "Total SKU", value: formatNumber(total), sub: "+3 minggu ini", icon: Package, color: "neo-primary", borderColor: "border-neo-primary" },
    { label: "Nilai Inventaris", value: formatCurrency(value), sub: "+12% bulan ini", icon: TrendingUp, color: "neo-primary", borderColor: "border-neo-primary" },
    { label: "Stok Menipis", value: formatNumber(low), sub: "Perlu restock", icon: AlertTriangle, color: "neo-warning", borderColor: "border-neo-warning" },
    { label: "Stok Habis", value: formatNumber(out), sub: `${out} barang kosong`, icon: Ban, color: "neo-danger", borderColor: "border-neo-danger" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`neo-card-flat px-4 py-4 border-l-4 ${c.borderColor} hover:shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-neo-muted uppercase tracking-[0.12em]">{c.label}</span>
            <div className={`w-8 h-8 rounded-neo-xs bg-${c.color}/10 border border-${c.color}/30 flex items-center justify-center`}>
              <c.icon size={14} className={`text-${c.color}`} />
            </div>
          </div>
          <p className="text-[22px] font-extrabold text-neo-text tracking-tight leading-none truncate">{c.value}</p>
          <p className="text-[11px] text-neo-muted mt-2 font-medium">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
