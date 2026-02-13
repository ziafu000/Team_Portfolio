import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://team-agency.vercel.app'),
  title: "TEAM Agency | Studio Sáng Tạo Số & 3D",
  description: "Chúng tôi kiến tạo những trải nghiệm số tuyệt vời thông qua phát triển web tiên tiến, trực quan hóa 3D, quảng cáo sáng tạo và các giải pháp thiết kế đột phá.",
  keywords: ["Studio 3D", "Phát Triển Website", "Agency Sáng Tạo", "Thiết Kế Số", "Đồ Họa Chuyển Động"],
  openGraph: {
    title: "TEAM Agency | Studio Sáng Tạo Số & 3D",
    description: "Kiến tạo những trải nghiệm số tuyệt vời thông qua web, 3D và các giải pháp sáng tạo.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEAM Agency | Studio Sáng Tạo Số & 3D",
    description: "Kiến tạo những trải nghiệm số tuyệt vời thông qua web, 3D và các giải pháp sáng tạo.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
