"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { label: "Beranda", href: "#beranda" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Ajukan", href: "#apply" },
    { label: "Fitur", href: "#fitur" },
    { label: "Testimoni", href: "#testimoni" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b border-black/5 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-lg" : "bg-white/70"
      }`}
    >
      <div className={`container flex items-center justify-between ${scrolled ? "py-2.5" : "py-3.5"}`}>
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-[200px] h-[50px] md:w-[220px] md:h-[55px]">
            <Image
              src="/images/174707070.png"
              alt="GadaiBPKB Logo"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 200px, 220px"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative hover:text-ocean-700 transition group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-ocean-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="#apply"
            className="hidden sm:inline-flex bg-ocean-600 text-white px-5 py-2 rounded-lg hover:bg-ocean-700 transition shadow-md font-medium text-sm"
          >
            Ajukan Sekarang
          </Link>

          {/* Mobile Button */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 border border-black/10 shadow hover:bg-white transition"
          >
            {open ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur-xl"
        >
          <div className="container py-4 flex flex-col gap-4 text-gray-800">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium hover:text-ocean-700 transition"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#apply"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex bg-ocean-600 text-white px-5 py-2 rounded-lg hover:bg-ocean-700 transition shadow font-medium text-sm"
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
