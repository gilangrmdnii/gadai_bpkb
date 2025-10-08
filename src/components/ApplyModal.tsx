"use client";
import { motion, AnimatePresence } from "framer-motion";
import ApplyFormFields from "./ApplyFormFields";

export default function ApplyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          {/* Kontainer modal */}
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="
              relative bg-white rounded-3xl shadow-2xl w-full max-w-lg
              p-5 sm:p-8
              overflow-y-auto border border-ocean-100
              scroll-smooth flex flex-col justify-start
              max-h-[90vh] sm:max-h-[90vh]
              min-h-[80vh] sm:min-h-fit
              pt-[calc(env(safe-area-inset-top)+1rem)]
              pb-[calc(env(safe-area-inset-bottom)+1rem)]
              [@supports(height:100dvh)]:min-h-[100dvh]
            "
          >
            {/* Tombol close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-500 hover:text-ocean-700 transition"
            >
              ✕
            </button>

            {/* Logo header */}
            <div className="flex justify-center mb-4 mt-1 sm:mt-0">
              <motion.img
                src="/images/174707070.png"
                alt="Ajukan Gadai BPKB"
                className="w-28 sm:w-32 h-auto drop-shadow-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
            </div>

            {/* Judul */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-xl sm:text-2xl font-bold text-ocean-700 mb-5 text-center"
            >
              Form Pengajuan Pinjaman
            </motion.h3>

            {/* Isi Form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex-1 overflow-y-auto px-1"
            >
              <ApplyFormFields compact />
            </motion.div>

            {/* Footer teks */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-gray-400 text-center mt-4 text-xs sm:text-sm"
            >
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/SSL-removebg-preview.png"
                    alt="Keamanan Terjamin SSL Secure"
                    className="h-10 sm:h-12 md:h-14 object-contain"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src="/images/sectigo-removebg-preview.png"
                    alt="Keamanan Terjamin Sectigo Secure"
                    className="h-10 sm:h-12 md:h-14 object-contain"
                  />
                </div>
              </div>

              <p className="text-gray-400 text-center mt-2 text-xs">
                *Keamanan dan Kerahasiaan data Anda prioritas kami*
              </p>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
