"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon8 from "./icons8";
import CustomDatePicker from "./custom-date-picker";

export default function BookingSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (startDate) params.set("start", startDate);
    if (endDate) params.set("end", endDate);
    if (location) params.set("location", location);
    router.push(`/armada?${params.toString()}`);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="relative -mt-10 sm:-mt-14 z-30 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Sleek Floating Pill Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xl shadow-slate-200/50">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
            {/* Lokasi */}
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Icon8 name="map-pin" size={14} color="#f97316" />
                <span>Lokasi Penjemputan</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Kota / Alamat Penjemputan"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden transition-all"
              />
            </div>

            {/* Tanggal Mulai */}
            <div>
              <CustomDatePicker
                label="Tanggal Mulai"
                value={startDate}
                min={today}
                placeholder="Pilih tanggal mulai..."
                onChange={(dateStr) => {
                  setStartDate(dateStr);
                  if (endDate && dateStr > endDate) setEndDate("");
                }}
              />
            </div>

            {/* Tanggal Selesai */}
            <div>
              <CustomDatePicker
                label="Tanggal Selesai"
                value={endDate}
                min={startDate || today}
                placeholder="Pilih tanggal selesai..."
                onChange={(dateStr) => setEndDate(dateStr)}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="button"
                onClick={handleSearch}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-orange-600 transition-colors"
              >
                <Icon8 name="search" size={16} color="#ffffff" />
                <span>Cari Ketersediaan</span>
              </button>
            </div>
          </div>

          {/* Quick tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 text-xs">
            <span className="font-semibold text-slate-400">Pilihan Populer:</span>
            {["Semarang", "Yogyakarta", "Solo", "Wisata Dieng", "Wisata Bromo", "Antar Jemput Bandara"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setLocation(tag)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600 hover:border-slate-400 hover:text-slate-900 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}