import Image from "next/image";
import Link from "next/link";
import { vehicles } from "../data/vehicles";

export default function TopPicks() {
  return (
    <section className="bg-white py-20 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header 100% Bahasa Indonesia */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-zinc-950">
              Pilihan Terpopuler Minggu Ini
            </h2>
            <p className="mt-2 max-w-md text-sm text-zinc-500 font-normal">
              Jajaran unit Hiace yang paling banyak dipilih pelanggan karena kenyamanan suspensi dan ruang kabin yang luas.
            </p>
          </div>

          <Link
            href="/armada"
            className="btn-pill-dark self-start sm:self-auto"
          >
            Lihat Semua
          </Link>
        </div>

        {/* 3 Profil Kendaraan Berdampingan dengan Radius Halus */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <Link
              key={v.id}
              href={`/armada/${v.id}`}
              className="group flex flex-col items-center rounded-[24px] p-5 transition-all duration-200 hover:bg-zinc-50/80 border border-transparent hover:border-zinc-200/60"
            >
              <div className="relative h-44 w-full overflow-hidden rounded-[20px] bg-[#f8fafc] flex items-center justify-center p-3 border border-zinc-100">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 text-center">
                <h4 className="text-base font-semibold tracking-[-0.01em] text-zinc-950 group-hover:text-orange-600 transition-colors">
                  {v.name}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Mulai Rp {v.pricePerDay.toLocaleString("id-ID")} /hari
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Indikator Halaman */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#18181b] text-xs font-medium text-white shadow-xs">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
            2
          </button>
        </div>
      </div>
    </section>
  );
}
