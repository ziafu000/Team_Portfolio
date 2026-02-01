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
  title: "TEAM Agency | Creative Digital & 3D Studio",
  description: "We craft stunning digital experiences through cutting-edge web development, 3D visualization, creative ads, and innovative design solutions.",
  keywords: ["3D Studio", "Web Development", "Creative Agency", "Digital Design", "Motion Graphics"],
  openGraph: {
    title: "TEAM Agency | Creative Digital & 3D Studio",
    description: "Crafting stunning digital experiences through web, 3D, and creative solutions.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEAM Agency | Creative Digital & 3D Studio",
    description: "Crafting stunning digital experiences through web, 3D, and creative solutions.",
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
