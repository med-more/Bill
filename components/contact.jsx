"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.2 })

  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      value: "742 Evergreen Terrace, Springfield",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
    },
    {
      icon: Mail,
      label: "Email",
      value: "legends@academy.com",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon-Thu: 5PM-12AM | Fri-Sun: 2PM-2AM",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="contact" className="py-20 bg-slate-950 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Visit Us Today</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join the Legends Academy community. Experience precision, luxury, and unforgettable moments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex gap-4 p-4 rounded-lg bg-amber-950/30 border border-amber-600/30 hover:border-amber-500/50 transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-slate-950">
                      <Icon size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{info.label}</h4>
                    <p className="text-gray-400 text-sm mt-1">{info.value}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            <motion.input
              variants={itemVariants}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-amber-950/30 border border-amber-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all"
            />
            <motion.input
              variants={itemVariants}
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-amber-950/30 border border-amber-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all"
            />
            <motion.textarea
              variants={itemVariants}
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-amber-950/30 border border-amber-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all resize-none"
            />
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-6 py-2.5 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all uppercase tracking-widest"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="border-t border-amber-600/30 mt-16 pt-8 text-center text-gray-400 text-sm"
      >
        <p>&copy; 2025 Legends Academy. All rights reserved. | Excellence • Precision • Legacy</p>
      </motion.div>
    </section>
  )
}
