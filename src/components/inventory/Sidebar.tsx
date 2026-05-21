"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, BarChart3, Truck, Settings, LogOut, Hexagon, Menu, X, ArrowLeftRight } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Package, label: "Produk", href: "/produk" },
  { icon: ArrowLeftRight, label: "Transaksi", href: "/transaksi/baru" },
  { icon: BarChart3, label: "Analitik", href: "/analitik" },
  { icon: Truck, label: "Pengiriman", href: "/pengiriman" },
  { icon: Settings, label: "Pengaturan", href: "/pengaturan" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed top-3.5 left-4 z-[90] w-10 h-10 rounded-xl glass flex items-center justify-center text-[#faf5ff]/50 hover:text-[#faf5ff] lg:hidden transition-colors">
        <Menu size={18} />
      </button>
      {open && <div className="fixed inset-0 z-[100] overlay-blur lg:hidden" onClick={() => setOpen(false)} />}
      <nav className={`fixed inset-y-0 left-0 z-[110] w-[220px] lg:w-[200px] bg-[#140c1c]/95 backdrop-blur-xl border-r border-[#faf5ff]/[0.06] flex flex-col transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center gap-3 h-14 px-4 border-b border-[#faf5ff]/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-[#E8C848]/20 flex items-center justify-center">
            <Hexagon size={16} className="text-[#E8C848]" />
          </div>
          <span className="text-[13px] font-semibold text-[#faf5ff]">Inventory Pro</span>
          <button onClick={() => setOpen(false)} className="ml-auto lg:hidden text-[#faf5ff]/40 hover:text-[#faf5ff]"><X size={16} /></button>
        </div>
        <div className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-widest text-[#faf5ff]/25">Menu</p>
          {nav.map(({ icon: Icon, label, href }) => {
            const active = path === href || (href !== "/" && path.startsWith(href));
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 h-9 rounded-lg text-[13px] font-medium transition-all ${active ? "bg-[#E8C848]/10 text-[#E8C848] shadow-[0_0_12px_-3px_rgba(232,200,72,0.2)]" : "text-[#faf5ff]/50 hover:text-[#faf5ff]/80 hover:bg-[#faf5ff]/[0.03]"}`}>
                <Icon size={16} strokeWidth={active ? 2 : 1.5} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
        <div className="p-2 border-t border-[#faf5ff]/[0.06]">
          <button className="flex items-center gap-3 px-3 h-9 w-full rounded-lg text-[13px] font-medium text-[#faf5ff]/50 hover:text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-colors">
            <LogOut size={16} strokeWidth={1.5} />
            <span>Keluar</span>
          </button>
        </div>
      </nav>
    </>
  );
}
