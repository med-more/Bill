"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react"
import Lottie from "lottie-react"
import contactAnimation from "@/public/animations/contact.json"

export default function ContactPage() {
  const { ref, inView } = useInView({ threshold: 0.2 })
  const whatsappNumber = "+1234567890" // Replace with actual WhatsApp number

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

  const handleWhatsAppReserve = () => {
    const message = encodeURIComponent("Hi! I'd like to reserve a table at Legends Academy")
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`, "_blank")
  }

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
    <div className="bg-slate-950 text-white min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Get In Touch</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Join the Legends Academy community. We're here to answer any questions and make your reservations
              seamless.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-20 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Contact Info Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-white mb-8">
                Contact Information
              </motion.h2>

              {contactInfo.map((info, i) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex gap-4 p-6 rounded-xl bg-gradient-to-r from-amber-950/40 to-amber-950/20 border border-amber-600/40 hover:border-amber-500/60 transition-all cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-slate-950">
                        <Icon size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{info.label}</h4>
                      <p className="text-gray-300 text-sm mt-1">{info.value}</p>
                    </div>
                  </motion.div>
                )
              })}

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppReserve}
                className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
              >
                <MessageCircle size={18} />
                Reserve via WhatsApp
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="relative bg-gradient-to-br from-amber-950/40 to-amber-950/20 rounded-2xl border border-amber-600/40 p-6 overflow-hidden">
                <div className="w-full h-96 rounded-xl overflow-hidden bg-slate-900/50">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290255!2d-74.00601!3d40.71278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDC26MzA3LjAwIk4gNzTCsDAwJzAyLjE2Ilc!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-amber-400 text-sm font-semibold mt-4 flex items-center gap-2"
                >
                  <MapPin size={16} /> 742 Evergreen Terrace, Springfield
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Lottie Animation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block"
            >
              <div className="w-full h-96 flex items-center justify-center">
                <div className="w-80 h-80">
                  <Lottie animationData={contactAnimation} loop={true} autoplay={true} />
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold text-white mb-6">Send us a Message</h3>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 text-sm rounded-lg bg-amber-950/30 border border-amber-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 text-sm rounded-lg bg-amber-950/30 border border-amber-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 text-sm rounded-lg bg-amber-950/30 border border-amber-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-6 py-3 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
              >
                Send Message
                <ArrowRight size={16} />
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  )
}
