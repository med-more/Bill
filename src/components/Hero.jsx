import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    // Précharger la vidéo
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [])

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center justify-center pt-12 md:pt-20">
      {/* Video Background - High Quality */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoaded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Your high quality video */}
          <source src="/videos/heroVid.mov" type="video/quicktime" />
          <source src="/videos/heroVid.mov" type="video/mp4" />
          {/* Fallback to external high-quality video if local file doesn't load */}
          <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback image while video loads */}
        {!isVideoLoaded && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/luxury-billiards-lounge-with-premium-tables-and-li.jpg')"
            }}
          />
        )}
      </div>

      {/* Gradient overlay - 60% transparency */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-black/60" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-32 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-0 left-10 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0, type: "spring", stiffness: 300, damping: 20 }}
          className="mb-6 flex justify-center"
        >
          <motion.img
            src="/logo.jpg"
            alt="Legends Academy Logo"
            className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover border-4 border-amber-300/30 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="text-amber-400 font-semibold mb-4 uppercase tracking-widest text-sm"
        >
          Experience Excellence
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-5xl md:text-7xl font-billiard mb-6 text-white"
        >
          LEGENDS <span className="text-amber-400">ACADEMY</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Premium Pool & Snooker Lounge | Coffee Drinks & Dining
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(217, 119, 6, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const whatsappNumber = "212673848023"
              const message = encodeURIComponent("Bonjour ! Je souhaite réserver une table à Legends Academy")
              window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
            }}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all duration-300"
          >
            Reserve Table
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, borderColor: "#FCD34D" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const menuSection = document.getElementById("services")
              if (menuSection) {
                menuSection.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest border-2 border-amber-600/50 text-amber-400 hover:border-amber-400 transition-all duration-300"
          >
            View Menu
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="text-amber-400 w-6 h-6" />
      </motion.div>
    </section>
  )
}
