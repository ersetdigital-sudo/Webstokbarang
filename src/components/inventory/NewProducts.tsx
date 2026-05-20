"use client";

import { Package } from "lucide-react";

const newItems = [
  { name: "Monitor 4K 27 Inch", sku: "M4K-2701", date: "20 Mei 2026", qty: 15 },
  { name: "Docking Station USB-C", sku: "DSU-8812", date: "19 Mei 2026", qty: 30 },
  { name: "Mousepad XL Premium", sku: "MXP-4455", date: "18 Mei 2026", qty: 100 },
  { name: "Webcam 4K Autofocus", sku: "W4A-6609", date: "17 Mei 2026", qty: 25 },
];

export default function NewProducts() {
  return (
    <div className="bg-[#111111] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
        <h2 className="text-sm font-semibold text-white">Barang Terbaru</h2>
        <span className="text-[11px] font-mono text-zinc-500">{newItems.length} ditambahkan</span>
      </div>
      <div className="divide-y divide-white/[0.05]">
        {newItems.map((item) => (
          <div key={item.sku} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-indigo-500/10">
              <Package size={14} className="text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">{item.name}</p>
              <p className="text-[11px] font-mono text-zinc-500">{item.sku}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-mono font-medium text-indigo-400">+{item.qty}</p>
              <p className="text-[10px] font-mono text-zinc-500">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
