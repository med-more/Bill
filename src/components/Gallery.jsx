import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function GallerySection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false })
  const [selectedImage, setSelectedImage] = useState(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      
      // Only animate when scrolling down and element is in view
      // Once animated, keep it visible (don't reset on scroll up)
      if (inView && scrollDelta > 0 && !hasAnimated) {
        setHasAnimated(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [inView, lastScrollY, hasAnimated])

  const galleryItems = [
    { id: 1, title: "Championship Tables", image: "/images/1.jpg" },
    { id: 2, title: "Lounge Seating", image: "/images/2.jpg" },
    { id: 3, title: "Premium Bar", image: "/images/3.jpg" },
    { id: 4, title: "Tournament Setup", image: "/images/4.jpg" },
    { id: 5, title: "VIP Private Space", image: "/images/5.jpg" },
    { id: 6, title: "Evening Ambiance", image: "/images/6.jpg" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  const openImage = (item) => {
    setSelectedImage(item)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  const closeImage = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset' // Restore scrolling
  }

  return (
    <section id="gallery" className="py-20 bg-black relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated && inView ? { opacity: 1, y: 0 } : hasAnimated ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Gallery</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6" />
          <p className="text-gray-300 text-lg">Explore our sanctuary of precision and elegance</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated && inView ? "visible" : hasAnimated ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => openImage(item)}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-6">
                <div>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                </div>
              </div>
              <div className="absolute inset-0 border border-amber-600/0 group-hover:border-amber-500/50 rounded-xl transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation()
                closeImage()
              }}
              className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/50 flex items-center justify-center text-white transition-all"
            >
              <X size={24} />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                style={{ imageRendering: 'high-quality' }}
              />
              {/* Title Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg border border-amber-500/30"
              >
                <h3 className="text-white font-bold text-xl text-center">{selectedImage.title}</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
