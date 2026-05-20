"use client";

import { AlertTriangle } from "lucide-react";
import { alerts } from "@/data/products";

export default function AlertsPanel() {
  const criticalCount = alerts.filter((a) => a.type === "critical").length;

  return (
    <div className="bg-[#111111] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
        <h2 className="text-sm font-semibold text-white">Peringatan</h2>
        <span className="text-[11px] font-mono font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md">{criticalCount} kritis</span>
      </div>
      <div className="divide-y divide-white/[0.05]">
        {alerts.map((a) => (
          <div key={a.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${a.type === "critical" ? "bg-red-500/10" : "bg-amber-500/10"}`}>
              <AlertTriangle size={14} className={a.type === "critical" ? "text-red-400" : "text-amber-400"} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">{a.message}</p>
              <p className="text-[10px] font-mono text-zinc-500">{a.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
