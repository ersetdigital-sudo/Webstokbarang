"use client";

import {
  LayoutDashboard,
  Package,
  BarChart3,
  Truck,
  Settings,
  LogOut,
  BoxesIcon,
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
  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] bg-background-sidebar border-r border-border flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="mb-10 flex items-center justify-center w-10 h-10 rounded-xl bg-accent-lime/10">
        <BoxesIcon size={22} className="text-accent-lime" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-2 flex-1">
        {navItems.map((item, index) => (
          <button
            key={index}
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
  );
}
