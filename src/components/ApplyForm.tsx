"use client";
import { useState } from "react";
import { User, Phone, Car, MapPin, Hash, Calendar, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ApplyForm() {
  const [form, setForm] = useState({
    nama: "",
    hp: "",
    alamat: "",
    wilayah: "",
    kendaraan: "",
    merk: "",
    plat: "",
    tahun: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Dropdown options
  const kendaraanOptions = [
    { value: "", label: "Pilih Jenis Kendaraan" },
    { value: "Mobil", label: "Mobil" },
    { value: "Motor", label: "Motor" },
  ];

  const tahunOptions = (() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    years.push({ value: "", label: "Pilih Tahun Kendaraan" });
    for (let y = currentYear; y >= 2005; y--) {
      years.push({ value: y.toString(), label: y.toString() });
    }
    return years;
  })();

  const validateForm = () => {
    const nextErrors: { [k: string]: string } = {};
    if (!form.nama.trim()) nextErrors.nama = "Nama wajib diisi";
    if (!/^\+?\d{9,15}$/.test(form.hp.replace(/\s|-/g, "")))
      nextErrors.hp = "Nomor HP tidak valid";
    if (!form.alamat.trim()) nextErrors.alamat = "Alamat wajib diisi";
    if (!form.wilayah.trim()) nextErrors.wilayah = "Kelurahan/Kecamatan/Kota wajib diisi";
    if (!form.kendaraan.trim()) nextErrors.kendaraan = "Jenis kendaraan wajib dipilih";
    if (!form.merk.trim()) nextErrors.merk = "Merk & tipe wajib diisi";
    if (!form.plat.trim()) nextErrors.plat = "Plat nomor wajib diisi";
    if (!form.tahun.trim() || isNaN(Number(form.tahun)))
      nextErrors.tahun = "Tahun kendaraan tidak valid";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    setShowModal(false);
    try {
      const resp = await fetch("https://script.google.com/macros/s/AKfycbwnnOqH5mUKj1nWcQ6_rzkbA2nxJi4kq6txyRHiyySIMLAJthOvGanyoOaASJhwr2Tt/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await resp.json();

      if (result.result === "success") {
        const pesan = `Halo, saya ingin mengajukan pinjaman.\nNama: ${form.nama}\nHP: ${form.hp}\nAlamat: ${form.alamat}\nWilayah: ${form.wilayah}\nJenis Kendaraan: ${form.kendaraan}\nMerk & Type: ${form.merk}\nPlat Nomor: ${form.plat}\nTahun: ${form.tahun}`;
        window.open(`https://wa.me/628119274006?text=${encodeURIComponent(pesan)}`, "_blank");

        setForm({
          nama: "",
          hp: "",
          alamat: "",
          wilayah: "",
          kendaraan: "",
          merk: "",
          plat: "",
          tahun: "",
        });
      } else {
        alert("⚠️ Gagal menyimpan data ke Google Sheets");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Terjadi error jaringan!");
    }
  };

  return (
    <section id="apply" className="relative py-24 bg-gradient-to-br from-ocean-50 to-white">
      <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-6">
        {/* Kolom Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <div className="relative w-full max-w-md mx-auto">
            <img
              src="/images/gadeterdekat.png"
              alt="Loan Illustration"
              className="w-full drop-shadow-2xl scale-180 -translate-x-4 transition-transform duration-500"
            />
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
          <h3 className="text-3xl font-bold text-ocean-700 mb-8 relative z-10">Form Pengajuan Pinjaman</h3>

          <div className="grid gap-5 relative z-10">
            {/* Nama */}
            <InputField
              icon={<User className="w-6 h-6 text-ocean-600" />}
              name="nama"
              placeholder="Masukkan Nama Lengkap"
              value={form.nama}
              onChange={handleChange}
              error={errors.nama}
            />

            {/* HP */}
            <InputField
              icon={<Phone className="w-6 h-6 text-ocean-600" />}
              name="hp"
              placeholder="08xxxxxxxxxx"
              value={form.hp}
              onChange={handleChange}
              error={errors.hp}
            />

            {/* Alamat */}
            <InputField
              icon={<MapPin className="w-6 h-6 text-ocean-600" />}
              name="alamat"
              placeholder="Alamat lengkap"
              value={form.alamat}
              onChange={handleChange}
              error={errors.alamat}
            />

            {/* Wilayah */}
            <InputField
              icon={<MapPin className="w-6 h-6 text-ocean-600" />}
              name="wilayah"
              placeholder="Kelurahan, Kecamatan, Kota"
              value={form.wilayah}
              onChange={handleChange}
              error={errors.wilayah}
            />

            {/* Jenis Kendaraan */}
            <SelectField
              icon={<Car className="w-6 h-6 text-ocean-600" />}
              name="kendaraan"
              options={kendaraanOptions}
              value={form.kendaraan}
              onChange={handleChange}
              error={errors.kendaraan}
            />

            {/* Merk */}
            <InputField
              icon={<FileText className="w-6 h-6 text-ocean-600" />}
              name="merk"
              placeholder="Contoh: Toyota Avanza"
              value={form.merk}
              onChange={handleChange}
              error={errors.merk}
            />

            {/* Plat */}
            <InputField
              icon={<Hash className="w-6 h-6 text-ocean-600" />}
              name="plat"
              placeholder="Contoh: B 1234 ABC"
              value={form.plat}
              onChange={handleChange}
              error={errors.plat}
            />

            {/* Tahun */}
            <SelectField
              icon={<Calendar className="w-6 h-6 text-ocean-600" />}
              name="tahun"
              options={tahunOptions}
              value={form.tahun}
              onChange={handleChange}
              error={errors.tahun}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-gradient-to-r from-ocean-600 to-ocean-700 text-white py-4 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition"
          >
            🚀 Ajukan via WhatsApp
          </button>
        </motion.div>
      </div>

      {/* Modal Konfirmasi */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h4 className="text-xl font-bold text-ocean-700 mb-4">Konfirmasi Data</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li><strong>Nama:</strong> {form.nama}</li>
                <li><strong>No. HP:</strong> {form.hp}</li>
                <li><strong>Alamat:</strong> {form.alamat}</li>
                <li><strong>Wilayah:</strong> {form.wilayah}</li>
                <li><strong>Jenis Kendaraan:</strong> {form.kendaraan}</li>
                <li><strong>Merk & Tipe:</strong> {form.merk}</li>
                <li><strong>Plat Nomor:</strong> {form.plat}</li>
                <li><strong>Tahun:</strong> {form.tahun}</li>
              </ul>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-lg border text-gray-600 border-gray-300 hover:bg-gray-100 transition"
                >
                  ✏️ Koreksi
                </button>
                <button
                  onClick={confirmSubmit}
                  className="flex-1 py-3 rounded-lg bg-ocean-600 text-white hover:bg-ocean-700 transition"
                >
                  ✅ Konfirmasi & Kirim
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ✅ Komponen Input dan Select terpisah untuk rapih
function InputField({ icon, name, placeholder, value, onChange, error }: any) {
  return (
    <div>
      <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-ocean-500 transition">
        {icon}
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none text-gray-700"
        />
      </label>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ icon, name, options, value, onChange, error }: any) {
  return (
    <div>
      <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-ocean-500 transition">
        {icon}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none text-gray-700"
        >
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
