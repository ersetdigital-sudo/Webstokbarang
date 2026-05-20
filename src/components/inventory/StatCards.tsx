"use client";

import { Package, TrendingUp, AlertTriangle, Ban } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrencyShort, formatNumber } from "@/lib/utils";

export default function StatCards() {
  const total = products.length;
  const value = products.reduce((s, p) => s + p.price * p.stock, 0);
  const low = products.filter((p) => p.status === "low").length;
  const out = products.filter((p) => p.status === "out").length;

  const cards = [
    { label: "Total SKU", value: formatNumber(total), sub: "+3 minggu ini", icon: Package, border: "border-l-indigo-400", iconBg: "bg-indigo-500/10", iconColor: "text-indigo-400" },
    { label: "Nilai Inventaris", value: formatCurrencyShort(value), sub: "+12% bulan ini", icon: TrendingUp, border: "border-l-indigo-400", iconBg: "bg-indigo-500/10", iconColor: "text-indigo-400" },
    { label: "Stok Menipis", value: formatNumber(low), sub: "Perlu restock", icon: AlertTriangle, border: "border-l-amber-400", iconBg: "bg-amber-500/10", iconColor: "text-amber-400" },
    { label: "Stok Habis", value: formatNumber(out), sub: `${out} barang kosong`, icon: Ban, border: "border-l-red-500", iconBg: "bg-red-500/10", iconColor: "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div key={i} className={`bg-[#111111] border border-white/[0.07] border-l-2 ${c.border} rounded-xl p-5 hover:bg-[#151515] transition-colors group`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{c.label}</span>
            <div className={`w-8 h-8 rounded-lg ${c.iconBg} flex items-center justify-center`}>
              <c.icon size={15} className={c.iconColor} />
            </div>
          </div>
          <p className="text-[28px] font-semibold text-white tracking-tight leading-none">{c.value}</p>
          <p className="text-xs text-zinc-500 mt-2">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
