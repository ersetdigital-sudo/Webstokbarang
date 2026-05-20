"use client";

const topProducts = [
  { name: "Earbuds Noise Cancelling", sku: "ENC-6633", sold: 142 },
  { name: "Headphone Bluetooth Nirkabel", sku: "HBN-4421", sold: 98 },
  { name: "Keyboard Mekanikal RGB", sku: "KMR-3302", sold: 76 },
  { name: "Stop Kontak Pintar 6 Port", sku: "SKP-3378", sold: 64 },
  { name: "SSD Portabel 1TB", sku: "SPT-8847", sold: 51 },
  { name: "Lampu Meja LED Adjustable", sku: "LML-2294", sold: 47 },
  { name: "Webcam HD 1080p", sku: "WHD-9901", sold: 39 },
  { name: "Kabel Charger USB-C 2m", sku: "KCU-1087", sold: 33 },
  { name: "Mouse Wireless Ergonomis", sku: "MWE-5563", sold: 28 },
  { name: "Dudukan Monitor Arm", sku: "DMA-1122", sold: 21 },
];

export default function CategoryBreakdown() {
  const maxSold = topProducts[0].sold;

  return (
    <div className="bg-[#111111] border border-white/[0.07] rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-white">Analisa Penjualan</h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">Top 10 produk terlaris</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {topProducts.map((p, i) => (
          <div key={p.sku} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-mono text-zinc-600 w-5">{i + 1}.</span>
                <span className="text-xs text-zinc-300 truncate">{p.name}</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 flex-shrink-0 ml-2">{p.sold}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden ml-7">
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
