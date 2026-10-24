import Image from "next/image";
import Link from "next/link";
import Icon8 from "./icons8";

type VehicleCardProps = {
  id: string;
  name: string;
  passengers: number;
  transmission: string;
  pricePerDay: number;
  image: string;
  description?: string;
  features?: string[];
};

export default function VehicleCard({
  id,
  name,
  passengers,
  transmission,
  pricePerDay,
  image,
  description,
}: VehicleCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-[24px] border border-zinc-200/80 bg-white p-5 sm:p-6 transition-all duration-200 hover:border-zinc-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div>
        {/* Wadah Gambar dengan sudut melengkung halus (rounded-2xl) sesuai instruksi */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-[20px] bg-[#f8fafc] flex items-center justify-center border border-zinc-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-3 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Info Kendaraan */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-zinc-950">
              {name}
            </h3>
            <span className="text-[11px] font-medium text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full">
              {transmission}
            </span>
          </div>

          {description && (
            <p className="mt-2 text-xs leading-relaxed text-zinc-500 line-clamp-2">
              {description}
            </p>
          )}

          {/* Baris Spesifikasi Bersih dengan Icons8 */}
          <div className="mt-4 flex items-center justify-between border-t border-b border-zinc-100 py-3 text-xs text-zinc-600">
            <div className="flex items-center gap-1.5">
              <Icon8 name="users" size={14} color="#71717a" />
              <span>{passengers} Kursi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon8 name="gear" size={14} color="#71717a" />
              <span>{transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon8 name="steering-wheel" size={14} color="#71717a" />
              <span>Dengan Sopir</span>
            </div>
          </div>
        </div>
      </div>

      {/* Harga & Tombol Aksi */}
      <div className="mt-6 pt-1">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-xs text-zinc-400 font-medium">Tarif Sewa</span>
          <p className="text-lg font-semibold text-zinc-950">
            Rp {pricePerDay.toLocaleString("id-ID")}
            <span className="text-xs font-normal text-zinc-400"> /hari</span>
          </p>
        </div>

        {/* Tombol Pil Bersih "Sewa Sekarang" */}
        <Link
          href={`/booking?vehicle=${id}`}
          className="btn-pill-dark w-full py-2.5 text-xs text-center"
        >
          Sewa Sekarang
        </Link>
      </div>
    </div>
  );
}