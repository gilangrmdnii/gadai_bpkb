"use client";

import { motion } from "framer-motion";
import { FileText, IdCard, Car, FileCheck, Users, ClipboardList, CheckCircle2 } from "lucide-react";

export default function InfoDokumenSection() {
  const dokumen = [
    {
      icon: <IdCard className="w-6 h-6 text-ocean-700" />,
      title: "KTP Pemohon & Pasangan",
      desc: "(jika sudah menikah)",
    },
    {
      icon: <Users className="w-6 h-6 text-ocean-700" />,
      title: "Kartu Keluarga",
      desc: "",
    },
    {
      icon: <Car className="w-6 h-6 text-ocean-700" />,
      title: "STNK Mobil",
      desc: "",
    },
    {
      icon: <FileText className="w-6 h-6 text-ocean-700" />,
      title: "BPKB Mobil",
      desc: "",
    },
  ];

  const proses = [
    {
      icon: <ClipboardList className="w-6 h-6 text-ocean-700" />,
      title: "1. Isi Formulir Pengajuan",
      desc: "Lengkapi data dasar secara online, hanya butuh beberapa menit.",
    },
    {
      icon: <FileCheck className="w-6 h-6 text-ocean-700" />,
      title: "2. Verifikasi Dokumen",
      desc: "Tim kami akan mengonfirmasi dan memverifikasi berkas Anda.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-ocean-700" />,
      title: "3. Pencairan Dana",
      desc: "Dana cair ke rekening Anda dengan cepat setelah disetujui.",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-ocean-50 via-white to-ocean-100 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Judul */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-ocean-800 mb-6"
        >
          Cukup Siapkan <span className="text-ocean-700">4 Dokumen</span> untuk Proses Awal
        </motion.h2>

        {/* List Dokumen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-5 mb-16"
        >
          {dokumen.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-white/80 border border-ocean-100 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-ocean-100 w-8 h-8 flex items-center justify-center rounded-full font-semibold text-ocean-700">
                {i + 1}
              </div>
              <div className="text-left">
                <h4 className="font-medium text-ocean-800 text-sm md:text-base">{item.title}</h4>
                {item.desc && <p className="text-gray-500 text-xs">{item.desc}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Garis pemisah */}
        <div className="relative mb-16">
          <div className="h-[2px] w-2/3 bg-gradient-to-r from-ocean-200 to-ocean-400 mx-auto rounded-full" />
        </div>

        {/* Alur Proses */}
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-ocean-800 mb-10"
        >
          Alur Pengajuan yang Mudah & Cepat
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {proses.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/80 border border-ocean-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-ocean-100 rounded-full mb-4">
                {step.icon}
              </div>
              <h4 className="font-semibold text-ocean-800 mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative blur */}
      <div className="absolute -top-20 left-0 w-72 h-72 bg-ocean-300/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-ocean-400/20 rounded-full blur-3xl -z-10" />
    </section>
  );
}
