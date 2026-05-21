"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/inventory/Sidebar";
import { products, type Product } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, ChevronRight, ArrowDownLeft, ArrowUpRight, Search, ScanBarcode, X, Plus, Minus, Calendar, FileText, CheckCircle2, Package } from "lucide-react";

type TxType = "masuk" | "keluar";

export default function TransaksiBaru() {
  const [type, setType] = useState<TxType>("masuk");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stockAfter = selectedProduct
    ? type === "masuk"
      ? selectedProduct.stock + qty
      : Math.max(0, selectedProduct.stock - qty)
    : 0;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setSearchQuery(p.name);
    setShowDropdown(false);
  };

  const handleScanDemo = () => {
    setShowScanner(true);
    // Simulate scan after 2 seconds
    setTimeout(() => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      handleSelectProduct(randomProduct);
      setShowScanner(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!selectedProduct || qty < 1) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      // Reset form
      setSelectedProduct(null);
      setSearchQuery("");
      setQty(1);
      setNote("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-600/[0.02] rounded-full blur-[80px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>

      <Sidebar />

      <main className="lg:ml-[200px] min-h-screen relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Link href="/" className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors">
                <ArrowLeft size={14} />
              </Link>
              <div className="flex items-center gap-1.5 text-[12px] text-zinc-500">
                <span>Transaksi</span>
                <ChevronRight size={12} />
                <span className="text-zinc-300">Transaksi Baru</span>
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Transaksi Baru</h1>
            <p className="text-sm text-zinc-500 mt-1">Catat barang masuk atau keluar dari inventaris.</p>
          </div>

          {/* 2-col layout */}
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Left: Form */}
            <div className="flex-1 min-w-0 space-y-5">

              {/* Tipe Transaksi */}
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mb-3">Tipe Transaksi</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setType("masuk")}
                    className={`relative p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                      type === "masuk"
                        ? "bg-emerald-500/[0.06] border-emerald-500/30 shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)]"
                        : "bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type === "masuk" ? "bg-emerald-500/15" : "bg-white/[0.05]"}`}>
                      <ArrowDownLeft size={18} className={type === "masuk" ? "text-emerald-400" : "text-zinc-500"} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-medium ${type === "masuk" ? "text-emerald-400" : "text-zinc-300"}`}>Barang Masuk</p>
                      <p className="text-[11px] text-zinc-500">Tambah stok inventaris</p>
                    </div>
                    {type === "masuk" && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400" />}
                  </button>
                  <button
                    onClick={() => setType("keluar")}
                    className={`relative p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                      type === "keluar"
                        ? "bg-rose-500/[0.06] border-rose-500/30 shadow-[0_0_20px_-5px_rgba(244,63,94,0.15)]"
                        : "bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type === "keluar" ? "bg-rose-500/15" : "bg-white/[0.05]"}`}>
                      <ArrowUpRight size={18} className={type === "keluar" ? "text-rose-400" : "text-zinc-500"} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-medium ${type === "keluar" ? "text-rose-400" : "text-zinc-300"}`}>Barang Keluar</p>
                      <p className="text-[11px] text-zinc-500">Kurangi stok inventaris</p>
                    </div>
                    {type === "keluar" && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-400" />}
                  </button>
                </div>
              </div>

              {/* Detail Produk */}
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mb-3">Detail Produk</p>
                <div className="space-y-4">
                  {/* Search + Scanner */}
                  <div ref={searchRef} className="relative">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                          type="text"
                          placeholder="Cari nama produk atau SKU..."
                          value={searchQuery}
                          onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                          onFocus={() => setShowDropdown(true)}
                          className="w-full pl-9 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.1] rounded-lg text-[13px] text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/40 transition-colors"
                        />
                      </div>
                      <button
                        onClick={handleScanDemo}
                        className="px-3 py-2.5 rounded-lg border border-white/[0.1] bg-white/[0.03] text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors"
                        title="Scan Barcode"
                      >
                        <ScanBarcode size={18} />
                      </button>
                    </div>

                    {/* Dropdown */}
                    {showDropdown && searchQuery.length > 0 && (
                      <div className="absolute top-full left-0 right-12 mt-1 bg-[#141416] border border-white/[0.1] rounded-lg shadow-xl overflow-hidden z-20 max-h-[200px] overflow-y-auto">
                        {filteredProducts.length === 0 ? (
                          <p className="px-4 py-3 text-xs text-zinc-500">Produk tidak ditemukan</p>
                        ) : (
                          filteredProducts.map((p) => (
                            <button key={p.id} onClick={() => handleSelectProduct(p)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors text-left">
                              <Package size={14} className="text-zinc-500 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] text-zinc-200 truncate">{p.name}</p>
                                <p className="text-[11px] font-mono text-zinc-500">{p.sku}</p>
                              </div>
                              <span className="text-[11px] text-zinc-500">Stok: {p.stock}</span>
                            </button>
                          ))
                        )}
                      </div>
                    )}

                    {/* Scanner overlay */}
                    {showScanner && (
                      <div className="mt-2 p-4 rounded-lg bg-[#141416] border border-white/[0.1] relative">
                        <button onClick={() => setShowScanner(false)} className="absolute top-2 right-2 text-zinc-500 hover:text-white"><X size={14} /></button>
                        <div className="w-full h-32 bg-black/50 rounded flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-indigo-400/50 rounded mx-auto mb-2 animate-pulse" />
                            <p className="text-[11px] text-zinc-400">Memindai barcode...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product info card */}
                  {selectedProduct && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.07]">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Stok Saat Ini</p>
                        <p className="text-lg font-semibold text-white mt-1">{selectedProduct.stock}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.07]">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Harga</p>
                        <p className="text-sm font-mono font-medium text-white mt-1">{formatCurrency(selectedProduct.price)}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.07]">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Maks. Stok</p>
                        <p className="text-lg font-semibold text-white mt-1">{selectedProduct.maxStock}</p>
                      </div>
                    </div>
                  )}

                  {/* Qty + Date */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-zinc-500 block mb-1.5">Jumlah</label>
                      <div className="flex items-center gap-0 border border-white/[0.1] rounded-lg overflow-hidden bg-white/[0.03]">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors">
                          <Minus size={14} />
                        </button>
                        <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} className="flex-1 text-center bg-transparent text-white text-[14px] font-mono focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                        <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-500 block mb-1.5">Tanggal</label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-9 pr-3 py-2.5 bg-white/[0.03] border border-white/[0.1] rounded-lg text-[13px] text-white focus:outline-none focus:border-indigo-500/40 transition-colors [color-scheme:dark]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keterangan */}
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mb-3">Keterangan</p>
                <div className="relative">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value.slice(0, 200))}
                    placeholder="Tambahkan catatan (opsional)..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-lg text-[13px] text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/40 transition-colors resize-none"
                  />
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-zinc-600">{note.length}/200</span>
                </div>
              </div>

              {/* Mobile submit */}
              <div className="xl:hidden sticky bottom-4">
                <button
                  onClick={handleSubmit}
                  disabled={!selectedProduct || qty < 1 || isSubmitting}
                  className={`w-full py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                    type === "masuk"
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : "bg-rose-600 hover:bg-rose-500 text-white"
                  }`}
                >
                  {isSubmitting ? "Memproses..." : "Catat Transaksi"}
                </button>
              </div>
            </div>

            {/* Right: Summary sticky */}
            <div className="hidden xl:block w-[340px] flex-shrink-0">
              <div className="sticky top-8 bg-[#111113] border border-white/[0.07] rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-white">Ringkasan</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[12px] text-zinc-500">Tipe</span>
                    <span className={`text-[12px] font-medium ${type === "masuk" ? "text-emerald-400" : "text-rose-400"}`}>
                      {type === "masuk" ? "Barang Masuk" : "Barang Keluar"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[12px] text-zinc-500">Produk</span>
                    <span className="text-[12px] text-zinc-300 text-right max-w-[180px] truncate">
                      {selectedProduct ? selectedProduct.name : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[12px] text-zinc-500">Stok Saat Ini</span>
                    <span className="text-[12px] font-mono text-zinc-300">{selectedProduct ? selectedProduct.stock : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[12px] text-zinc-500">Perubahan</span>
                    <span className={`text-[12px] font-mono font-medium ${type === "masuk" ? "text-emerald-400" : "text-rose-400"}`}>
                      {selectedProduct ? `${type === "masuk" ? "+" : "-"}${qty}` : "—"}
                    </span>
                  </div>
                  <div className="border-t border-white/[0.05] pt-3 flex justify-between">
                    <span className="text-[12px] text-zinc-500">Stok Setelah</span>
                    <span className="text-[14px] font-semibold text-white">{selectedProduct ? stockAfter : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[12px] text-zinc-500">Tanggal</span>
                    <span className="text-[12px] font-mono text-zinc-300">{date}</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!selectedProduct || qty < 1 || isSubmitting}
                  className={`w-full py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-4 ${
                    type === "masuk"
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_20px_-4px_rgba(16,185,129,0.3)]"
                      : "bg-rose-600 hover:bg-rose-500 text-white shadow-[0_4px_20px_-4px_rgba(244,63,94,0.3)]"
                  }`}
                >
                  {isSubmitting ? "Memproses..." : "Catat Transaksi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#1a1a1f] border border-emerald-500/20 rounded-xl shadow-xl animate-[slideUp_0.3s_ease-out]">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <p className="text-[13px] text-white">Transaksi berhasil dicatat!</p>
        </div>
      )}
    </div>
  );
}
