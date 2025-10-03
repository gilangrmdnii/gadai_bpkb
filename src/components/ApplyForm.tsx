"use client";
import { useState } from "react";
import { User, Phone, Car, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function ApplyForm() {
  const [form, setForm] = useState({ nama: "", hp: "", kendaraan: "", jumlah: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const nextErrors: { [k: string]: string } = {};
    if (!form.nama.trim()) nextErrors.nama = "Nama wajib diisi";
    if (!/^\+?\d{9,15}$/.test(form.hp.replace(/\s|-/g, ""))) nextErrors.hp = "Nomor HP tidak valid";
    if (!form.kendaraan.trim()) nextErrors.kendaraan = "Jenis kendaraan wajib diisi";
    if (!Number(form.jumlah) || Number(form.jumlah) <= 0) nextErrors.jumlah = "Jumlah harus lebih dari 0";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      // 1. Simpan ke Google Sheets
      const resp = await fetch("https://script.google.com/macros/s/XXXXXX/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await resp.json();

      if (result.result === "success") {
        // 2. Kirim ke WhatsApp
        const pesan = `Halo, saya ingin mengajukan pinjaman.\nNama: ${form.nama}\nHP: ${form.hp}\nKendaraan: ${form.kendaraan}\nJumlah: Rp ${form.jumlah}`;
        window.open(`https://wa.me/628119274006?text=${encodeURIComponent(pesan)}`, "_blank");

        // 3. Reset form
        setForm({ nama: "", hp: "", kendaraan: "", jumlah: "" });
      } else {
        alert("⚠️ Gagal menyimpan data ke Google Sheets");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Terjadi error jaringan!");
    }
  };


  const fields = [
    { key: "nama", label: "Nama Lengkap", placeholder: "Nama sesuai KTP", icon: <User className="w-6 h-6 text-ocean-600" /> },
    { key: "hp", label: "No. HP / WhatsApp", placeholder: "08xxxxxxxxxx", icon: <Phone className="w-6 h-6 text-ocean-600" /> },
    { key: "kendaraan", label: "Jenis Kendaraan", placeholder: "Mobil / Motor", icon: <Car className="w-6 h-6 text-ocean-600" /> },
    { key: "jumlah", label: "Jumlah Pinjaman", placeholder: "contoh: 15000000", icon: <DollarSign className="w-6 h-6 text-ocean-600" /> },
  ];

  return (
    <section id="apply" className="relative py-24 bg-gradient-to-br from-ocean-50 to-white">
      <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-6">

        {/* Kolom Kiri - Ilustrasi */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <div className="relative w-full max-w-md mx-auto">
            <img
              src="/images/form.png"
              alt="Loan Illustration"
              className="w-full drop-shadow-2xl"
            />
            {/* Decorative circle glow */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-ocean-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -right-10 w-52 h-52 bg-ocean-400/20 rounded-full blur-3xl" />
          </div>
          <h4 className="mt-8 text-2xl font-semibold text-ocean-700 leading-snug max-w-sm">
            Dapatkan dana cepat dengan <br /> jaminan BPKB kendaraan Anda
          </h4>
          <p className="mt-3 text-gray-600 max-w-sm">
            Proses mudah, transparan, dan pencairan hanya dalam hitungan jam.
          </p>
        </motion.div>

        {/* Kolom Kanan - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/90 backdrop-blur-xl border border-ocean-100 shadow-2xl rounded-3xl p-10 relative overflow-hidden"
        >
          {/* Gradient Accent */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-ocean-300/20 to-ocean-500/10 rounded-full blur-3xl" />

          <h3 className="text-3xl font-bold text-ocean-700 mb-8 relative z-10">
            Form Pengajuan Pinjaman
          </h3>

          <div className="grid gap-5 relative z-10">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-ocean-500 transition">
                  {f.icon}
                  <input
                    type={f.key === "jumlah" ? "number" : "text"}
                    name={f.key}
                    placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={handleChange}
                    className="flex-1 bg-transparent outline-none text-gray-700"
                  />
                </label>
                {errors[f.key] && <p className="text-sm text-red-600 mt-1">{errors[f.key]}</p>}
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-gradient-to-r from-ocean-600 to-ocean-700 text-white py-4 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition"
          >
            🚀 Ajukan via WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  );
}
