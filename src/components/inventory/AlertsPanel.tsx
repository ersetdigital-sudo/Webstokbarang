"use client";

import { Bell } from "lucide-react";
import { alerts } from "@/data/products";

export default function AlertsPanel() {
  return (
    <div className="bg-bg-card border border-border-main rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-sm text-txt-primary">
          Alerts
        </h3>
        <div className="relative">
          <Bell size={16} className="text-txt-muted" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-status-out rounded-full animate-pulse" />
        </div>
      </div>

      {/* Alert list */}
      <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-border-main/50 hover:border-border-hover transition-colors duration-200"
          >
            {/* Status dot */}
            <div className="mt-1.5 flex-shrink-0">
              <span
                className={`block w-2 h-2 rounded-full ${
                  alert.type === "critical" ? "bg-status-out" : "bg-status-low"
                }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-txt-primary leading-relaxed">{alert.message}</p>
              <p className="text-[10px] text-txt-muted mt-1 font-mono">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
