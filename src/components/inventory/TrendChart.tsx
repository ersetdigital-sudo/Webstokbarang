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
    <div className="bg-gradient-to-br from-[#131313] to-[#0f0f0f] border border-white/[0.07] rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-white leading-relaxed">Tren Transaksi</h3>
          <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">7 hari terakhir</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            <span className="text-[11px] text-zinc-400 leading-relaxed">Masuk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
            <span className="text-[11px] text-zinc-400 leading-relaxed">Keluar</span>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div className="mb-5 p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.05] shadow-sm grid grid-cols-4 gap-3">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider leading-relaxed">Hari</p>
          <p className="text-sm font-semibold text-white mt-0.5">{data[selected].day}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider leading-relaxed">Masuk</p>
          <p className="text-sm font-mono font-semibold text-emerald-400 mt-0.5">+{data[selected].masuk}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider leading-relaxed">Keluar</p>
          <p className="text-sm font-mono font-semibold text-rose-400 mt-0.5">-{data[selected].keluar}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider leading-relaxed">Net</p>
          <p className={`text-sm font-mono font-semibold mt-0.5 ${data[selected].masuk - data[selected].keluar >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {data[selected].masuk - data[selected].keluar >= 0 ? "+" : ""}{data[selected].masuk - data[selected].keluar}
          </p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end justify-between gap-3 h-[130px]">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group"
            onClick={() => setSelected(i)}
          >
            <div className="w-full flex items-end justify-center gap-1 h-[105px]">
              <div
                className="relative w-[38%] rounded-t-[3px] overflow-hidden transition-all duration-200"
                style={{ height: `${(d.masuk / maxVal) * 100}%` }}
              >
                <div className={`absolute inset-0 transition-colors duration-200 ${selected === i ? "bg-emerald-400" : "bg-emerald-400/40 group-hover:bg-emerald-400/65"}`} />
              </div>
              <div
                className="relative w-[38%] rounded-t-[3px] overflow-hidden transition-all duration-200"
                style={{ height: `${(d.keluar / maxVal) * 100}%` }}
              >
                <div className={`absolute inset-0 transition-colors duration-200 ${selected === i ? "bg-rose-400" : "bg-rose-400/35 group-hover:bg-rose-400/60"}`} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-[10px] leading-relaxed transition-colors ${selected === i ? "text-zinc-200 font-medium" : "text-zinc-500 group-hover:text-zinc-400"}`}>
                {d.short}
              </span>
              {selected === i && <div className="w-1 h-1 rounded-full bg-indigo-400 mt-0.5" />}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.05]">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider leading-relaxed">Total Masuk</p>
          <p className="text-base font-semibold text-emerald-400">+{totalMasuk}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider leading-relaxed">Total Keluar</p>
          <p className="text-base font-semibold text-rose-400">-{totalKeluar}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider leading-relaxed">Net Stok</p>
          <p className="text-base font-semibold text-indigo-400">+{totalMasuk - totalKeluar}</p>
        </div>
      </div>
    </div>
  );
}
