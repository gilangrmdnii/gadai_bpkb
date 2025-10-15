"use client";
import { JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { HelpCircle, ShieldCheck, Timer, HandCoins, FileCheck } from "lucide-react";

type QA = { q: string; a: string; icon: JSX.Element };

const items: QA[] = [
  {
    q: "Berapa lama proses pencairan pinjaman BPKB?",
    a: "Proses pencairan pinjaman BPKB biasanya hanya membutuhkan waktu 1x24 jam setelah dokumen lengkap dan proses verifikasi selesai. Kami pastikan proses cepat dan transparan.",
    icon: <Timer className="w-5 h-5" />
  },
  {
    q: "Apakah layanan gadai BPKB ini aman dan legal?",
    a: "Ya, Layanan kami agensi resmi mitra leasing terpercaya, yang bekerja sama dengan pembiayaan yang terdaftar dan diawasi oleh OJK serta anggota APPI. Semua Proses dilakukan sesuai regulasi yang berlaku untuk memastikan keamanan dan legalitas transaksi.",
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    q: "Bagaimana bunga dan tenor pinjaman BPKB?",
    a: "Kami menawarkan bunga kompetitif dengan tenor fleksibel yang dapat disesuaikan dengan kebutuhan finansial Anda, agar cicilan lebih ringan.",
    icon: <HandCoins className="w-5 h-5" />
  },
  {
    q: "Apakah BPKB kendaraan ditahan selama masa pinjaman?",
    a: "Ya, BPKB kendaraan akan dititipkan selama masa pinjaman. Namun kendaraan tetap dapat digunakan seperti biasa tanpa kendala.",
    icon: <FileCheck className="w-5 h-5" />
  },
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
              Pertanyaan yang <span className="text-ocean-600">Sering Ditanyakan Tentang Gadai BPKB</span>
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-gray-600 max-w-md">
              Temukan jawaban atas pertanyaan umum seputar layanan gadai BPKB, proses pinjaman cepat cair, bunga ringan, dan keamanan transaksi.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 p-5 rounded-2xl bg-ocean-50 border border-ocean-100 shadow-sm flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-ocean-600" />
              <p className="text-sm text-gray-700">
                Masih ada yang belum jelas?{" "}
                <a
                  href="#kontak"
                  rel="noopener noreferrer"
                  className="text-ocean-700 font-semibold hover:underline"
                >
                  Hubungi tim kami
                </a>.
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
