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
  const [selected, setSelected] = useState<number>(6);
  const maxVal = Math.max(...data.map((d) => Math.max(d.masuk, d.keluar)));
  const totalMasuk = data.reduce((s, d) => s + d.masuk, 0);
  const totalKeluar = data.reduce((s, d) => s + d.keluar, 0);

  return (
    <div className="neo-card-flat overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b-2 border-neo-border">
        <div>
          <h2 className="text-sm font-bold text-neo-text">Tren Transaksi</h2>
          <p className="text-[11px] text-neo-muted mt-0.5">7 hari terakhir</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neo-success border border-neo-success/50" />
            <span className="text-[10px] font-semibold text-neo-muted">Masuk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neo-warning border border-neo-warning/50" />
            <span className="text-[10px] font-semibold text-neo-muted">Keluar</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        {/* Info panel */}
        <div className="mb-4 p-3 rounded-neo-xs bg-neo-bg border-2 border-neo-border grid grid-cols-4 gap-3">
          <div>
            <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">Hari</p>
            <p className="text-sm font-bold text-neo-text mt-0.5">{data[selected].day}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">Masuk</p>
            <p className="text-sm font-mono font-bold text-neo-success mt-0.5">+{data[selected].masuk}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">Keluar</p>
            <p className="text-sm font-mono font-bold text-neo-warning mt-0.5">-{data[selected].keluar}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">Net</p>
            <p className={`text-sm font-mono font-bold mt-0.5 ${data[selected].masuk - data[selected].keluar >= 0 ? "text-neo-success" : "text-neo-warning"}`}>
              {data[selected].masuk - data[selected].keluar >= 0 ? "+" : ""}{data[selected].masuk - data[selected].keluar}
            </p>
          </div>
        </div>

        {/* Bars */}
        <div className="flex items-end justify-between gap-2 h-[120px]">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group" onClick={() => setSelected(i)}>
              <div className="w-full flex items-end justify-center gap-[3px] h-[95px]">
                <div className={`relative w-[38%] rounded-t-[4px] overflow-hidden border-x border-t transition-all ${selected === i ? "border-neo-success" : "border-transparent"}`} style={{ height: `${(d.masuk / maxVal) * 100}%` }}>
                  <div className={`absolute inset-0 transition-colors ${selected === i ? "bg-neo-success" : "bg-neo-success/25 group-hover:bg-neo-success/45"}`} />
                </div>
                <div className={`relative w-[38%] rounded-t-[4px] overflow-hidden border-x border-t transition-all ${selected === i ? "border-neo-warning" : "border-transparent"}`} style={{ height: `${(d.keluar / maxVal) * 100}%` }}>
                  <div className={`absolute inset-0 transition-colors ${selected === i ? "bg-neo-warning" : "bg-neo-warning/25 group-hover:bg-neo-warning/45"}`} />
                </div>
              </div>
              <span className={`text-[10px] font-bold transition-colors ${selected === i ? "text-neo-text" : "text-neo-muted/50 group-hover:text-neo-muted"}`}>{d.short}</span>
              {selected === i && <div className="w-1.5 h-1.5 rounded-full bg-neo-primary" />}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t-2 border-neo-border">
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
