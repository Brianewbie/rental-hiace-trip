"use client";

import Link from "next/link";
import Icon8 from "./icons8";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-zinc-600 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-16 pb-12">
        {/* Grid Utama Footer */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Info Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">
                Hiace<span className="text-orange-500">Trip</span>
              </span>
            </Link>

            <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-zinc-500 max-w-sm">
              Layanan rental armada Toyota Hiace profesional dan terpercaya untuk perjalanan keluarga, pariwisata, dinas instansi, dan penjemputan tamu VIP dengan sopir berpengalaman.
            </p>

            {/* Ikon Sosial Bulat Bersih */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://wa.me/6283838078833"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 hover:bg-[#18181b] hover:text-white hover:border-[#18181b] transition-colors"
                aria-label="WhatsApp"
              >
                <Icon8 name="whatsapp" size={14} color="currentColor" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 hover:bg-[#18181b] hover:text-white hover:border-[#18181b] transition-colors"
                aria-label="Facebook"
              >
                <Icon8 name="facebook" size={14} color="currentColor" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 hover:bg-[#18181b] hover:text-white hover:border-[#18181b] transition-colors"
                aria-label="Instagram"
              >
                <Icon8 name="instagram" size={14} color="currentColor" />
              </a>
            </div>
          </div>

          {/* Navigasi Cepat */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-xs font-semibold text-zinc-950 mb-3.5">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs font-normal">
              {[
                { href: "/", label: "Beranda" },
                { href: "/#armada", label: "Pilihan Armada" },
                { href: "/#keunggulan", label: "Tentang Kami" },
                { href: "/#cara-pesan", label: "Layanan & Alur" },
                { href: "/booking", label: "Pesan Online" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-zinc-500 hover:text-zinc-950 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pilihan Armada */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-zinc-950 mb-3.5">
              Armada Kami
            </h4>
            <ul className="space-y-2 text-xs font-normal">
              {[
                { href: "/armada/hiace-premio", label: "Hiace Premio" },
                { href: "/armada/hiace-commuter", label: "Hiace Commuter" },
                { href: "/armada/hiace-luxury", label: "Hiace Luxury" },
                { href: "/armada", label: "Semua Kendaraan" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-zinc-500 hover:text-zinc-950 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak Layanan */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold text-zinc-950 mb-3.5">
              Hubungi Kami
            </h4>
            <p className="text-xs text-zinc-500">
              Semarang, Jawa Tengah · Layanan Siaga 24 Jam
            </p>
            <p className="mt-1 text-xs font-medium text-zinc-900">
              0838-3807-8833
            </p>

            {/* Input Cepat WhatsApp */}
            <div className="mt-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.open("https://wa.me/6283838078833", "_blank");
                }}
                className="flex items-center rounded-full border border-zinc-200/90 bg-[#f4f4f5] p-1"
              >
                <input
                  type="text"
                  placeholder="Ketik pertanyaan cepat..."
                  className="w-full bg-transparent px-3.5 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 rounded-full bg-[#18181b] px-4 py-1.5 text-xs font-medium text-white hover:bg-black transition-colors"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Garis Pemisah */}
        <div className="my-8 h-px bg-zinc-100" />

        {/* Baris Bawah */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-zinc-400 font-normal">
          <p>© {currentYear} HiaceTrip Indonesia. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <Link href="/#faq" className="hover:text-zinc-600 transition-colors">
              Kebijakan Privasi
            </Link>
            <span>·</span>
            <Link href="/#cara-pesan" className="hover:text-zinc-600 transition-colors">
              Syarat & Ketentuan
            </Link>
            <span>·</span>
            <Link href="/booking" className="hover:text-zinc-600 transition-colors">
              Pusat Bantuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
