"use client";

import { Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PengirimanPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-primary px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-state-warning/10 flex items-center justify-center mx-auto mb-5">
          <Truck size={28} className="text-state-warning" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-content-primary mb-2">
          Pengiriman
        </h1>
        <p className="text-[13px] text-content-tertiary mb-6 leading-relaxed">
          Halaman pengiriman sedang dalam pengembangan. Tracking dan manajemen pengiriman akan tersedia di sini.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-secondary border border-line-primary rounded-xl text-[13px] text-content-secondary hover:text-content-primary hover:border-line-secondary transition-all"
        >
          <ArrowLeft size={14} />
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
