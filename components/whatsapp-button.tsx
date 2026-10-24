"use client";

import Icon8 from "./icons8";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/6283838078833?text=Halo%20HiaceTrip,%20saya%20ingin%20tanya%20tentang%20sewa%20Hiace."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#18181b] px-4 py-2.5 text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-white/10 hover:bg-black hover:scale-105 transition-all duration-200"
      aria-label="Hubungi WhatsApp"
    >
      <Icon8 name="whatsapp" size={16} color="#ffffff" />
      <span className="text-xs font-medium">Hubungi WhatsApp</span>
    </a>
  );
}
