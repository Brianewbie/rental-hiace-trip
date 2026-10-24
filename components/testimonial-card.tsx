"use client";

import Icon8 from "./icons8";

export default function TestimonialCard() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Wisata Keluarga",
      city: "Semarang",
      rating: 5,
      text: "Sangat puas dengan armada Hiace Premio! Kondisi kabin sangat bersih, wangi, pendingin udara dingin merata sampai baris belakang, dan sopir sangat ramah serta menguasai rute tanjakan Dieng dengan aman.",
    },
    {
      name: "Sari Indah",
      role: "Acara Pernikahan",
      city: "Yogyakarta",
      rating: 5,
      text: "Pelayanan sangat profesional dari awal pemesanan sampai selesai acara. Sopir tiba 30 menit sebelum jadwal penjemputan. Semua keluarga besar merasa sangat nyaman sepanjang perjalanan.",
    },
    {
      name: "Ahmad Fauzi",
      role: "Kunjungan Dinas",
      city: "Solo",
      rating: 5,
      text: "Sudah berkali-kali sewa Hiace Luxury di HiaceTrip untuk tamu kantor. Selalu memuaskan, suspensi empuk, kursi eksekutif nyaman, dan proses administrasi pembayaran sangat cepat dan transparan.",
    },
  ];

  return (
    <section id="testimoni" className="bg-white py-20 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-zinc-950">
              Dipercaya Ribuan Pelanggan
            </h2>
            <p className="mt-2 max-w-md text-sm text-zinc-500 font-normal">
              Ulasan nyata dari ribuan keluarga, wisatawan, dan rombongan yang telah mempercayakan perjalanan mereka kepada kami.
            </p>
          </div>

          {/* Carousel Arrows on top right matching reference screenshot */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 transition-colors"
              aria-label="Sebelumnya"
            >
              <Icon8 name="chevron-left" size={15} color="currentColor" />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18181b] text-white hover:bg-zinc-800 transition-colors shadow-xs"
              aria-label="Berikutnya"
            >
              <Icon8 name="chevron-right" size={15} color="#ffffff" />
            </button>
          </div>
        </div>

        {/* 3 Quote Cards Grid matching reference layout */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-[24px] border border-zinc-200/80 bg-white p-7 transition-all duration-200 hover:border-zinc-300"
            >
              <div>
                {/* Quotation icon */}
                <div className="text-zinc-300 mb-4">
                  <Icon8 name="quote" size={20} color="#a1a1aa" />
                </div>

                {/* Testimonial Text */}
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 font-normal">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="mt-8 flex items-center gap-3 border-t border-zinc-100 pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 font-medium text-xs text-zinc-800">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-950">{t.name}</h4>
                  <p className="text-[11px] text-zinc-400">
                    {t.role} · <span className="text-zinc-600">{t.city}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
