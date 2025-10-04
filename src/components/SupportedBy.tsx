"use client";

import Image from "next/image";

export default function SupportedBy() {
  const logos = [
    { src: "/images/ppi.png", alt: "PPI" },
    { src: "/images/bankbri.svg", alt: "Taro Logo" },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-ocean-50 to-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-semibold text-ocean-800 mb-10">
          DIawasi oleh 
        </h2>

        {/* Logo wrapper */}
        <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center p-6 bg-white/80 backdrop-blur-sm border border-ocean-100 shadow-lg rounded-2xl hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dekorasi lembut */}
      <div className="absolute -top-20 left-0 w-64 h-64 bg-ocean-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-ocean-400/20 rounded-full blur-3xl -z-10" />
    </section>
  );
}
