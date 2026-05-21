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
    <div className="glass-strong rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-[#faf5ff]">Tren Transaksi</h3>
          <p className="text-xs text-[#faf5ff]/35 mt-0.5">7 hari terakhir</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]" /><span className="text-[11px] text-[#faf5ff]/45">Masuk</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FB923C]" /><span className="text-[11px] text-[#faf5ff]/45">Keluar</span></div>
        </div>
      </div>
      <div className="mb-5 p-3.5 rounded-lg bg-[#faf5ff]/[0.03] border border-[#faf5ff]/[0.06] grid grid-cols-4 gap-3">
        <div><p className="text-[10px] text-[#faf5ff]/35 uppercase tracking-wider">Hari</p><p className="text-sm font-semibold text-[#faf5ff] mt-0.5">{data[selected].day}</p></div>
        <div><p className="text-[10px] text-[#faf5ff]/35 uppercase tracking-wider">Masuk</p><p className="text-sm font-mono font-semibold text-[#4ADE80] mt-0.5">+{data[selected].masuk}</p></div>
        <div><p className="text-[10px] text-[#faf5ff]/35 uppercase tracking-wider">Keluar</p><p className="text-sm font-mono font-semibold text-[#FB923C] mt-0.5">-{data[selected].keluar}</p></div>
        <div><p className="text-[10px] text-[#faf5ff]/35 uppercase tracking-wider">Net</p><p className={`text-sm font-mono font-semibold mt-0.5 ${data[selected].masuk - data[selected].keluar >= 0 ? "text-[#4ADE80]" : "text-[#FB923C]"}`}>{data[selected].masuk - data[selected].keluar >= 0 ? "+" : ""}{data[selected].masuk - data[selected].keluar}</p></div>
      </div>
      <div className="flex items-end justify-between gap-3 h-[130px]">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group" onClick={() => setSelected(i)}>
            <div className="w-full flex items-end justify-center gap-1 h-[105px]">
              <div className="relative w-[38%] rounded-t-[3px] overflow-hidden" style={{ height: `${(d.masuk / maxVal) * 100}%` }}><div className={`absolute inset-0 transition-colors ${selected === i ? "bg-[#4ADE80]" : "bg-[#4ADE80]/30 group-hover:bg-[#4ADE80]/50"}`} /></div>
              <div className="relative w-[38%] rounded-t-[3px] overflow-hidden" style={{ height: `${(d.keluar / maxVal) * 100}%` }}><div className={`absolute inset-0 transition-colors ${selected === i ? "bg-[#FB923C]" : "bg-[#FB923C]/30 group-hover:bg-[#FB923C]/50"}`} /></div>
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-[10px] transition-colors ${selected === i ? "text-[#faf5ff] font-medium" : "text-[#faf5ff]/25 group-hover:text-[#faf5ff]/45"}`}>{d.short}</span>
              {selected === i && <div className="w-1 h-1 rounded-full bg-[#E8C848] mt-0.5" />}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#faf5ff]/[0.06]">
        <div><p className="text-[10px] text-[#faf5ff]/35 uppercase tracking-wider">Total Masuk</p><p className="text-base font-semibold text-[#4ADE80]">+{totalMasuk}</p></div>
        <div><p className="text-[10px] text-[#faf5ff]/35 uppercase tracking-wider">Total Keluar</p><p className="text-base font-semibold text-[#FB923C]">-{totalKeluar}</p></div>
        <div><p className="text-[10px] text-[#faf5ff]/35 uppercase tracking-wider">Net Stok</p><p className="text-base font-semibold text-[#E8C848]">+{totalMasuk - totalKeluar}</p></div>
      </div>
    </div>
  );
}
