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
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
                >
                    <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-6 sm:p-8"
                    >
                        {/* Tombol close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>

                        {/* Logo header */}
                        <div className="flex justify-center mb-6">
                            <img
                                src="images/174707070.png"
                                alt="Ajukan Gadai BPKB"
                                className="w-42 h-auto"
                            />
                        </div>
                        <div className="flex justify-center">
                            <h3 className="text-2xl sm:text-3xl font-bold text-ocean-700 mb-6 text-center lg:text-left">
                                Form Pengajuan Pinjaman
                            </h3>
                        </div>

                        {/* Form isi */}
                        <ApplyFormFields compact />
                        <p className="text-gray-400 text-center mt-2">
                            *Kerahasiaan data Anda prioritas kami*
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
