import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";

// ==========================================
// GET - Ambil semua booking
// ==========================================
export async function GET() {
  try {
    const { data: bookings, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin bookings fetch error:", error);
      return NextResponse.json(
        { success: false, message: "Gagal mengambil data booking." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      bookings: bookings || [],
    });
  } catch (error) {
    console.error("Admin GET error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}

// ==========================================
// PATCH - Update status booking
// ==========================================
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { bookingId, status } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        { success: false, message: "bookingId dan status wajib diisi." },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "confirmed", "paid", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Status tidak valid." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("bookings")
      .update({ status })
      .eq("id", bookingId);

    if (error) {
      console.error("Admin update status error:", error);
      return NextResponse.json(
        { success: false, message: "Gagal mengupdate status." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status booking ${bookingId} berhasil diupdate ke ${status}.`,
    });
  } catch (error) {
    console.error("Admin PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
