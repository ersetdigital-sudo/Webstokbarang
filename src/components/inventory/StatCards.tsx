"use client";

import { Package, TrendingUp, AlertTriangle, XCircle } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
}

function StatCard({ label, value, subtext, icon }: StatCardProps) {
  return (
    <div className="bg-surface-secondary border border-line-primary rounded-xl p-4 sm:p-5 hover:border-line-secondary transition-colors duration-200">
      {/* Label row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] sm:text-[13px] text-content-tertiary font-medium">
          {label}
        </span>
        <div className="text-content-tertiary opacity-60">
          {icon}
        </div>
      </div>

      {/* Value - large number */}
      <p className="text-[22px] sm:text-[28px] font-heading font-bold text-content-primary leading-none tracking-tight">
        {value}
      </p>

      {/* Subtext */}
      <p className="text-[11px] sm:text-[12px] text-content-tertiary mt-2 font-mono">
        {subtext}
      </p>
    </div>
  );
}

export default function StatCards() {
  const totalSKUs = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStock = products.filter((p) => p.status === "low").length;
  const outOfStock = products.filter((p) => p.status === "out").length;

  const cards: StatCardProps[] = [
    {
      label: "Total SKU",
      value: formatNumber(totalSKUs),
      subtext: "+3 dari minggu lalu",
      icon: <Package size={16} />,
    },
    {
      label: "Total Nilai Inventaris",
      value: formatCurrency(totalValue),
      subtext: "+12.5% dari bulan lalu",
      icon: <TrendingUp size={16} />,
    },
    {
      label: "Stok Menipis",
      value: formatNumber(lowStock),
      subtext: "Perlu restock segera",
      icon: <AlertTriangle size={16} />,
    },
    {
      label: "Stok Habis",
      value: formatNumber(outOfStock),
      subtext: "3 barang tidak tersedia",
      icon: <XCircle size={16} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} />
      ))}
    </div>
  );
}
