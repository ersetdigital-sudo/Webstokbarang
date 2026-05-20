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
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-4421",
    category: "Electronics",
    stock: 234,
    maxStock: 300,
    status: "active",
    price: 459000,
  },
  {
    id: "2",
    name: "USB-C Charging Cable 2m",
    sku: "UCC-1087",
    category: "Accessories",
    stock: 12,
    maxStock: 500,
    status: "low",
    price: 45000,
  },
  {
    id: "3",
    name: "Mechanical Keyboard RGB",
    sku: "MKR-3302",
    category: "Electronics",
    stock: 89,
    maxStock: 150,
    status: "active",
    price: 1250000,
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    sku: "EOC-7756",
    category: "Furniture",
    stock: 0,
    maxStock: 40,
    status: "out",
    price: 3200000,
  },
  {
    id: "5",
    name: "LED Desk Lamp Adjustable",
    sku: "LDL-2294",
    category: "Lighting",
    stock: 156,
    maxStock: 200,
    status: "active",
    price: 185000,
  },
  {
    id: "6",
    name: "Webcam HD 1080p",
    sku: "WHD-9901",
    category: "Electronics",
    stock: 8,
    maxStock: 100,
    status: "low",
    price: 520000,
  },
  {
    id: "7",
    name: "Standing Desk Converter",
    sku: "SDC-4418",
    category: "Furniture",
    stock: 0,
    maxStock: 25,
    status: "out",
    price: 2750000,
  },
  {
    id: "8",
    name: "Noise Cancelling Earbuds",
    sku: "NCE-6633",
    category: "Electronics",
    stock: 342,
    maxStock: 400,
    status: "active",
    price: 890000,
  },
  {
    id: "9",
    name: "Monitor Arm Mount",
    sku: "MAM-1122",
    category: "Accessories",
    stock: 5,
    maxStock: 80,
    status: "low",
    price: 375000,
  },
  {
    id: "10",
    name: "Portable SSD 1TB",
    sku: "PSD-8847",
    category: "Storage",
    stock: 67,
    maxStock: 100,
    status: "active",
    price: 1450000,
  },
  {
    id: "11",
    name: "Wireless Mouse Ergonomic",
    sku: "WME-5563",
    category: "Accessories",
    stock: 0,
    maxStock: 200,
    status: "out",
    price: 299000,
  },
  {
    id: "12",
    name: "Smart Power Strip 6-Port",
    sku: "SPS-3378",
    category: "Electronics",
    stock: 198,
    maxStock: 250,
    status: "active",
    price: 165000,
  },
  {
    id: "13",
    name: "Cable Management Kit",
    sku: "CMK-9944",
    category: "Accessories",
    stock: 15,
    maxStock: 150,
    status: "low",
    price: 89000,
  },
  {
    id: "14",
    name: "4K External Monitor 27\"",
    sku: "FEM-2201",
    category: "Electronics",
    stock: 44,
    maxStock: 60,
    status: "active",
    price: 4500000,
  },
  {
    id: "15",
    name: "Laptop Cooling Pad",
    sku: "LCP-7712",
    category: "Accessories",
    stock: 3,
    maxStock: 120,
    status: "low",
    price: 225000,
  },
];

export const categories: CategoryData[] = [
  { name: "Electronics", count: 6, color: "#C6FF80" },
  { name: "Accessories", count: 5, color: "#80D4FF" },
  { name: "Furniture", count: 2, color: "#FFCC66" },
  { name: "Lighting", count: 1, color: "#E580FF" },
  { name: "Storage", count: 1, color: "#FF8080" },
];

export const alerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    message: "Ergonomic Office Chair is out of stock",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "critical",
    message: "Standing Desk Converter is out of stock",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    type: "warning",
    message: "USB-C Charging Cable 2m running low (12 units)",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    type: "critical",
    message: "Wireless Mouse Ergonomic is out of stock",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    type: "warning",
    message: "Laptop Cooling Pad running low (3 units)",
    timestamp: "3 hours ago",
  },
  {
    id: "6",
    type: "warning",
    message: "Monitor Arm Mount running low (5 units)",
    timestamp: "5 hours ago",
  },
];
