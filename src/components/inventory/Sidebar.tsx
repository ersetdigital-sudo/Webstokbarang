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

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Package, label: "Products", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Truck, label: "Shipments", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile: Hamburger button - always visible on small screens */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-[100] w-10 h-10 rounded-xl bg-bg-card border border-border-main flex items-center justify-center text-txt-secondary lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile: Dark overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] sidebar-overlay lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-[240px] lg:w-[72px]
          bg-bg-sidebar border-r border-border-main
          flex flex-col items-center lg:items-center py-6
          z-[300] transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-bg-card border border-border-main flex items-center justify-center text-txt-secondary lg:hidden"
          aria-label="Close menu"
        >
          <X size={16} />
        </button>

        {/* Logo */}
        <div className="mb-10 w-10 h-10 rounded-xl bg-accent-lime-dim flex items-center justify-center">
          <BoxesIcon size={22} className="text-accent-lime" />
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-2 flex-1 w-full px-4 lg:px-0 lg:items-center">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => setIsOpen(false)}
                className={`
                  relative flex items-center gap-3 lg:justify-center
                  w-full lg:w-10 h-10 rounded-xl
                  transition-all duration-200
                  ${
                    item.active
                      ? "bg-accent-lime-dim text-accent-lime"
                      : "text-txt-muted hover:text-txt-secondary hover:bg-white/5"
                  }
                `}
                title={item.label}
              >
                {item.active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent-lime rounded-r-full hidden lg:block" />
                )}
                <Icon size={20} className="flex-shrink-0 ml-3 lg:ml-0" />
                <span className="text-sm font-medium lg:hidden">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          className="flex items-center gap-3 lg:justify-center w-full lg:w-10 h-10 rounded-xl text-txt-muted hover:text-status-out hover:bg-red-500/10 transition-all duration-200 px-4 lg:px-0"
          title="Logout"
        >
          <LogOut size={20} className="flex-shrink-0 ml-3 lg:ml-0" />
          <span className="text-sm font-medium lg:hidden">Logout</span>
        </button>
      </aside>
    </>
  );
}
