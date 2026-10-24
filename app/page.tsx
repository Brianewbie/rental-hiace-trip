import Navbar from "../components/navbar";
import Hero from "../components/hero";
import BookingSearch from "../components/booking-search";
import ValueStats from "../components/value-stats";
import VehicleSection from "../components/vehicle-section";
import LuxuryDial from "../components/luxury-dial";
import TopPicks from "../components/top-picks";
import BookingSteps from "../components/booking-steps";
import TestimonialCard from "../components/testimonial-card";
import FaqAccordion from "../components/faq-accordion";
import Footer from "../components/footer";
import WhatsAppButton from "../components/whatsapp-button";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* 1. Hero Showcase matching reference screenshot */}
        <Hero />

        {/* 2. Drive Luxury Live Freedom + Stats matching screenshot */}
        <ValueStats />

        {/* 4. Find Your Perfect Ride (3-Col Vehicle Fleet) */}
        <VehicleSection />

        {/* 5. Luxury Meets Reliability (Dial & Arc Interactive Showcase) */}
        <LuxuryDial />

        {/* 6. Top Picks This Week (Side Profile Showcase) */}
        <TopPicks />

        {/* 7. Simple. Fast. Hassle-Free. (6-Step Booking Process + Scenic Card) */}
        <BookingSteps />

        {/* 8. Trusted by Thousands (Testimonials with Icons8 Quotes) */}
        <TestimonialCard />

        {/* 9. Got questions? We've got answers! (Interactive FAQ Accordion) */}
        <FaqAccordion />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}