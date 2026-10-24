"use client";

import { useState } from "react";
import Icon8 from "./icons8";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Bagaimana cara melakukan pemesanan kendaraan di HiaceTrip?",
      a: "Pemesanan dapat dilakukan langsung melalui website pada menu 'Booking' dengan memilih tipe armada, tanggal mulai dan selesai, serta lokasi penjemputan. Tim kami akan segera mengkonfirmasi ketersediaan dan detail perjalanan Anda via WhatsApp.",
    },
    {
      q: "Apakah tarif sewa sudah termasuk sopir dan bahan bakar (BBM)?",
      a: "Tersedia pilihan paket sewa armada dengan sopir profesional, maupun paket All-In (sudah termasuk unit Hiace, sopir berpengalaman, BBM, serta tol/parkir sesuai kesepakatan). Rincian tarif dijelaskan transparan di awal tanpa biaya siluman.",
    },
    {
      q: "Berapa lama batas minimal durasi sewa?",
      a: "Minimal durasi sewa harian adalah 1 hari (12–16 jam sesuai rute). Kami juga melayani sewa mingguan, bulanan untuk dinas instansi, serta paket antar-jemput (drop-off) bandara.",
    },
    {
      q: "Bagaimana standar kebersihan dan perawatan kendaraan?",
      a: "Setiap unit Hiace selalu melalui pengecekan rutin sebelum berangkat, servis berkala di bengkel resmi, serta pembersihan interior dan disinfeksi menyeluruh untuk menjamin kenyamanan Anda.",
    },
    {
      q: "Dokumen apa saja yang diperlukan untuk pemesanan?",
      a: "Cukup melampirkan foto KTP pemesan dan nomor WhatsApp aktif untuk kebutuhan verifikasi jadwal serta koordinasi penjemputan armada oleh sopir kami.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-white py-20 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Kolom Kiri */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-zinc-950 leading-[1.18]">
              Ada Pertanyaan? <br />
              Kami Siap Menjawab!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 font-normal">
              Informasi lengkap seputar pemesanan armada, syarat sewa, tarif harian, dan panduan penjemputan perjalanan Anda.
            </p>

            <div className="mt-8">
              <a
                href="https://wa.me/6283838078833"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-dark"
              >
                Hubungi Bantuan
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Akordion */}
          <div className="lg:col-span-7 space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-[20px] transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#18181b] text-white shadow-md"
                      : "border border-zinc-200/80 bg-white text-zinc-900 hover:border-zinc-300"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-medium transition-colors"
                  >
                    <span className={isOpen ? "text-white pr-4" : "text-zinc-900 pr-4"}>
                      {faq.q}
                    </span>
                    <div
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                        isOpen
                          ? "bg-white/10 text-white rotate-180"
                          : "text-zinc-400"
                      }`}
                    >
                      <Icon8
                        name="chevron-down"
                        size={14}
                        color={isOpen ? "#ffffff" : "#71717a"}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-zinc-300 border-t border-white/10 pt-3 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
