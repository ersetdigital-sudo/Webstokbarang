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
    <div className="bg-gradient-to-br from-[#131313] to-[#0f0f0f] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
        <h2 className="text-sm font-semibold text-white leading-relaxed">Transaksi Terbaru</h2>
        <span className="text-[11px] font-mono text-zinc-500">{transactions.length} transaksi</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {current.map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${t.type === "masuk" ? "bg-emerald-500/8" : "bg-rose-500/8"}`}>
              {t.type === "masuk" ? <ArrowDownLeft size={14} className="text-emerald-400/80" /> : <ArrowUpRight size={14} className="text-rose-400/80" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-zinc-200 truncate leading-relaxed">{t.productName}</p>
              <p className="text-[11px] font-mono text-zinc-500 leading-relaxed">{t.sku}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className={`text-[13px] font-mono font-medium ${t.type === "masuk" ? "text-emerald-400/85" : "text-rose-400/85"}`}>{t.type === "masuk" ? "+" : "-"}{t.qty}</p>
              <p className="text-[10px] font-mono text-zinc-500 leading-relaxed">{t.time}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.07]">
        <span className="text-[11px] text-zinc-500 leading-relaxed">Hal {page + 1} dari {totalPages}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-400 hover:bg-white/[0.05] hover:text-white disabled:opacity-25 transition-colors">
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)} className={`w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-mono transition-colors ${page === i ? "bg-indigo-500/15 text-indigo-400" : "text-zinc-500 hover:bg-white/[0.05] hover:text-white"}`}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-400 hover:bg-white/[0.05] hover:text-white disabled:opacity-25 transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
