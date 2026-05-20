"use client";

import { categories } from "@/data/products";

export default function CategoryBreakdown() {
  const maxCount = Math.max(...categories.map((c) => c.count));
  const total = categories.reduce((s, c) => s + c.count, 0);

  return (
    <div className="bg-surface-secondary border border-line-primary rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading font-semibold text-[13px] text-content-primary">
          Kategori
        </h3>
        <span className="text-[11px] font-mono text-content-tertiary">{total} total</span>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-[12px] text-content-secondary">{cat.name}</span>
              </div>
              <span className="text-[11px] font-mono text-content-tertiary">{cat.count}</span>
            </div>
            <div className="w-full h-[6px] bg-surface-tertiary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${(cat.count / maxCount) * 100}%`,
                  backgroundColor: cat.color,
                  opacity: 0.75,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
