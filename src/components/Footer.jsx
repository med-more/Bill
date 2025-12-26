import { motion } from "framer-motion"
import { Facebook, Instagram } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: "#", color: "from-pink-500 to-pink-600" },
    { icon: Facebook, href: "#", color: "from-blue-500 to-blue-600" },
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
    <footer className="bg-black text-white relative overflow-hidden">
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
          {/* Mobile Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:hidden space-y-6 text-center"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="flex justify-center mb-4">
              <Link to="/" className="flex items-center gap-3">
                <motion.img
                  src="/logo.jpg"
                  alt="Legends Academy Logo"
                  className="h-16 w-16 rounded-full object-cover border-2 border-amber-500/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
              Experience luxury billiards, premium coffee, and elegant dining in our world-class establishment.
            </motion.p>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex justify-center gap-4 pt-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center text-white transition-all`}
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent my-8"
            />

            {/* Copyright and Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-gray-500 text-sm">
                &copy; {currentYear} Legends Academy. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-gray-500 text-sm">
                <Link to="/privacy-policy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/sitemap" className="hover:text-amber-400 transition-colors">
                  Sitemap
                </Link>
              </div>
              <p className="text-amber-400 font-semibold text-sm">
                Excellence • Precision • Legacy
              </p>
            </motion.div>
          </motion.div>

          {/* Desktop Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:grid md:grid-cols-4 gap-8 mb-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <motion.img
                  src="/logo.jpg"
                  alt="Legends Academy Logo"
                  className="h-12 w-12 rounded-full object-cover border-2 border-amber-500/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
                <div>
                  <p className="text-white font-bold text-sm">LEGENDS</p>
                  <p className="text-amber-400 text-xs">ACADEMY</p>
                </div>
              </Link>
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
                      className={`w-9 h-9 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center text-white transition-all`}
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
                <li>
                  <Link to="/" className="text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
                    <motion.span animate={{ scaleX: [0, 1] }} transition={{ duration: 0.3 }}>▸</motion.span>
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
                    <motion.span animate={{ scaleX: [0, 1] }} transition={{ duration: 0.3 }}>▸</motion.span>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
                    <motion.span animate={{ scaleX: [0, 1] }} transition={{ duration: 0.3 }}>▸</motion.span>
                    Gallery
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
                    <motion.span animate={{ scaleX: [0, 1] }} transition={{ duration: 0.3 }}>▸</motion.span>
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-bold text-white text-sm uppercase tracking-widest">Contact</h3>
              <div className="space-y-3">
                <a href="tel:0673848023" className="flex gap-3 text-gray-400 hover:text-amber-400 transition-colors">
                  <span className="text-sm">0673-848023</span>
                </a>
                <a
                  href="mailto:contact@legendsacademy.ma"
                  className="flex gap-3 text-gray-400 hover:text-amber-400 transition-colors"
                >
                  <span className="text-sm">contact@legendsacademy.ma</span>
                </a>
                <div className="flex gap-3 text-gray-400">
                  <span className="text-sm">Legends Academy, Maroc</span>
                </div>
              </div>
            </motion.div>

            {/* Legal Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-bold text-white text-sm uppercase tracking-widest">Legal</h3>
              <div className="space-y-2">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-amber-400 text-sm transition-colors block">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-amber-400 text-sm transition-colors block">
                  Terms of Service
                </Link>
                <Link to="/sitemap" className="text-gray-400 hover:text-amber-400 text-sm transition-colors block">
                  Sitemap
                </Link>
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

          {/* Bottom Footer - Desktop */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:flex justify-between items-center gap-4"
          >
            <motion.p variants={itemVariants} className="text-gray-500 text-sm">
              &copy; {currentYear} Legends Academy. All rights reserved.
            </motion.p>
            <motion.p variants={itemVariants} className="text-amber-400 font-semibold text-sm">
              Excellence • Precision • Legacy
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
