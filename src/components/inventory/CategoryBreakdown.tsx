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
  const totalSold = topProducts.reduce((s, p) => s + p.sold, 0);

  return (
    <div className="neo-card-flat overflow-hidden">
      {/* Header — same structure as TrendChart */}
      <div className="flex items-center justify-between px-5 py-4 border-b-2 border-neo-border">
        <div>
          <h2 className="text-sm font-bold text-neo-text">Analisa Penjualan</h2>
          <p className="text-[11px] text-neo-muted mt-0.5">Top 10 produk terlaris</p>
        </div>
        <span className="text-[11px] font-mono font-bold text-neo-primary">{totalSold} terjual</span>
      </div>

      {/* Content */}
      <div className="px-5 py-4 space-y-3">
        {topProducts.map((p, i) => {
          const pct = (p.sold / maxSold) * 100;
          return (
            <div key={p.sku}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[11px] font-mono font-bold text-neo-muted w-5">{i + 1}.</span>
                  <span className="text-[12px] font-semibold text-neo-subtle truncate">{p.name}</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-neo-text ml-2">{p.sold}</span>
              </div>
              <div className="h-2 rounded-full bg-neo-bg border border-neo-border overflow-hidden ml-7">
                <div className="h-full rounded-full bg-neo-primary transition-all duration-500" style={{ width: `${pct}%`, opacity: 1 - i * 0.07 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
