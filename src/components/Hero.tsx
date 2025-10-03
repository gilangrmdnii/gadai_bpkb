"use client"; 
import { motion } from "framer-motion";

const Hero = () => {
  const items = [
    { title: "Proses Cepat", desc: "Cair dalam 1x24 jam tanpa ribet." },
    { title: "Bunga Ringan", desc: "Cicilan fleksibel dengan bunga kompetitif." },
    { title: "Aman & Legal", desc: "Terdaftar resmi dan diawasi OJK." },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-ocean-600 to-ocean-800 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/header.png')] bg-cover bg-center opacity-50"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Title */}
        <motion.h2 
          initial={{ y: 40, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Pinjaman Cepat & Aman dengan Jaminan BPKB
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          initial={{ y: 40, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1 }}
          className="mt-4 text-lg text-gray-100"
        >
          Proses mudah, bunga ringan, cair hanya dalam hitungan jam. Solusi finansial terpercaya untuk kebutuhan Anda.
        </motion.p>

        {/* CTA */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1.2 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#apply"
            className="bg-white text-ocean-700 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
          >
            Ajukan Sekarang
          </a>
          <a
            href="#layanan"
            className="border border-white/70 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
          >
            Lihat Layanan
          </a>
        </motion.div>

        {/* Cards Highlight */}
        <div className="mt-14 grid sm:grid-cols-3 gap-6 text-left">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:bg-white/20 transition"
            >
              <h4 className="text-lg font-semibold text-white">{item.title}</h4>
              <p className="mt-2 text-gray-200 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
