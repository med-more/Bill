"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check } from "lucide-react"

export default function PricingSection() {
  const { ref, inView } = useInView({ threshold: 0.2 })

  const pricingCards = [
    {
      name: "Casual Play",
      price: "150",
      period: "/hour",
      description: "Perfect for casual games",
      features: ["Standard pool table", "Cue and ball rental", "Coffee and soft drinks", "Weekday discounts"],
      highlighted: false,
    },
    {
      name: "Premium Member",
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
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="pricing" className="py-20 bg-slate-950 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Membership</h2>
          <p className="text-gray-400">Transparent pricing for every experience level</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
              <button
                className={`w-full py-2 rounded text-sm font-bold mb-6 transition-all uppercase tracking-widest ${
                  card.highlighted
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:shadow-lg hover:shadow-amber-500/50"
                    : "border border-amber-600/50 text-amber-500 hover:border-amber-500 hover:text-amber-400"
                }`}
              >
                {card.highlighted ? "Become Member" : "Learn More"}
              </button>
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
