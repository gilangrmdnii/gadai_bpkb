"use client";
import { useState, useEffect, useMemo } from "react";
import { User, Phone, Car, Calendar, FileText, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ApplyForm() {
  const [form, setForm] = useState({
    namaLengkap: "",
    noHP: "",
    alamat: "",
    provinsi: "",
    kota: "",
    jenisKendaraan: "",
    tipeKendaraan: "",
    tahunKendaraan: "",
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [provinsiList, setProvinsiList] = useState<any[]>([]);
  const [kotaList, setKotaList] = useState<any[]>([]);

  // Ambil daftar provinsi
  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then(res => res.json())
      .then(setProvinsiList)
      .catch(console.error);
  }, []);

  // Ambil daftar kota sesuai provinsi
  useEffect(() => {
    if (!form.provinsi) return;
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${form.provinsi}.json`)
      .then(res => res.json())
      .then(setKotaList)
      .catch(console.error);
  }, [form.provinsi]);

  const jenisKendaraanOptions = [
    { value: "", label: "Pilih Jenis Kendaraan" },
    { value: "Mobil", label: "Mobil" },
    { value: "Motor", label: "Motor" },
  ];

  const tahunKendaraanOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [{ value: "", label: "Pilih Tahun Kendaraan" }];
    for (let y = currentYear; y >= 2005; y--) {
      years.push({ value: y.toString(), label: y.toString() });
    }
    return years;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const nextErrors: { [k: string]: string } = {};
    if (!form.namaLengkap.trim()) nextErrors.namaLengkap = "Nama wajib diisi";
    if (!/^\+?\d{9,15}$/.test(form.noHP.replace(/\s|-/g, "")))
      nextErrors.noHp = "Nomor HP tidak valid";
    if (!form.alamat.trim()) nextErrors.alamat = "Alamat wajib diisi";
    if (!form.provinsi.trim()) nextErrors.provinsi = "Provinsi wajib dipilih";
    if (!form.kota.trim()) nextErrors.kota = "Kota wajib dipilih";
    if (!form.jenisKendaraan.trim()) nextErrors.jenisKendaraan = "Jenis kendaraan wajib dipilih";
    if (!form.tipeKendaraan.trim()) nextErrors.tipeKendaraan = "Tipe kendaraan wajib diisi";
    if (!form.tahunKendaraan.trim() || isNaN(Number(form.tahunKendaraan)))
      nextErrors.tahunKendaraan = "Tahun kendaraan tidak valid";

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
      const provName = provinsiList.find(p => p.id === form.provinsi)?.name || "";
      const kotaName = kotaList.find(k => k.id === form.kota)?.name || "";
      const alamatGabung = `${form.alamat}, ${kotaName}, ${provName}`;

      const payload = {
        namaLengkap: form.namaLengkap,
        noHP: form.noHP,
        alamat: alamatGabung,
        jenisKendaraan: form.jenisKendaraan,
        tipeKendaraan: form.tipeKendaraan,
        tahunKendaraan: form.tahunKendaraan,
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.result === "success") {
        if (!form.noHP.trim()) {
          alert("❌ Nomor WA wajib diisi!");
          return;
        }

        // Hapus semua non-digit
        let nomorWA = form.noHP.replace(/\D/g, "");

        // Tambahkan prefix 62
        if (nomorWA.startsWith("0")) {
          nomorWA = "62" + nomorWA.substring(1);
        } else if (!nomorWA.startsWith("62")) {
          nomorWA = "62" + nomorWA;
        }

        // Validasi panjang nomor WA (minimal 10 digit setelah kode negara)
        const panjangNomor = nomorWA.length;
        if (panjangNomor < 11 || panjangNomor > 15) {
          alert("❌ Nomor WA tidak valid. Pastikan minimal 10 digit setelah kode negara.");
          return;
        }

        const pesan = `Halo, saya ingin mengajukan pinjaman.\n\n📋 DATA PEMOHON:\n• Nama: ${form.namaLengkap}\n• HP: ${form.noHP}\n• Alamat: ${alamatGabung}\n\n🚗 DATA KENDARAAN:\n• Jenis: ${form.jenisKendaraan}\n• Tipe: ${form.tipeKendaraan}\n• Tahun: ${form.tahunKendaraan}`;

        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, "_blank");

        setForm({
          namaLengkap: "",
          noHP: "",
          alamat: "",
          provinsi: "",
          kota: "",
          jenisKendaraan: "",
          tipeKendaraan: "",
          tahunKendaraan: "",
        });
      } else {
        throw new Error(result.message || "Gagal menyimpan data");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Gagal mengirim data. Periksa koneksi internet Anda.");
    }
  };

  return (
    <section id="apply" className="relative py-24 bg-gradient-to-br from-ocean-50 to-white">
      <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center justify-items-center px-4 sm:px-6">
        {/* Kolom kiri */}
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="relative w-full max-w-md mx-auto">
            <img src="/images/asset_gadai.png" alt="form pengajuan gadai bpkb" className="w-full drop-shadow-2xl scale-110" />
          </div>
          <h4 className="mt-8 text-2xl font-semibold text-ocean-700 leading-snug max-w-sm">
            Dapatkan dana cepat dengan jaminan BPKB kendaraan Anda
          </h4>
          <p className="mt-3 text-gray-600 max-w-sm">Proses mudah, transparan, dan pencairan hanya dalam hitungan jam.</p>
        </motion.div>

        {/* Kolom kanan */}
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="bg-white/90 backdrop-blur-xl border border-ocean-100 shadow-2xl rounded-3xl p-10">
          <h3 className="text-3xl font-bold text-ocean-700 mb-8">Form Pengajuan Pinjaman</h3>

          <div className="grid gap-5">
            <InputField icon={<User />} name="namaLengkap" placeholder="Nama Lengkap" value={form.namaLengkap} onChange={handleChange} error={errors.namaLengkap} />
            <InputField icon={<Phone />} name="noHP" placeholder="No Handphone / Whatsapp" value={form.noHP} onChange={handleChange} error={errors.noHP} />
            <InputField icon={<MapPin />} name="alamat" placeholder="Alamat lengkap (tanpa kota)" value={form.alamat} onChange={handleChange} error={errors.alamat} />
            <SelectField icon={<MapPin />} name="provinsi" options={[{ value: "", label: "Pilih Provinsi" }, ...provinsiList.map(p => ({ value: p.id, label: p.name }))]} value={form.provinsi} onChange={handleChange} error={errors.provinsi} />
            <SelectField icon={<MapPin />} name="kota" options={[{ value: "", label: "Pilih Kota" }, ...kotaList.map(k => ({ value: k.id, label: k.name }))]} value={form.kota} onChange={handleChange} error={errors.kota} />
            <SelectField icon={<Car />} name="jenisKendaraan" options={jenisKendaraanOptions} value={form.jenisKendaraan} onChange={handleChange} error={errors.jenisKendaraan} />
            <InputField icon={<FileText />} name="tipeKendaraan" placeholder="Tipe Kendaraan" value={form.tipeKendaraan} onChange={handleChange} error={errors.tipeKendaraan} />
            <SelectField icon={<Calendar />} name="tahunKendaraan" options={tahunKendaraanOptions} value={form.tahunKendaraan} onChange={handleChange} error={errors.tahunKendaraan} />
          </div>

          <button onClick={handleSubmit} className="mt-8 w-full bg-gradient-to-r from-ocean-600 to-ocean-700 text-white py-4 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition">
            🚀 Ajukan
          </button>
          <p className="text-gray-400 text-center mt-2">*Kerahasiaan data Anda terjamin*</p>
        </motion.div>
      </div>

      {/* Modal Konfirmasi */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <h4 className="text-xl font-bold text-ocean-700 mb-4">Konfirmasi Data</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li><strong>Nama:</strong> {form.namaLengkap}</li>
                <li><strong>No. HP:</strong> {form.noHP}</li>
                <li><strong>Alamat:</strong> {form.alamat}</li>
                <li><strong>Provinsi:</strong> {provinsiList.find(p => p.id === form.provinsi)?.name}</li>
                <li><strong>Kota:</strong> {kotaList.find(k => k.id === form.kota)?.name}</li>
                <li><strong>Jenis Kendaraan:</strong> {form.jenisKendaraan}</li>
                <li><strong>Tipe Kendaraan:</strong> {form.tipeKendaraan}</li>
                <li><strong>Tahun:</strong> {form.tahunKendaraan}</li>
              </ul>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100">✏️ Koreksi</button>
                <button onClick={confirmSubmit} className="flex-1 py-3 rounded-lg bg-ocean-600 text-white hover:bg-ocean-700">✅ Konfirmasi & Kirim</button>
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
      <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-ocean-500 transition w-full">
        <span className="text-ocean-600">{icon}</span>
        <input type="text" name={name} placeholder={placeholder} value={value} onChange={onChange} className="flex-1 bg-transparent outline-none text-gray-700 text-sm sm:text-base" />
      </label>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ icon, name, options, value, onChange, error }: any) {
  return (
    <div>
      <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-ocean-500 transition w-full">
        <span className="text-ocean-600">{icon}</span>
        <select name={name} value={value} onChange={onChange} className="flex-1 bg-transparent outline-none text-gray-700 text-sm sm:text-base">
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
