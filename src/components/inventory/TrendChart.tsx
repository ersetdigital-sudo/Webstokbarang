"use client";

import { useState } from "react";

const data = [
  { day: "Senin", short: "Sen", masuk: 12, keluar: 8 },
  { day: "Selasa", short: "Sel", masuk: 18, keluar: 14 },
  { day: "Rabu", short: "Rab", masuk: 8, keluar: 22 },
  { day: "Kamis", short: "Kam", masuk: 25, keluar: 11 },
  { day: "Jumat", short: "Jum", masuk: 15, keluar: 19 },
  { day: "Sabtu", short: "Sab", masuk: 30, keluar: 7 },
  { day: "Minggu", short: "Min", masuk: 20, keluar: 13 },
];

export default function TrendChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? 6;
  const maxVal = Math.max(...data.flatMap((d) => [d.masuk, d.keluar]));
  const totalMasuk = data.reduce((s, d) => s + d.masuk, 0);
  const totalKeluar = data.reduce((s, d) => s + d.keluar, 0);

  // Generate SVG path for area chart
  const chartH = 120;
  const chartW = 100; // percentage based
  const points = (key: "masuk" | "keluar") =>
    data.map((d, i) => ({
      x: (i / (data.length - 1)) * 100,
      y: chartH - (d[key] / maxVal) * (chartH - 20),
    }));

  const makePath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
      const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
      path += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return path;
  };

  const makeArea = (pts: { x: number; y: number }[]) => {
    const path = makePath(pts);
    return `${path} L 100 ${chartH} L 0 ${chartH} Z`;
  };

  const masukPts = points("masuk");
  const keluarPts = points("keluar");

  return (
    <div className="neo-card-flat overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b-2 border-neo-border">
        <div>
          <h2 className="text-sm font-bold text-neo-text">Tren Transaksi</h2>
          <p className="text-[11px] text-neo-muted mt-0.5">7 hari terakhir</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-neo-success" />
            <span className="text-[10px] font-semibold text-neo-muted">Masuk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-neo-warning" />
            <span className="text-[10px] font-semibold text-neo-muted">Keluar</span>
          </div>
        </div>
      </div>

      {/* Chart area */}
      <div className="px-5 pt-5 pb-2">
        {/* Tooltip */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">{data[active].day}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold text-neo-muted">Masuk</p>
              <p className="text-sm font-mono font-bold text-neo-success">+{data[active].masuk}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-neo-muted">Keluar</p>
              <p className="text-sm font-mono font-bold text-neo-warning">-{data[active].keluar}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-neo-muted">Net</p>
              <p className={`text-sm font-mono font-bold ${data[active].masuk - data[active].keluar >= 0 ? "text-neo-success" : "text-neo-warning"}`}>
                {data[active].masuk - data[active].keluar >= 0 ? "+" : ""}{data[active].masuk - data[active].keluar}
              </p>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="relative h-[140px] w-full">
          <svg viewBox={`0 0 100 ${chartH}`} className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradMasuk" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#07CA6B" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#07CA6B" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradKeluar" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E89558" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#E89558" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((pct) => (
              <line key={pct} x1="0" y1={chartH * pct} x2="100" y2={chartH * pct} stroke="#27272a" strokeWidth="0.3" strokeDasharray="2 2" />
            ))}

            {/* Area fills */}
            <path d={makeArea(masukPts)} fill="url(#gradMasuk)" />
            <path d={makeArea(keluarPts)} fill="url(#gradKeluar)" />

            {/* Lines */}
            <path d={makePath(masukPts)} fill="none" stroke="#07CA6B" strokeWidth="1.5" strokeLinecap="round" />
            <path d={makePath(keluarPts)} fill="none" stroke="#E89558" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 2" />

            {/* Active vertical line */}
            <line x1={masukPts[active].x} y1="0" x2={masukPts[active].x} y2={chartH} stroke="#3f3f46" strokeWidth="0.5" strokeDasharray="2 2" />

            {/* Data points - masuk */}
            {masukPts.map((p, i) => (
              <circle key={`m${i}`} cx={p.x} cy={p.y} r={i === active ? 3 : 1.5} fill={i === active ? "#07CA6B" : "#18181b"} stroke="#07CA6B" strokeWidth={i === active ? 1.5 : 1} />
            ))}

            {/* Data points - keluar */}
            {keluarPts.map((p, i) => (
              <circle key={`k${i}`} cx={p.x} cy={p.y} r={i === active ? 3 : 1.5} fill={i === active ? "#E89558" : "#18181b"} stroke="#E89558" strokeWidth={i === active ? 1.5 : 1} />
            ))}
          </svg>

          {/* Hover zones */}
          <div className="absolute inset-0 flex">
            {data.map((_, i) => (
              <div
                key={i}
                className="flex-1 cursor-pointer"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setHovered(i)}
              />
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-0.5">
          {data.map((d, i) => (
            <span key={i} className={`text-[9px] font-bold transition-colors ${i === active ? "text-neo-text" : "text-neo-muted/50"}`}>
              {d.short}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t-2 border-neo-border mt-2">
        <div>
          <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">Masuk</p>
          <p className="text-sm font-extrabold text-neo-success">+{totalMasuk}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">Keluar</p>
          <p className="text-sm font-extrabold text-neo-warning">-{totalKeluar}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">Net</p>
          <p className="text-sm font-extrabold text-neo-primary">+{totalMasuk - totalKeluar}</p>
        </div>
      </div>
    </div>
  );
}
