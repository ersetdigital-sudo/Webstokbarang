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


export type TransactionType = "masuk" | "keluar";

export interface Transaction {
  id: string;
  productName: string;
  sku: string;
  type: TransactionType;
  qty: number;
  date: string;
  time: string;
}

export const transactions: Transaction[] = [
  {
    id: "t1",
    productName: "Keyboard Mekanikal RGB",
    sku: "KMR-3302",
    type: "keluar",
    qty: 5,
    date: "20 Mei 2026",
    time: "14:32",
  },
  {
    id: "t2",
    productName: "Headphone Bluetooth Nirkabel",
    sku: "HBN-4421",
    type: "masuk",
    qty: 50,
    date: "20 Mei 2026",
    time: "11:15",
  },
  {
    id: "t3",
    productName: "Kabel Charger USB-C 2m",
    sku: "KCU-1087",
    type: "keluar",
    qty: 20,
    date: "19 Mei 2026",
    time: "16:48",
  },
  {
    id: "t4",
    productName: "SSD Portabel 1TB",
    sku: "SPT-8847",
    type: "masuk",
    qty: 30,
    date: "19 Mei 2026",
    time: "09:20",
  },
  {
    id: "t5",
    productName: "Webcam HD 1080p",
    sku: "WHD-9901",
    type: "keluar",
    qty: 12,
    date: "18 Mei 2026",
    time: "15:05",
  },
  {
    id: "t6",
    productName: "Earbuds Noise Cancelling",
    sku: "ENC-6633",
    type: "masuk",
    qty: 100,
    date: "18 Mei 2026",
    time: "10:30",
  },
  {
    id: "t7",
    productName: "Stop Kontak Pintar 6 Port",
    sku: "SKP-3378",
    type: "keluar",
    qty: 8,
    date: "17 Mei 2026",
    time: "13:22",
  },
  {
    id: "t8",
    productName: "Lampu Meja LED Adjustable",
    sku: "LML-2294",
    type: "masuk",
    qty: 25,
    date: "17 Mei 2026",
    time: "08:45",
  },
  {
    id: "t9",
    productName: "Mouse Wireless Ergonomis",
    sku: "MWE-5563",
    type: "masuk",
    qty: 200,
    date: "16 Mei 2026",
    time: "14:10",
  },
  {
    id: "t10",
    productName: "Kursi Kantor Ergonomis",
    sku: "KKE-7756",
    type: "masuk",
    qty: 40,
    date: "16 Mei 2026",
    time: "09:00",
  },
  {
    id: "t11",
    productName: "Dudukan Monitor Arm",
    sku: "DMA-1122",
    type: "keluar",
    qty: 15,
    date: "15 Mei 2026",
    time: "16:30",
  },
  {
    id: "t12",
    productName: "Headphone Bluetooth Nirkabel",
    sku: "HBN-4421",
    type: "keluar",
    qty: 10,
    date: "15 Mei 2026",
    time: "11:45",
  },
  {
    id: "t13",
    productName: "Lampu Meja LED Adjustable",
    sku: "LML-2294",
    type: "keluar",
    qty: 18,
    date: "14 Mei 2026",
    time: "15:20",
  },
  {
    id: "t14",
    productName: "Keyboard Mekanikal RGB",
    sku: "KMR-3302",
    type: "masuk",
    qty: 60,
    date: "14 Mei 2026",
    time: "08:30",
  },
  {
    id: "t15",
    productName: "Earbuds Noise Cancelling",
    sku: "ENC-6633",
    type: "keluar",
    qty: 25,
    date: "13 Mei 2026",
    time: "17:00",
  },
  {
    id: "t16",
    productName: "SSD Portabel 1TB",
    sku: "SPT-8847",
    type: "keluar",
    qty: 9,
    date: "13 Mei 2026",
    time: "12:15",
  },
  {
    id: "t17",
    productName: "Webcam HD 1080p",
    sku: "WHD-9901",
    type: "masuk",
    qty: 50,
    date: "12 Mei 2026",
    time: "10:00",
  },
  {
    id: "t18",
    productName: "Kabel Charger USB-C 2m",
    sku: "KCU-1087",
    type: "masuk",
    qty: 300,
    date: "12 Mei 2026",
    time: "08:00",
  },
];
