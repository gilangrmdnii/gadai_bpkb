"use client";
import { motion } from "framer-motion";
import { Smartphone, PiggyBank, Zap, Users } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  { 
    title: "Cair Cepat & Transparan", 
    desc: "Ajukan pinjaman hanya dalam hitungan menit. Semua proses jelas tanpa biaya tersembunyi.", 
    icon: <Zap className="w-6 h-6 text-white" /> 
  },
  { 
    title: "Bunga Ringan & Fleksibel", 
    desc: "Pilih tenor cicilan sesuai kebutuhan Anda. Bebas atur pembayaran dengan bunga kompetitif.", 
    icon: <PiggyBank className="w-6 h-6 text-white" /> 
  },
  { 
    title: "Pantau dari Smartphone", 
    desc: "Lacak status pengajuan & cicilan langsung dari genggaman dengan dashboard mobile-friendly.", 
    icon: <Smartphone className="w-6 h-6 text-white" /> 
  },
  { 
    title: "Support Ramah & Personal", 
    desc: "Tim kami bukan sekadar CS. Kami hadir untuk mendampingi perjalanan finansial Anda.", 
    icon: <Users className="w-6 h-6 text-white" /> 
  },
];

const FeatureCard = ({ title, desc, icon }: any) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-ocean-600 to-ocean-500 text-white shadow-lg"
  >
    {/* Decorative gradient overlay */}
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

    <div className="relative p-8 flex flex-col h-full">
      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-5 shadow-inner">
        {icon}
      </div>
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="mt-2 text-white/90 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const Features = () => {
  return (
    <section id="fitur" className="relative py-24 bg-gradient-to-b from-ocean-50 to-white">
      <div className="container">
        {/* Title */}
        <Reveal>
          <h3 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800">
            Fitur <span className="text-ocean-600">Unggulan</span>
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
            Lebih dari sekadar gadai BPKB, kami berikan pengalaman finansial yang 
            <span className="font-medium text-ocean-700"> cepat, aman, dan bersahabat</span>.
          </p>
        </Reveal>

        {/* Zigzag Grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <FeatureCard {...f} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-ocean-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean-300/30 rounded-full blur-3xl" />
    </section>
  );
};

export default Features;
