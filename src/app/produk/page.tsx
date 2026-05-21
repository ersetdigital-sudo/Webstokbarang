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

  const totalValue = filtered.reduce((s, p) => s + p.price * p.stock, 0);

  return (
    <div className="min-h-screen bg-[#1a1023]">
      <Sidebar />
      <main className="lg:ml-[200px] min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-[#E8C848]/[0.06] to-[#1a1023] border border-[#faf5ff]/[0.08] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#E8C848]/15 flex items-center justify-center flex-shrink-0">
                  <Package size={26} className="text-[#E8C848]" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#faf5ff] tracking-tight">Master Produk</h1>
                  <p className="text-sm text-[#faf5ff]/50 mt-1">{products.length} produk terdaftar</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-3.5 py-2 rounded-lg border border-[#faf5ff]/15 text-[13px] text-[#faf5ff]/70 hover:bg-[#faf5ff]/[0.03] transition-colors flex items-center gap-2">
                  <Upload size={14} />
                  Bulk Entry
                </button>
                <button className="px-3.5 py-2 rounded-lg border border-[#faf5ff]/15 text-[13px] text-[#faf5ff]/70 hover:bg-[#faf5ff]/[0.03] transition-colors flex items-center gap-2">
                  <Link2 size={14} />
                  Match SKU
                </button>
                <button className="px-3.5 py-2 rounded-lg border border-[#faf5ff]/15 text-[13px] text-[#faf5ff]/70 hover:bg-[#faf5ff]/[0.03] transition-colors flex items-center gap-2">
                  <FileSpreadsheet size={14} />
                  Import Excel
                </button>
                <button className="px-4 py-2 rounded-lg bg-[#E8C848] hover:bg-[#E8C848]/90 text-[13px] text-[#1a1023] font-medium transition-colors flex items-center gap-2">
                  <Plus size={14} />
                  Tambah Produk
                </button>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#faf5ff]/35" />
              <input
                type="text"
                placeholder="Cari nama produk atau SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#faf5ff]/[0.03] border border-[#faf5ff]/[0.08] rounded-lg text-[13px] text-[#faf5ff] placeholder:text-[#faf5ff]/35 focus:outline-none focus:border-[#E8C848]/40 transition-colors"
              />
            </div>
            <div className="relative">
              <ArrowUpDown size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#faf5ff]/35" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none pl-8 pr-8 py-2.5 bg-[#faf5ff]/[0.03] border border-[#faf5ff]/[0.08] rounded-lg text-[13px] text-[#faf5ff]/70 focus:outline-none focus:border-[#E8C848]/40 transition-colors cursor-pointer">
                <option value="name-asc">Nama (A-Z)</option>
                <option value="name-desc">Nama (Z-A)</option>
                <option value="price-asc">Harga (Rendah)</option>
                <option value="price-desc">Harga (Tinggi)</option>
                <option value="stock-asc">Stok (Sedikit)</option>
                <option value="stock-desc">Stok (Banyak)</option>
              </select>
            </div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="appearance-none px-4 py-2.5 bg-[#faf5ff]/[0.03] border border-[#faf5ff]/[0.08] rounded-lg text-[13px] text-[#faf5ff]/70 focus:outline-none focus:border-[#E8C848]/40 transition-colors cursor-pointer">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="appearance-none px-4 py-2.5 bg-[#faf5ff]/[0.03] border border-[#faf5ff]/[0.08] rounded-lg text-[13px] text-[#faf5ff]/70 focus:outline-none focus:border-[#E8C848]/40 transition-colors cursor-pointer">
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Spreadsheet Table - Desktop */}
          <div className="hidden md:block border border-[#faf5ff]/[0.08] rounded-none overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto relative">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#faf5ff]/[0.06]">
                    <th className="border border-[#faf5ff]/[0.08] w-[48px] px-2 py-2.5 text-center text-[11px] font-bold text-[#faf5ff]/50 uppercase tracking-wide">No</th>
                    <th className="border border-[#faf5ff]/[0.08] w-[110px] px-3 py-2.5 text-center text-[11px] font-bold text-[#faf5ff]/50 uppercase tracking-wide">SKU</th>
                    <th className="border border-[#faf5ff]/[0.08] px-3 py-2.5 text-left text-[11px] font-bold text-[#faf5ff]/50 uppercase tracking-wide">Nama Produk</th>
                    <th className="border border-[#faf5ff]/[0.08] w-[120px] px-3 py-2.5 text-center text-[11px] font-bold text-[#faf5ff]/50 uppercase tracking-wide">Kategori</th>
                    <th className="border border-[#faf5ff]/[0.08] w-[80px] px-3 py-2.5 text-center text-[11px] font-bold text-[#faf5ff]/50 uppercase tracking-wide">Stok</th>
                    <th className="border border-[#faf5ff]/[0.08] w-[140px] px-3 py-2.5 text-right text-[11px] font-bold text-[#faf5ff]/50 uppercase tracking-wide">Harga</th>
                    <th className="border border-[#faf5ff]/[0.08] w-[110px] px-3 py-2.5 text-center text-[11px] font-bold text-[#faf5ff]/50 uppercase tracking-wide">Status</th>
                    <th className="border border-[#faf5ff]/[0.08] w-[80px] px-3 py-2.5 text-center text-[11px] font-bold text-[#faf5ff]/50 uppercase tracking-wide">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, idx) => {
                    const st = statusConfig[p.status];
                    const isEven = idx % 2 === 1;
                    return (
                      <tr key={p.id} className={`${isEven ? "bg-[#faf5ff]/[0.02]" : "bg-transparent"} hover:bg-[#E8C848]/[0.05] transition-colors`}>
                        <td className="border border-[#faf5ff]/[0.08] px-2 py-2 text-center text-xs text-[#faf5ff]/35">{idx + 1}</td>
                        <td className="border border-[#faf5ff]/[0.08] px-3 py-2 text-center font-mono text-xs text-[#faf5ff]/70">{p.sku}</td>
                        <td className="border border-[#faf5ff]/[0.08] px-3 py-2 text-left">
                          <p className="text-[13px] text-[#faf5ff]/80 leading-snug">{p.name}</p>
                        </td>
                        <td className="border border-[#faf5ff]/[0.08] px-3 py-2 text-center text-xs text-[#faf5ff]/50">{p.category}</td>
                        <td className="border border-[#faf5ff]/[0.08] px-3 py-2 text-center font-mono text-xs text-[#faf5ff]/70">{p.stock}</td>
                        <td className="border border-[#faf5ff]/[0.08] px-3 py-2 text-right font-mono text-xs text-[#faf5ff]/70">{formatCurrency(p.price)}</td>
                        <td className="border border-[#faf5ff]/[0.08] px-3 py-2 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${st.cls}`}>{st.label}</span>
                        </td>
                        <td className="border border-[#faf5ff]/[0.08] px-3 py-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button className="w-6 h-6 rounded flex items-center justify-center text-[#faf5ff]/35 hover:text-[#E8C848] hover:bg-[#E8C848]/15 transition-colors">
                              <Pencil size={12} />
                            </button>
                            <button className="w-6 h-6 rounded flex items-center justify-center text-[#faf5ff]/35 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* Footer */}
                <tfoot className="sticky bottom-0 z-10">
                  <tr className="bg-[#faf5ff]/[0.06] border-t-2 border-[#faf5ff]/[0.08]">
                    <td colSpan={4} className="border border-[#faf5ff]/[0.08] px-3 py-2.5 text-[12px] font-medium text-[#faf5ff]/70">
                      Total: {filtered.length} produk
                    </td>
                    <td className="border border-[#faf5ff]/[0.08] px-3 py-2.5 text-center font-mono text-[12px] font-medium text-[#faf5ff]/70">
                      {filtered.reduce((s, p) => s + p.stock, 0)}
                    </td>
                    <td className="border border-[#faf5ff]/[0.08] px-3 py-2.5 text-right font-mono text-[12px] font-medium text-[#faf5ff]/70">
                      {formatCurrency(totalValue)}
                    </td>
                    <td colSpan={2} className="border border-[#faf5ff]/[0.08] px-3 py-2.5 text-center text-[11px] text-[#faf5ff]/35">
                      Total Nilai Inventaris
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {filtered.map((p, idx) => {
              const st = statusConfig[p.status];
              return (
                <div key={p.id} className="bg-[#faf5ff]/[0.03] border border-[#faf5ff]/[0.07] rounded-lg px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-[#faf5ff]/35">#{idx + 1}</span>
                        <span className="text-[10px] font-mono text-[#faf5ff]/50 bg-[#faf5ff]/[0.04] px-1.5 py-0.5 rounded">{p.sku}</span>
                      </div>
                      <p className="text-[13px] font-medium text-[#faf5ff]/80 truncate">{p.name}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${st.cls}`}>{st.label}</span>
                        <span className="text-[11px] text-[#faf5ff]/35">{p.category}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[13px] font-mono text-[#faf5ff]/70">{formatCurrency(p.price)}</p>
                      <p className="text-[11px] text-[#faf5ff]/35 mt-0.5">Stok: {p.stock}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-[#faf5ff]/35 text-sm">Tidak ada produk ditemukan</div>
          )}
        </div>
      </main>
    </div>
  );
}
