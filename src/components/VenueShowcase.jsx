import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"
import { MapPin, Users, Trophy, Clock } from "lucide-react"

export default function VenueShowcase() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      
      // Only animate when scrolling down and element is in view
      // Once animated, keep it visible (don't reset on scroll up)
      if (inView && scrollDelta > 0 && !hasAnimated) {
        setHasAnimated(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [inView, lastScrollY, hasAnimated])

  const features = [
    {
      icon: Trophy,
      title: "Championship Tables",
      description: "Professional-grade billiards and snooker tables",
    },
    {
      icon: Users,
      title: "Premium Atmosphere",
      description: "Elegant lounge spaces perfect for any occasion",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Members enjoy round-the-clock facility access",
    },
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Centrally located for easy accessibility",
    },
  ]

  return (
    <section id="venue" className="py-20 bg-black relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated && inView ? { opacity: 1, y: 0 } : hasAnimated ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Discover Legends Academy</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A sanctuary where excellence meets tradition. Experience the pinnacle of billiards culture combined with
            luxury amenities
          </p>
        </motion.div>

        {/* Image Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={hasAnimated && inView ? { opacity: 1, x: 0 } : hasAnimated ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0 }}
            className="rounded-2xl overflow-hidden aspect-video relative group"
          >
            <img
              src="/luxury-billiards-lounge-with-premium-tables-and-li.jpg"
              alt="Legends Academy Main Hall"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            <motion.div
              className="absolute bottom-6 left-6"
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated && inView ? { opacity: 1, y: 0 } : hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold text-white">Main Hall</h3>
              <p className="text-amber-400 text-sm">Championship Tables & Lounge</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={hasAnimated && inView ? { opacity: 1, x: 0 } : hasAnimated ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="rounded-2xl overflow-hidden aspect-video relative group"
          >
            <img
              src="/elegant-billiards-lounge-bar-with-premium-drinks-a.jpg"
              alt="Legends Academy VIP Lounge"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            <motion.div
              className="absolute bottom-6 left-6"
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated && inView ? { opacity: 1, y: 0 } : hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
            >
              <h3 className="text-2xl font-bold text-white">VIP Lounge</h3>
              <p className="text-amber-400 text-sm">Premium Bar & Private Events</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated && inView ? { opacity: 1, y: 0 } : hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-gradient-to-br from-amber-600/10 to-slate-900/50 border border-amber-600/30 hover:border-amber-500/60 transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-amber-500 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Additional Images Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={hasAnimated && inView ? { opacity: 1, scale: 1 } : hasAnimated ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="rounded-xl overflow-hidden aspect-square relative group"
          >
            <img
              src="/professional-billiards-tournament-table-setup.jpg"
              alt="Tournament Space"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
              <h4 className="text-white font-bold">Tournament Space</h4>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={hasAnimated && inView ? { opacity: 1, scale: 1 } : hasAnimated ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="rounded-xl overflow-hidden aspect-square relative group"
          >
            <img
              src="/luxury-lounge-seating-with-modern-furniture-and-li.jpg"
              alt="Lounge Area"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
              <h4 className="text-white font-bold">Lounge Area</h4>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={hasAnimated && inView ? { opacity: 1, scale: 1 } : hasAnimated ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="rounded-xl overflow-hidden aspect-square relative group"
          >
            <img
              src="/premium-restaurant-dining-area-with-elegant-ambian.jpg"
              alt="Dining Space"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
              <h4 className="text-white font-bold">Dining Space</h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

