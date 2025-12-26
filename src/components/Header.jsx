import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = ["Home", "Gallery", "Services", "Pricing", "Events"]

  const handleWhatsAppReserve = () => {
    const whatsappNumber = "212673848023" // Format international pour WhatsApp
    const message = encodeURIComponent("Bonjour ! Je souhaite réserver une table à Legends Academy")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  const handleNavClick = (item) => {
    const sectionId = item.toLowerCase()
    
    // Si on est déjà sur la page d'accueil, scroll vers la section
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      // Sinon, naviguer vers la page d'accueil puis scroll
      navigate("/", { state: { scrollTo: sectionId } })
    }
  }

  return (
    <header className="fixed top-0 w-full bg-gradient-to-b from-slate-900/95 to-transparent z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <motion.img
              src="/logo.jpg"
              alt="Legends Academy Logo"
              className="h-12 w-12 rounded-full object-cover border-2 border-amber-500/30 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm">LEGENDS</p>
              <p className="text-amber-400 text-xs">ACADEMY</p>
            </div>
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => handleNavClick(item)}
              whileHover={{ color: "#FCD34D" }}
              className="text-gray-300 text-sm font-medium uppercase tracking-wider hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer"
            >
              {item}
            </motion.button>
          ))}
          <motion.div whileHover={{ color: "#FCD34D" }}>
            <Link
              to="/contact"
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
              <button
                key={item}
                onClick={() => {
                  setIsOpen(false)
                  handleNavClick(item)
                }}
                className="text-gray-300 text-sm font-medium uppercase hover:text-amber-400 text-left bg-transparent border-none cursor-pointer"
              >
                {item}
              </button>
            ))}
            <Link
              to="/contact"
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

