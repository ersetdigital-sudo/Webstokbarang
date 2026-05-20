"use client";

import { categories } from "@/data/products";

export default function CategoryBreakdown() {
  const max = Math.max(...categories.map((c) => c.count));

  return (
    <div className="bg-bg-card border border-border rounded-xl p-4">
      <h3 className="text-[13px] font-heading font-semibold text-text-primary mb-4">Kategori</h3>
      <div className="space-y-3">
        {categories.map((c) => (
          <div key={c.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] text-text-secondary">{c.name}</span>
              <span className="text-[11px] font-mono text-text-muted">{c.count}</span>
            </div>
            <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(c.count / max) * 100}%`, backgroundColor: c.color, opacity: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
