"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon8 from "./icons8";
import { vehicles } from "../data/vehicles";

export default function LuxuryDial() {
  const [activeCategory, setActiveCategory] = useState("Semua Unit");
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ["Semua Unit", "Hiace Premio", "Hiace Commuter", "Hiace Luxury"];

  const activeVehicle = vehicles[currentIndex % vehicles.length];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % vehicles.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header dengan Tab Filter Kategori di Kanan */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-zinc-950">
              Kemewahan dan Keandalan Sempurna
            </h2>
            <p className="mt-2.5 max-w-md text-sm text-zinc-500 font-normal">
              Kombinasi suspensi empuk, kabin senyap, dan mesin bertenaga untuk memastikan perjalanan Anda selalu menyenangkan.
            </p>
          </div>

          {/* Tab Filter Kapsul Pil */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-full bg-[#f4f4f5] p-1 border border-zinc-200/70 self-start md:self-auto">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  if (idx > 0) setCurrentIndex(idx - 1);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-150 ${
                  activeCategory === cat
                    ? "bg-[#18181b] text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Wadah Visual Dial Dial & Showcase Tengah */}
        <div className="relative mx-auto flex items-center justify-center min-h-[460px] md:min-h-[500px]">
          {/* Garis-garis dial konsentris melengkung halus di latar belakang */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-[440px] w-[440px] sm:h-[540px] sm:w-[540px] md:h-[620px] md:w-[620px] rounded-full border border-dashed border-zinc-200/80" />
            <div className="absolute h-[360px] w-[360px] sm:h-[440px] sm:w-[440px] md:h-[500px] md:w-[500px] rounded-full border border-zinc-200/60" />
            <div className="absolute h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] md:h-[380px] md:w-[380px] rounded-full border border-zinc-200/40" />
          </div>

          {/* Tombol Panah Kiri */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-8 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-xs hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-colors"
            aria-label="Sebelumnya"
          >
            <Icon8 name="chevron-left" size={15} color="currentColor" />
          </button>

          {/* Tombol Panah Kanan */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-8 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-xs hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-colors"
            aria-label="Berikutnya"
          >
            <Icon8 name="chevron-right" size={15} color="currentColor" />
          </button>

          {/* Kartu Tengah dengan radius melengkung halus */}
          <div className="relative z-10 w-full max-w-md rounded-[28px] border border-zinc-200/90 bg-white p-7 text-center shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
            <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-400">
              Unit Rekomendasi
            </span>

            <h3 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-zinc-950">
              {activeVehicle.name}
            </h3>

            {/* Gambar dengan radius halus */}
            <div className="relative mx-auto my-3 h-36 sm:h-44 w-full overflow-hidden rounded-[20px] bg-[#f8fafc] flex items-center justify-center border border-zinc-100">
              <Image
                src={activeVehicle.image}
                alt={activeVehicle.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto">
              {activeVehicle.description}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href={`/booking?vehicle=${activeVehicle.id}`}
                className="btn-pill-dark px-6 py-2.5 text-xs"
              >
                Pesan Unit Ini
              </Link>
              <Link
                href={`/armada/${activeVehicle.id}`}
                className="btn-pill-light px-6 py-2.5 text-xs"
              >
                Lihat Spesifikasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
