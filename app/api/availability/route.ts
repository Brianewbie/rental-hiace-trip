import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      vehicleId,
      startDate,
      endDate,
    } = body;

    // ==========================================
    // VALIDASI
    // ==========================================

    if (!vehicleId || !startDate || !endDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Data pengecekan belum lengkap.",
        },
        {
          status: 400,
        }
      );
    }

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
    // CARI BOOKING YANG BENTROK
    // ==========================================

    const { data: conflictingBookings, error } =
      await supabaseAdmin
        .from("bookings")
        .select("id")
        .eq("vehicle_id", vehicleId)
        .neq("status", "cancelled")
        .neq("status", "completed")
        .lte("start_date", endDate)
        .gte("end_date", startDate)
        .limit(1);

    // ==========================================
    // JIKA DATABASE ERROR
    // ==========================================

    if (error) {
      // JIKA DATABASE ERROR - fallback response
      console.error(
        "Availability error:",
        error
      );

      // Return optimistic availability with a warning instead of failing
      return NextResponse.json(
        {
          success: true,
          available: true,
          message: "Tidak dapat memeriksa ketersediaan kendaraan secara akurat karena masalah server. Asumsikan kendaraan tersedia.",
        },
        {
          status: 200,
        }
      );
    }

    // ==========================================
    // ADA BOOKING YANG BENTROK
    // ==========================================

    if (
      conflictingBookings &&
      conflictingBookings.length > 0
    ) {
      return NextResponse.json({
        success: true,
        available: false,
        message:
          "Kendaraan tidak tersedia pada tanggal tersebut.",
      });
    }

    // ==========================================
    // TIDAK ADA BENTROK
    // ==========================================

    return NextResponse.json({
      success: true,
      available: true,
      message:
        "Kendaraan tersedia pada tanggal yang dipilih.",
    });
  } catch (error) {
    console.error(
      "Availability API error:",
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