"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Calendar,
  Car,
  ShieldCheck,
  HeartPulse,
  Percent,
} from "lucide-react";

export default function ProductGadai({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
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
      icon: <ShieldCheck className="w-5 h-5 text-ocean-600" />,
      text: "Cair tanpa potongan",
    },
    {
      icon: <Car className="w-5 h-5 text-ocean-600" />,
      text: "Termasuk asuransi kendaraan",
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-ocean-600" />,
      text: "Termasuk asuransi jiwa",
    },
    {
      icon: <Percent className="w-5 h-5 text-ocean-600" />,
      text: (
        <span>
          Biaya & bunga <strong>transparan</strong> — tanpa biaya tersembunyi,
          perhitungan jelas, dan suku bunga kompetitif.
        </span>
      ),
    },
  ];

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

        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          Pilih tenor dan jumlah pinjaman sesuai kebutuhan Anda.  
          Proses mudah, cepat, dan transparan.
        </p>

        {/* Product Cards */}
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 rounded-3xl border shadow-xl transition-all duration-500 backdrop-blur-xl hover:-translate-y-2 
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

              <div className="space-y-3 text-base font-medium mb-6">
                <div>
                  Cicilan: <strong>{p.cicilan}</strong>
                </div>
                <div>
                  Pinjaman hingga <strong>{p.pinjaman}</strong>
                </div>
              </div>

              {/* Benefit list in each card */}
              <ul className="text-left space-y-2 mb-8">
                {benefits.map((b, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <div
                      className={`mt-1 ${
                        p.highlight ? "text-white" : "text-ocean-600"
                      }`}
                    >
                      {b.icon}
                    </div>
                    <p
                      className={`text-sm leading-snug ${
                        p.highlight ? "text-white/90" : "text-gray-700"
                      }`}
                    >
                      {b.text}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onOpenModal}
                className={`mt-auto w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-md 
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
