"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ZoomIn } from "lucide-react"

export default function GallerySection() {
  const { ref, inView } = useInView({ threshold: 0.2 })

  const galleryItems = [
    { id: 1, title: "Championship Tables", query: "professional luxury billiards pool table with premium felt" },
    { id: 2, title: "Lounge Seating", query: "luxury lounge modern seating leather chairs elegant interior" },
    { id: 3, title: "Premium Bar", query: "high-end craft cocktails bar counter elegant nightclub" },
    { id: 4, title: "Tournament Setup", query: "professional billiards tournament stage lighting competitive" },
    { id: 5, title: "VIP Private Space", query: "exclusive private luxury event venue chandelier gold" },
    { id: 6, title: "Evening Ambiance", query: "luxury lounge interior night lighting elegant sophisticated" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <section id="gallery" className="py-20 bg-slate-950 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Gallery</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6" />
          <p className="text-gray-300 text-lg">Explore our sanctuary of precision and elegance</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
            >
              <img
                src={`/.jpg?height=400&width=400&query=${encodeURIComponent(item.query)}`}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-between p-6">
                <ZoomIn className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                </div>
              </div>
              <div className="absolute inset-0 border border-amber-600/0 group-hover:border-amber-500/50 rounded-xl transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
