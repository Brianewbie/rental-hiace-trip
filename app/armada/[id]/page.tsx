import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import WhatsAppButton from "../../../components/whatsapp-button";
import Image from "next/image";
import Link from "next/link";
import { vehicles } from "../../../data/vehicles";
import Icon8 from "../../../components/icons8";

type ArmadaDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArmadaDetailPage({
  params,
}: ArmadaDetailPageProps) {
  const { id } = await params;
  const vehicle = vehicles.find((item) => item.id === id);
  const otherVehicles = vehicles.filter((v) => v.id !== id);

  if (!vehicle) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50/50 px-6 py-36">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-700">
              <Icon8 name="search" size={28} color="#0f172a" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-950">
              Kendaraan Tidak Ditemukan
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Maaf, armada yang Anda cari tidak tersedia atau rute tautan salah.
            </p>
            <Link
              href="/armada"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-xs font-bold text-white hover:bg-orange-600 transition-colors"
            >
              <Icon8 name="arrow-left" size={14} color="#ffffff" />
              <span>Kembali ke Katalog Armada</span>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50/50">
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-slate-100 pt-28 pb-4">
          <div className="mx-auto max-w-7xl px-6">
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-slate-900 transition-colors">Beranda</Link>
              <span>/</span>
              <Link href="/armada" className="hover:text-slate-900 transition-colors">Armada</Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">{vehicle.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left: Vehicle Big Showcase */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white p-6 shadow-xs">
                <div className="relative h-72 sm:h-96 w-full flex items-center justify-center rounded-[20px] bg-[#f8fafc] border border-zinc-100">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    priority
                    className="object-contain p-6"
                  />
                </div>
                {/* Badge */}
                <div className="absolute top-9 left-9">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-3.5 py-1.5 text-xs font-medium text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    {vehicle.transmission}
                  </span>
                </div>
              </div>

              {/* Fitur Unggulan */}
              <div className="rounded-[24px] border border-zinc-200/80 bg-white p-6 shadow-xs">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">
                  Fasilitas & Fitur Standar
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {vehicle.features?.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 rounded-[16px] border border-zinc-100 bg-[#f8fafc] px-4 py-3 text-xs sm:text-sm font-medium text-zinc-800"
                    >
                      <Icon8 name="badge-check" size={16} color="#f97316" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Info & Booking Action Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-[24px] border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs">
                <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 mb-3">
                  Unit Siap Pakai
                </span>
                <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-zinc-950">
                  {vehicle.name}
                </h1>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-500 font-normal">
                  {vehicle.description}
                </p>

                {/* 3 Specs box with Icons8 */}
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-b border-zinc-100 py-5">
                  <div className="rounded-[18px] bg-[#f8fafc] p-3.5 text-center">
                    <div className="flex justify-center text-zinc-800 mb-1">
                      <Icon8 name="users" size={18} color="#0f172a" />
                    </div>
                    <p className="text-lg font-semibold text-zinc-950">{vehicle.passengers}</p>
                    <p className="text-[10px] font-medium text-zinc-400">Penumpang</p>
                  </div>

                  <div className="rounded-[18px] bg-[#f8fafc] p-3.5 text-center">
                    <div className="flex justify-center text-zinc-800 mb-1">
                      <Icon8 name="gear" size={18} color="#0f172a" />
                    </div>
                    <p className="text-xs font-semibold text-zinc-950 mt-1">{vehicle.transmission}</p>
                    <p className="text-[10px] font-medium text-zinc-400 mt-1">Transmisi</p>
                  </div>

                  <div className="rounded-[18px] bg-[#f8fafc] p-3.5 text-center">
                    <div className="flex justify-center text-amber-500 mb-1">
                      <Icon8 name="star" size={18} color="#eab308" />
                    </div>
                    <p className="text-lg font-semibold text-zinc-950">4.9</p>
                    <p className="text-[10px] font-medium text-zinc-400">Penilaian Pengguna</p>
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Tarif Sewa</span>
                    <p className="text-3xl font-semibold text-zinc-950">
                      Rp {vehicle.pricePerDay.toLocaleString("id-ID")}
                      <span className="text-xs font-normal text-zinc-400"> /hari</span>
                    </p>
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                    Tersedia
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 space-y-3">
                  <Link
                    href={`/booking?vehicle=${vehicle.id}`}
                    className="btn-pill-dark w-full py-3 text-xs text-center block"
                  >
                    Pesan Unit Sekarang
                  </Link>

                  <a
                    href={`https://wa.me/6283838078833?text=Halo%20HiaceTrip,%20saya%20tertarik%20sewa%20${encodeURIComponent(vehicle.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill-light w-full py-3 text-xs text-center block border border-zinc-200"
                  >
                    Tanya Ketersediaan via WhatsApp
                  </a>
                </div>

                {/* Guarantees with Icons8 */}
                <div className="mt-6 space-y-2.5 rounded-[18px] bg-[#f8fafc] p-4 text-xs text-zinc-600">
                  <div className="flex items-center gap-2">
                    <Icon8 name="shield-check" size={14} color="#f97316" />
                    <span>Unit bersih wangi & rutin diservis berkala</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon8 name="steering-wheel" size={14} color="#f97316" />
                    <span>Pengemudi ramah, sopan, dan menguasai rute</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon8 name="wallet" size={14} color="#f97316" />
                    <span>Harga transparan tanpa biaya tambahan tersembunyi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Vehicles Section */}
          {otherVehicles.length > 0 && (
            <div className="mt-20 border-t border-zinc-200/80 pt-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                    Rekomendasi Lainnya
                  </span>
                  <h3 className="mt-1 text-2xl font-medium text-zinc-950 tracking-[-0.03em]">
                    Pilihan Unit Hiace Lain
                  </h3>
                </div>
                <Link
                  href="/armada"
                  className="btn-pill-light px-5 py-2 text-xs"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {otherVehicles.map((v) => (
                  <Link
                    key={v.id}
                    href={`/armada/${v.id}`}
                    className="group flex items-center gap-5 rounded-[24px] border border-zinc-200/80 bg-white p-5 shadow-xs hover:border-zinc-300 transition-all duration-200"
                  >
                    <div className="relative h-24 w-36 flex-shrink-0 overflow-hidden rounded-[18px] bg-[#f8fafc] border border-zinc-100">
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-zinc-950 group-hover:text-orange-600 transition-colors">
                        {v.name}
                      </h4>
                      <p className="mt-1 text-xs text-zinc-500 font-normal">
                        {v.passengers} Kursi · {v.transmission}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-zinc-950">
                        Rp {v.pricePerDay.toLocaleString("id-ID")}
                        <span className="text-xs font-normal text-zinc-400"> /hari</span>
                      </p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 group-hover:bg-zinc-950 group-hover:text-white transition-colors">
                      <Icon8 name="chevron-right" size={14} color="currentColor" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}