"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Clock, Award, Users, Trophy } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Events", href: "#events" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "/contact" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
  ]

  const features = [
    { icon: Trophy, label: "Championship Venue" },
    { icon: Users, label: "Premium Community" },
    { icon: Award, label: "World Class Service" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 mb-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <span className="text-slate-950 font-bold text-lg">LA</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">LEGENDS</p>
                  <p className="text-amber-400 text-xs">ACADEMY</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Experience luxury billiards, premium coffee, and elegant dining in our world-class establishment.
              </p>
              <div className="flex gap-3 pt-4">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={i}
                      href={social.href}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 hover:bg-amber-500/40 transition-all"
                    >
                      <Icon size={16} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-bold text-white text-sm uppercase tracking-widest">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link, i) => (
                  <li key={i}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2"
                    >
                      <motion.span animate={{ scaleX: [0, 1] }} transition={{ duration: 0.3 }}>
                        ▸
                      </motion.span>
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-bold text-white text-sm uppercase tracking-widest">Contact</h3>
              <div className="space-y-3">
                <a href="tel:+15551234567" className="flex gap-3 text-gray-400 hover:text-amber-400 transition-colors">
                  <Phone size={16} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </a>
                <a
                  href="mailto:legends@academy.com"
                  className="flex gap-3 text-gray-400 hover:text-amber-400 transition-colors"
                >
                  <Mail size={16} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm">legends@academy.com</span>
                </a>
                <div className="flex gap-3 text-gray-400">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm">742 Evergreen Terrace, Springfield</span>
                </div>
                <div className="flex gap-3 text-gray-400">
                  <Clock size={16} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Mon-Thu: 5PM-12AM
                    <br />
                    Fri-Sun: 2PM-2AM
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-bold text-white text-sm uppercase tracking-widest">Why Choose Us</h3>
              <div className="space-y-3">
                {features.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <div key={i} className="flex gap-2 text-gray-400 text-sm">
                      <Icon size={16} className="flex-shrink-0 text-amber-500 mt-0.5" />
                      <span>{feature.label}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent my-12 origin-left"
          />

          {/* Bottom Footer */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <motion.p variants={itemVariants} className="text-gray-500 text-sm">
              &copy; {currentYear} Legends Academy. All rights reserved.
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-6 text-gray-500 text-sm">
              <a href="#" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Sitemap
              </a>
            </motion.div>
            <motion.p variants={itemVariants} className="text-amber-400 font-semibold text-sm">
              Excellence • Precision • Legacy
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
