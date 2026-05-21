"use client";

import { useState } from "react";
import Sidebar from "@/components/inventory/Sidebar";
import { products, type ProductStatus } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { Search, ArrowUpDown, Package, Upload, FileSpreadsheet, Link2, Plus, Pencil, Trash2 } from "lucide-react";

const statusConfig: Record<ProductStatus, { label: string; cls: string }> = {
  active: { label: "Tersedia", cls: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" },
  low: { label: "Stok Rendah", cls: "text-amber-400 bg-amber-500/10 border border-amber-500/20" },
  out: { label: "Habis", cls: "text-red-400 bg-red-500/10 border border-red-500/20" },
};

const categories = ["Semua Kategori", "Elektronik", "Aksesoris", "Furnitur", "Penerangan", "Penyimpanan"];
const statuses = ["Semua Status", "Tersedia", "Stok Rendah", "Habis"];
const statusMap: Record<string, ProductStatus | "all"> = { "Semua Status": "all", "Tersedia": "active", "Stok Rendah": "low", "Habis": "out" };

export default function ProdukPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua Kategori");
  const [status, setStatus] = useState("Semua Status");
  const [sort, setSort] = useState("name-asc");

  const filtered = products
    .filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "Semua Kategori" && p.category !== category) return false;
      const s = statusMap[status];
      if (s !== "all" && p.status !== s) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "stock-asc") return a.stock - b.stock;
      if (sort === "stock-desc") return b.stock - a.stock;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      <main className="lg:ml-16 min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-indigo-950/60 to-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <Package size={26} className="text-indigo-400" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Master Produk</h1>
                  <p className="text-sm text-zinc-400 mt-1">{products.length} produk terdaftar</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-3.5 py-2 rounded-lg border border-white/20 text-[13px] text-zinc-300 hover:bg-white/5 transition-colors flex items-center gap-2">
                  <Upload size={14} />
                  Bulk Entry
                </button>
                <button className="px-3.5 py-2 rounded-lg border border-white/20 text-[13px] text-zinc-300 hover:bg-white/5 transition-colors flex items-center gap-2">
                  <Link2 size={14} />
                  Match SKU
                </button>
                <button className="px-3.5 py-2 rounded-lg border border-white/20 text-[13px] text-zinc-300 hover:bg-white/5 transition-colors flex items-center gap-2">
                  <FileSpreadsheet size={14} />
                  Import Excel
                </button>
                <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[13px] text-white font-medium transition-colors flex items-center gap-2">
                  <Plus size={14} />
                  Tambah Produk
                </button>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Cari nama produk atau SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-[13px] text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/40 transition-colors"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none pl-8 pr-8 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-[13px] text-zinc-300 focus:outline-none focus:border-indigo-500/40 transition-colors cursor-pointer"
              >
                <option value="name-asc">Nama (A-Z)</option>
                <option value="name-desc">Nama (Z-A)</option>
                <option value="price-asc">Harga (Rendah)</option>
                <option value="price-desc">Harga (Tinggi)</option>
                <option value="stock-asc">Stok (Sedikit)</option>
                <option value="stock-desc">Stok (Banyak)</option>
              </select>
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-[13px] text-zinc-300 focus:outline-none focus:border-indigo-500/40 transition-colors cursor-pointer"
            >
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="appearance-none px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-[13px] text-zinc-300 focus:outline-none focus:border-indigo-500/40 transition-colors cursor-pointer"
            >
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="bg-gradient-to-br from-[#131313] to-[#0f0f0f] border border-white/[0.07] rounded-xl overflow-hidden">
            {/* Table header info */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.07]">
              <span className="text-[12px] text-zinc-400">{filtered.length} produk ditemukan</span>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    <th className="text-left px-5 py-3 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Produk</th>
                    <th className="text-left px-5 py-3 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">SKU</th>
                    <th className="text-left px-5 py-3 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Kategori</th>
                    <th className="text-left px-5 py-3 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Stok</th>
                    <th className="text-left px-5 py-3 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Harga</th>
                    <th className="text-left px-5 py-3 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map((p) => {
                    const initials = p.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
                    const st = statusConfig[p.status];
                    return (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-[11px] font-mono font-bold text-indigo-400">{initials}</span>
                            </div>
                            <div>
                              <p className="text-[13px] font-medium text-zinc-200 leading-relaxed">{p.name}</p>
                              <p className="text-[11px] text-zinc-500">{p.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800/50 px-2 py-0.5 rounded">{p.sku}</span>
                        </td>
                        <td className="px-5 py-3.5 text-[13px] text-zinc-400">{p.category}</td>
                        <td className="px-5 py-3.5">
                          <span className="text-[13px] font-mono text-zinc-300">{p.stock}</span>
                          <span className="text-[11px] text-zinc-600">/{p.maxStock}</span>
                        </td>
                        <td className="px-5 py-3.5 text-[13px] font-mono text-zinc-300">{formatCurrency(p.price)}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${st.cls}`}>{st.label}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors">
                              <Pencil size={13} />
                            </button>
                            <button className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-white/[0.04]">
              {filtered.map((p) => {
                const initials = p.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
                const st = statusConfig[p.status];
                return (
                  <div key={p.id} className="px-4 py-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[11px] font-mono font-bold text-indigo-400">{initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-zinc-200 truncate">{p.name}</p>
                        <p className="text-[11px] font-mono text-zinc-500">{p.sku}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium ${st.cls}`}>{st.label}</span>
                          <span className="text-[11px] text-zinc-500">{p.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] font-mono text-zinc-300">{formatCurrency(p.price)}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Stok: {p.stock}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            {filtered.length === 0 && (
              <div className="px-5 py-12 text-center text-zinc-500 text-sm">Tidak ada produk ditemukan</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
