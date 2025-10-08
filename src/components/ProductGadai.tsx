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
      bulanDiskon: 10,
      pinjaman: "Rp 100.000.000",
      cicilan: "Rp 11.630.000 / bulan",
      bunga: "9.2%",
      highlight: false,
    },
    {
      bulan: 24,
      bulanDiskon: 20,
      pinjaman: "Rp 100.000.000",
      cicilan: "Rp 5.910.000 / bulan",
      bunga: "9.1%",
      highlight: false,
    },
    {
      bulan: 36,
      bulanDiskon: 34,
      pinjaman: "Rp 100.000.000",
      cicilan: "Rp 4.290.000 / bulan",
      bunga: "9.7%",
      highlight: false,
    },
    {
      bulan: 48,
      bulanDiskon: 46,
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
      className="relative py-20 sm:py-24 bg-gradient-to-br from-ocean-50 via-white to-ocean-100 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-800 mb-3 sm:mb-4"
        >
          Simulasi Produk Gadai BPKB
        </motion.h2>

        <p className="text-gray-600 mb-10 sm:mb-12 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Pilih tenor dan jumlah pinjaman sesuai kebutuhan Anda.
          Proses mudah, cepat, dan transparan.
        </p>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto mb-16">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-lg transition-all duration-500 backdrop-blur-xl hover:-translate-y-2 
                ${p.highlight
                  ? "bg-gradient-to-b from-ocean-600 to-ocean-700 text-white border-ocean-400"
                  : "bg-white/80 border-ocean-100 text-gray-800 hover:shadow-ocean-200/40"
                }`}
            >
              {p.highlight && (
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="absolute top-3 right-3 bg-white text-ocean-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow flex items-center gap-1"
                >
                  <BadgeCheck className="w-4 h-4" /> Terfavorit
                </motion.span>
              )}

              <div className="mb-5 sm:mb-6 flex justify-center">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-inner
                    ${p.highlight
                      ? "bg-white/20 text-white"
                      : "bg-gradient-to-br from-ocean-100 to-ocean-50 text-ocean-600"
                    }`}
                >
                  <Calendar className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
                <span className="block text-sm text-gray-400 line-through">
                  {p.bulan} Bulan
                </span>
                Tenor {p.bulanDiskon} Bulan
              </h3>
              <p
                className={`text-sm sm:text-lg mb-5 sm:mb-6 ${p.highlight ? "text-white/80" : "text-gray-600"
                  }`}
              >
                Bunga {p.bunga} per tahun
              </p>

              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base font-medium mb-5 sm:mb-6">
                <div>
                  Cicilan: <strong>{p.cicilan}</strong>
                </div>
                <div>
                  Pinjaman hingga <strong>{p.pinjaman}</strong>
                </div>
              </div>

              {/* Benefit list */}
              <ul className="text-left space-y-2 mb-6 sm:mb-8">
                {benefits.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 sm:gap-3">
                    <div
                      className={`mt-1 ${p.highlight ? "text-white" : "text-ocean-600"
                        }`}
                    >
                      {b.icon}
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-snug ${p.highlight ? "text-white/90" : "text-gray-700"
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
                className={`mt-auto w-full py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-md 
                  ${p.highlight
                    ? "bg-white text-ocean-700 hover:bg-gray-100"
                    : "bg-gradient-to-r from-ocean-600 to-ocean-700 text-white hover:brightness-110"
                  }`}
              >
                Ajukan Sekarang
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* ===== TABEL SIMULASI PERHITUNGAN ===== */}
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <motion.table
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full text-sm sm:text-base border border-gray-200 rounded-xl shadow-md overflow-hidden bg-white"
          >
            <thead className="bg-ocean-600 text-white text-xs sm:text-sm uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4">Tenor</th>
                <th className="py-3 px-4">Pinjaman</th>
                <th className="py-3 px-4">Bunga / Tahun</th>
                <th className="py-3 px-4">Cicilan / Bulan</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 divide-y divide-gray-100">
              {products.map((p, i) => (
                <tr
                  key={i}
                  className="hover:bg-ocean-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="line-through opacity-60 mr-1">
                      {p.bulan}
                    </span>
                    {p.bulanDiskon} Bulan
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{p.pinjaman}</td>
                  <td className="py-3 px-4">{p.bunga}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{p.cicilan}</td>
                </tr>
              ))}
            </tbody>
          </motion.table>

          <p className="text-[11px] sm:text-xs text-gray-500 mt-3 sm:mt-4 text-center leading-relaxed px-2">
            Perhitungan kredit ini bersifat estimasi dari{" "}
            <span className="font-semibold text-ocean-700">
              garasibpkb.id
            </span>
            , serta dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih
            dahulu.
          </p>
        </div>
      </div>

      {/* Decorative blur */}
      <div className="absolute -top-20 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-ocean-300/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[20rem] sm:w-[30rem] h-[20rem] sm:h-[30rem] bg-ocean-400/30 rounded-full blur-3xl -z-10" />
    </section>
  );
}
