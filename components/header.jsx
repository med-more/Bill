"use client"

import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = ["Home", "Gallery", "Services", "Pricing", "Events"]

  const handleWhatsAppReserve = () => {
    const whatsappNumber = "+1234567890" // Replace with actual WhatsApp number
    const message = encodeURIComponent("Hi! I'd like to reserve a table at Legends Academy")
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`, "_blank")
  }

  return (
    <header className="fixed top-0 w-full bg-gradient-to-b from-slate-900/95 to-transparent z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">LA</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-bold text-sm">LEGENDS</p>
            <p className="text-amber-400 text-xs">ACADEMY</p>
          </div>
        </motion.div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: "#FCD34D" }}
              className="text-gray-300 text-sm font-medium uppercase tracking-wider hover:text-amber-400 transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <motion.div whileHover={{ color: "#FCD34D" }}>
            <Link
              href="/contact"
              className="text-gray-300 text-sm font-medium uppercase tracking-wider hover:text-amber-400 transition-colors"
            >
              Contact
            </Link>
          </motion.div>
        </nav>

        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-amber-400">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppReserve}
          className="hidden md:block px-4 py-2 text-xs font-bold uppercase border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 transition-all duration-300 rounded"
        >
          Reserve
        </motion.button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-slate-900/95 border-t border-amber-500/20"
        >
          <nav className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 text-sm font-medium uppercase hover:text-amber-400"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <Link
              href="/contact"
              className="text-amber-400 text-sm font-medium uppercase hover:text-amber-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
