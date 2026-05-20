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
  accentColor: string;
}

function StatCard({ label, value, badge, badgeType, icon, accentColor }: StatCardProps) {
  const badgeStyles = {
    success: "text-state-success bg-state-success/10",
    warning: "text-state-warning bg-state-warning/10",
    danger: "text-state-danger bg-state-danger/10",
  };

  return (
    <div className="relative bg-surface-secondary border border-line-primary rounded-xl px-4 py-3.5 hover:border-line-secondary transition-all duration-200 group overflow-hidden">
      {/* Left accent line */}
      <div
        className="absolute left-0 top-2.5 bottom-2.5 w-[2.5px] rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: accentColor }}
      />

      {/* Top row: icon + label + badge */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-surface-tertiary flex items-center justify-center">
            {icon}
          </div>
          <span className="text-[11px] font-medium text-content-tertiary uppercase tracking-wide">
            {label}
          </span>
        </div>
        <span className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${badgeStyles[badgeType]}`}>
          {badge}
        </span>
      </div>

      {/* Value */}
      <p className="text-[20px] font-heading font-bold text-content-primary pl-9 leading-tight">
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
      badge: "+3",
      badgeType: "success",
      icon: <Package size={15} className="text-lime-accent" />,
      accentColor: "#C6FF80",
    },
    {
      label: "Total Nilai",
      value: formatCurrency(totalValue),
      badge: "+12%",
      badgeType: "success",
      icon: <TrendingUp size={15} className="text-lime-accent" />,
      accentColor: "#C6FF80",
    },
    {
      label: "Menipis",
      value: formatNumber(lowStock),
      badge: "+2",
      badgeType: "warning",
      icon: <AlertTriangle size={15} className="text-state-warning" />,
      accentColor: "#FFCC66",
    },
    {
      label: "Habis",
      value: formatNumber(outOfStock),
      badge: "+1",
      badgeType: "danger",
      icon: <XCircle size={15} className="text-state-danger" />,
      accentColor: "#FF8080",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} />
      ))}
    </div>
  );
}
