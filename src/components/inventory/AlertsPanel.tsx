"use client";

import { AlertCircle } from "lucide-react";
import { alerts } from "@/data/products";

export default function AlertsPanel() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Peringatan</h3>
        <span className="text-[10px] font-mono text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">{alerts.filter((a) => a.type === "critical").length}</span>
      </div>
      <div className="space-y-2 max-h-[240px] overflow-y-auto">
        {alerts.map((a) => (
          <div key={a.id} className="flex gap-2.5 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
            <AlertCircle size={14} className={`mt-0.5 flex-shrink-0 ${a.type === "critical" ? "text-destructive" : "text-warning"}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs leading-snug">{a.message}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{a.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
