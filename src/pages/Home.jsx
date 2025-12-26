import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Header from "../components/Header"
import HeroSection from "../components/Hero"
import VenueShowcase from "../components/VenueShowcase"
import AboutSection from "../components/About"
import ServicesSection from "../components/Services"
import GallerySection from "../components/Gallery"
import EventsSection from "../components/Events"
import PricingSection from "../components/Pricing"
import Footer from "../components/Footer"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section if coming from navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 300)
    }
  }, [location.state])

  // Smooth transition calculation
  // Transition happens over the first 800px of scroll
  const transitionDistance = 800
  const scrollProgress = Math.min(scrollY / transitionDistance, 1)
  
  // Ease function for smoother transition
  const easeInOutCubic = (t) => t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2
  
  const easedProgress = easeInOutCubic(scrollProgress)

  return (
    <div className="text-white min-h-screen relative overflow-x-hidden bg-black">
      {/* Smooth color transition overlay that fades from hero gradient to black */}
      <div 
        className="fixed inset-0 pointer-events-none z-[5] transition-opacity duration-200 ease-out"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(15, 23, 42, ${0.6 * (1 - easedProgress)}) 0%,
            rgba(15, 23, 42, ${0.5 * (1 - easedProgress)}) 30%,
            rgba(0, 0, 0, ${easedProgress * 0.6}) 60%,
            rgba(0, 0, 0, ${0.4 + easedProgress * 0.6}) 100%
          )`,
          opacity: 1
        }}
      />
      
      <div className="relative z-10">
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
    </div>
  )
}
