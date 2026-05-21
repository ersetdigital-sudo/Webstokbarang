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
    { label: "Total SKU", value: formatNumber(total), sub: "+3 minggu ini", icon: Package, border: "border-l-cyan-400", shadow: "shadow-[inset_3px_0_8px_-4px_rgba(6,182,212,0.3)]", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400" },
    { label: "Nilai Inventaris", value: formatCurrency(value), sub: "+12% bulan ini", icon: TrendingUp, border: "border-l-cyan-400", shadow: "shadow-[inset_3px_0_8px_-4px_rgba(6,182,212,0.3)]", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400" },
    { label: "Stok Menipis", value: formatNumber(low), sub: "Perlu restock", icon: AlertTriangle, border: "border-l-amber-400", shadow: "shadow-[inset_3px_0_8px_-4px_rgba(251,191,36,0.25)]", iconBg: "bg-amber-500/10", iconColor: "text-amber-400" },
    { label: "Stok Habis", value: formatNumber(out), sub: `${out} barang kosong`, icon: Ban, border: "border-l-orange-500", shadow: "shadow-[inset_3px_0_8px_-4px_rgba(249,115,22,0.25)]", iconBg: "bg-orange-500/10", iconColor: "text-orange-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div key={i} className={`bg-gradient-to-br from-[#0c1015] to-[#080c0f] border border-white/[0.07] border-l-2 ${c.border} ${c.shadow} rounded-xl px-4 py-3.5 hover:from-[#0f1318] hover:to-[#0a0e12] transition-all duration-200`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider leading-relaxed">{c.label}</span>
            <div className={`w-7 h-7 rounded-md ${c.iconBg} flex items-center justify-center`}>
              <c.icon size={13} className={c.iconColor} />
            </div>
          </div>
          <p className="text-xl font-semibold text-white tracking-tight leading-none truncate">{c.value}</p>
          <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
