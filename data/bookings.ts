export type BookingStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "completed"
  | "cancelled";

export type Booking = {
  id: string;
  vehicleId: string;
  customerName: string;
  whatsapp: string;
  startDate: string;
  endDate: string;
  location: string;
  notes: string;
  totalPrice: number;
  status: BookingStatus;
};

export const bookings: Booking[] = [
  {
    id: "BOOK-001",
    vehicleId: "hiace-premio",
    customerName: "Budi",
    whatsapp: "081234567890",
    startDate: "2026-09-25",
    endDate: "2026-09-27",
    location: "Semarang",
    notes: "Contoh booking untuk testing",
    totalPrice: 1700000,
    status: "confirmed",
  },
];