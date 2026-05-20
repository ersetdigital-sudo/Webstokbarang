import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StokBarang - Inventory Dashboard",
  description: "Professional inventory management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
