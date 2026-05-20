"use client";

import { Package, TrendingUp, AlertTriangle, XCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  badgeType: "success" | "warning" | "danger";
  icon: React.ReactNode;
  accentColor: string;
}

function StatCard({ label, value, change, trend, badgeType, icon, accentColor }: StatCardProps) {
  const badgeStyles = {
    success: "text-state-success",
    warning: "text-state-warning",
    danger: "text-state-danger",
  };

  return (
    <div className="relative bg-surface-secondary border border-line-primary rounded-2xl p-4 sm:p-5 hover:border-line-secondary hover:bg-surface-secondary/80 transition-all duration-300 group overflow-hidden">
      {/* Subtle gradient bg on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(ellipse at top left, ${accentColor}, transparent 70%)` }}
      />

      {/* Header: Icon + Badge */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}12` }}
        >
          {icon}
        </div>
        <div className={`flex items-center gap-0.5 text-[11px] font-mono font-medium ${badgeStyles[badgeType]}`}>
          {trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>

      {/* Value */}
      <p className="text-xl sm:text-2xl font-heading font-bold text-content-primary leading-none mb-1.5 truncate">
        {value}
      </p>

      {/* Label */}
      <p className="text-[11px] sm:text-[12px] text-content-tertiary font-medium">
        {label}
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
      change: "+3",
      trend: "up",
      badgeType: "success",
      icon: <Package size={17} className="text-lime-accent" />,
      accentColor: "#C6FF80",
    },
    {
      label: "Total Nilai Inventaris",
      value: formatCurrency(totalValue),
      change: "+12%",
      trend: "up",
      badgeType: "success",
      icon: <TrendingUp size={17} className="text-lime-accent" />,
      accentColor: "#C6FF80",
    },
    {
      label: "Stok Menipis",
      value: formatNumber(lowStock),
      change: "+2",
      trend: "up",
      badgeType: "warning",
      icon: <AlertTriangle size={17} className="text-state-warning" />,
      accentColor: "#FFCC66",
    },
    {
      label: "Stok Habis",
      value: formatNumber(outOfStock),
      change: "+1",
      trend: "up",
      badgeType: "danger",
      icon: <XCircle size={17} className="text-state-danger" />,
      accentColor: "#FF8080",
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
