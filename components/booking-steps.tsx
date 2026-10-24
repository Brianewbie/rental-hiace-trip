import Image from "next/image";
import Link from "next/link";

export default function BookingSteps() {
  const steps = [
    {
      num: "01",
      title: "Pilih Armada",
      desc: "Pilih tipe Hiace (Premio, Commuter, atau Luxury) sesuai kapasitas dan kebutuhan rombongan Anda.",
    },
    {
      num: "02",
      title: "Tentukan Jadwal",
      desc: "Tentukan tanggal penjemputan dan perkiraan lama durasi perjalanan Anda.",
    },
    {
      num: "03",
      title: "Isi Data Diri",
      desc: "Masukkan alamat lengkap penjemputan dan nomor WhatsApp aktif pemesan.",
    },
    {
      num: "04",
      title: "Pilih Layanan",
      desc: "Fasilitas sopir profesional berpengalaman serta opsi bahan bakar (BBM) all-in.",
    },
    {
      num: "05",
      title: "Konfirmasi Pesanan",
      desc: "Pemesanan diverifikasi dengan cepat dan rincian dikonfirmasi instan via WhatsApp.",
    },
    {
      num: "06",
      title: "Siap Berangkat!",
      desc: "Armada bersih wangi dan sopir siap menjemput Anda tepat waktu di lokasi.",
    },
  ];

  return (
    <section id="cara-pesan" className="bg-white py-20 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header 100% Bahasa Indonesia */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-zinc-950">
              Mudah. Cepat. Tanpa Kendala.
            </h2>
            <p className="mt-2.5 max-w-md text-sm text-zinc-500 font-normal">
              Proses sewa armada yang transparan, praktis, dan tanpa syarat berbelit-belit.
            </p>
          </div>

          <Link
            href="/booking"
            className="btn-pill-dark self-start sm:self-auto"
          >
            Pesan Langsung
          </Link>
        </div>

        {/* 6 Langkah Grid + Kartu Visual Perjalanan */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Langkah-langkah */}
          <div className="grid gap-3.5 sm:grid-cols-2 lg:col-span-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-[22px] border border-zinc-200/80 bg-white p-5 transition-all duration-200 hover:border-zinc-300 hover:shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-medium text-zinc-400">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-sm font-semibold tracking-[-0.01em] text-zinc-950">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Kartu Gambar Perjalanan dengan Radius Melengkung Halus */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-[26px] border border-zinc-200/80 bg-[#18181b] text-white shadow-lg">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-[26px]">
                <Image
                  src="/images/hiace-premio.jpg"
                  alt="Perjalanan Bersama HiaceTrip"
                  fill
                  className="object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/30 to-transparent" />
              </div>

              <div className="p-6">
                <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-400">
                  Perjalanan Nyaman
                </span>
                <h4 className="mt-1 text-lg font-semibold tracking-tight text-white">
                  Siap Menemani Rute Anda
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-300 font-normal">
                  Konsultasikan rute wisata atau kebutuhan dinas luar kota langsung dengan tim kami.
                </p>
                <div className="mt-4">
                  <a
                    href="https://wa.me/6283838078833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill-light w-full text-center text-xs"
                  >
                    Chat via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
