"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Icon8 from "./icons8";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Beranda");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "Beranda", label: "Beranda", href: "/" },
    { id: "Tentang", label: "Tentang Kami", href: "/#keunggulan" },
    { id: "Armada", label: "Pilihan Armada", href: "/#armada" },
    { id: "Layanan", label: "Layanan", href: "/#cara-pesan" },
    { id: "FAQ", label: "Tanya Jawab", href: "/#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] py-3"
          : "bg-white/90 backdrop-blur-xs py-4 sm:py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Brand Logo - tipografi bersih seperti pada gambar */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl sm:text-[22px] font-semibold tracking-[-0.03em] text-zinc-950">
            Hiace<span className="text-orange-500">Trip</span>
          </span>
        </Link>

        {/* Kapsul Navigasi Mengambang (100% Bahasa Indonesia) */}
        <nav className="hidden md:flex items-center rounded-full bg-[#f4f4f5] p-1 border border-zinc-200/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#18181b] text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-white/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Aksi Kanan: Ikon Pencarian + Tombol Pil "Hubungi Kami" */}
        <div className="flex items-center gap-3">
          <Link
            href="/#armada"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            aria-label="Cari armada"
          >
            <Icon8 name="search" size={17} color="currentColor" />
          </Link>

          <Link
            href="/booking"
            className="btn-pill-dark"
          >
            Hubungi Kami
          </Link>

          {/* Tombol menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/90 bg-white text-zinc-800 hover:bg-zinc-50 transition-colors shadow-xs"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            {menuOpen ? (
              <Icon8 name="close" size={15} color="#18181b" />
            ) : (
              <Icon8 name="menu" size={16} color="#18181b" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white/98 backdrop-blur-md px-6 py-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                setActiveTab(item.id);
                setMenuOpen(false);
              }}
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="btn-pill-dark w-full text-center"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}