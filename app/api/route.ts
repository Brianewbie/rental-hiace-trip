import { NextResponse } from "next/server";

// Minimal root API route to satisfy Next.js type validation.
// It simply returns a JSON payload indicating the API base is reachable.
export async function GET() {
  return NextResponse.json({ message: "Rental Hiace API root" });
}

export async function POST() {
  return NextResponse.json({ error: "POST not implemented on root" }, { status: 405 });
}
