"use client";

import { AlertTriangle, XOctagon } from "lucide-react";
import { alerts } from "@/data/products";

export default function AlertsPanel() {
  const criticalCount = alerts.filter((a) => a.type === "critical").length;

  return (
    <div className="bg-gradient-to-br from-[#0c1015] to-[#080c0f] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
        <h2 className="text-sm font-semibold text-white leading-relaxed">Peringatan</h2>
        <span className="text-[11px] font-mono font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md">{criticalCount} kritis</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {alerts.map((a) => (
          <div key={a.id} className={`flex items-center gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors ${a.type === "critical" ? "border-l-2 border-l-orange-500/40" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${a.type === "critical" ? "bg-orange-500/12" : "bg-amber-500/8"}`}>
              {a.type === "critical" ? <XOctagon size={14} className="text-orange-400" /> : <AlertTriangle size={14} className="text-amber-400/70" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] font-medium truncate leading-relaxed ${a.type === "critical" ? "text-zinc-100" : "text-zinc-300"}`}>{a.message}</p>
              <p className="text-[10px] font-mono text-zinc-500 leading-relaxed">{a.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
