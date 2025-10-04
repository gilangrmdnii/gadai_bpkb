"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rizky Ananda",
      role: "Wiraswasta",
      message:
        "Prosesnya cepat banget! Gadai BPKB mobil saya cair di hari yang sama tanpa ribet. Suku bunga juga sangat bersaing.",
      rating: 5,
    },
    {
      name: "Dewi Lestari",
      role: "Karyawan Swasta",
      message:
        "Awalnya ragu, tapi timnya profesional dan transparan. Semua biaya dijelaskan di awal, nggak ada potongan tersembunyi.",
      rating: 5,
    },
    {
      name: "Budi Santoso",
      role: "Pengusaha",
      message:
        "Yang paling saya suka, bisa takeover dari leasing lain dan tetap dapat bunga rendah. Sangat direkomendasikan!",
      rating: 4,
    },
  ];

  return (
    <section id="testimoni" className="relative py-24 bg-gradient-to-br from-ocean-50 via-white to-ocean-100 overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-ocean-800 mb-4"
        >
          Apa Kata Mereka?
        </motion.h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Ribuan pelanggan telah mempercayakan kebutuhan dananya kepada kami.  
          Berikut pengalaman mereka bersama layanan kami.
        </p>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative bg-white rounded-3xl shadow-xl border border-ocean-100 p-8 hover:shadow-2xl transition-all duration-300"
            >
              {/* Decorative quotation */}
              <div className="absolute top-6 left-8 text-ocean-200 text-6xl font-serif select-none">“</div>

              {/* Message */}
              <p className="text-gray-700 leading-relaxed mt-8 mb-6">
                {t.message}
              </p>

              {/* Rating */}
              <div className="flex justify-center mb-3">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Name */}
              <h4 className="font-semibold text-ocean-800 text-lg">{t.name}</h4>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute -top-32 -left-16 w-72 h-72 bg-ocean-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-ocean-400/20 rounded-full blur-3xl" />
    </section>
  );
}
