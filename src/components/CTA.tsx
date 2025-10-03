"use client";
import { motion } from "framer-motion";
import { MessageCircle, ShieldCheck } from "lucide-react";

const CTA = () => {
  return (
    <section 
      id="cta" 
      className="relative overflow-hidden py-24 bg-gradient-to-r from-ocean-700 via-ocean-600 to-ocean-700 text-white rounded-t-3xl"
    >
      <div className="container relative z-10 text-center">
        
        {/* Headline */}
        <motion.h3 
          initial={{ y: 40, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold leading-tight"
        >
          Siap Cairkan Dana <span className="text-ocean-200">Hari Ini?</span>
        </motion.h3>
        
        {/* Subcopy */}
        <motion.p 
          initial={{ y: 40, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="mt-4 text-lg text-ocean-50 max-w-xl mx-auto"
        >
          Proses mudah, legal, dan terpercaya. Sudah lebih dari{" "}
          <span className="font-semibold text-white">500+ nasabah</span> terbantu.
        </motion.p>
        
        {/* Buttons */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-ocean-700 px-7 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Konsultasi Gratis via WhatsApp
          </a>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 border border-white/70 px-7 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
          >
            Ajukan Sekarang
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 flex items-center justify-center gap-3 text-sm text-ocean-100"
        >
          <ShieldCheck className="w-4 h-4" />
          Terdaftar & diawasi OJK
        </motion.div>
      </div>

      {/* Decorative background */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-ocean-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-ocean-300/10 rounded-full blur-2xl" />
    </section>
  );
};

export default CTA;
