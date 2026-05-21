"use client";

import { AlertTriangle, XOctagon } from "lucide-react";
import { alerts } from "@/data/products";

export default function AlertsPanel() {
  const criticalCount = alerts.filter((a) => a.type === "critical").length;

  return (
    <div className="glass-strong rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#faf5ff]/[0.06]">
        <h2 className="text-sm font-semibold text-[#faf5ff]">Peringatan</h2>
        <span className="text-[11px] font-mono font-medium text-[#F43F5E] bg-[#F43F5E]/12 px-2 py-0.5 rounded-md">{criticalCount} kritis</span>
      </div>
      <div className="divide-y divide-[#faf5ff]/[0.04]">
        {alerts.map((a) => (
          <div key={a.id} className={`flex items-center gap-3 px-5 py-4 hover:bg-[#faf5ff]/[0.02] transition-colors ${a.type === "critical" ? "border-l-2 border-l-[#F43F5E]/40" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${a.type === "critical" ? "bg-[#F43F5E]/12" : "bg-[#FB923C]/10"}`}>
              {a.type === "critical" ? <XOctagon size={14} className="text-[#F43F5E]" /> : <AlertTriangle size={14} className="text-[#FB923C]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] font-medium truncate ${a.type === "critical" ? "text-[#faf5ff]/95" : "text-[#faf5ff]/65"}`}>{a.message}</p>
              <p className="text-[10px] font-mono text-[#faf5ff]/25">{a.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
