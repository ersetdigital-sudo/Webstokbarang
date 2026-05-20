"use client";

import { Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProdukPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-primary px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-lime-dim flex items-center justify-center mx-auto mb-5">
          <Package size={28} className="text-lime-accent" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-content-primary mb-2">
          Produk
        </h1>
        <p className="text-[13px] text-content-tertiary mb-6 leading-relaxed">
          Halaman manajemen produk sedang dalam pengembangan. Kamu bisa kelola semua produk di sini nanti.
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
