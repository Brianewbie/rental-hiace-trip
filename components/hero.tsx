import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const brandLogos = [
    "TOYOTA",
    "HIACE PREMIO",
    "HIACE COMMUTER",
    "HIACE LUXURY",
    "VIP EKSEKUTIF",
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header Hero Utama - 100% Bahasa Indonesia dengan tipografi sesuai gambar */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium tracking-[-0.035em] text-zinc-950 leading-[1.12]">
            Sewa Mobil Impian Anda <br />
            Kapan Saja Di Mana Saja
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm sm:text-[15px] font-normal leading-relaxed text-zinc-500">
            HiaceTrip menghadirkan sewa Toyota Hiace premium terawat, pemesanan cepat tanpa ribet, dan sopir berpengalaman untuk perjalanan terbaik Anda.
          </p>

          {/* Tombol Kapsul Sesuai Gambar: "Pesan Sekarang" & "Lihat Armada" */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/booking"
              className="btn-pill-dark px-7 py-3 text-[13px] sm:text-sm font-medium"
            >
              Pesan Sekarang
            </Link>

            <Link
              href="/#armada"
              className="btn-pill-light px-7 py-3 text-[13px] sm:text-sm font-medium"
            >
              Lihat Armada
            </Link>
          </div>
        </div>

        {/* Gambar Kendaraan dengan bayangan lantai alami */}
        <div className="relative mx-auto mt-12 sm:mt-16 max-w-4xl">
          <div className="relative h-64 sm:h-80 md:h-[400px] lg:h-[440px] w-full">
            <Image
              src="/images/hiace-hero.png"
              alt="Armada Sewa Toyota Hiace Luxury"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Bayangan lantai rata alami sesuai gambar referensi */}
          <div className="mx-auto h-4 w-3/4 -mt-3 rounded-full bg-zinc-950/15 blur-md" />
        </div>

        {/* Baris Logo Merek / Kategori */}
        <div className="mt-16 sm:mt-20 border-t border-zinc-100 pt-8 sm:pt-10">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20">
            {brandLogos.map((brand) => (
              <span
                key={brand}
                className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-zinc-400 hover:text-zinc-700 transition-colors uppercase select-none"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}