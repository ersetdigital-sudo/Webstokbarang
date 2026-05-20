"use client";

import { Bell } from "lucide-react";
import { alerts } from "@/data/products";

export default function AlertsPanel() {
  return (
    <div className="bg-background-card border border-border rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-syne font-semibold text-sm text-text-primary">
          Alerts
        </h3>
        <div className="relative">
          <Bell size={16} className="text-text-muted" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-status-out rounded-full" />
        </div>
      </div>

      {/* Alert Items */}
      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-border/50 hover:border-border-hover transition-colors duration-200"
          >
            {/* Dot */}
            <div className="mt-1 flex-shrink-0">
              <span
                className={`block w-2 h-2 rounded-full ${
                  alert.type === "critical"
                    ? "bg-status-out"
                    : "bg-status-low"
                }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-text-primary leading-relaxed">
                {alert.message}
              </p>
              <p className="text-[10px] text-text-muted mt-1 font-mono">
                {alert.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
