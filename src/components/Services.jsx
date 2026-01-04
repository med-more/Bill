import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"
import { SquareStack, Martini, Users } from "lucide-react"

export default function ServicesSection() {
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

  const services = [
    {
      icon: SquareStack,
      title: "Championship Tables",
      description: "World-class billiard tables with hourly bookings, tournaments, and exclusive league play.",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Martini,
      title: "Premium Cafe & Bar",
      description: "Artisan coffee, craft cocktails, and curated spirits crafted by expert mixologists.",
      color: "from-amber-600 to-amber-700",
    },
    {
      icon: Users,
      title: "Private Events",
      description: "Host corporate events, celebrations, and tournaments in our exclusive private sanctuaries.",
      color: "from-amber-400 to-amber-600",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="services" className="py-20 bg-black relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated && inView ? { opacity: 1, y: 0 } : hasAnimated ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Experience the complete Legends Academy collection</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated && inView ? "visible" : hasAnimated ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-xl bg-gradient-to-br from-amber-950/30 to-slate-950 border border-amber-600/30 hover:border-amber-500/50 transition-all cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} p-2.5 mb-4 text-slate-950 flex items-center justify-center`}
                >
                  <Icon size={20} />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

