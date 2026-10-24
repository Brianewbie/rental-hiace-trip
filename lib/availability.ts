import { vehicles } from "../data/vehicles";
import { bookings } from "../data/bookings";

export function isVehicleAvailable(
  vehicleId: string,
  startDate: string,
  endDate: string
) {
  const conflict = bookings.some((booking) => {
    // Booking kendaraan lain tidak dihitung
    if (booking.vehicleId !== vehicleId) {
      return false;
    }

    // Booking yang sudah dibatalkan atau selesai
    // tidak lagi membuat kendaraan menjadi tidak tersedia
    if (
      booking.status === "cancelled" ||
      booking.status === "completed"
    ) {
      return false;
    }

    // Mengecek apakah tanggal booking bertabrakan
    return (
      startDate <= booking.endDate &&
      endDate >= booking.startDate
    );
  });

  // Kalau tidak ada konflik = tersedia
  return !conflict;
}

export function getAvailableVehicles(
  startDate: string,
  endDate: string
) {
  return vehicles.filter((vehicle) =>
    isVehicleAvailable(
      vehicle.id,
      startDate,
      endDate
    )
  );
}