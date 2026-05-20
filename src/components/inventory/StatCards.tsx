"use client";

import { Package, TrendingUp, AlertTriangle, XCircle } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrencyShort, formatNumber } from "@/lib/utils";

interface CardData {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}

function Card({ label, value, sub, icon }: CardData) {
  return (
    <div className="flex flex-col justify-between p-4 bg-bg-card border border-border rounded-xl hover:border-border-hover transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-text-muted uppercase tracking-wide">{label}</span>
        <span className="text-text-muted/50">{icon}</span>
      </div>
      <div className="mt-3">
        <p className="text-[24px] leading-none font-heading font-bold text-text-primary">{value}</p>
        <p className="text-[11px] text-text-muted mt-1.5 font-mono">{sub}</p>
      </div>
    </div>
  );
}

export default function StatCards() {
  const total = products.length;
  const value = products.reduce((s, p) => s + p.price * p.stock, 0);
  const low = products.filter((p) => p.status === "low").length;
  const out = products.filter((p) => p.status === "out").length;

  const data: CardData[] = [
    { label: "Total SKU", value: formatNumber(total), sub: "+3 minggu ini", icon: <Package size={15} /> },
    { label: "Nilai Inventaris", value: formatCurrencyShort(value), sub: "+12% bulan ini", icon: <TrendingUp size={15} /> },
    { label: "Stok Menipis", value: formatNumber(low), sub: "Perlu restock", icon: <AlertTriangle size={15} /> },
    { label: "Stok Habis", value: formatNumber(out), sub: `${out} barang kosong`, icon: <XCircle size={15} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {data.map((d, i) => <Card key={i} {...d} />)}
    </div>
  );
}
