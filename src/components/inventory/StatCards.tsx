"use client";

import { Package, TrendingUp, AlertTriangle, XCircle } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  badge: string;
  badgeType: "success" | "warning" | "danger";
  icon: React.ReactNode;
  accent: string;
}

function StatCard({ label, value, badge, badgeType, icon, accent }: StatCardProps) {
  const badgeStyles = {
    success: "text-state-success bg-state-success/10",
    warning: "text-state-warning bg-state-warning/10",
    danger: "text-state-danger bg-state-danger/10",
  };

  return (
    <div className="relative bg-surface-secondary border border-line-primary rounded-2xl p-5 hover:border-line-secondary transition-all duration-300 group overflow-hidden">
      {/* Accent glow top */}
      <div
        className="absolute top-0 left-6 right-6 h-[1px] opacity-40 group-hover:opacity-70 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-surface-tertiary flex items-center justify-center">
          {icon}
        </div>
        <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-md ${badgeStyles[badgeType]}`}>
          {badge}
        </span>
      </div>

      <p className="text-content-tertiary text-[11px] font-medium uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-2xl font-heading font-bold text-content-primary">
        {value}
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
      badge: "+3 minggu ini",
      badgeType: "success",
      icon: <Package size={19} className="text-lime-accent" />,
      accent: "#C6FF80",
    },
    {
      label: "Total Nilai",
      value: formatCurrency(totalValue),
      badge: "+12,5%",
      badgeType: "success",
      icon: <TrendingUp size={19} className="text-lime-accent" />,
      accent: "#C6FF80",
    },
    {
      label: "Stok Menipis",
      value: formatNumber(lowStock),
      badge: "+2 barang",
      badgeType: "warning",
      icon: <AlertTriangle size={19} className="text-state-warning" />,
      accent: "#FFCC66",
    },
    {
      label: "Stok Habis",
      value: formatNumber(outOfStock),
      badge: "+1 barang",
      badgeType: "danger",
      icon: <XCircle size={19} className="text-state-danger" />,
      accent: "#FF8080",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} />
      ))}
    </div>
  );
}
