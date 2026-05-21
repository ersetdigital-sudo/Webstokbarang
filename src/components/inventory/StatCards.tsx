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
    { label: "Total SKU", value: formatNumber(total), sub: "+3 minggu ini", icon: Package, border: "border-l-[#E8C848]", iconBg: "bg-[#E8C848]/15", iconColor: "text-[#E8C848]" },
    { label: "Nilai Inventaris", value: formatCurrency(value), sub: "+12% bulan ini", icon: TrendingUp, border: "border-l-[#E8C848]", iconBg: "bg-[#E8C848]/15", iconColor: "text-[#E8C848]" },
    { label: "Stok Menipis", value: formatNumber(low), sub: "Perlu restock", icon: AlertTriangle, border: "border-l-[#FB923C]", iconBg: "bg-[#FB923C]/15", iconColor: "text-[#FB923C]" },
    { label: "Stok Habis", value: formatNumber(out), sub: `${out} barang kosong`, icon: Ban, border: "border-l-[#F43F5E]", iconBg: "bg-[#F43F5E]/15", iconColor: "text-[#F43F5E]" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div key={i} className={`glass rounded-xl px-4 py-3.5 border-l-2 ${c.border} hover:bg-[#faf5ff]/[0.05] transition-all duration-200`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-[#faf5ff]/40 uppercase tracking-wider">{c.label}</span>
            <div className={`w-7 h-7 rounded-lg ${c.iconBg} flex items-center justify-center`}>
              <c.icon size={13} className={c.iconColor} />
            </div>
          </div>
          <p className="text-xl font-bold text-[#faf5ff] tracking-tight leading-none truncate">{c.value}</p>
          <p className="text-[11px] text-[#faf5ff]/30 mt-2">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
