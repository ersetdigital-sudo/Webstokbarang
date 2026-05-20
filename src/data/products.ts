export type ProductStatus = "active" | "low" | "out";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  maxStock: number;
  status: ProductStatus;
  price: number;
}

export interface Alert {
  id: string;
  type: "critical" | "warning";
  message: string;
  timestamp: string;
}

export interface CategoryData {
  name: string;
  count: number;
  color: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Headphone Bluetooth Nirkabel",
    sku: "HBN-4421",
    category: "Elektronik",
    stock: 234,
    maxStock: 300,
    status: "active",
    price: 459000,
  },
  {
    id: "2",
    name: "Kabel Charger USB-C 2m",
    sku: "KCU-1087",
    category: "Aksesoris",
    stock: 12,
    maxStock: 500,
    status: "low",
    price: 45000,
  },
  {
    id: "3",
    name: "Keyboard Mekanikal RGB",
    sku: "KMR-3302",
    category: "Elektronik",
    stock: 89,
    maxStock: 150,
    status: "active",
    price: 1250000,
  },
  {
    id: "4",
    name: "Kursi Kantor Ergonomis",
    sku: "KKE-7756",
    category: "Furnitur",
    stock: 0,
    maxStock: 40,
    status: "out",
    price: 3200000,
  },
  {
    id: "5",
    name: "Lampu Meja LED Adjustable",
    sku: "LML-2294",
    category: "Penerangan",
    stock: 156,
    maxStock: 200,
    status: "active",
    price: 185000,
  },
  {
    id: "6",
    name: "Webcam HD 1080p",
    sku: "WHD-9901",
    category: "Elektronik",
    stock: 8,
    maxStock: 100,
    status: "low",
    price: 520000,
  },
  {
    id: "7",
    name: "Meja Berdiri Konverter",
    sku: "MBK-4418",
    category: "Furnitur",
    stock: 0,
    maxStock: 25,
    status: "out",
    price: 2750000,
  },
  {
    id: "8",
    name: "Earbuds Noise Cancelling",
    sku: "ENC-6633",
    category: "Elektronik",
    stock: 342,
    maxStock: 400,
    status: "active",
    price: 890000,
  },
  {
    id: "9",
    name: "Dudukan Monitor Arm",
    sku: "DMA-1122",
    category: "Aksesoris",
    stock: 5,
    maxStock: 80,
    status: "low",
    price: 375000,
  },
  {
    id: "10",
    name: "SSD Portabel 1TB",
    sku: "SPT-8847",
    category: "Penyimpanan",
    stock: 67,
    maxStock: 100,
    status: "active",
    price: 1450000,
  },
  {
    id: "11",
    name: "Mouse Wireless Ergonomis",
    sku: "MWE-5563",
    category: "Aksesoris",
    stock: 0,
    maxStock: 200,
    status: "out",
    price: 299000,
  },
  {
    id: "12",
    name: "Stop Kontak Pintar 6 Port",
    sku: "SKP-3378",
    category: "Elektronik",
    stock: 198,
    maxStock: 250,
    status: "active",
    price: 165000,
  },
];

export const categories: CategoryData[] = [
  { name: "Elektronik", count: 5, color: "#C6FF80" },
  { name: "Aksesoris", count: 3, color: "#80D4FF" },
  { name: "Furnitur", count: 2, color: "#FFCC66" },
  { name: "Penerangan", count: 1, color: "#E580FF" },
  { name: "Penyimpanan", count: 1, color: "#FF8080" },
];

export const alerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    message: "Kursi Kantor Ergonomis habis stok",
    timestamp: "2 menit lalu",
  },
  {
    id: "2",
    type: "critical",
    message: "Meja Berdiri Konverter habis stok",
    timestamp: "15 menit lalu",
  },
  {
    id: "3",
    type: "warning",
    message: "Kabel Charger USB-C 2m hampir habis (12 unit)",
    timestamp: "1 jam lalu",
  },
  {
    id: "4",
    type: "critical",
    message: "Mouse Wireless Ergonomis habis stok",
    timestamp: "2 jam lalu",
  },
  {
    id: "5",
    type: "warning",
    message: "Dudukan Monitor Arm hampir habis (5 unit)",
    timestamp: "3 jam lalu",
  },
  {
    id: "6",
    type: "warning",
    message: "Webcam HD 1080p stok menipis (8 unit)",
    timestamp: "5 jam lalu",
  },
];
