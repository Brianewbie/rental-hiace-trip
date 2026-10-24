import Icon8, { Icon8Name } from "./icons8";

export default function TrustSection() {
  const features: { icon: Icon8Name; title: string; description: string }[] = [
    {
      icon: "shield-check",
      title: "Armada Terawat",
      description: "Semua kendaraan rutin diservis di bengkel resmi dan dalam kondisi prima untuk kenyamanan Anda.",
    },
    {
      icon: "steering-wheel",
      title: "Sopir Berpengalaman",
      description: "Sopir handal, sopan, ramah, dan sangat menguasai rute perjalanan wisata serta jalan tol dengan aman.",
    },
    {
      icon: "wallet",
      title: "Harga Transparan",
      description: "Tidak ada biaya tersembunyi. Rincian harga jelas dan langsung dapat dikonfirmasi di awal.",
    },
    {
      icon: "calendar",
      title: "Pemesanan Praktis",
      description: "Pesan melalui situs web atau WhatsApp, konfirmasi cepat, unit langsung terjadwal aman.",
    },
    {
      icon: "clock",
      title: "Tepat Waktu",
      description: "Kami menghargai waktu Anda. Penjemputan selalu siap sedia tepat sesuai jadwal yang disepakati.",
    },
    {
      icon: "headset",
      title: "Layanan Bantuan 24/7",
      description: "Tim layanan pelanggan kami siap membantu Anda kapan saja selama perjalanan berlangsung.",
    },
  ];

  return (
    <section className="bg-white px-6 py-20 border-b border-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
            Kenapa Memilih Kami
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl md:text-5xl">
            Layanan Terpercaya & Profesional
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-slate-500">
            Kami hadir untuk memastikan setiap perjalanan Anda menjadi pengalaman yang aman, nyaman, dan berkesan.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-slate-950 group-hover:text-white transition-colors">
                <Icon8 name={feature.icon} size={22} color="currentColor" />
              </div>

              <h3 className="text-base font-bold text-slate-950 group-hover:text-orange-600 transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
