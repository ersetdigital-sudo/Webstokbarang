"use client";

import { Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/inventory/Sidebar";

export default function PengaturanPage() {
  return (
    <div className="min-h-screen bg-[#1a1023]">
      <Sidebar />
      <main className="lg:ml-[200px] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-[#faf5ff]/10 flex items-center justify-center mx-auto mb-5">
            <Settings size={28} className="text-[#faf5ff]/60" />
          </div>
          <h1 className="text-2xl font-bold text-[#faf5ff] mb-2">Pengaturan</h1>
          <p className="text-[13px] text-[#faf5ff]/40 mb-6 leading-relaxed">
            Halaman pengaturan sedang dalam pengembangan. Konfigurasi akun dan sistem akan tersedia di sini.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-[13px] text-[#faf5ff]/70 hover:text-[#faf5ff] transition-all">
            <ArrowLeft size={14} />
            Kembali ke Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
