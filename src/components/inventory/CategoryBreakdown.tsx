"use client";

import { categories } from "@/data/products";

export default function CategoryBreakdown() {
  const maxCount = Math.max(...categories.map((c) => c.count));

  return (
    <div className="bg-background-card border border-border rounded-2xl p-5">
      <h3 className="font-heading font-semibold text-sm text-text-primary mb-4">
        Categories
      </h3>

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                {category.name}
              </span>
              <span className="text-xs font-mono text-text-muted">
                {category.count}
              </span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${(category.count / maxCount) * 100}%`,
                  backgroundColor: category.color,
                  opacity: 0.8,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
