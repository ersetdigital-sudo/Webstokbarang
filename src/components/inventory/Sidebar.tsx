"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, BarChart3, Truck, Settings, LogOut, Hexagon, Menu, X } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Package, label: "Produk", href: "/produk" },
  { icon: BarChart3, label: "Analitik", href: "/analitik" },
  { icon: Truck, label: "Pengiriman", href: "/pengiriman" },
  { icon: Settings, label: "Pengaturan", href: "/pengaturan" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed top-3.5 left-4 z-[90] w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground lg:hidden transition-colors">
        <Menu size={18} />
      </button>

      {open && <div className="fixed inset-0 z-[100] overlay-blur lg:hidden" onClick={() => setOpen(false)} />}

      <nav className={`fixed inset-y-0 left-0 z-[110] w-[220px] lg:w-16 bg-card border-r border-border flex flex-col transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center gap-3 h-14 px-4 lg:justify-center border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Hexagon size={16} className="text-accent" />
          </div>
          <span className="text-sm font-semibold lg:hidden">StokBarang</span>
          <button onClick={() => setOpen(false)} className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"><X size={16} /></button>
        </div>

        <div className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {nav.map(({ icon: Icon, label, href }) => {
            const active = path === href;
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 lg:justify-center lg:px-0 h-10 rounded-lg text-[13px] font-medium transition-colors ${active ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                <Icon size={17} strokeWidth={active ? 2 : 1.5} />
                <span className="lg:hidden">{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-2 border-t border-border">
          <button className="flex items-center gap-3 px-3 lg:justify-center lg:px-0 h-10 w-full rounded-lg text-[13px] font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut size={17} strokeWidth={1.5} />
            <span className="lg:hidden">Keluar</span>
          </button>
        </div>
      </nav>
    </>
  );
}
