"use client";

import { Package, DollarSign, AlertTriangle, XCircle } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  accentColor: string;
}

function StatCard({
  title,
  value,
  change,
  changeType,
  icon,
  accentColor,
}: StatCardProps) {
  const changeStyles = {
    positive: "text-status-active bg-status-active/10",
    negative: "text-status-out bg-status-out/10",
    neutral: "text-status-low bg-status-low/10",
  };

  return (
    <div className="relative bg-bg-card border border-border-main rounded-2xl p-4 sm:p-5 flex flex-col gap-3 overflow-hidden hover:border-border-hover transition-all duration-300">
      {/* Accent bar right side */}
      <div
        className="absolute right-0 top-3 bottom-3 w-[3px] rounded-l-full"
        style={{ backgroundColor: accentColor }}
      />

      {/* Top row: icon + badge */}
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <span className={`text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full ${changeStyles[changeType]}`}>
          {change}
        </span>
      </div>

      {/* Value */}
      <div>
        <p className="text-txt-secondary text-[10px] sm:text-xs uppercase tracking-wider mb-1">
          {title}
        </p>
        <p className="text-lg sm:text-2xl font-heading font-bold text-txt-primary truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function StatCards() {
  const totalSKUs = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStock = products.filter((p) => p.status === "low").length;
  const outOfStock = products.filter((p) => p.status === "out").length;

  const stats: StatCardProps[] = [
    {
      title: "Total SKUs",
      value: formatNumber(totalSKUs),
      change: "+3 this week",
      changeType: "positive",
      icon: <Package size={18} className="text-accent-lime" />,
      accentColor: "#C6FF80",
    },
    {
      title: "Total Value",
      value: formatCurrency(totalValue),
      change: "+12.5%",
      changeType: "positive",
      icon: <DollarSign size={18} className="text-accent-lime" />,
      accentColor: "#C6FF80",
    },
    {
      title: "Low Stock",
      value: formatNumber(lowStock),
      change: "+2 items",
      changeType: "neutral",
      icon: <AlertTriangle size={18} className="text-status-low" />,
      accentColor: "#FFCC66",
    },
    {
      title: "Out of Stock",
      value: formatNumber(outOfStock),
      change: "+1 item",
      changeType: "negative",
      icon: <XCircle size={18} className="text-status-out" />,
      accentColor: "#FF8080",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
