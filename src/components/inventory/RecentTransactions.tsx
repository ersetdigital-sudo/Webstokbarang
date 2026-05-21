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
    <div className="neo-card-flat overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b-2 border-neo-border">
        <h2 className="text-sm font-bold text-neo-text">Transaksi Terbaru</h2>
        <span className="text-[11px] font-mono font-semibold text-neo-muted">{transactions.length} transaksi</span>
      </div>
      <div className="divide-y-2 divide-neo-border">
        {current.map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-neo-bg transition-colors">
            <div className={`w-9 h-9 rounded-neo-xs border-2 flex items-center justify-center ${t.type === "masuk" ? "bg-neo-success/10 border-neo-success/40" : "bg-neo-warning/10 border-neo-warning/40"}`}>
              {t.type === "masuk" ? <ArrowDownLeft size={15} className="text-neo-success" /> : <ArrowUpRight size={15} className="text-neo-warning" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-neo-text truncate">{t.productName}</p>
              <p className="text-[11px] font-mono text-neo-muted">{t.sku}</p>
            </div>
            <div className="text-right">
              <p className={`text-[13px] font-mono font-bold ${t.type === "masuk" ? "text-neo-success" : "text-neo-warning"}`}>
                {t.type === "masuk" ? "+" : "-"}{t.qty}
              </p>
              <p className="text-[10px] font-mono text-neo-muted">{t.time}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t-2 border-neo-border">
        <span className="text-[11px] font-semibold text-neo-muted">Hal {page + 1} dari {totalPages}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="w-7 h-7 rounded-neo-xs border-2 border-neo-border flex items-center justify-center text-neo-muted hover:text-neo-text hover:border-neo-primary disabled:opacity-25 transition-all">
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)} className={`w-7 h-7 rounded-neo-xs border-2 flex items-center justify-center text-[11px] font-mono font-bold transition-all ${page === i ? "bg-neo-primary border-neo-primary text-white" : "border-neo-border text-neo-muted hover:border-neo-primary hover:text-neo-text"}`}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="w-7 h-7 rounded-neo-xs border-2 border-neo-border flex items-center justify-center text-neo-muted hover:text-neo-text hover:border-neo-primary disabled:opacity-25 transition-all">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
