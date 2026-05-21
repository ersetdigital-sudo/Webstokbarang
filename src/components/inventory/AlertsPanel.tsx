"use client";

import { AlertTriangle, XOctagon } from "lucide-react";
import { alerts } from "@/data/products";

export default function AlertsPanel() {
  const criticalCount = alerts.filter((a) => a.type === "critical").length;

  return (
    <div className="glass-strong rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <h2 className="text-sm font-semibold text-white">Peringatan</h2>
        <span className="text-[11px] font-mono font-medium text-[#EA2143] bg-[#EA2143]/10 px-2 py-0.5 rounded-md">{criticalCount} kritis</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {alerts.map((a) => (
          <div key={a.id} className={`flex items-center gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors ${a.type === "critical" ? "border-l-2 border-l-[#EA2143]/40" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${a.type === "critical" ? "bg-[#EA2143]/10" : "bg-[#E89558]/10"}`}>
              {a.type === "critical" ? <XOctagon size={14} className="text-[#EA2143]" /> : <AlertTriangle size={14} className="text-[#E89558]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] font-medium truncate ${a.type === "critical" ? "text-white/95" : "text-white/70"}`}>{a.message}</p>
              <p className="text-[10px] font-mono text-white/30">{a.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
