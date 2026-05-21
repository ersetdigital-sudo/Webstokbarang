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
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#faf5ff]/[0.06]">
        <h2 className="text-sm font-semibold text-[#faf5ff]">Transaksi Terbaru</h2>
        <span className="text-[11px] font-mono text-[#faf5ff]/35">{transactions.length} transaksi</span>
      </div>
      <div className="divide-y divide-[#faf5ff]/[0.04]">
        {current.map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-5 py-4 hover:bg-[#faf5ff]/[0.02] transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === "masuk" ? "bg-[#4ADE80]/12" : "bg-[#FB923C]/12"}`}>
              {t.type === "masuk" ? <ArrowDownLeft size={14} className="text-[#4ADE80]" /> : <ArrowUpRight size={14} className="text-[#FB923C]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#faf5ff]/90 truncate">{t.productName}</p>
              <p className="text-[11px] font-mono text-[#faf5ff]/30">{t.sku}</p>
            </div>
            <div className="text-right">
              <p className={`text-[13px] font-mono font-semibold ${t.type === "masuk" ? "text-[#4ADE80]" : "text-[#FB923C]"}`}>{t.type === "masuk" ? "+" : "-"}{t.qty}</p>
              <p className="text-[10px] font-mono text-[#faf5ff]/25">{t.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#faf5ff]/[0.06]">
        <span className="text-[11px] text-[#faf5ff]/35">Hal {page + 1} dari {totalPages}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="w-7 h-7 rounded-md flex items-center justify-center text-[#faf5ff]/35 hover:bg-[#faf5ff]/[0.05] hover:text-[#faf5ff] disabled:opacity-25 transition-colors"><ChevronLeft size={14} /></button>
          {Array.from({ length: totalPages }).map((_, i) => (<button key={i} onClick={() => setPage(i)} className={`w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-mono transition-colors ${page === i ? "bg-[#E8C848]/15 text-[#E8C848]" : "text-[#faf5ff]/35 hover:bg-[#faf5ff]/[0.05]"}`}>{i + 1}</button>))}
          <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="w-7 h-7 rounded-md flex items-center justify-center text-[#faf5ff]/35 hover:bg-[#faf5ff]/[0.05] hover:text-[#faf5ff] disabled:opacity-25 transition-colors"><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}
