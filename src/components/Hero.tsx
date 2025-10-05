"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  const items = [
    { title: "Proses Cepat", desc: "Cair dalam 1x24 jam tanpa ribet." },
    { title: "Bunga Ringan", desc: "Cicilan fleksibel dengan bunga kompetitif." },
    { title: "Aman & Legal", desc: "Terdaftar resmi dan diawasi OJK." },
  ];

  return (
    <section className=" relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ocean-700 via-ocean-800 to-ocean-900 text-white px-6">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ocean-400/30 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[140px]" />
        <svg
          className="absolute top-0 left-0 w-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="white"
            d="M0,96L60,128C120,160,240,224,360,229.3C480,235,600,181,720,144C840,107,960,85,1080,117.3C1200,149,1320,235,1380,277.3L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="mt-12 relative z-10 grid md:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
        {/* Left - Text Content */}
        {/* Left - Text Content */}
        <div className="mt-20 text-center md:text-left">
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Pinjaman Cepat & Aman dengan Jaminan BPKB
          </motion.h2>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-4 text-base sm:text-lg text-blue-100 max-w-md mx-auto md:mx-0"
          >
            Proses mudah, bunga ringan, cair hanya dalam hitungan jam.
            Solusi finansial terpercaya untuk kebutuhan Anda.
          </motion.p>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a
              href="#apply"
              className="bg-white text-ocean-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all"
            >
              Ajukan Sekarang
            </a>
            <a
              href="#produk"
              className="border border-white/70 px-8 py-3 rounded-xl font-semibold hover:bg-white/10 hover:scale-[1.03] transition-all"
            >
              Lihat Layanan
            </a>
          </motion.div>
        </div>

        {/* Right - Image + Cards */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-md"
          >
            <Image
              src="/images/gadeterdekatt.png"
              alt="Gadai BPKB Cepat"
              width={500}
              height={400}
              className="w-full h-auto drop-shadow-2xl rounded-2xl"
              priority
            />
          </motion.div>

          {/* Feature Cards */}
          <div className="mt-10 grid sm:grid-cols-3 gap-6 w-full mb-8">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 shadow-md hover:bg-white/15 transition-all text-center"
              >
                <h4 className="text-base font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-blue-100 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
