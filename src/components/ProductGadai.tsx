"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Calendar, Car, ShieldCheck, HeartPulse } from "lucide-react";

export default function ProductGadai() {
  const products = [
    {
      bulan: 12,
      pinjaman: "Rp 100.000.000",
      cicilan: "Rp 11.630.000 / bulan",
      bunga: "9.2%",
      highlight: false,
    },
    {
      bulan: 24,
      pinjaman: "Rp 100.000.000",
      cicilan: "Rp 5.910.000 / bulan",
      bunga: "9.1%",
      highlight: false,
    },
    {
      bulan: 36,
      pinjaman: "Rp 100.000.000",
      cicilan: "Rp 4.290.000 / bulan",
      bunga: "9.7%",
      highlight: false,
    },
    {
      bulan: 48,
      pinjaman: "Rp 100.000.000",
      cicilan: "Rp 3.580.000 / bulan",
      bunga: "10.6%",
      highlight: true,
    },
  ];

  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-ocean-600" />,
      text: "Cair Tanpa Potongan",
    },
    {
      icon: <Car className="w-6 h-6 text-ocean-600" />,
      text: "Include Asuransi Kendaraan",
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-ocean-600" />,
      text: "Include Asuransi Jiwa",
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-ocean-600" />,
      text: "Bisa Takeover dari Leasing Lain",
    },
  ];

  const handleWhatsAppClick = (product: any) => {
    const nomor = "628119274006"; 
    const pesan = `Halo, saya tertarik dengan produk gadai tenor ${product.bulan} bulan (pinjaman ${product.pinjaman}, cicilan ${product.cicilan}). Mohon info lebih lanjut.`;
    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="produk"
      className="relative py-24 bg-gradient-to-br from-ocean-50 via-white to-ocean-100 overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-ocean-800 mb-4"
        >
          Simulasi Produk Gadai BPKB
        </motion.h2>

        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
          Pilih tenor dan jumlah pinjaman sesuai kebutuhan Anda.  
          Proses mudah, transparan, dan terpercaya.
        </p>

        {/* Benefit List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-5 mb-14"
        >
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/70 px-5 py-3 rounded-xl shadow-sm border border-ocean-100 hover:shadow-md transition-all"
            >
              {b.icon}
              <span className="text-gray-700 font-medium">{b.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 rounded-3xl border shadow-2xl transition-all duration-500 backdrop-blur-xl hover:-translate-y-2 
                ${
                  p.highlight
                    ? "bg-gradient-to-b from-ocean-600 to-ocean-700 text-white border-ocean-400"
                    : "bg-white/70 border-ocean-100 text-gray-800 hover:shadow-ocean-200/40"
                }`}
            >
              {p.highlight && (
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="absolute top-4 right-4 bg-white text-ocean-700 px-3 py-1 rounded-full text-sm font-medium shadow flex items-center gap-1"
                >
                  <BadgeCheck className="w-4 h-4" /> Terfavorit
                </motion.span>
              )}

              <div className="mb-6 flex justify-center">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner
                    ${
                      p.highlight
                        ? "bg-white/20 text-white"
                        : "bg-gradient-to-br from-ocean-100 to-ocean-50 text-ocean-600"
                    }`}
                >
                  <Calendar className="w-8 h-8" />
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-2">
                Tenor {p.bulan} Bulan
              </h3>
              <p
                className={`text-lg mb-6 ${
                  p.highlight ? "text-white/80" : "text-gray-600"
                }`}
              >
                Bunga {p.bunga} per tahun
              </p>

              <div className="space-y-3 text-base font-medium">
                <div>
                  Cicilan: <strong>{p.cicilan}</strong>
                </div>
                <div>
                  Pinjaman hingga <strong>{p.pinjaman}</strong>
                </div>
              </div>

              {/* Button WhatsApp */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleWhatsAppClick(p)}
                className={`mt-10 w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-md 
                  ${
                    p.highlight
                      ? "bg-white text-ocean-700 hover:bg-gray-100"
                      : "bg-gradient-to-r from-ocean-600 to-ocean-700 text-white hover:brightness-110"
                  }`}
              >
                Ajukan Sekarang
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative blur */}
      <div className="absolute -top-20 left-0 w-80 h-80 bg-ocean-300/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-ocean-400/30 rounded-full blur-3xl -z-10" />
    </section>
  );
}
