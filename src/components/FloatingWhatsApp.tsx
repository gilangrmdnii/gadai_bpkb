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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white py-3 pl-4 pr-5 rounded-full shadow-lg shadow-green-600/30 transition-all duration-300"
    >
      <MessageCircle size={26} className="text-white" />
      <span className="font-semibold text-white text-sm md:text-base">Tanya Garasi</span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
