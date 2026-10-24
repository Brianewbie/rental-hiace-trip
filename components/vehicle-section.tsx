import { vehicles } from "../data/vehicles";
import VehicleCard from "./vehicle-card";
import Link from "next/link";

export default function VehicleSection() {
  return (
    <section id="armada" className="bg-white px-6 sm:px-8 py-20 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl">
        {/* Header 100% Bahasa Indonesia */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-zinc-950">
              Temukan Armada Terbaik Anda
            </h2>
            <p className="mt-2.5 max-w-md text-sm text-zinc-500 font-normal">
              Pilihan lengkap unit Toyota Hiace dengan perawatan berkala, interior bersih wangi, dan fasilitas lengkap untuk perjalanan Anda.
            </p>
          </div>

          <Link
            href="/armada"
            className="btn-pill-dark self-start sm:self-auto"
          >
            Lihat Semua Armada
          </Link>
        </div>

        {/* 3 Kolom Kartu Armada */}
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
  );
}