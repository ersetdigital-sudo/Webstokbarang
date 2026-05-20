"use client";

import { categories } from "@/data/products";

export default function CategoryBreakdown() {
  const max = Math.max(...categories.map((c) => c.count));

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-heading font-semibold mb-4">Kategori</h3>
      <div className="space-y-3">
        {categories.map((c) => (
          <div key={c.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">{c.name}</span>
              <span className="font-mono text-muted-foreground">{c.count}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(c.count / max) * 100}%`, backgroundColor: c.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
