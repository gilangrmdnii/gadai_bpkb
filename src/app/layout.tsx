import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Suspense } from "react";
import GtagTracker from "./GtagTracker";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// === Metadata untuk SEO ===
export const metadata: Metadata = {
  title: {
    default: "Layanan Gadai BPKB Aman & Terpercaya | GarasiBPKB",
    template: "%s | GarasiBPKB",
  },
  description:
    "Layanan gadai BPKB kendaraan dengan proses cepat, transparan, dan aman. Solusi keuangan berbasis jaminan kendaraan untuk kebutuhan Anda.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Gadai BPKB Aman & Terpercaya | GarasiBPKB",
    description:
      "Proses cepat dan transparan untuk gadai kendaraan Anda. Layanan aman dan profesional dengan dukungan lembaga keuangan terpercaya.",
    type: "website",
    locale: "id_ID",
  },
  metadataBase: new URL("https://garasibpkb.id/"),
};


const GA_ID = process.env.NEXT_PUBLIC_GTAG_ID;
const GTM_ID = "GTM-MQJV9V76"; 

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        {/* === Google Analytics (GA4) === */}
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

        {/* === Google Tag Manager (GTM) === */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {/* === Google Tag Manager (noscript) === */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* === Google Analytics Tracker === */}
        <Suspense fallback={null}>
          <GtagTracker />
        </Suspense>

        {children}
      </body>
    </html>
  );
}
