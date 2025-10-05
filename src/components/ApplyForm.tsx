"use client";
import { useState, useEffect, useMemo } from "react";
import { User, Phone, Car, MapPin, Hash, Calendar, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ApplyForm() {
  const [form, setForm] = useState({
    namaLengkap: "",
    noHp: "",
    alamat: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
    jenisKendaraan: "",
    tipeKendaraan: "",
    platNomor: "",
    tahunKendaraan: "",
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [showModal, setShowModal] = useState(false);

  // ✅ DATA API WILAYAH
  const [provinsiList, setProvinsiList] = useState<any[]>([]);
  const [kotaList, setKotaList] = useState<any[]>([]);
  const [kecamatanList, setKecamatanList] = useState<any[]>([]);

  // --- Ambil Provinsi ---
  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then(res => res.json())
      .then(setProvinsiList)
      .catch(console.error);
  }, []);

  // --- Ambil Kota sesuai Provinsi ---
  useEffect(() => {
    if (!form.provinsi) return;
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${form.provinsi}.json`)
      .then(res => res.json())
      .then(setKotaList)
      .catch(console.error);
  }, [form.provinsi]);

  // --- Ambil Kecamatan sesuai Kota ---
  useEffect(() => {
    if (!form.kota) return;
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${form.kota}.json`)
      .then(res => res.json())
      .then(setKecamatanList)
      .catch(console.error);
  }, [form.kota]);

  // ✅ Dropdown kendaraan
  const jenisKendaraanOptions = [
    { value: "", label: "Pilih Jenis Kendaraan" },
    { value: "Mobil", label: "Mobil" },
    { value: "Motor", label: "Motor" },
  ];

  // ✅ Tahun kendaraan dinamis
  const tahunKendaraanOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [{ value: "", label: "Pilih Tahun Kendaraan" }];
    const startYear = form.jenisKendaraan === "Mobil" ? 2006 : form.jenisKendaraan === "Motor" ? 2016 : 2005;
    for (let y = currentYear; y >= startYear; y--) {
      years.push({ value: y.toString(), label: y.toString() });
    }
    return years;
  }, [form.jenisKendaraan]);

  // ✅ Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validasi
  const validateForm = () => {
    const nextErrors: { [k: string]: string } = {};
    if (!form.namaLengkap.trim()) nextErrors.namaLengkap = "Nama wajib diisi";
    if (!/^\+?\d{9,15}$/.test(form.noHp.replace(/\s|-/g, "")))
      nextErrors.noHp = "Nomor HP tidak valid";
    if (!form.alamat.trim()) nextErrors.alamat = "Alamat wajib diisi";
    if (!form.provinsi.trim()) nextErrors.provinsi = "Provinsi wajib dipilih";
    if (!form.kota.trim()) nextErrors.kota = "Kota wajib dipilih";
    if (!form.kecamatan.trim()) nextErrors.kecamatan = "Kecamatan wajib dipilih";
    if (!form.jenisKendaraan.trim()) nextErrors.jenisKendaraan = "Jenis kendaraan wajib dipilih";
    if (!form.tipeKendaraan.trim()) nextErrors.tipeKendaraan = "Merk & tipe wajib diisi";
    if (!form.platNomor.trim()) nextErrors.platNomor = "Plat nomor wajib diisi";
    if (!form.tahunKendaraan.trim() || isNaN(Number(form.tahunKendaraan)))
      nextErrors.tahunKendaraan = "Tahun kendaraan tidak valid";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // ✅ Submit
  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    setShowModal(false);
    try {
      const resp = await fetch(
        "https://script.google.com/macros/s/AKfycbyMsAAj7LlycSZ7152bfiohzALykSaH3GJDHTMqCGiAOW21b1k6gZEzKA1Jpgqs5fp5/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const result = await resp.json();
      if (result.result === "success") {
        const pesan = `Halo, saya ingin mengajukan pinjaman.\nNama: ${form.namaLengkap}\nHP: ${form.noHp}\nAlamat: ${form.alamat}\nProvinsi: ${form.provinsi}\nKota: ${form.kota}\nKecamatan: ${form.kecamatan}\nJenis Kendaraan: ${form.jenisKendaraan}\nTipe: ${form.tipeKendaraan}\nPlat: ${form.platNomor}\nTahun: ${form.tahunKendaraan}`;
        window.open(`https://wa.me/628119274006?text=${encodeURIComponent(pesan)}`, "_blank");
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
      <div className="container max-w-8xl mx-auto grid lg:grid-cols-2 gap-16 items-center justify-items-center px-4 sm:px-6">
        {/* Kolom Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <div className="relative w-full max-w-md mx-auto">
            <img
              src="/images/asset_gadai.png"
              alt="form pengajuan gadai bpkb"
              className="w-full drop-shadow-2xl scale-110 
               translate-x-0 sm:-translate-x-2 md:-translate-x-3 lg:-translate-x-6 
               transition-transform duration-500"
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

        {/* Kolom Kanan */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/90 backdrop-blur-xl border border-ocean-100 shadow-2xl rounded-3xl p-10 relative overflow-hidden"
        >
          <h3 className="text-3xl font-bold text-ocean-700 mb-8 relative z-10">Form Pengajuan Pinjaman</h3>

          <div className="grid gap-5 relative z-10">
            <InputField icon={<User className="w-6 h-6 text-ocean-600" />} name="namaLengkap" placeholder="Masukkan Nama Lengkap" value={form.namaLengkap} onChange={handleChange} error={errors.namaLengkap} />
            <InputField icon={<Phone className="w-6 h-6 text-ocean-600" />} name="noHp" placeholder="08xxxxxxxxxx" value={form.noHp} onChange={handleChange} error={errors.noHp} />
            <InputField icon={<MapPin className="w-6 h-6 text-ocean-600" />} name="alamat" placeholder="Alamat lengkap" value={form.alamat} onChange={handleChange} error={errors.alamat} />

            <SelectField icon={<MapPin className="w-6 h-6 text-ocean-600" />} name="provinsi" value={form.provinsi} onChange={handleChange} options={[{ value: "", label: "Pilih Provinsi" }, ...provinsiList.map(p => ({ value: p.id, label: p.name }))]} error={errors.provinsi} />
            <SelectField icon={<MapPin className="w-6 h-6 text-ocean-600" />} name="kota" value={form.kota} onChange={handleChange} options={[{ value: "", label: "Pilih Kota" }, ...kotaList.map(k => ({ value: k.id, label: k.name }))]} error={errors.kota} />
            <SelectField icon={<MapPin className="w-6 h-6 text-ocean-600" />} name="kecamatan" value={form.kecamatan} onChange={handleChange} options={[{ value: "", label: "Pilih Kecamatan" }, ...kecamatanList.map(k => ({ value: k.id, label: k.name }))]} error={errors.kecamatan} />

            <SelectField icon={<Car className="w-6 h-6 text-ocean-600" />} name="jenisKendaraan" options={jenisKendaraanOptions} value={form.jenisKendaraan} onChange={handleChange} error={errors.jenisKendaraan} />
            <InputField icon={<FileText className="w-6 h-6 text-ocean-600" />} name="tipeKendaraan" placeholder="Contoh: Toyota Avanza G" value={form.tipeKendaraan} onChange={handleChange} error={errors.tipeKendaraan} />
            <InputField icon={<Hash className="w-6 h-6 text-ocean-600" />} name="platNomor" placeholder="Contoh: B 1234 ABC" value={form.platNomor} onChange={handleChange} error={errors.platNomor} />
            <SelectField icon={<Calendar className="w-6 h-6 text-ocean-600" />} name="tahunKendaraan" options={tahunKendaraanOptions} value={form.tahunKendaraan} onChange={handleChange} error={errors.tahunKendaraan} />
          </div>

          <button onClick={handleSubmit} className="mt-8 w-full bg-gradient-to-r from-ocean-600 to-ocean-700 text-white py-4 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition">
            🚀 Ajukan
          </button>

          <p className="text-gray-400 text-center mt-2">
            *kerahasiaan data adalah prioritas kami*
          </p>
        </motion.div>
      </div>

      {/* Modal Konfirmasi */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <h4 className="text-xl font-bold text-ocean-700 mb-4">Konfirmasi Data</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li><strong>Nama:</strong> {form.namaLengkap}</li>
                <li><strong>No. HP:</strong> {form.noHp}</li>
                <li><strong>Alamat:</strong> {form.alamat}</li>
                <li><strong>Provinsi:</strong> {form.provinsi}</li>
                <li><strong>Kota:</strong> {form.kota}</li>
                <li><strong>Kecamatan:</strong> {form.kecamatan}</li>
                <li><strong>Jenis Kendaraan:</strong> {form.jenisKendaraan}</li>
                <li><strong>Tipe:</strong> {form.tipeKendaraan}</li>
                <li><strong>Plat:</strong> {form.platNomor}</li>
                <li><strong>Tahun:</strong> {form.tahunKendaraan}</li>
              </ul>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-lg border text-gray-600 border-gray-300 hover:bg-gray-100 transition">
                  ✏️ Koreksi
                </button>
                <button onClick={confirmSubmit} className="flex-1 py-3 rounded-lg bg-ocean-600 text-white hover:bg-ocean-700 transition">
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

/* ===========================
   Komponen Reusable
=========================== */
function InputField({ icon, name, placeholder, value, onChange, error }: any) {
  return (
    <div>
      <label
        className="
          flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 
          shadow-sm focus-within:ring-2 focus-within:ring-ocean-500 transition
          w-full
        "
      >
        <span className="flex-shrink-0 text-ocean-600">
          {icon}
        </span>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            flex-1 bg-transparent outline-none text-gray-700 
            text-sm sm:text-base 
            min-w-0
          "
        />
      </label>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ icon, name, options, value, onChange, error }: any) {
  return (
    <div>
      <label
        className="
          flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 
          shadow-sm focus-within:ring-2 focus-within:ring-ocean-500 transition
          w-full
        "
      >
        <span className="flex-shrink-0 text-ocean-600">
          {icon}
        </span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="
            flex-1 bg-transparent outline-none text-gray-700 
            text-sm sm:text-base 
            min-w-0
          "
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

