import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Suspense } from "react"; 
import GtagTracker from "./GtagTracker";

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
    default: "Pinjaman BPKB Cepat Cair & Aman Terpercaya",
    template: "%s | GadaiBPKB",
  },
  description:
    "Proses mudah tanpa BI checking, bunga ringan, cair dalam 1x24 jam. Solusi gadai kendaraan terpercaya untuk kebutuhan dana tunai Anda.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Pinjaman BPKB Cepat Cair & Aman Terpercaya",
    description:
      "Proses mudah tanpa BI checking, bunga ringan, cair dalam 1x24 jam. Solusi gadai kendaraan terpercaya untuk kebutuhan dana tunai Anda.",
    type: "website",
    locale: "id_ID",
  },
  metadataBase: new URL("https://garasibpkb.id/"),
};

const GA_ID = process.env.NEXT_PUBLIC_GTAG_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        {/* === Google Tag Script === */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: false });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {/* ✅ Bungkus dengan Suspense biar aman saat build */}
        <Suspense fallback={null}>
          <GtagTracker />
        </Suspense>

        {children}
      </body>
    </html>
  );
}
