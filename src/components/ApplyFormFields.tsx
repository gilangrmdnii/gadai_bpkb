"use client";
import { useState, useEffect, useMemo } from "react";
import { User, Phone, Car, Calendar, FileText, MapPin } from "lucide-react";

export default function ApplyFormFields({ compact = false }: { compact?: boolean }) {
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
    const [provinsiList, setProvinsiList] = useState<any[]>([]);
    const [kotaList, setKotaList] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then(res => res.json())
            .then(setProvinsiList)
            .catch(console.error);
    }, []);

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
        const jenis = form.jenisKendaraan;

        let startYear = 2005;
        if (jenis === "Mobil") startYear = 2006;
        else if (jenis === "Motor") startYear = 2016;

        const years = [{ value: "", label: "Pilih Tahun Kendaraan" }];
        for (let y = currentYear; y >= startYear; y--) {
            years.push({ value: y.toString(), label: y.toString() });
        }
        return years;
    }, [form.jenisKendaraan]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;
        if (name === "noHP") value = value.replace(/\D/g, "");
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        // Validasi dasar
        if (!form.namaLengkap || !form.noHP) {
            alert("Harap isi nama dan nomor HP");
            return;
        }

        // Konfirmasi data
        const konfirmasi = window.confirm(`
Nama: ${form.namaLengkap}
No HP: ${form.noHP}
Alamat: ${form.alamat}
Provinsi: ${provinsiList.find(p => p.id === form.provinsi)?.name || "-"}
Kota: ${kotaList.find(k => k.id === form.kota)?.name || "-"}
Jenis Kendaraan: ${form.jenisKendaraan}
Tipe Kendaraan: ${form.tipeKendaraan}
Tahun: ${form.tahunKendaraan}
Apakah data sudah benar?
  `);

        if (!konfirmasi) return;

        try {
            // Gabungkan alamat lengkap
            const provName = provinsiList.find(p => p.id === form.provinsi)?.name || "";
            const kotaName = kotaList.find(k => k.id === form.kota)?.name || "";
            const alamatGabung = `${form.alamat}, ${kotaName}, ${provName}`;

            // Payload untuk backend
            const payload = {
                namaLengkap: form.namaLengkap,
                noHP: form.noHP,
                alamat: alamatGabung,
                jenisKendaraan: form.jenisKendaraan,
                tipeKendaraan: form.tipeKendaraan,
                tahunKendaraan: form.tahunKendaraan,
            };

            // Kirim data ke server
            const response = await fetch("/api/submit.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!result.success) {
                alert("❌ Gagal mengirim data. " + (result.message || ""));
                return;
            }

            // Proses WhatsApp
            let nomorWA = form.noHP.replace(/\D/g, "");
            if (nomorWA.startsWith("0")) nomorWA = "62" + nomorWA.substring(1);
            else if (!nomorWA.startsWith("62")) nomorWA = "62" + nomorWA;

            if (nomorWA.length < 11 || nomorWA.length > 15) {
                alert("❌ Nomor WA tidak valid. Pastikan minimal 10 digit setelah kode negara.");
                return;
            }

            const pesanWA = `Halo, saya ingin mengajukan pinjaman.\n\n📋 DATA PEMOHON:\n• Nama: ${form.namaLengkap}\n• HP: ${form.noHP}\n• Alamat: ${alamatGabung}\n\n🚗 DATA KENDARAAN:\n• Jenis: ${form.jenisKendaraan}\n• Tipe: ${form.tipeKendaraan}\n• Tahun: ${form.tahunKendaraan}`;

            window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanWA)}`, "_blank");

            // Reset form
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

            alert("✅ Data berhasil terkirim!");

        } catch (err) {
            console.error("Submission error:", err);
            alert("❌ Terjadi kesalahan saat mengirim data. Periksa koneksi internet Anda.");
        }
    };

    return (
        <div
            className={`w-full ${compact ? "p-0" : "bg-white/95 border border-ocean-100 shadow-xl rounded-3xl p-6 sm:p-8"}`}
        >
            {!compact && (
                <h3 className="text-2xl sm:text-3xl font-bold text-ocean-700 mb-6 text-center lg:text-left">
                    Form Pengajuan Pinjaman
                </h3>
            )}

            <div className="grid gap-5 w-full">
                <InputField icon={<User />} name="namaLengkap" placeholder="Nama Lengkap" value={form.namaLengkap} onChange={handleChange} />
                <InputField icon={<Phone />} name="noHP" placeholder="No Handphone / Whatsapp" value={form.noHP} onChange={handleChange} />
                <InputField icon={<MapPin />} name="alamat" placeholder="Alamat Lengkap" value={form.alamat} onChange={handleChange} />
                <SelectField icon={<MapPin />} name="provinsi" options={[{ value: "", label: "Pilih Provinsi" }, ...provinsiList.map(p => ({ value: p.id, label: p.name }))]} value={form.provinsi} onChange={handleChange} />
                <SelectField icon={<MapPin />} name="kota" options={[{ value: "", label: "Pilih Kota" }, ...kotaList.map(k => ({ value: k.id, label: k.name }))]} value={form.kota} onChange={handleChange} />
                <SelectField icon={<Car />} name="jenisKendaraan" options={jenisKendaraanOptions} value={form.jenisKendaraan} onChange={handleChange} />
                <InputField icon={<FileText />} name="tipeKendaraan" placeholder="Tipe Kendaraan" value={form.tipeKendaraan} onChange={handleChange} />
                <SelectField icon={<Calendar />} name="tahunKendaraan" options={tahunKendaraanOptions} value={form.tahunKendaraan} onChange={handleChange} />
            </div>

            <button
                onClick={handleSubmit}
                className="mt-8 w-full bg-gradient-to-r from-ocean-600 to-ocean-700 text-white py-4 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition"
            >
                🚀 Ajukan
            </button>
        </div>
    );
}

function InputField({ icon, name, placeholder, value, onChange }: any) {
    return (
        <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-ocean-500 transition w-full">
            <span className="text-ocean-600">{icon}</span>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="flex-1 bg-transparent outline-none text-gray-700 text-sm sm:text-base"
            />
        </label>
    );
}

function SelectField({ icon, name, options, value, onChange }: any) {
    return (
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
    );
}
