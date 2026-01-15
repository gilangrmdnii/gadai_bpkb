"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Timer, HandCoins, Globe } from "lucide-react";
import Reveal from "./Reveal";

const WhyUs = () => {
  const items = [
    {
      title: "Proses Cepat & Mudah",
      desc: "Ajukan gadai BPKB kendaraan Anda dengan proses cepat, transparan, dan aman tanpa prosedur rumit.",
      icon: <Timer className="w-8 h-8 text-ocean-600" />,
    },
    {
      title: "Perhitungan Jelas & Fleksibel",
      desc: "Nikmati tenor fleksibel dengan bunga kompetitif sesuai ketentuan, tanpa biaya tersembunyi.",
      icon: <HandCoins className="w-8 h-8 text-ocean-600" />,
    },
    {
      title: "Aman, Legal & Terpercaya",
      desc: "Kami merupakan mitra resmi lembaga keuangan yang berizin, menjamin keamanan dan kenyamanan transaksi Anda.",
      icon: <ShieldCheck className="w-8 h-8 text-ocean-600" />,
    },
    {
      title: "Layanan Nasional",
      desc: "Kami melayani proses gadai BPKB kendaraan di berbagai wilayah Indonesia secara profesional dan terpercaya.",
      icon: <Globe className="w-8 h-8 text-ocean-600" />,
    },
  ];

  return (
    <section id="keunggulan" className="relative py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
            Kenapa <span className="text-ocean-600">Memilih Layanan Gadai BPKB Kami?</span>
          </h3>
          <p className="mt-3 text-gray-600">
            Kami memberikan solusi gadai kendaraan dengan proses cepat, aman, dan transparan untuk kebutuhan finansial Anda.
          </p>
        </div>

        {/* Card Items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-ocean-50 mb-5 group-hover:bg-ocean-100 transition">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Decorative Gradient Circle */}
      <div className="absolute top-20 -right-20 w-64 h-64 bg-ocean-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -left-20 w-72 h-72 bg-ocean-300/20 rounded-full blur-3xl" />
    </section>
  );
};

export default WhyUs;
