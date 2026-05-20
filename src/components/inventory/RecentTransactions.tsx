"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { transactions } from "@/data/products";

export default function RecentTransactions() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-sm font-heading font-semibold">Transaksi Terbaru</h2>
        <span className="text-xs text-muted-foreground">{transactions.length} transaksi</span>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === "masuk" ? "bg-success/10" : "bg-destructive/10"}`}>
              {t.type === "masuk" ? <ArrowDownLeft size={14} className="text-success" /> : <ArrowUpRight size={14} className="text-destructive" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{t.productName}</p>
              <p className="text-xs font-mono text-muted-foreground">{t.sku}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-mono font-medium ${t.type === "masuk" ? "text-success" : "text-destructive"}`}>
                {t.type === "masuk" ? "+" : "-"}{t.qty}
              </p>
              <p className="text-[10px] text-muted-foreground">{t.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
