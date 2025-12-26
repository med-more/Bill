"use client"

import Header from "@/components/header"
import HeroSection from "@/components/hero"
import VenueShowcase from "@/components/venue-showcase"
import AboutSection from "@/components/about"
import ServicesSection from "@/components/services"
import GallerySection from "@/components/gallery"
import EventsSection from "@/components/events"
import PricingSection from "@/components/pricing"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <VenueShowcase />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <EventsSection />
        <PricingSection />
      </div>
      <Footer />
    </div>
  )
}
