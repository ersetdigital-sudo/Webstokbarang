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
  const [selected, setSelected] = useState<number | null>(null);
  const maxVal = Math.max(...data.map((d) => Math.max(d.masuk, d.keluar)));

  const totalMasuk = data.reduce((s, d) => s + d.masuk, 0);
  const totalKeluar = data.reduce((s, d) => s + d.keluar, 0);

  return (
    <div className="bg-[#111111] border border-white/[0.07] rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Tren Transaksi</h3>
          <p className="text-xs text-zinc-500 mt-0.5">7 hari terakhir — klik bar untuk detail</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-zinc-400">Masuk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="text-[11px] text-zinc-400">Keluar</span>
          </div>
        </div>
      </div>

      {/* Selected detail */}
      {selected !== null && (
        <div className="mb-4 p-3 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400">Hari</p>
            <p className="text-sm font-semibold text-white">{data[selected].day}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-400">Masuk</p>
            <p className="text-sm font-mono font-semibold text-emerald-400">+{data[selected].masuk}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-400">Keluar</p>
            <p className="text-sm font-mono font-semibold text-red-400">-{data[selected].keluar}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-400">Net</p>
            <p className={`text-sm font-mono font-semibold ${data[selected].masuk - data[selected].keluar >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {data[selected].masuk - data[selected].keluar >= 0 ? "+" : ""}{data[selected].masuk - data[selected].keluar}
            </p>
          </div>
        </div>
      )}

      {/* Bar chart */}
      <div className="flex items-end justify-between gap-2 h-[140px]">
        {data.map((d, i) => (
          <div
            key={i}
            className={`flex-1 flex flex-col items-center gap-1 cursor-pointer group`}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <div className="w-full flex items-end justify-center gap-[3px] h-[120px]">
              {/* Masuk bar */}
              <div
                className="relative w-[40%] rounded-t-sm overflow-hidden transition-all duration-200"
                style={{ height: `${(d.masuk / maxVal) * 100}%` }}
              >
                <div className={`absolute inset-0 transition-colors ${selected === i ? "bg-emerald-400" : "bg-emerald-400/60 group-hover:bg-emerald-400/80"}`} />
              </div>
              {/* Keluar bar */}
              <div
                className="relative w-[40%] rounded-t-sm overflow-hidden transition-all duration-200"
                style={{ height: `${(d.keluar / maxVal) * 100}%` }}
              >
                <div className={`absolute inset-0 transition-colors ${selected === i ? "bg-red-400" : "bg-red-400/50 group-hover:bg-red-400/70"}`} />
              </div>
            </div>
            <span className={`text-[10px] mt-1 transition-colors ${selected === i ? "text-white font-medium" : "text-zinc-500"}`}>
              {d.short}
            </span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.05]">
        <div>
          <p className="text-xs text-zinc-500">Total Masuk</p>
          <p className="text-lg font-semibold text-emerald-400">+{totalMasuk}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Total Keluar</p>
          <p className="text-lg font-semibold text-red-400">-{totalKeluar}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Net Stok</p>
          <p className="text-lg font-semibold text-indigo-400">+{totalMasuk - totalKeluar}</p>
        </div>
      </div>
    </div>
  );
}
