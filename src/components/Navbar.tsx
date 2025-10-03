"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 
        ${scrolled ? "bg-white/95 shadow-md" : "bg-white/70 shadow-sm"} 
        backdrop-blur-xl border-b border-black/5 transition-all duration-300`}
    >
      <div className={`container flex items-center justify-between ${scrolled ? "py-3" : "py-4"}`}>
        
        {/* Logo pakai PNG */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/images/logo_landscape.png" 
            alt="GadaiBPKB Logo" 
            width={40} 
            height={40} 
            priority
            className="w-25 h-10 object-contain"
          />
          {/* <span className="hidden md:inline-block text-xl font-extrabold text-ocean-700">
            GadaiBPKB
          </span> */}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          {["Keunggulan", "Fitur", "FAQ", "Kontak"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="relative hover:text-ocean-700 transition group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-ocean-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Button */}
        <div className="flex items-center gap-3">
          <Link 
            href="#apply" 
            className="hidden sm:inline-flex bg-ocean-600 text-white px-5 py-2 rounded-xl hover:bg-ocean-700 transition shadow-md font-medium"
          >
            Ajukan Sekarang
          </Link>

          {/* Hamburger Button */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/70 border border-black/5 relative"
          >
            <motion.div
              animate={open ? "open" : "closed"}
              className="w-5 h-5 relative"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: -6 },
                  open: { rotate: 45, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 w-5 h-0.5 bg-gray-800"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-2 w-5 h-0.5 bg-gray-800"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 6 },
                  open: { rotate: -45, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 w-5 h-0.5 bg-gray-800"
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div 
          initial={{ opacity: 0, y: -8 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur-xl"
        >
          <div className="container py-4 flex flex-col gap-3 text-gray-800">
            {["Keunggulan", "Fitur", "FAQ", "Kontak"].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setOpen(false)} 
                className="py-2 hover:text-ocean-700 transition"
              >
                {item}
              </Link>
            ))}
            <Link 
              href="#apply" 
              onClick={() => setOpen(false)} 
              className="mt-2 inline-flex bg-ocean-600 text-white px-5 py-2 rounded-xl hover:bg-ocean-700 transition shadow-md font-medium"
            >
              Ajukan Sekarang
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
