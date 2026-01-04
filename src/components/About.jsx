import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"
import { Star, Users, Zap } from "lucide-react"

export default function AboutSection() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  const stats = [
    { icon: Star, number: "50+", label: "Premium Tables", color: "from-amber-400 to-amber-600" },
    { icon: Users, number: "1000+", label: "Active Members", color: "from-amber-500 to-amber-700" },
    { icon: Zap, number: "15+", label: "Years Excellence", color: "from-amber-600 to-amber-800" },
  ]

  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated && inView ? "visible" : hasAnimated ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Image */}
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 border border-amber-600/30 shadow-2xl">
              <img
                src="/luxury-billiards-lounge-interior-with-professional.jpg"
                alt="Legends Academy interior"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Right side - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Our Legacy</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600" />
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                Legends Academy represents the pinnacle of billiards culture. Since our founding, we've dedicated
                ourselves to preserving the art and elegance of pool, snooker, and the finest social experiences.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Every table, every drink, every moment is carefully curated. We don't just offer billiards—we offer
                membership into a world of distinguished play, premium amenities, and unforgettable traditions.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-4 rounded-lg bg-gradient-to-br from-amber-600/15 to-slate-900/40 border border-amber-600/30 hover:border-amber-500/60 transition-all"
                  >
                    <Icon className="w-5 h-5 text-amber-500 mb-2" />
                    <div className="text-2xl font-bold text-amber-400">{stat.number}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

