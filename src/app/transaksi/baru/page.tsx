"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/inventory/Sidebar";
import { products, type Product } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, ChevronRight, ArrowDownLeft, ArrowUpRight, Search, ScanBarcode, X, Plus, Minus, Calendar, CheckCircle2, Package } from "lucide-react";

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
      setSelectedProduct(null);
      setSearchQuery("");
      setQty(1);
      setNote("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neo-bg">
      <Sidebar />
      <main className="lg:ml-[200px] min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Link href="/" className="w-8 h-8 rounded-neo-xs border-2 border-neo-border bg-neo-card flex items-center justify-center text-neo-muted hover:text-neo-text hover:border-neo-primary transition-all">
                <ArrowLeft size={14} />
              </Link>
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-neo-muted">
                <span>Transaksi</span>
                <ChevronRight size={12} />
                <span className="text-neo-text">Transaksi Baru</span>
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-neo-text tracking-tight">Transaksi Baru</h1>
            <p className="text-sm text-neo-muted font-medium mt-1">Catat barang masuk atau keluar dari inventaris.</p>
          </div>

          {/* 2-col layout */}
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Left: Form */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* Tipe Transaksi */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-neo-muted mb-3">Tipe Transaksi</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setType("masuk")}
                    className={`relative p-4 rounded-neo-sm border-2 transition-all duration-150 flex items-center gap-3 ${
                      type === "masuk"
                        ? "border-neo-success bg-neo-success/10 shadow-[3px_3px_0px_0px_rgba(7,202,107,0.2)]"
                        : "border-neo-border bg-neo-card hover:border-neo-border-hover"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-neo-xs border-2 flex items-center justify-center ${type === "masuk" ? "bg-neo-success/15 border-neo-success/40" : "bg-neo-bg border-neo-border"}`}>
                      <ArrowDownLeft size={18} className={type === "masuk" ? "text-neo-success" : "text-neo-muted"} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-bold ${type === "masuk" ? "text-neo-success" : "text-neo-subtle"}`}>Barang Masuk</p>
                      <p className="text-[11px] text-neo-muted font-medium">Tambah stok</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setType("keluar")}
                    className={`relative p-4 rounded-neo-sm border-2 transition-all duration-150 flex items-center gap-3 ${
                      type === "keluar"
                        ? "border-neo-warning bg-neo-warning/10 shadow-[3px_3px_0px_0px_rgba(232,149,88,0.2)]"
                        : "border-neo-border bg-neo-card hover:border-neo-border-hover"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-neo-xs border-2 flex items-center justify-center ${type === "keluar" ? "bg-neo-warning/15 border-neo-warning/40" : "bg-neo-bg border-neo-border"}`}>
                      <ArrowUpRight size={18} className={type === "keluar" ? "text-neo-warning" : "text-neo-muted"} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-bold ${type === "keluar" ? "text-neo-warning" : "text-neo-subtle"}`}>Barang Keluar</p>
                      <p className="text-[11px] text-neo-muted font-medium">Kurangi stok</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Detail Produk */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-neo-muted mb-3">Detail Produk</p>
                <div className="space-y-4">
                  {/* Search + Scanner */}
                  <div ref={searchRef} className="relative">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neo-muted" />
                        <input type="text" placeholder="Cari nama produk atau SKU..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }} onFocus={() => setShowDropdown(true)} className="neo-input w-full pl-9 pr-4 py-2.5 text-[13px] placeholder:text-neo-muted" />
                      </div>
                      <button onClick={handleScanDemo} className="px-3 py-2.5 rounded-neo-xs border-2 border-neo-border bg-neo-card text-neo-muted hover:text-neo-primary hover:border-neo-primary transition-all" title="Scan Barcode">
                        <ScanBarcode size={18} />
                      </button>
                    </div>

                    {/* Dropdown */}
                    {showDropdown && searchQuery.length > 0 && (
                      <div className="absolute top-full left-0 right-12 mt-2 bg-neo-card border-2 border-neo-border rounded-neo-sm shadow-neo overflow-hidden z-20 max-h-[200px] overflow-y-auto">
                        {filteredProducts.length === 0 ? (
                          <p className="px-4 py-3 text-xs text-neo-muted font-medium">Produk tidak ditemukan</p>
                        ) : (
                          filteredProducts.map((p) => (
                            <button key={p.id} onClick={() => handleSelectProduct(p)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-neo-bg border-b-2 border-neo-border last:border-0 transition-colors text-left">
                              <Package size={14} className="text-neo-muted" />
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold text-neo-text truncate">{p.name}</p>
                                <p className="text-[11px] font-mono text-neo-muted">{p.sku}</p>
                              </div>
                              <span className="text-[11px] font-mono font-bold text-neo-subtle">Stok: {p.stock}</span>
                            </button>
                          ))
                        )}
                      </div>
                    )}

                    {/* Scanner overlay */}
                    {showScanner && (
                      <div className="mt-2 p-4 rounded-neo-sm bg-neo-card border-2 border-neo-border relative">
                        <button onClick={() => setShowScanner(false)} className="absolute top-2 right-2 text-neo-muted hover:text-neo-text"><X size={14} /></button>
                        <div className="w-full h-32 bg-neo-bg rounded-neo-xs border-2 border-neo-border flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-neo-primary/50 rounded mx-auto mb-2 animate-pulse" />
                            <p className="text-[11px] text-neo-muted font-semibold">Memindai barcode...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  {selectedProduct && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-neo-xs bg-neo-bg border-2 border-neo-border">
                        <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">Stok Saat Ini</p>
                        <p className="text-lg font-extrabold text-neo-text mt-1">{selectedProduct.stock}</p>
                      </div>
                      <div className="p-3 rounded-neo-xs bg-neo-bg border-2 border-neo-border">
                        <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">Harga</p>
                        <p className="text-sm font-mono font-bold text-neo-text mt-1">{formatCurrency(selectedProduct.price)}</p>
                      </div>
                      <div className="p-3 rounded-neo-xs bg-neo-bg border-2 border-neo-border">
                        <p className="text-[10px] font-bold text-neo-muted uppercase tracking-wider">Maks. Stok</p>
                        <p className="text-lg font-extrabold text-neo-text mt-1">{selectedProduct.maxStock}</p>
                      </div>
                    </div>
                  )}

                  {/* Qty + Date */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-neo-muted uppercase tracking-wider block mb-1.5">Jumlah</label>
                      <div className="flex items-center border-2 border-neo-border rounded-neo-xs overflow-hidden bg-neo-bg">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-neo-muted hover:text-neo-text hover:bg-neo-card transition-colors border-r-2 border-neo-border">
                          <Minus size={14} />
                        </button>
                        <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} className="flex-1 text-center bg-transparent text-neo-text text-[14px] font-mono font-bold focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
                        <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-neo-muted hover:text-neo-text hover:bg-neo-card transition-colors border-l-2 border-neo-border">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-neo-muted uppercase tracking-wider block mb-1.5">Tanggal</label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neo-muted" />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="neo-input w-full pl-9 pr-3 py-2.5 text-[13px] [color-scheme:dark]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keterangan */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-neo-muted mb-3">Keterangan</p>
                <div className="relative">
                  <textarea value={note} onChange={(e) => setNote(e.target.value.slice(0, 200))} placeholder="Tambahkan catatan (opsional)..." rows={3} className="neo-input w-full px-4 py-3 text-[13px] placeholder:text-neo-muted resize-none" />
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono font-bold text-neo-muted">{note.length}/200</span>
                </div>
              </div>

              {/* Mobile submit */}
              <div className="xl:hidden">
                <button onClick={handleSubmit} disabled={!selectedProduct || qty < 1 || isSubmitting} className={`w-full py-3 rounded-neo-sm text-[14px] font-bold border-2 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${type === "masuk" ? "bg-neo-success border-neo-success text-white shadow-[3px_3px_0px_0px_rgba(7,202,107,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(7,202,107,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]" : "bg-neo-warning border-neo-warning text-white shadow-[3px_3px_0px_0px_rgba(232,149,88,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(232,149,88,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"}`}>
                  {isSubmitting ? "Memproses..." : "Catat Transaksi"}
                </button>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="hidden xl:block w-[340px] flex-shrink-0">
              <div className="sticky top-8 neo-card p-5 space-y-4">
                <h3 className="text-sm font-bold text-neo-text">Ringkasan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b-2 border-neo-border pb-2">
                    <span className="text-[12px] font-semibold text-neo-muted">Tipe</span>
                    <span className={`text-[12px] font-bold ${type === "masuk" ? "text-neo-success" : "text-neo-warning"}`}>{type === "masuk" ? "Barang Masuk" : "Barang Keluar"}</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-neo-border pb-2">
                    <span className="text-[12px] font-semibold text-neo-muted">Produk</span>
                    <span className="text-[12px] font-semibold text-neo-subtle text-right max-w-[180px] truncate">{selectedProduct ? selectedProduct.name : "—"}</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-neo-border pb-2">
                    <span className="text-[12px] font-semibold text-neo-muted">Stok Saat Ini</span>
                    <span className="text-[12px] font-mono font-bold text-neo-subtle">{selectedProduct ? selectedProduct.stock : "—"}</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-neo-border pb-2">
                    <span className="text-[12px] font-semibold text-neo-muted">Perubahan</span>
                    <span className={`text-[12px] font-mono font-bold ${type === "masuk" ? "text-neo-success" : "text-neo-warning"}`}>{selectedProduct ? `${type === "masuk" ? "+" : "-"}${qty}` : "—"}</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-neo-border pb-2">
                    <span className="text-[12px] font-semibold text-neo-muted">Stok Setelah</span>
                    <span className="text-[14px] font-extrabold text-neo-text">{selectedProduct ? stockAfter : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[12px] font-semibold text-neo-muted">Tanggal</span>
                    <span className="text-[12px] font-mono font-semibold text-neo-subtle">{date}</span>
                  </div>
                </div>
                <button onClick={handleSubmit} disabled={!selectedProduct || qty < 1 || isSubmitting} className={`w-full py-3 rounded-neo-sm text-[13px] font-bold border-2 mt-4 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${type === "masuk" ? "bg-neo-success border-neo-success text-white shadow-[3px_3px_0px_0px_rgba(7,202,107,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(7,202,107,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]" : "bg-neo-warning border-neo-warning text-white shadow-[3px_3px_0px_0px_rgba(232,149,88,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(232,149,88,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"}`}>
                  {isSubmitting ? "Memproses..." : "Catat Transaksi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 neo-card border-neo-success animate-[slideUp_0.3s_ease-out]">
          <CheckCircle2 size={16} className="text-neo-success" />
          <p className="text-[13px] font-bold text-neo-text">Transaksi berhasil dicatat!</p>
        </div>
      )}
    </div>
  );
}
