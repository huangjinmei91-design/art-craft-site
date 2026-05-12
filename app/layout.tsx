import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ART&CRAFT",
  description: "以中国传统工艺，观美学之境，思哲学之理。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
