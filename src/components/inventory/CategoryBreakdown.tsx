"use client";

const topProducts = [
  { name: "Earbuds Noise Cancelling", sku: "ENC-6633", sold: 142, revenue: 126380000 },
  { name: "Headphone Bluetooth Nirkabel", sku: "HBN-4421", sold: 98, revenue: 44982000 },
  { name: "Keyboard Mekanikal RGB", sku: "KMR-3302", sold: 76, revenue: 95000000 },
  { name: "Stop Kontak Pintar 6 Port", sku: "SKP-3378", sold: 64, revenue: 10560000 },
  { name: "SSD Portabel 1TB", sku: "SPT-8847", sold: 51, revenue: 73950000 },
];

export default function CategoryBreakdown() {
  const maxSold = Math.max(...topProducts.map((p) => p.sold));

  return (
    <div className="bg-[#111111] border border-white/[0.07] rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-white">Analisa Penjualan</h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">Top 5 produk terlaris</p>
        </div>
      </div>
      <div className="space-y-3">
        {topProducts.map((p, i) => (
          <div key={p.sku} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-mono text-zinc-500 w-4">{i + 1}.</span>
                <span className="text-xs text-zinc-300 truncate">{p.name}</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 flex-shrink-0 ml-2">{p.sold} terjual</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-400/70 transition-all duration-500"
                style={{ width: `${(p.sold / maxSold) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
