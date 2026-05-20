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
        <div key={i} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{c.label}</span>
            <c.icon size={16} className="text-muted-foreground" />
          </div>
          <p className="text-2xl font-heading font-bold mt-2">{c.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
