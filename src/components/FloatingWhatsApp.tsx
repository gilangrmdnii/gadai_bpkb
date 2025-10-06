"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ApplyModal from "./ApplyModal"; // pastikan sudah ada file ApplyModal.tsx seperti sebelumnya

export default function FloatingWhatsApp() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* Tombol Mengambang */}
      <motion.button
        onClick={() => setOpenModal(true)}
        // animasi goyang ringan
        animate={{
          rotate: [0, -15, 15, -10, 10, 0],
          y: [0, -2, 2, -3, 3, -2, 2, 0],
          scale: [1, 1.05, 1, 1.05, 1],
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0,
        }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-ocean-600 hover:bg-ocean-700 text-white py-3 pl-4 pr-5 rounded-full shadow-xl shadow-ocean-700/40 transition-all duration-300"
      >
        <MessageCircle size={28} className="text-white drop-shadow-md" />
        <span className="font-semibold text-white text-sm md:text-base">
          Tanya Garasi
        </span>
      </motion.button>

      {/* Modal Apply */}
      <ApplyModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
