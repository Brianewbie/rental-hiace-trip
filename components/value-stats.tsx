export default function ValueStats() {
  const stats = [
    { value: "500+", label: "Pelanggan Puas" },
    { value: "24/7", label: "Bantuan Siaga" },
    { value: "100%", label: "Armada Terverifikasi" },
    { value: "60+", label: "Rute Populer" },
    { value: "1.200+", label: "Perjalanan Selesai" },
  ];

  return (
    <section id="keunggulan" className="bg-white py-16 sm:py-20 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          {/* Judul Kiri */}
          <div className="md:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-[-0.03em] text-zinc-950 leading-[1.15]">
              Kenyamanan Mewah <br />
              Bebas Menjelajah
            </h2>
          </div>

          {/* Deskripsi & Statistik Kanan */}
          <div className="md:col-span-7">
            <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-500 font-normal">
              Nikmati pengalaman sewa armada kelas premium yang dirancang untuk kenyamanan, performa andal, dan ketenangan pikiran. Baik untuk perjalanan dinas kantor, liburan akhir pekan bersama keluarga, maupun penjemputan tamu VIP, armada kami selalu dipersiapkan prima untuk setiap tujuan Anda.
            </p>

            {/* Grid Statistik Bersih */}
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-5 border-t border-zinc-100 pt-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs text-zinc-400 font-normal">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
