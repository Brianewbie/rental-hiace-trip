"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { vehicles } from "../../data/vehicles";
import { calculatePrice } from "../../lib/pricing";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import WhatsAppButton from "../../components/whatsapp-button";
import Icon8 from "../../components/icons8";
import CustomDatePicker from "../../components/custom-date-picker";

const WHATSAPP_NUMBER = "6283838078833";

type PriceResult = {
  days: number;
  rentalPrice: number;
  total: number;
};

function BookingForm() {
  const searchParams = useSearchParams();

  const [vehicleId, setVehicleId] = useState("hiace-commuter");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [notes, setNotes] = useState("");
  const [priceResult, setPriceResult] = useState<PriceResult | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState<"available" | "unavailable" | "">("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingStatus, setBookingStatus] = useState<"success" | "error" | "">("");
  const [isChecking, setIsChecking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const vehicleFromUrl = searchParams.get("vehicle");
    if (vehicleFromUrl && vehicles.some((v) => v.id === vehicleFromUrl)) {
      setVehicleId(vehicleFromUrl);
    }
    const startFromUrl = searchParams.get("start");
    if (startFromUrl) setStartDate(startFromUrl);
    const endFromUrl = searchParams.get("end");
    if (endFromUrl) setEndDate(endFromUrl);
    const locFromUrl = searchParams.get("location");
    if (locFromUrl) setLocation(locFromUrl);
  }, [searchParams]);

  const selectedVehicle = vehicles.find((v) => v.id === vehicleId) || vehicles[0];

  const resetPriceAndAvailability = () => {
    setPriceResult(null);
    setAvailabilityMessage("");
    setAvailabilityStatus("");
    setBookingMessage("");
    setBookingStatus("");
  };

  const handleSelectVehicle = (id: string) => {
    setVehicleId(id);
    resetPriceAndAvailability();
  };

  const handleCheckPrice = async () => {
    resetPriceAndAvailability();

    if (!vehicleId) {
      alert("Silakan pilih tipe kendaraan terlebih dahulu.");
      return;
    }
    if (!startDate || !endDate) {
      alert("Silakan tentukan tanggal mulai dan tanggal selesai sewa.");
      return;
    }
    if (endDate < startDate) {
      alert("Tanggal selesai sewa tidak boleh lebih awal dari tanggal mulai.");
      return;
    }

    const vehicle = vehicles.find((item) => item.id === vehicleId);
    if (!vehicle) {
      alert("Data kendaraan tidak ditemukan.");
      return;
    }

    setIsChecking(true);
    try {
      const response = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId, startDate, endDate }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal memeriksa ketersediaan.");
      }

      if (!result.available) {
        setAvailabilityMessage("Armada belum tersedia pada rentang tanggal yang dipilih. Silakan tentukan jadwal lain.");
        setAvailabilityStatus("unavailable");
        return;
      }

      setAvailabilityMessage("Unit tersedia dan siap jalan! Silakan lengkapi data pemesan dan penjemputan di bawah.");
      setAvailabilityStatus("available");

      const resultPrice = calculatePrice({
        basePrice: vehicle.pricePerDay,
        startDate,
        endDate,
      });
      setPriceResult({ days: resultPrice.days, rentalPrice: resultPrice.rentalPrice, total: resultPrice.total });
      setCurrentStep(2);
    } catch (error) {
      console.error("Availability check error:", error);
      setAvailabilityMessage("Gagal memeriksa ketersediaan kendaraan. Silakan coba beberapa saat lagi.");
      setAvailabilityStatus("unavailable");
    } finally {
      setIsChecking(false);
    }
  };

  const handleBooking = async () => {
    if (!vehicleId) {
      alert("Silakan pilih tipe kendaraan terlebih dahulu.");
      return;
    }
    if (!startDate || !endDate) {
      alert("Silakan tentukan tanggal mulai dan tanggal selesai.");
      return;
    }
    if (endDate < startDate) {
      alert("Tanggal selesai tidak boleh sebelum tanggal mulai.");
      return;
    }
    if (!location.trim()) {
      alert("Silakan isi alamat atau lokasi penjemputan.");
      return;
    }
    if (!name.trim()) {
      alert("Silakan isi nama lengkap pemesan.");
      return;
    }
    if (!whatsapp.trim()) {
      alert("Silakan isi nomor WhatsApp aktif pemesan.");
      return;
    }
    if (!priceResult) {
      alert("Silakan klik tombol Periksa Ketersediaan terlebih dahulu.");
      return;
    }
    if (isSaving) return;

    const vehicle = vehicles.find((item) => item.id === vehicleId);
    if (!vehicle) {
      alert("Kendaraan tidak ditemukan.");
      return;
    }

    setIsSaving(true);
    setBookingMessage("");
    setBookingStatus("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          whatsapp,
          vehicleId,
          startDate,
          endDate,
          location,
          notes,
          totalPrice: priceResult.total,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Pemesanan gagal disimpan.");
      }

      const bookingId = result.bookingId;

      const message = `Halo HiaceTrip, saya ingin melakukan pemesanan sewa armada Hiace.

*Rincian Pemesanan:*
- ID Pesanan: ${bookingId}
- Nama Pemesan: ${name}
- Armada: ${vehicle.name}
- Tanggal Mulai: ${startDate}
- Tanggal Selesai: ${endDate}
- Durasi Sewa: ${priceResult.days} Hari
- Titik Penjemputan: ${location}
- Nomor WhatsApp: ${whatsapp}
- Total Tarif: Rp ${priceResult.total.toLocaleString("id-ID")}

*Catatan Tambahan:*
${notes || "-"}

Pesanan sudah saya kirimkan melalui situs web. Mohon konfirmasi ketersediaan dan rincian penjemputan. Terima kasih.`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=` + encodeURIComponent(message);
      window.open(whatsappUrl, "_blank");

      setBookingMessage(`Pesanan Anda berhasil tercatat dengan nomor pesanan: ${bookingId}. Jendela WhatsApp telah terbuka untuk konfirmasi langsung dengan staf kami.`);
      setBookingStatus("success");
      setCurrentStep(3);
    } catch (error) {
      console.error("Booking error:", error);
      setBookingMessage("Pemesanan gagal disimpan. Silakan coba kembali atau hubungi kami langsung via WhatsApp.");
      setBookingStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const steps = [
    { num: 1, label: "Pilih Jadwal" },
    { num: 2, label: "Data Diri" },
    { num: 3, label: "Konfirmasi" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      {/* Tampilan Konfirmasi Berhasil */}
      {currentStep === 3 && bookingStatus === "success" ? (
        <div className="mx-auto max-w-2xl rounded-[28px] border border-zinc-200/90 bg-white p-8 sm:p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
            <Icon8 name="badge-check" size={32} color="#16a34a" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full">
            Reservasi Berhasil Diajukan
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950">
            Terima Kasih atas Kepercayaan Anda
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
            {bookingMessage}
          </p>

          <div className="mt-8 rounded-[20px] bg-[#f8fafc] border border-zinc-100 p-5 text-left text-xs sm:text-sm space-y-2.5">
            <div className="flex justify-between border-b border-zinc-200/60 pb-2">
              <span className="text-zinc-500">Tipe Armada:</span>
              <strong className="text-zinc-900">{selectedVehicle.name}</strong>
            </div>
            <div className="flex justify-between border-b border-zinc-200/60 pb-2">
              <span className="text-zinc-500">Jadwal Perjalanan:</span>
              <strong className="text-zinc-900">{startDate} s/d {endDate} ({priceResult?.days} Hari)</strong>
            </div>
            <div className="flex justify-between border-b border-zinc-200/60 pb-2">
              <span className="text-zinc-500">Lokasi Penjemputan:</span>
              <strong className="text-zinc-900">{location}</strong>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-500">Estimasi Total Biaya:</span>
              <strong className="text-base font-semibold text-zinc-950">
                Rp {priceResult?.total.toLocaleString("id-ID")}
              </strong>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-pill-dark px-7 py-3 text-xs">
              Kembali ke Beranda
            </Link>
            <button
              onClick={() => {
                setCurrentStep(1);
                resetPriceAndAvailability();
                setStartDate("");
                setEndDate("");
                setLocation("");
                setName("");
                setWhatsapp("");
                setNotes("");
              }}
              className="btn-pill-light px-7 py-3 text-xs"
            >
              Pesan Unit Lainnya
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Kolom Kiri: Showcase Visual Armada yang Dipilih */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tab Pemilihan Unit Cepat */}
            <div className="rounded-[24px] border border-zinc-200/80 bg-white p-3 shadow-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block px-3 py-1 mb-1">
                Ganti Pilihan Unit
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {vehicles.map((v) => {
                  const isActive = v.id === vehicleId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleSelectVehicle(v.id)}
                      className={`rounded-full py-2 px-2 text-center text-xs font-medium transition-all ${
                        isActive
                          ? "bg-zinc-950 text-white shadow-xs"
                          : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      {v.name.replace("Hiace ", "")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Kartu Showcase Visual Kendaraan dengan Radius Halus */}
            <div className="rounded-[28px] border border-zinc-200/80 bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              {/* Wadah Gambar dengan sudut melengkung halus dan latar zinc lembut */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-[20px] bg-[#f8fafc] border border-zinc-100 flex items-center justify-center">
                <Image
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  fill
                  priority
                  className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-zinc-200/80 px-3 py-1 text-[11px] font-semibold text-zinc-800 shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Unit Siap Pakai
                  </span>
                </div>
              </div>

              {/* Judul & Tarif */}
              <div className="mt-5 flex items-baseline justify-between">
                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.03em] text-zinc-950">
                    {selectedVehicle.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 font-normal line-clamp-2">
                    {selectedVehicle.description}
                  </p>
                </div>
              </div>

              {/* 4 Kotak Spesifikasi Cepat */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-b border-zinc-100 py-4 text-center">
                <div className="rounded-[16px] bg-[#f8fafc] p-2.5">
                  <div className="flex justify-center text-zinc-700 mb-1">
                    <Icon8 name="users" size={15} color="#3f3f46" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-950">{selectedVehicle.passengers} Kursi</p>
                  <span className="text-[10px] text-zinc-400">Kapasitas</span>
                </div>

                <div className="rounded-[16px] bg-[#f8fafc] p-2.5">
                  <div className="flex justify-center text-zinc-700 mb-1">
                    <Icon8 name="gear" size={15} color="#3f3f46" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-950">{selectedVehicle.transmission}</p>
                  <span className="text-[10px] text-zinc-400">Transmisi</span>
                </div>

                <div className="rounded-[16px] bg-[#f8fafc] p-2.5">
                  <div className="flex justify-center text-zinc-700 mb-1">
                    <Icon8 name="steering-wheel" size={15} color="#3f3f46" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-950">Ada Sopir</p>
                  <span className="text-[10px] text-zinc-400">Layanan</span>
                </div>

                <div className="rounded-[16px] bg-[#f8fafc] p-2.5">
                  <div className="flex justify-center text-amber-500 mb-1">
                    <Icon8 name="star" size={15} color="#f59e0b" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-950">4.9 / 5.0</p>
                  <span className="text-[10px] text-zinc-400">Ulasan</span>
                </div>
              </div>

              {/* Daftar Fasilitas Standar */}
              <div className="mt-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-2.5">
                  Fasilitas Termasuk
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedVehicle.features?.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-zinc-600">
                      <Icon8 name="badge-check" size={14} color="#f97316" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Garansi Layanan */}
              <div className="mt-6 space-y-2 rounded-[20px] bg-[#f8fafc] p-4 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <Icon8 name="shield-check" size={14} color="#f97316" />
                  <span>Kabin bersih wangi, rutin diservis berkala</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon8 name="clock" size={14} color="#f97316" />
                  <span>Penjemputan tepat waktu sesuai jadwal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon8 name="wallet" size={14} color="#f97316" />
                  <span>Tarif transparan tanpa biaya tersembunyi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Formulir Pemesanan Sesuai Tema Utama */}
          <div className="lg:col-span-7">
            {/* Indikator Langkah Kapsul Minimalis */}
            <div className="mb-6 flex items-center justify-between sm:justify-start gap-2">
              {steps.map((step, i) => (
                <div key={step.num} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                      currentStep === step.num
                        ? "bg-zinc-950 text-white shadow-xs"
                        : currentStep > step.num
                        ? "bg-zinc-100 text-zinc-900"
                        : "text-zinc-400"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                        currentStep === step.num
                          ? "bg-white text-zinc-950"
                          : currentStep > step.num
                          ? "bg-zinc-950 text-white"
                          : "border border-zinc-300 text-zinc-400"
                      }`}
                    >
                      {currentStep > step.num ? (
                        <Icon8 name="check" size={10} color="currentColor" />
                      ) : (
                        step.num
                      )}
                    </span>
                    <span>{step.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <span className="mx-2 text-zinc-300 text-xs hidden sm:inline">·</span>
                  )}
                </div>
              ))}
            </div>

            {/* Kartu Formulir */}
            <div className="rounded-[28px] border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
              {/* Header Langkah 1 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-medium tracking-[-0.03em] text-zinc-950">
                  Langkah 1: Tentukan Tanggal Sewa
                </h2>
                <p className="mt-1 text-xs text-zinc-500 font-normal">
                  Pilih rentang tanggal sewa untuk memeriksa ketersediaan unit {selectedVehicle.name}.
                </p>
              </div>

              {/* Tanggal Sewa */}
              <div className="grid gap-4 sm:grid-cols-2">
                <CustomDatePicker
                  label="Tanggal Mulai Penjemputan"
                  required
                  value={startDate}
                  min={today}
                  placeholder="Pilih tanggal mulai..."
                  onChange={(dateStr) => {
                    setStartDate(dateStr);
                    if (endDate && dateStr > endDate) setEndDate("");
                    resetPriceAndAvailability();
                  }}
                />

                <CustomDatePicker
                  label="Tanggal Selesai"
                  required
                  value={endDate}
                  min={startDate || today}
                  placeholder="Pilih tanggal selesai..."
                  onChange={(dateStr) => {
                    setEndDate(dateStr);
                    resetPriceAndAvailability();
                  }}
                />
              </div>

              {/* Tombol Periksa Ketersediaan */}
              <div>
                <button
                  type="button"
                  onClick={handleCheckPrice}
                  disabled={isChecking || !startDate || !endDate}
                  className="btn-pill-dark w-full py-3.5 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isChecking ? "Memeriksa Jadwal..." : "Periksa Ketersediaan & Hitung Tarif"}
                </button>
              </div>

              {/* Pesan Ketersediaan */}
              {availabilityMessage && (
                <div
                  className={`rounded-[18px] p-4 border text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
                    availabilityStatus === "available"
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <Icon8
                    name={availabilityStatus === "available" ? "badge-check" : "close"}
                    size={18}
                    color={availabilityStatus === "available" ? "#16a34a" : "#dc2626"}
                  />
                  <span>{availabilityMessage}</span>
                </div>
              )}

              {/* Rincian Estimasi Biaya */}
              {priceResult && (
                <div className="rounded-[22px] border border-zinc-200/80 bg-[#f8fafc] p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Rincian Estimasi Biaya Sewa
                  </span>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-[18px] border border-zinc-200/80 bg-white p-3.5">
                      <span className="text-[10px] text-zinc-400 font-medium">Durasi</span>
                      <p className="text-xl font-semibold text-zinc-950 mt-0.5">{priceResult.days}</p>
                      <span className="text-[10px] text-zinc-400">Hari</span>
                    </div>
                    <div className="rounded-[18px] border border-zinc-200/80 bg-white p-3.5">
                      <span className="text-[10px] text-zinc-400 font-medium">Tarif Harian</span>
                      <p className="text-xs sm:text-sm font-semibold text-zinc-950 mt-1">
                        Rp {(priceResult.rentalPrice / priceResult.days).toLocaleString("id-ID")}
                      </p>
                      <span className="text-[10px] text-zinc-400">per hari</span>
                    </div>
                    <div className="rounded-[18px] bg-zinc-950 p-3.5 text-white">
                      <span className="text-[10px] text-zinc-400 font-medium">Total Tarif</span>
                      <p className="text-sm sm:text-base font-semibold text-white mt-0.5">
                        Rp {priceResult.total.toLocaleString("id-ID")}
                      </p>
                      <span className="text-[10px] text-zinc-400">{priceResult.days} hari</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Data Diri (Hanya muncul jika unit tersedia) */}
              {availabilityStatus === "available" && (
                <div className="border-t border-zinc-100 pt-6 space-y-5">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-zinc-950">
                      Langkah 2: Data Pemesan & Titik Jemput
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Lengkapi data pemesan untuk penjemputan armada yang akurat.
                    </p>
                  </div>

                  {/* Lokasi Penjemputan */}
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-zinc-800">
                      <Icon8 name="map-pin" size={14} color="#f97316" />
                      <span>Alamat / Titik Penjemputan</span> <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Contoh: Hotel Grand Candi / Bandara Ahmad Yani / Alamat Rumah Lengkap"
                      className="w-full rounded-2xl border border-zinc-200/80 bg-[#f8fafc] px-4 py-3 text-xs sm:text-sm font-medium text-zinc-900 focus:border-zinc-950 focus:bg-white focus:outline-hidden transition-all"
                    />
                  </div>

                  {/* Nama & WhatsApp */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-zinc-800">
                        <Icon8 name="user" size={14} color="#f97316" />
                        <span>Nama Lengkap Pemesan</span> <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama lengkap sesuai KTP"
                        className="w-full rounded-2xl border border-zinc-200/80 bg-[#f8fafc] px-4 py-3 text-xs sm:text-sm font-medium text-zinc-900 focus:border-zinc-950 focus:bg-white focus:outline-hidden transition-all"
                      />
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-zinc-800">
                        <Icon8 name="whatsapp" size={14} color="#f97316" />
                        <span>Nomor WhatsApp Aktif</span> <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        className="w-full rounded-2xl border border-zinc-200/80 bg-[#f8fafc] px-4 py-3 text-xs sm:text-sm font-medium text-zinc-900 focus:border-zinc-950 focus:bg-white focus:outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  {/* Catatan Perjalanan */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-zinc-800">
                      Catatan Perjalanan atau Permintaan Khusus (Opsional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Contoh: Perjalanan wisata keluarga rombongan, penjemputan jam 07.00 WIB, rute Semarang - Dieng."
                      rows={3}
                      className="w-full rounded-2xl border border-zinc-200/80 bg-[#f8fafc] px-4 py-3 text-xs sm:text-sm font-medium text-zinc-900 focus:border-zinc-950 focus:bg-white focus:outline-hidden transition-all resize-none"
                    />
                  </div>

                  {/* Pesan Kesalahan */}
                  {bookingStatus === "error" && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800">
                      {bookingMessage}
                    </div>
                  )}

                  {/* Tombol Kirim Pemesanan */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleBooking}
                      disabled={isSaving}
                      className="btn-pill-dark w-full py-4 text-xs sm:text-sm font-medium disabled:opacity-50"
                    >
                      {isSaving ? "Menyimpan Data Reservasi..." : "Kirim Pemesanan & Buka WhatsApp"}
                    </button>
                    <p className="mt-2 text-center text-[11px] text-zinc-400">
                      Data pesanan otomatis tersimpan di sistem kami dan langsung diteruskan ke WhatsApp untuk konfirmasi instan.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-28 pb-20 sm:pt-36 sm:pb-24 px-6 sm:px-8 border-b border-zinc-100">
        {/* Breadcrumb Header */}
        <div className="mx-auto max-w-7xl mb-8">
          <nav className="flex items-center gap-2 text-xs font-normal text-zinc-400">
            <Link href="/" className="hover:text-zinc-950 transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/armada" className="hover:text-zinc-950 transition-colors">Armada</Link>
            <span>/</span>
            <span className="text-zinc-950 font-medium">Pemesanan Armada</span>
          </nav>
        </div>

        {/* Header Halaman Booking Bersih & Elegan sesuai Desain Utama */}
        <div className="mx-auto max-w-3xl mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
            Layanan Reservasi Resmi
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-zinc-950 leading-[1.15]">
            Reservasi Toyota Hiace
          </h1>
          <p className="mt-3 text-sm sm:text-[15px] text-zinc-500 font-normal leading-relaxed">
            Periksa ketersediaan unit pilihan Anda, dapatkan kalkulasi tarif yang transparan, dan lakukan reservasi praktis secara langsung.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
            </div>
          }
        >
          <BookingForm />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}