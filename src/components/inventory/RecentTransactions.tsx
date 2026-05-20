"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { transactions } from "@/data/products";

export default function RecentTransactions() {
  return (
    <div className="bg-[#111111] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
        <h2 className="text-sm font-semibold text-white">Transaksi Terbaru</h2>
        <span className="text-[11px] font-mono text-zinc-500">{transactions.length} transaksi</span>
      </div>
      <div className="divide-y divide-white/[0.05]">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${t.type === "masuk" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
              {t.type === "masuk" ? <ArrowDownLeft size={14} className="text-emerald-400" /> : <ArrowUpRight size={14} className="text-red-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">{t.productName}</p>
              <p className="text-[11px] font-mono text-zinc-500">{t.sku}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className={`text-sm font-mono font-medium ${t.type === "masuk" ? "text-emerald-400" : "text-red-400"}`}>{t.type === "masuk" ? "+" : "-"}{t.qty}</p>
              <p className="text-[10px] font-mono text-zinc-500">{t.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
