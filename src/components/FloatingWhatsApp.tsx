"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const whatsappNumber = "628119274006";
  const message = "Halo, saya ingin menanyakan tentang layanan gadai BPKB.";

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      // seluruh tombol goyang tanpa jeda
      animate={{
        rotate: [0, -20, 20, -15, 15, -10, 10, 0],
        y: [0, -2, 2, -3, 3, -2, 2, 0],
        scale: [1, 1.05, 1, 1.05, 1],
      }}
      transition={{
        duration: 0.9, // cepat dan konstan
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0, // TANPA jeda
      }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white py-3 pl-4 pr-5 rounded-full shadow-xl shadow-green-600/40 transition-all duration-300"
    >
      <MessageCircle size={32} className="text-white drop-shadow-md" />
      <span className="font-semibold text-white text-sm md:text-base">
        Tanya Garasi
      </span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
