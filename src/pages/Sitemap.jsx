import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Home, Mail, Shield, FileText, Map } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Breadcrumb from "../components/Breadcrumb"

export default function Sitemap() {
  const mainPages = [
    { name: "Home", path: "/", icon: Home, description: "Main landing page with all sections" },
    { name: "Contact", path: "/contact", icon: Mail, description: "Get in touch with us" },
    { name: "Privacy Policy", path: "/privacy-policy", icon: Shield, description: "Our privacy and data protection policy" },
    { name: "Terms of Service", path: "/terms-of-service", icon: FileText, description: "Terms and conditions of use" },
    { name: "Sitemap", path: "/sitemap", icon: Map, description: "Complete site navigation" },
  ]

  const homeSections = [
    { name: "Home", id: "home", description: "Hero section with video background" },
    { name: "Venue Showcase", id: "venue", description: "Discover our venue" },
    { name: "About", id: "about", description: "Learn about our legacy" },
    { name: "Services", id: "services", description: "Our premium services" },
    { name: "Gallery", id: "gallery", description: "Photo gallery of our establishment" },
    { name: "Events", id: "events", description: "Upcoming events and tournaments" },
    { name: "Pricing", id: "pricing", description: "Membership and pricing information" },
  ]

  return (
    <div className="text-white min-h-screen relative overflow-x-hidden">
      {/* Gradient background - Blue and Black like home page */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900/40 via-blue-950/60 to-black z-0" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl z-[1]"
        animate={{ 
          y: [0, 50, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl z-[1]"
        animate={{ 
          y: [0, -50, 0],
          x: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mb-4 flex justify-center"
              >
                <Breadcrumb 
                  items={[
                    { label: "Home", path: "/" },
                    { label: "Sitemap" }
                  ]} 
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
              >
                <span className="text-amber-400">Sitemap</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6 max-w-md mx-auto"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 text-lg"
              >
                Navigate through all pages and sections of our website
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Main Pages */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Main <span className="text-amber-400">Pages</span>
                </h2>
                <div className="space-y-4">
                  {mainPages.map((page, i) => {
                    const Icon = page.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link
                          to={page.path}
                          className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-blue-950/20 border border-blue-600/40 hover:border-amber-500/60 transition-all group"
                        >
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                            <Icon className="text-white" size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">
                              {page.name}
                            </h3>
                            <p className="text-gray-400 text-sm">{page.description}</p>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Home Page Sections */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Home Page <span className="text-amber-400">Sections</span>
                </h2>
                <div className="space-y-4">
                  {homeSections.map((section, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <a
                        href={`/#${section.id}`}
                        className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-blue-950/20 border border-blue-600/40 hover:border-amber-500/60 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{i + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">
                            {section.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{section.description}</p>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}

