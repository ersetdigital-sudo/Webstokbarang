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
    { label: "Total SKU", value: formatNumber(total), sub: "+3 minggu ini", icon: Package, glow: "glow-blue", iconBg: "bg-[#1856FF]/15", iconColor: "text-[#1856FF]", border: "border-l-[#1856FF]" },
    { label: "Nilai Inventaris", value: formatCurrency(value), sub: "+12% bulan ini", icon: TrendingUp, glow: "glow-blue", iconBg: "bg-[#1856FF]/15", iconColor: "text-[#1856FF]", border: "border-l-[#1856FF]" },
    { label: "Stok Menipis", value: formatNumber(low), sub: "Perlu restock", icon: AlertTriangle, glow: "glow-orange", iconBg: "bg-[#E89558]/15", iconColor: "text-[#E89558]", border: "border-l-[#E89558]" },
    { label: "Stok Habis", value: formatNumber(out), sub: `${out} barang kosong`, icon: Ban, glow: "glow-red", iconBg: "bg-[#EA2143]/15", iconColor: "text-[#EA2143]", border: "border-l-[#EA2143]" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div key={i} className={`glass rounded-xl px-4 py-3.5 border-l-2 ${c.border} hover:bg-white/[0.05] transition-all duration-200 group`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">{c.label}</span>
            <div className={`w-7 h-7 rounded-lg ${c.iconBg} flex items-center justify-center`}>
              <c.icon size={13} className={c.iconColor} />
            </div>
          </div>
          <p className="text-xl font-bold text-white tracking-tight leading-none truncate">{c.value}</p>
          <p className="text-[11px] text-white/35 mt-2">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
