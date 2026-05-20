"use client";

const data = [
  { day: "Sen", masuk: 12, keluar: 8 },
  { day: "Sel", masuk: 18, keluar: 14 },
  { day: "Rab", masuk: 8, keluar: 22 },
  { day: "Kam", masuk: 25, keluar: 11 },
  { day: "Jum", masuk: 15, keluar: 19 },
  { day: "Sab", masuk: 30, keluar: 7 },
  { day: "Min", masuk: 20, keluar: 13 },
];

export default function TrendChart() {
  const maxVal = Math.max(...data.map((d) => Math.max(d.masuk, d.keluar)));

  return (
    <div className="bg-[#111111] border border-white/[0.07] rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Tren Transaksi</h3>
          <p className="text-xs text-zinc-500 mt-0.5">7 hari terakhir</p>
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

      {/* Bar chart */}
      <div className="flex items-end justify-between gap-2 h-[140px]">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end justify-center gap-[3px] h-[120px]">
              {/* Masuk bar */}
              <div className="relative w-[40%] rounded-t-sm overflow-hidden" style={{ height: `${(d.masuk / maxVal) * 100}%` }}>
                <div className="absolute inset-0 bg-emerald-400/80 hover:bg-emerald-400 transition-colors" />
              </div>
              {/* Keluar bar */}
              <div className="relative w-[40%] rounded-t-sm overflow-hidden" style={{ height: `${(d.keluar / maxVal) * 100}%` }}>
                <div className="absolute inset-0 bg-red-400/60 hover:bg-red-400/80 transition-colors" />
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1">{d.day}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.05]">
        <div>
          <p className="text-xs text-zinc-500">Total Masuk</p>
          <p className="text-lg font-semibold text-emerald-400">+128</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Total Keluar</p>
          <p className="text-lg font-semibold text-red-400">-94</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Net Stok</p>
          <p className="text-lg font-semibold text-indigo-400">+34</p>
        </div>
      </div>
    </div>
  );
}
