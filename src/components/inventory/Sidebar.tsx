"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Truck,
  Settings,
  LogOut,
  BoxesIcon,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
  { icon: <Package size={20} />, label: "Products" },
  { icon: <BarChart3 size={20} />, label: "Analytics" },
  { icon: <Truck size={20} />, label: "Shipments" },
  { icon: <Settings size={20} />, label: "Settings" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-background-card border border-border text-text-secondary md:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 sidebar-overlay md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-[72px] bg-background-sidebar border-r border-border flex flex-col items-center py-6 z-[60] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close button on mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-[-44px] w-9 h-9 flex items-center justify-center rounded-lg bg-background-card border border-border text-text-secondary md:hidden"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <div className="mb-10 flex items-center justify-center w-10 h-10 rounded-xl bg-accent-lime/10">
          <BoxesIcon size={22} className="text-accent-lime" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-2 flex-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setIsOpen(false)}
              className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 group ${
                item.active
                  ? "bg-accent-lime/10 text-accent-lime"
                  : "text-text-muted hover:text-text-secondary hover:bg-white/5"
              }`}
              title={item.label}
            >
              {item.active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[1px] w-[3px] h-5 bg-accent-lime rounded-r-full" />
              )}
              {item.icon}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-xl text-text-muted hover:text-status-out hover:bg-status-out/10 transition-all duration-200"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </aside>
    </>
  );
}
