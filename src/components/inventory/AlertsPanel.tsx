"use client";

import { Bell } from "lucide-react";
import { alerts } from "@/data/products";

export default function AlertsPanel() {
  const criticalCount = alerts.filter((a) => a.type === "critical").length;

  return (
    <div className="bg-surface-secondary border border-line-primary rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-[13px] text-content-primary">
          Peringatan
        </h3>
        <div className="flex items-center gap-2">
          {criticalCount > 0 && (
            <span className="text-[10px] font-mono font-medium text-state-danger bg-state-danger/10 px-1.5 py-0.5 rounded">
              {criticalCount}
            </span>
          )}
          <div className="relative">
            <Bell size={15} className="text-content-tertiary" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-state-danger rounded-full animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Alert list */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 p-3 rounded-xl border border-line-primary/50 hover:border-line-secondary hover:bg-surface-tertiary/30 transition-all duration-200"
          >
            <div className="mt-1.5 flex-shrink-0">
              <span
                className={`block w-[7px] h-[7px] rounded-full ${
                  alert.type === "critical" ? "bg-state-danger" : "bg-state-warning"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-content-primary leading-relaxed">{alert.message}</p>
              <p className="text-[10px] text-content-tertiary mt-1 font-mono">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
