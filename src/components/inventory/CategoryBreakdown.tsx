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
    <div className="glass-strong rounded-xl p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-white">Analisa Penjualan</h3>
        <p className="text-[11px] text-white/40 mt-0.5">Top 10 produk terlaris</p>
      </div>
      <div className="space-y-2.5">
        {topProducts.map((p, i) => {
          const opacity = 1 - (i * 0.08);
          return (
            <div key={p.sku} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[11px] font-mono text-white/25 w-5">{i + 1}.</span>
                  <span className="text-xs text-white/80 truncate">{p.name}</span>
                </div>
                <span className="text-[11px] font-mono text-white font-medium ml-2">{p.sold}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden ml-7">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(p.sold / maxSold) * 100}%`, background: `rgba(24,86,255,${opacity * 0.8})` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
