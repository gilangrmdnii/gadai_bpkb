import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gadai BPKB Cepat & Aman | GadaiBPKB",
    template: "%s | GadaiBPKB",
  },
  description:
    "Ajukan pinjaman dengan jaminan BPKB. Proses cepat, bunga kompetitif, aman & resmi.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Gadai BPKB Cepat & Aman | GadaiBPKB",
    description:
      "Ajukan pinjaman dengan jaminan BPKB. Proses cepat, bunga kompetitif, aman & resmi.",
    type: "website",
    locale: "id_ID",
  },
  metadataBase: new URL("https://gadaibpkb.example"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
