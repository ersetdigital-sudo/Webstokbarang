"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Truck,
  Settings,
  LogOut,
  Boxes,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Package, label: "Produk", href: "/produk" },
  { icon: BarChart3, label: "Analitik", href: "/analitik" },
  { icon: Truck, label: "Pengiriman", href: "/pengiriman" },
  { icon: Settings, label: "Pengaturan", href: "/pengaturan" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Tombol menu mobile */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 left-5 z-[100] w-11 h-11 rounded-xl bg-surface-secondary border border-line-primary flex items-center justify-center text-content-secondary hover:text-content-primary hover:border-line-secondary transition-all lg:hidden"
        aria-label="Buka menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-[200] sidebar-overlay lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen
          w-[260px] lg:w-[78px]
          bg-surface-sidebar border-r border-line-primary
          flex flex-col py-7 z-[300]
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Header sidebar */}
        <div className="flex items-center justify-between px-5 lg:justify-center lg:px-0 mb-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="w-10 h-10 rounded-xl bg-lime-dim flex items-center justify-center">
              <Boxes size={20} className="text-lime-accent" />
            </div>
            <span className="font-heading font-bold text-sm text-content-primary lg:hidden">
              StokBarang
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-content-tertiary hover:text-content-primary hover:bg-surface-tertiary transition-all lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

        {/* Label section - mobile only */}
        <p className="px-5 mb-3 text-[10px] font-medium uppercase tracking-widest text-content-tertiary lg:hidden">
          Menu
        </p>

        {/* Navigasi */}
        <nav className="flex-1 flex flex-col gap-1 px-3 lg:px-0 lg:items-center">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  relative flex items-center gap-3 px-3 lg:px-0 lg:justify-center
                  w-full lg:w-11 h-11 rounded-xl
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-lime-dim text-lime-accent"
                      : "text-content-tertiary hover:text-content-secondary hover:bg-surface-tertiary"
                  }
                `}
                title={item.label}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-lime-accent hidden lg:block" />
                )}
                <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                <span className="text-[13px] font-medium lg:hidden">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 lg:px-0 lg:flex lg:justify-center">
          <button
            className="flex items-center gap-3 px-3 lg:px-0 lg:justify-center w-full lg:w-11 h-11 rounded-xl text-content-tertiary hover:text-state-danger hover:bg-state-danger/10 transition-all"
            title="Keluar"
          >
            <LogOut size={19} strokeWidth={1.8} />
            <span className="text-[13px] font-medium lg:hidden">Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
