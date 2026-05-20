"use client";

import { Package, TrendingUp, AlertTriangle, XCircle } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrencyShort, formatNumber } from "@/lib/utils";

export default function StatCards() {
  const total = products.length;
  const value = products.reduce((s, p) => s + p.price * p.stock, 0);
  const low = products.filter((p) => p.status === "low").length;
  const out = products.filter((p) => p.status === "out").length;

  const cards = [
    { label: "Total SKU", value: formatNumber(total), sub: "+3 minggu ini", icon: Package },
    { label: "Nilai Inventaris", value: formatCurrencyShort(value), sub: "+12% bulan ini", icon: TrendingUp },
    { label: "Stok Menipis", value: formatNumber(low), sub: "Perlu restock", icon: AlertTriangle },
    { label: "Stok Habis", value: formatNumber(out), sub: `${out} barang kosong`, icon: XCircle },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5 hover:border-accent/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] text-muted-foreground">{c.label}</span>
            <c.icon size={16} className="text-muted-foreground/60" />
          </div>
          <p className="text-[26px] font-semibold tracking-tight leading-none">{c.value}</p>
          <p className="text-xs text-muted-foreground mt-2">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
