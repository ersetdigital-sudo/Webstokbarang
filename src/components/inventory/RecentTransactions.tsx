"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { transactions } from "@/data/products";

export default function RecentTransactions() {
  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-[14px] font-heading font-semibold text-text-primary">Transaksi Terbaru</h2>
        <span className="text-[11px] text-text-muted font-mono">{transactions.length} transaksi</span>
      </div>

      {/* List */}
      <div className="divide-y divide-border-subtle">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-4 py-3 hover:bg-bg-hover/50 transition-colors">
            {/* Icon */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                t.type === "masuk" ? "bg-green-muted" : "bg-red-muted"
              }`}
            >
              {t.type === "masuk" ? (
                <ArrowDownLeft size={14} className="text-green" />
              ) : (
                <ArrowUpRight size={14} className="text-red" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-text-primary truncate">{t.productName}</p>
              <p className="text-[11px] font-mono text-text-muted">{t.sku}</p>
            </div>

            {/* Qty & time */}
            <div className="text-right flex-shrink-0">
              <p className={`text-[13px] font-mono font-medium ${t.type === "masuk" ? "text-green" : "text-red"}`}>
                {t.type === "masuk" ? "+" : "-"}{t.qty}
              </p>
              <p className="text-[10px] text-text-muted font-mono">{t.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border-subtle">
        <p className="text-[11px] text-text-muted">Terakhir diperbarui hari ini</p>
      </div>
    </div>
  );
}
