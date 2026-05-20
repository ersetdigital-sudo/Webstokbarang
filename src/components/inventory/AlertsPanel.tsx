"use client";

import { AlertCircle } from "lucide-react";
import { alerts } from "@/data/products";

export default function AlertsPanel() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-heading font-semibold text-text-primary">Peringatan</h3>
        <span className="text-[10px] font-mono text-red bg-red-muted px-1.5 py-0.5 rounded">
          {alerts.filter((a) => a.type === "critical").length}
        </span>
      </div>
      <div className="space-y-2 max-h-[280px] overflow-y-auto">
        {alerts.map((a) => (
          <div key={a.id} className="flex gap-2.5 p-2.5 rounded-lg hover:bg-bg-hover transition-colors">
            <AlertCircle
              size={14}
              className={`mt-0.5 flex-shrink-0 ${a.type === "critical" ? "text-red" : "text-yellow"}`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-text-primary leading-snug">{a.message}</p>
              <p className="text-[10px] font-mono text-text-muted mt-0.5">{a.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
