"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { transactions } from "@/data/products";

const PER_PAGE = 6;

export default function RecentTransactions() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(transactions.length / PER_PAGE);
  const current = transactions.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div className="glass-strong rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <h2 className="text-sm font-semibold text-white">Transaksi Terbaru</h2>
        <span className="text-[11px] font-mono text-white/40">{transactions.length} transaksi</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {current.map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === "masuk" ? "bg-[#07CA6B]/10" : "bg-[#E89558]/10"}`}>
              {t.type === "masuk" ? <ArrowDownLeft size={14} className="text-[#07CA6B]" /> : <ArrowUpRight size={14} className="text-[#E89558]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white/90 truncate">{t.productName}</p>
              <p className="text-[11px] font-mono text-white/35">{t.sku}</p>
            </div>
            <div className="text-right">
              <p className={`text-[13px] font-mono font-semibold ${t.type === "masuk" ? "text-[#07CA6B]" : "text-[#E89558]"}`}>{t.type === "masuk" ? "+" : "-"}{t.qty}</p>
              <p className="text-[10px] font-mono text-white/30">{t.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06]">
        <span className="text-[11px] text-white/40">Hal {page + 1} dari {totalPages}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:bg-white/[0.05] hover:text-white disabled:opacity-25 transition-colors"><ChevronLeft size={14} /></button>
          {Array.from({ length: totalPages }).map((_, i) => (<button key={i} onClick={() => setPage(i)} className={`w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-mono transition-colors ${page === i ? "bg-[#1856FF]/15 text-[#1856FF]" : "text-white/40 hover:bg-white/[0.05]"}`}>{i + 1}</button>))}
          <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:bg-white/[0.05] hover:text-white disabled:opacity-25 transition-colors"><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}
