import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HiaceTrip – Sewa Hiace Nyaman & Mewah",
  description: "Layanan sewa Toyota Hiace Premio, Commuter, dan Luxury terpercaya untuk perjalanan keluarga, wisata, dan dinas VIP.",
  keywords: "rental hiace, sewa hiace, hiace premio, hiace commuter, hiace luxury, rental mobil semarang",
  openGraph: {
    title: "HiaceTrip – Sewa Hiace Nyaman & Mewah",
    description: "Armada Toyota Hiace terawat prima, driver profesional, harga transparan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}