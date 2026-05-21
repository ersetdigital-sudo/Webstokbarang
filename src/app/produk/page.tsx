"use client";

import { useState } from "react";
import Sidebar from "@/components/inventory/Sidebar";
import { products, type ProductStatus } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { Search, ArrowUpDown, Package, Upload, FileSpreadsheet, Link2, Plus, Pencil, Trash2 } from "lucide-react";

const statusConfig: Record<ProductStatus, { label: string; cls: string }> = {
  active: { label: "Tersedia", cls: "neo-badge bg-neo-success/10 text-neo-success border-neo-success/40" },
  low: { label: "Stok Rendah", cls: "neo-badge bg-neo-warning/10 text-neo-warning border-neo-warning/40" },
  out: { label: "Habis", cls: "neo-badge bg-neo-danger/10 text-neo-danger border-neo-danger/40" },
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
    <div className="min-h-screen bg-neo-bg">
      <Sidebar />
      <main className="lg:ml-[200px] min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Hero Banner */}
          <div className="neo-card p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-neo-xs bg-neo-primary/15 border-2 border-neo-primary/30 flex items-center justify-center">
                  <Package size={26} className="text-neo-primary" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-neo-text tracking-tight">Master Produk</h1>
                  <p className="text-sm text-neo-muted font-medium mt-1">{products.length} produk terdaftar</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-3.5 py-2 rounded-neo-xs border-2 border-neo-border text-[13px] font-semibold text-neo-subtle hover:border-neo-primary hover:text-neo-text hover:shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                  <Upload size={14} /> Bulk Entry
                </button>
                <button className="px-3.5 py-2 rounded-neo-xs border-2 border-neo-border text-[13px] font-semibold text-neo-subtle hover:border-neo-primary hover:text-neo-text hover:shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                  <Link2 size={14} /> Match SKU
                </button>
                <button className="px-3.5 py-2 rounded-neo-xs border-2 border-neo-border text-[13px] font-semibold text-neo-subtle hover:border-neo-primary hover:text-neo-text hover:shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                  <FileSpreadsheet size={14} /> Import Excel
                </button>
                <button className="neo-accent px-4 py-2 text-[13px] font-bold flex items-center gap-2 transition-all">
                  <Plus size={14} /> Tambah Produk
                </button>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neo-muted" />
              <input type="text" placeholder="Cari nama produk atau SKU..." value={search} onChange={(e) => setSearch(e.target.value)} className="neo-input w-full pl-9 pr-4 py-2.5 text-[13px] placeholder:text-neo-muted" />
            </div>
            <div className="relative">
              <ArrowUpDown size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neo-muted" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="neo-input appearance-none pl-8 pr-8 py-2.5 text-[13px] cursor-pointer">
                <option value="name-asc">Nama (A-Z)</option>
                <option value="name-desc">Nama (Z-A)</option>
                <option value="price-asc">Harga (Rendah)</option>
                <option value="price-desc">Harga (Tinggi)</option>
                <option value="stock-asc">Stok (Sedikit)</option>
                <option value="stock-desc">Stok (Banyak)</option>
              </select>
            </div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="neo-input appearance-none px-4 py-2.5 text-[13px] cursor-pointer">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="neo-input appearance-none px-4 py-2.5 text-[13px] cursor-pointer">
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="neo-card-flat overflow-hidden">
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-neo-bg border-b-2 border-neo-border">
                    <th className="border-r-2 border-neo-border w-[48px] px-2 py-3 text-center text-[11px] font-bold text-neo-muted uppercase tracking-wider">No</th>
                    <th className="border-r-2 border-neo-border w-[110px] px-3 py-3 text-center text-[11px] font-bold text-neo-muted uppercase tracking-wider">SKU</th>
                    <th className="border-r-2 border-neo-border px-3 py-3 text-left text-[11px] font-bold text-neo-muted uppercase tracking-wider">Nama Produk</th>
                    <th className="border-r-2 border-neo-border w-[120px] px-3 py-3 text-center text-[11px] font-bold text-neo-muted uppercase tracking-wider">Kategori</th>
                    <th className="border-r-2 border-neo-border w-[80px] px-3 py-3 text-center text-[11px] font-bold text-neo-muted uppercase tracking-wider">Stok</th>
                    <th className="border-r-2 border-neo-border w-[140px] px-3 py-3 text-right text-[11px] font-bold text-neo-muted uppercase tracking-wider">Harga</th>
                    <th className="border-r-2 border-neo-border w-[110px] px-3 py-3 text-center text-[11px] font-bold text-neo-muted uppercase tracking-wider">Status</th>
                    <th className="w-[80px] px-3 py-3 text-center text-[11px] font-bold text-neo-muted uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, idx) => {
                    const st = statusConfig[p.status];
                    return (
                      <tr key={p.id} className={`border-b-2 border-neo-border hover:bg-neo-primary/[0.03] transition-colors ${idx % 2 === 1 ? "bg-neo-bg/50" : ""}`}>
                        <td className="border-r-2 border-neo-border px-2 py-2.5 text-center text-xs font-mono font-bold text-neo-muted">{idx + 1}</td>
                        <td className="border-r-2 border-neo-border px-3 py-2.5 text-center font-mono text-xs font-semibold text-neo-subtle">{p.sku}</td>
                        <td className="border-r-2 border-neo-border px-3 py-2.5 text-left text-[13px] font-semibold text-neo-text">{p.name}</td>
                        <td className="border-r-2 border-neo-border px-3 py-2.5 text-center text-xs text-neo-muted font-medium">{p.category}</td>
                        <td className="border-r-2 border-neo-border px-3 py-2.5 text-center font-mono text-xs font-bold text-neo-subtle">{p.stock}</td>
                        <td className="border-r-2 border-neo-border px-3 py-2.5 text-right font-mono text-xs font-semibold text-neo-subtle">{formatCurrency(p.price)}</td>
                        <td className="border-r-2 border-neo-border px-3 py-2.5 text-center"><span className={st.cls}>{st.label}</span></td>
                        <td className="px-3 py-2.5 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button className="w-7 h-7 rounded-neo-xs border-2 border-neo-border flex items-center justify-center text-neo-muted hover:text-neo-primary hover:border-neo-primary transition-colors"><Pencil size={12} /></button>
                            <button className="w-7 h-7 rounded-neo-xs border-2 border-neo-border flex items-center justify-center text-neo-muted hover:text-neo-danger hover:border-neo-danger transition-colors"><Trash2 size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-neo-bg border-t-2 border-neo-border">
                    <td colSpan={4} className="border-r-2 border-neo-border px-3 py-3 text-[12px] font-bold text-neo-subtle">Total: {filtered.length} produk</td>
                    <td className="border-r-2 border-neo-border px-3 py-3 text-center font-mono text-[12px] font-bold text-neo-subtle">{filtered.reduce((s, p) => s + p.stock, 0)}</td>
                    <td className="border-r-2 border-neo-border px-3 py-3 text-right font-mono text-[12px] font-bold text-neo-subtle">{formatCurrency(totalValue)}</td>
                    <td colSpan={2} className="px-3 py-3 text-center text-[11px] text-neo-muted font-semibold">Nilai Inventaris</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden divide-y-2 divide-neo-border">
              {filtered.map((p, idx) => {
                const st = statusConfig[p.status];
                return (
                  <div key={p.id} className="px-4 py-3.5 hover:bg-neo-primary/[0.03] transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold text-neo-muted">#{idx + 1}</span>
                          <span className="text-[10px] font-mono font-semibold text-neo-subtle bg-neo-bg px-1.5 py-0.5 rounded-neo-xs border border-neo-border">{p.sku}</span>
                        </div>
                        <p className="text-[13px] font-semibold text-neo-text truncate">{p.name}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={st.cls}>{st.label}</span>
                          <span className="text-[11px] text-neo-muted font-medium">{p.category}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[13px] font-mono font-bold text-neo-text">{formatCurrency(p.price)}</p>
                        <p className="text-[11px] text-neo-muted font-medium mt-0.5">Stok: {p.stock}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="py-12 text-center text-neo-muted text-sm font-semibold">Tidak ada produk ditemukan</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
