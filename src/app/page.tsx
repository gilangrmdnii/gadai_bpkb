"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import ApplyForm from "@/components/ApplyForm";
import Footer from "@/components/Footer";
import SupportedBy from "@/components/SupportedBy";
import ProductGadai from "@/components/ProductGadai";
import Testimonials from "@/components/Testimonials";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import ApplyModal from "@/components/ApplyModal"; // ⬅️ Modal baru

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <main className="font-sans relative z-0 bg-white min-h-screen overflow-hidden">
      <Navbar />

      {/* Kirim handler ke Hero */}
      <Hero onOpenModal={() => setOpenModal(true)} />

      <WhyUs />
      <ApplyForm />
      <Features />
      <FAQ />

      {/* Kirim handler ke ProductGadai */}
      <ProductGadai onOpenModal={() => setOpenModal(true)} />

      <SupportedBy />
      <Testimonials />

      {/* Kirim handler ke CTA */}
      <CTA onOpenModal={() => setOpenModal(true)} />

      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />

      {/* Modal Global */}
      <ApplyModal open={openModal} onClose={() => setOpenModal(false)} />
    </main>
  );
}
