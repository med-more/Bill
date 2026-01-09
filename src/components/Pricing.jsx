import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Link } from "react-router-dom"

export default function PricingSection() {
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

  const pricingCards = [
    {
      name: "Casual Play",
      slug: "casual",
      price: "150",
      period: "/hour",
      description: "Perfect for casual games",
      features: ["Standard pool table", "Cue and ball rental", "Coffee and soft drinks", "Weekday discounts"],
      highlighted: false,
    },
    {
      name: "Premium Member",
      slug: "premium",
      price: "300",
      period: "/hour",
      description: "The ultimate experience",
      features: [
        "Championship table",
        "Professional cue selection",
        "Premium bar access",
        "Priority booking",
        "Tournament eligibility",
        "VIP lounge access",
      ],
      highlighted: true,
    },
    {
      name: "Private Events",
      slug: "private",
      price: "Custom",
      period: "pricing",
      description: "For your occasion",
      features: [
        "Multiple tables reserved",
        "Private space rental",
        "Catering available",
        "Event coordination",
        "Entertainment options",
        "Photography included",
      ],
      highlighted: false,
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
    <section id="pricing" className="py-20 bg-black relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated && inView ? { opacity: 1, y: 0 } : hasAnimated ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Membership</h2>
          <p className="text-gray-400">Transparent pricing for every experience level</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated && inView ? "visible" : hasAnimated ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {pricingCards.map((card, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`relative rounded-xl p-8 backdrop-blur-sm transition-all ${
                card.highlighted
                  ? "bg-gradient-to-br from-amber-600/20 to-amber-700/10 border-2 border-amber-500/50 transform md:scale-105"
                  : "bg-amber-950/20 border border-amber-600/30"
              }`}
            >
              {card.highlighted && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1 rounded-bl-lg font-bold text-xs uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{card.name}</h3>
              <p className="text-gray-400 text-xs mb-4 uppercase tracking-widest">{card.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-amber-500">{card.price} {card.price !== "Custom" && "DH"}</span>
                <span className="text-gray-400 ml-2 text-sm">{card.period}</span>
              </div>
              {card.highlighted ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const whatsappNumber = "212673848023"
                    const message = encodeURIComponent("Hi! I'm interested in becoming a Premium Member at Legends Academy")
                    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
                  }}
                  className="w-full py-2 rounded text-sm font-bold mb-6 transition-all uppercase tracking-widest bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:shadow-lg hover:shadow-amber-500/50"
                >
                  Become Member
                </motion.button>
              ) : (
                <Link to={`/membership/${card.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 rounded text-sm font-bold mb-6 transition-all uppercase tracking-widest border border-amber-600/50 text-amber-500 hover:border-amber-500 hover:text-amber-400"
                  >
                    Learn More
                  </motion.button>
                </Link>
              )}
              <ul className="space-y-2">
                {card.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check size={16} className="text-amber-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

