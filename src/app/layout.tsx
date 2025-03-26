import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 基础字体设置
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextGGame - 精选女性游戏平台",
  description: "发现和体验专为女性设计的高品质游戏",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
