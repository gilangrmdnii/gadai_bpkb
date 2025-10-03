"use client";
import { JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { HelpCircle, ShieldCheck, Timer, HandCoins, FileCheck } from "lucide-react";

type QA = { q: string; a: string; icon: JSX.Element };

const items: QA[] = [
  { q: "Berapa lama proses pencairan?", a: "Umumnya dalam 1x24 jam setelah dokumen lengkap dan verifikasi selesai.", icon: <Timer className="w-5 h-5" /> },
  { q: "Apakah aman dan legal?", a: "Ya, proses resmi dan mematuhi regulasi yang berlaku, terdaftar dan diawasi OJK.", icon: <ShieldCheck className="w-5 h-5" /> },
  { q: "Bunga dan tenor seperti apa?", a: "Bunga kompetitif dengan pilihan tenor fleksibel sesuai kebutuhan Anda.", icon: <HandCoins className="w-5 h-5" /> },
  { q: "Apakah BPKB ditahan?", a: "Ya, BPKB dititipkan selama masa pinjaman. Kendaraan tetap bisa digunakan seperti biasa.", icon: <FileCheck className="w-5 h-5" /> },
];

const FAQItem = ({ q, a, icon }: QA) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div 
      layout 
      onClick={() => setOpen(!open)} 
      className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 
        ${open ? "border-ocean-500 bg-ocean-50/70 shadow-md" : "border-gray-200 hover:border-ocean-300 hover:bg-gray-50/70"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`flex items-center justify-center w-9 h-9 rounded-xl 
            ${open ? "bg-ocean-600 text-white" : "bg-ocean-100 text-ocean-700"}`}>
            {icon}
          </span>
          <h4 className="font-semibold text-gray-800">{q}</h4>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-ocean-600 font-bold text-xl"
        >
          ⌄
        </motion.span>
      </div>

      {/* Answer */}
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-3 text-gray-600 leading-relaxed pl-12"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left: intro / storytelling */}
        <div className="relative">
          <Reveal>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-snug">
              Pertanyaan yang <span className="text-ocean-600">Sering Ditanyakan</span>
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-gray-600 max-w-md">
              Kami tahu setiap orang punya rasa ingin tahu sebelum mengajukan.  
              Karena itu, kami rangkum pertanyaan umum yang sering muncul dari calon nasabah.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 p-5 rounded-2xl bg-ocean-50 border border-ocean-100 shadow-sm flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-ocean-600" />
              <p className="text-sm text-gray-700">
                Masih ada yang belum jelas? <a href="#kontak" className="text-ocean-700 font-semibold hover:underline">Hubungi tim kami</a>.
              </p>
            </div>
          </Reveal>

          {/* Decorative bg */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-ocean-200/30 blur-3xl rounded-full -z-10" />
        </div>

        {/* Right: FAQ list */}
        <div className="space-y-4">
          {items.map((it, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <FAQItem {...it} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
