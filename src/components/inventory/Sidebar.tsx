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
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-[90] w-10 h-10 rounded-neo-xs bg-neo-card border-2 border-neo-border flex items-center justify-center text-neo-muted hover:text-neo-text hover:shadow-neo-sm transition-all lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Overlay */}
      {open && <div className="fixed inset-0 z-[100] overlay-blur lg:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <nav className={`fixed inset-y-0 left-0 z-[110] w-[220px] lg:w-[200px] bg-neo-card border-r-2 border-neo-border flex flex-col transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        
        {/* Brand */}
        <div className="flex items-center gap-3 h-16 px-4 border-b-2 border-neo-border">
          <div className="w-9 h-9 rounded-neo-xs bg-neo-primary/15 border-2 border-neo-primary/30 flex items-center justify-center">
            <Hexagon size={17} className="text-neo-primary" />
          </div>
          <span className="text-[14px] font-bold text-neo-text">Inventory Pro</span>
          <button onClick={() => setOpen(false)} className="ml-auto lg:hidden text-neo-muted hover:text-neo-text">
            <X size={16} />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-neo-muted">Menu</p>
          {nav.map(({ icon: Icon, label, href }) => {
            const active = path === href || (href !== "/" && path.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 h-10 rounded-neo-xs text-[13px] font-semibold transition-all duration-150 ${
                  active
                    ? "bg-neo-primary text-white border-2 border-neo-primary shadow-neo-sm"
                    : "text-neo-subtle hover:text-neo-text hover:bg-neo-bg border-2 border-transparent hover:border-neo-border"
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2.2 : 1.7} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="p-3 border-t-2 border-neo-border">
          <button className="flex items-center gap-3 px-3 h-10 w-full rounded-neo-xs text-[13px] font-semibold text-neo-muted hover:text-neo-danger hover:bg-neo-danger/10 hover:border-neo-danger border-2 border-transparent transition-all">
            <LogOut size={16} strokeWidth={1.7} />
            <span>Keluar</span>
          </button>
        </div>
      </nav>
    </>
  );
}
