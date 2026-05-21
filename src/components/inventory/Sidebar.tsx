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
      <button onClick={() => setOpen(true)} className="fixed top-3.5 left-4 z-[90] w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/[0.05] text-zinc-400 lg:hidden transition-colors">
        <Menu size={18} />
      </button>

      {open && <div className="fixed inset-0 z-[100] overlay-blur lg:hidden" onClick={() => setOpen(false)} />}

      <nav className={`fixed inset-y-0 left-0 z-[110] w-[220px] lg:w-[200px] bg-[#0e0e10] border-r border-white/[0.07] flex flex-col transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 h-14 px-4 border-b border-white/[0.07]">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center">
            <Hexagon size={16} className="text-indigo-400" />
          </div>
          <span className="text-[13px] font-semibold text-white">Inventory Pro</span>
          <button onClick={() => setOpen(false)} className="ml-auto lg:hidden text-zinc-400 hover:text-white"><X size={16} /></button>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-widest text-zinc-600">Menu</p>
          {nav.map(({ icon: Icon, label, href }) => {
            const active = path === href || path.startsWith(href + "/") || (href !== "/" && path.startsWith(href));
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 h-9 rounded-lg text-[13px] font-medium transition-colors ${active ? "bg-indigo-500/10 text-indigo-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"}`}>
                <Icon size={16} strokeWidth={active ? 2 : 1.5} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-white/[0.07]">
          <button className="flex items-center gap-3 px-3 h-9 w-full rounded-lg text-[13px] font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={16} strokeWidth={1.5} />
            <span>Keluar</span>
          </button>
        </div>
      </nav>
    </>
  );
}
