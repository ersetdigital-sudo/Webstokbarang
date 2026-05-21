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
    { label: "Total SKU", value: formatNumber(total), sub: "+3 minggu ini", icon: Package, borderCls: "border-l-neo-primary", iconBgCls: "bg-neo-primary/10 border-neo-primary/30", iconCls: "text-neo-primary" },
    { label: "Nilai Inventaris", value: formatCurrency(value), sub: "+12% bulan ini", icon: TrendingUp, borderCls: "border-l-neo-primary", iconBgCls: "bg-neo-primary/10 border-neo-primary/30", iconCls: "text-neo-primary" },
    { label: "Stok Menipis", value: formatNumber(low), sub: "Perlu restock", icon: AlertTriangle, borderCls: "border-l-neo-warning", iconBgCls: "bg-neo-warning/10 border-neo-warning/30", iconCls: "text-neo-warning" },
    { label: "Stok Habis", value: formatNumber(out), sub: `${out} barang kosong`, icon: Ban, borderCls: "border-l-neo-danger", iconBgCls: "bg-neo-danger/10 border-neo-danger/30", iconCls: "text-neo-danger" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`neo-card-flat px-3.5 py-3 border-l-4 ${c.borderCls} hover:shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-neo-muted uppercase tracking-[0.12em]">{c.label}</span>
            <div className={`w-6 h-6 rounded-[6px] border ${c.iconBgCls} flex items-center justify-center`}>
              <c.icon size={12} className={c.iconCls} />
            </div>
          </div>
          <p className="text-[18px] font-extrabold text-neo-text tracking-tight leading-none truncate">{c.value}</p>
          <p className="text-[10px] text-neo-muted mt-1.5 font-medium">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
