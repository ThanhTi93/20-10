import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1c0512",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vo-yeu-20-10.vercel.app"),
  title: "Chúc Vợ Yêu Ngày 20/10 Thật Nhiều Hạnh Phúc ❤️",
  description: "Món quà bất ngờ và những lời yêu thương chân thành nhất dành tặng người phụ nữ tuyệt vời nhất của anh!",
  openGraph: {
    title: "Chúc Vợ Yêu Ngày 20/10 Thật Nhiều Hạnh Phúc ❤️",
    description: "Món quà bất ngờ và những lời yêu thương chân thành nhất anh dành tặng riêng cho em!",
    images: [
      {
        url: "/images/bouquet.jpg",
        width: 1200,
        height: 1200,
        alt: "Bó hoa tươi thắm chúc mừng 20/10",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
