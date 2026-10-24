"use client";

import { useEffect, useState } from "react";
import Icon8, { Icon8Name } from "../../components/icons8";
import Link from "next/link";

type Booking = {
  id: string;
  customer_name: string;
  whatsapp: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  location: string;
  notes: string;
  total_price: number;
  status: "pending" | "confirmed" | "paid" | "completed" | "cancelled";
  created_at: string;
};

const STATUS_CONFIG: Record<
  string,
  { label: string; class: string; icon: Icon8Name }
> = {
  pending: { label: "Menunggu", class: "badge-pending", icon: "clock" },
  confirmed: { label: "Dikonfirmasi", class: "badge-confirmed", icon: "badge-check" },
  paid: { label: "Lunas", class: "badge-paid", icon: "wallet" },
  completed: { label: "Selesai", class: "badge-completed", icon: "check" },
  cancelled: { label: "Dibatalkan", class: "badge-cancelled", icon: "close" },
};

const VEHICLE_NAMES: Record<string, string> = {
  "hiace-premio": "Hiace Premio",
  "hiace-commuter": "Hiace Commuter",
  "hiace-luxury": "Hiace Luxury",
};

const ADMIN_PASSWORD = "admin123";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Password salah. Coba lagi.");
    }
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/bookings");
      if (!response.ok) throw new Error("Gagal mengambil data booking.");
      const result = await response.json();
      if (result.success) {
        setBookings(result.bookings || []);
      } else {
        throw new Error(result.message || "Gagal mengambil data.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    setIsUpdating(true);
    setUpdateMessage("");
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal mengupdate status.");
      }
      setUpdateMessage(
        `Status berhasil diupdate ke: ${STATUS_CONFIG[newStatus]?.label}`
      );
      fetchBookings();
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking({
          ...selectedBooking,
          status: newStatus as Booking["status"],
        });
      }
      setTimeout(() => setUpdateMessage(""), 3000);
    } catch (err: unknown) {
      setUpdateMessage(
        err instanceof Error ? err.message : "Gagal mengupdate status."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      b.id.toLowerCase().includes(query) ||
      b.customer_name.toLowerCase().includes(query) ||
      b.whatsapp.includes(query) ||
      b.location.toLowerCase().includes(query) ||
      VEHICLE_NAMES[b.vehicle_id]?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    paid: bookings.filter((b) => b.status === "paid").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    revenue: bookings
      .filter((b) => b.status === "paid" || b.status === "completed")
      .reduce((sum, b) => sum + b.total_price, 0),
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="relative w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-xl shadow-orange-500/20 mb-3">
              <Icon8 name="shield-check" size={26} color="#ffffff" />
            </div>
            <h1 className="text-2xl font-black text-white">Panel Masuk Pengelola</h1>
            <p className="mt-1 text-slate-400 text-xs">Sistem Manajemen HiaceTrip</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Kata Sandi Pengelola
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi pengelola..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-hidden focus:border-orange-500 transition-all"
                />
              </div>

              {loginError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-400 flex items-center gap-2">
                  <Icon8 name="close" size={14} color="#f87171" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 py-3 text-xs font-bold text-white shadow-md hover:bg-orange-600 transition-colors"
              >
                Masuk ke Panel Pengelola
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] text-slate-500">
              Akses khusus staf internal HiaceTrip
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
              <Icon8 name="van" size={18} color="#ffffff" />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">HiaceTrip</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Panel Pengelola</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <div className="flex items-center gap-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 px-4 py-2.5 text-orange-400">
            <Icon8 name="clipboard" size={16} color="#f97316" />
            <span className="text-xs font-bold">Semua Reservasi</span>
          </div>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Icon8 name="home" size={16} color="currentColor" />
            <span>Kunjungi Situs Web</span>
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <Icon8 name="close" size={16} color="currentColor" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-white">Panel Reservasi</h1>
              <p className="text-xs text-slate-400">Kelola seluruh reservasi armada Hiace</p>
            </div>
            <div className="flex items-center gap-3">
              {updateMessage && (
                <div
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                    updateMessage.includes("berhasil")
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {updateMessage}
                </div>
              )}
              <button
                onClick={fetchBookings}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                <span>Perbarui Data</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="text-xs font-semibold text-slate-400">Total Reservasi</span>
              <p className="mt-2 text-3xl font-extrabold text-white">{stats.total}</p>
            </div>
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
              <span className="text-xs font-semibold text-yellow-500/80">Menunggu Konfirmasi</span>
              <p className="mt-2 text-3xl font-extrabold text-yellow-400">{stats.pending}</p>
            </div>
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
              <span className="text-xs font-semibold text-green-500/80">Aktif & Lunas</span>
              <p className="mt-2 text-3xl font-extrabold text-green-400">{stats.paid + stats.confirmed}</p>
            </div>
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
              <span className="text-xs font-semibold text-orange-500/80">Estimasi Pendapatan</span>
              <p className="mt-2 text-2xl font-extrabold text-orange-400">
                Rp {(stats.revenue / 1000000).toFixed(1)}Jt
              </p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <Icon8 name="search" size={15} color="currentColor" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ID, nama pelanggan, lokasi..."
                className="w-full rounded-full border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-hidden focus:border-slate-700 transition-colors"
              />
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {["all", "pending", "confirmed", "paid", "completed", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                    statusFilter === status
                      ? "bg-orange-500 text-white"
                      : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                  }`}
                >
                  {status === "all" ? "Semua" : STATUS_CONFIG[status]?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table + Detail Layout */}
          {!isLoading && !error && (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Daftar Reservasi ({filteredBookings.length})
                  </h2>
                </div>

                {filteredBookings.length === 0 ? (
                  <div className="py-16 text-center text-slate-500 text-xs">
                    Tidak ada data pemesanan yang sesuai.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800">
                    {filteredBookings.map((booking) => {
                      const statusCfg = STATUS_CONFIG[booking.status];
                      const isSelected = selectedBooking?.id === booking.id;
                      return (
                        <div
                          key={booking.id}
                          onClick={() => setSelectedBooking(isSelected ? null : booking)}
                          className={`cursor-pointer px-6 py-4 hover:bg-slate-800/40 transition-colors ${
                            isSelected ? "bg-orange-500/10 border-l-2 border-l-orange-500" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-orange-400">{booking.id}</span>
                                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusCfg?.class}`}>
                                  {statusCfg?.label}
                                </span>
                              </div>
                              <p className="mt-1 font-bold text-white text-sm">{booking.customer_name}</p>
                              <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-slate-400">
                                <span>{VEHICLE_NAMES[booking.vehicle_id] || booking.vehicle_id}</span>
                                <span>·</span>
                                <span>{booking.start_date} s/d {booking.end_date}</span>
                                <span>·</span>
                                <span>{booking.location}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-sm font-extrabold text-white">
                                Rp {booking.total_price.toLocaleString("id-ID")}
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                {new Date(booking.created_at).toLocaleDateString("id-ID")}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-4">
                {selectedBooking ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5 sticky top-24">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rincian Reservasi</span>
                      <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-white">
                        <Icon8 name="close" size={16} color="currentColor" />
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">ID Pesanan</span>
                      <p className="font-mono font-bold text-orange-400 text-base">{selectedBooking.id}</p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1.5 text-xs">
                      <p className="text-slate-400">Pemesan: <strong className="text-white">{selectedBooking.customer_name}</strong></p>
                      <p className="text-slate-400">WhatsApp: <strong className="text-white">{selectedBooking.whatsapp}</strong></p>
                      <p className="text-slate-400">Lokasi: <strong className="text-white">{selectedBooking.location}</strong></p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block mb-2">Perbarui Status</span>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(STATUS_CONFIG).map(([status, cfg]) => (
                          <button
                            key={status}
                            onClick={() => handleUpdateStatus(selectedBooking.id, status)}
                            disabled={isUpdating || selectedBooking.status === status}
                            className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                              selectedBooking.status === status
                                ? "bg-orange-500 text-white"
                                : "border border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                          >
                            {cfg.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${selectedBooking.whatsapp.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(selectedBooking.customer_name)},%20reservasi%20HiaceTrip%20Anda%20dengan%20ID%20${selectedBooking.id}%20telah%20kami%20proses.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 py-3 text-xs font-bold text-white hover:bg-green-700 transition-colors"
                    >
                      <Icon8 name="whatsapp" size={15} color="#ffffff" />
                      <span>Hubungi Pemesan via WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-xs text-slate-500">
                    Pilih salah satu data reservasi untuk melihat rincian dan memperbarui statusnya.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
