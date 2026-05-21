"use client";

import { AlertTriangle, XOctagon } from "lucide-react";
import { alerts } from "@/data/products";

export default function AlertsPanel() {
  const criticalCount = alerts.filter((a) => a.type === "critical").length;

  return (
    <div className="neo-card-flat overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b-2 border-neo-border">
        <h2 className="text-sm font-bold text-neo-text">Peringatan</h2>
        <span className="neo-badge bg-neo-danger/10 text-neo-danger border-neo-danger/40">{criticalCount} kritis</span>
      </div>
      <div className="divide-y-2 divide-neo-border">
        {alerts.map((a) => (
          <div key={a.id} className={`flex items-center gap-3 px-5 py-3.5 hover:bg-neo-bg transition-colors ${a.type === "critical" ? "border-l-4 border-l-neo-danger" : ""}`}>
            <div className={`w-9 h-9 rounded-neo-xs border-2 flex items-center justify-center ${a.type === "critical" ? "bg-neo-danger/10 border-neo-danger/40" : "bg-neo-warning/10 border-neo-warning/40"}`}>
              {a.type === "critical" ? <XOctagon size={15} className="text-neo-danger" /> : <AlertTriangle size={15} className="text-neo-warning" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] font-semibold truncate ${a.type === "critical" ? "text-neo-text" : "text-neo-subtle"}`}>{a.message}</p>
              <p className="text-[10px] font-mono text-neo-muted">{a.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
