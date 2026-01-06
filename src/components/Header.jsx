import { motion } from "framer-motion"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { getCartItemCount, setShowCartSidebar } = useCart()
  const cartItemCount = getCartItemCount()

  const handleCartClick = () => {
    if (location.pathname === "/shop") {
      // Si on est déjà sur la page Shop, ouvrir le sidebar
      setShowCartSidebar(true)
    } else {
      // Sinon, naviguer vers la page Shop
      navigate("/shop")
    }
  }

  const navItems = ["Home", "Gallery", "Services", "Pricing", "Events", "Shop"]

  const handleWhatsAppReserve = () => {
    const whatsappNumber = "212673848023" // Format international pour WhatsApp
    const message = encodeURIComponent("Bonjour ! Je souhaite réserver une table à Legends Academy")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  const handleNavClick = (item) => {
    const sectionId = item.toLowerCase()
    
    // Handle Shop as a separate page
    if (sectionId === "shop") {
      navigate("/shop")
      setIsOpen(false)
      return
    }
    
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
    setIsOpen(false)
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
              <p className="text-white font-logo-curved text-lg leading-tight">Legends</p>
              <p className="text-amber-400 font-logo-curved text-base leading-tight">Academy</p>
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

        {/* Right side: Cart Icon, CTA Button, Mobile menu */}
        <div className="flex items-center gap-4">
          {/* Cart Icon - visible on all screens */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <button
              onClick={handleCartClick}
              className="relative flex items-center justify-center text-amber-400 hover:text-amber-300 transition-colors cursor-pointer bg-transparent border-none"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                >
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </motion.span>
              )}
            </button>
          </motion.div>

          {/* CTA Button - Desktop only */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppReserve}
            className="hidden md:block px-4 py-2 text-xs font-bold uppercase border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 transition-all duration-300 rounded"
          >
            Reserve
          </motion.button>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-amber-400">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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

