"use client";

import { Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/inventory/Sidebar";

export default function PengaturanPage() {
  return (
    <div className="min-h-screen bg-neo-bg">
      <Sidebar />
      <main className="lg:ml-[200px] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-neo-sm bg-neo-subtle/10 border-2 border-neo-subtle/30 flex items-center justify-center mx-auto mb-5">
            <Settings size={28} className="text-neo-subtle" />
          </div>
          <h1 className="text-2xl font-extrabold text-neo-text mb-2">Pengaturan</h1>
          <p className="text-[13px] text-neo-muted font-medium mb-6 leading-relaxed">
            Halaman pengaturan sedang dalam pengembangan. Konfigurasi akun dan sistem akan tersedia di sini.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-neo-xs border-2 border-neo-border bg-neo-card text-[13px] font-semibold text-neo-subtle hover:text-neo-text hover:border-neo-primary hover:shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <ArrowLeft size={14} />
            Kembali ke Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
