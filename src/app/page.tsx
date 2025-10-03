import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import ApplyForm from "@/components/ApplyForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="font-sans relative z-0 bg-white min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <WhyUs />
      <Features />
      <FAQ />
      {/* Apply & CTA */}
      <ApplyForm />
      <CTA />
      <Footer />
    </main>
  );
}
