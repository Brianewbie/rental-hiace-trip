import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import WhatsAppButton from "../../components/whatsapp-button";
import { vehicles } from "../../data/vehicles";
import VehicleCard from "../../components/vehicle-card";
import Link from "next/link";

export default function ArmadaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header Bersih & Modern */}
        <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-zinc-100 px-6 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-4 flex items-center gap-2 text-xs font-normal text-zinc-400">
              <Link href="/" className="hover:text-zinc-950 transition-colors">Beranda</Link>
              <span>/</span>
              <span className="text-zinc-950">Pilihan Armada</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-zinc-950 leading-[1.15]">
              Pilihan Armada Toyota Hiace
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-[15px] text-zinc-500 font-normal leading-relaxed">
              Seluruh unit Hiace kami selalu terawat prima, bersih wangi, dan dikemudikan oleh sopir profesional yang ramah serta menguasai rute perjalanan dengan aman.
            </p>

            {/* Statistik Cepat Kapsul */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {[
                { value: "3 Tipe Unit", label: "Pilihan Lengkap" },
                { value: "14 - 15 Kursi", label: "Kapasitas Rombongan" },
                { value: "Mulai Rp 750K", label: "Tarif Harian" },
              ].map((stat) => (
                <div key={stat.label} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-[#f4f4f5] px-4 py-2 text-xs">
                  <span className="font-semibold text-zinc-950">{stat.value}</span>
                  <span className="text-zinc-400">· {stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grid Kartu Kendaraan */}
        <section className="px-6 sm:px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  id={vehicle.id}
                  name={vehicle.name}
                  passengers={vehicle.passengers}
                  transmission={vehicle.transmission}
                  pricePerDay={vehicle.pricePerDay}
                  image={vehicle.image}
                  description={vehicle.description}
                  features={vehicle.features}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Banner Konsultasi Bawah */}
        <section className="px-6 sm:px-8 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[28px] border border-zinc-200/90 bg-[#18181b] p-8 sm:p-12 text-center text-white shadow-lg">
              <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-400 block mb-2">
                Bantuan Pemilihan Unit
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                Bingung Memilih Unit yang Sesuai?
              </h2>
              <p className="mx-auto mt-2.5 max-w-lg text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                Konsultasikan rencana perjalanan dan jumlah rombongan Anda langsung dengan kami. Kami siap merekomendasikan unit paling pas dengan harga terbaik.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/6283838078833?text=Halo%20HiaceTrip,%20saya%20butuh%20bantuan%20memilih%20Hiace%20yang%20sesuai."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-light px-7 py-3 text-xs"
                >
                  Konsultasi via WhatsApp
                </a>
                <Link
                  href="/booking"
                  className="btn-pill-dark px-7 py-3 text-xs border border-zinc-700 bg-zinc-900"
                >
                  Pesan Unit Sekarang
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}