import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(request: Request) {
  try {
    // ==========================================
    // AMBIL DATA DARI FORM
    // ==========================================

    const body = await request.json();

    const {
      customerName,
      whatsapp,
      vehicleId,
      startDate,
      endDate,
      location,
      notes,
      totalPrice,
    } = body;

    // ==========================================
    // VALIDASI DATA
    // ==========================================

    if (
      !customerName ||
      !whatsapp ||
      !vehicleId ||
      !startDate ||
      !endDate ||
      !location ||
      totalPrice === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Data booking belum lengkap.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // VALIDASI TANGGAL
    // ==========================================

    if (endDate < startDate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Tanggal selesai tidak boleh sebelum tanggal mulai.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // CEK KETERSEDIAAN LAGI DI SERVER
    // ==========================================

    const { data: conflictingBookings, error: availabilityError } =
      await supabaseAdmin
        .from("bookings")
        .select("id")
        .eq("vehicle_id", vehicleId)
        .not(
          "status",
          "in",
          '("cancelled","completed")'
        )
        .lte("start_date", endDate)
        .gte("end_date", startDate)
        .limit(1);

    // ==========================================
    // JIKA GAGAL CEK DATABASE
    // ==========================================

    if (availabilityError) {
      console.error(
        "Booking availability error:",
        availabilityError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Gagal mengecek ketersediaan kendaraan.",
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // JIKA TERNYATA SUDAH ADA BOOKING
    // ==========================================

    if (
      conflictingBookings &&
      conflictingBookings.length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Maaf, kendaraan sudah dibooking pada tanggal tersebut.",
        },
        {
          status: 409,
        }
      );
    }

    // ==========================================
    // BUAT ID BOOKING
    // ==========================================

    const bookingId =
      `BOOK-${crypto
        .randomUUID()
        .slice(0, 8)
        .toUpperCase()}`;

    // ==========================================
    // SIMPAN BOOKING KE SUPABASE
    // ==========================================

    const { error: insertError } =
      await supabaseAdmin
        .from("bookings")
        .insert({
          id: bookingId,
          customer_name: customerName,
          whatsapp: whatsapp,
          vehicle_id: vehicleId,
          start_date: startDate,
          end_date: endDate,
          location: location,
          notes: notes || "",
          total_price: totalPrice,
          status: "pending",
        });

    // ==========================================
    // JIKA GAGAL SIMPAN
    // ==========================================

    if (insertError) {
      console.error(
        "Supabase booking error:",
        insertError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Booking gagal disimpan.",
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // BERHASIL
    // ==========================================

    return NextResponse.json(
      {
        success: true,
        message: "Booking berhasil disimpan.",
        bookingId: bookingId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Booking API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan pada server.",
      },
      {
        status: 500,
      }
    );
  }
}