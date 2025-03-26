import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";

// 使用Poppins作为主要标题字体，接近苹果设计语言
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

// 使用Roboto作为普通文本字体
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500"],
});

// 备用字体：Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
      <body className={`${poppins.variable} ${roboto.variable} ${inter.variable} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
