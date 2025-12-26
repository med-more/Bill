import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function ContactPage() {
  const { ref, inView } = useInView({ threshold: 0.2 })
  
  const whatsappNumber = "212673848023"
  const phoneNumber = "0673-848023"

  const contactInfo = [
    {
      icon: Phone,
      label: "Téléphone",
      value: phoneNumber,
      link: `tel:${phoneNumber.replace(/\s/g, "")}`,
      color: "from-green-500 to-green-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@legendsacademy.ma",
      link: "mailto:contact@legendsacademy.ma",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "Legends Academy, Maroc",
      link: "#",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Lun-Jeu: 17h-00h | Ven-Dim: 14h-02h",
      link: "#",
      color: "from-purple-500 to-purple-600",
    },
  ]

  const handleWhatsAppReserve = () => {
    const message = encodeURIComponent("Bonjour ! Je souhaite réserver une table à Legends Academy")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

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
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl z-[1]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6 flex justify-center"
              >
                <motion.img
                  src="/logo.jpg"
                  alt="Legends Academy Logo"
                  className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover border-4 border-amber-400/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-amber-400 font-semibold mb-4 uppercase tracking-widest text-sm"
              >
                Contactez-nous
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
              >
                Restons en <span className="text-amber-400">Contact</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.6, duration: 1 }}
                className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6 max-w-md mx-auto"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
              >
                Rejoignez la communauté Legends Academy. Nous sommes là pour répondre à vos questions et rendre vos réservations simples et rapides.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Map Section */}
        <section ref={ref} className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Contact Info Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="space-y-6"
              >
                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Informations de <span className="text-amber-400">Contact</span>
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                  className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mb-8"
                />

                {contactInfo.map((info, i) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={i}
                      href={info.link}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex gap-4 p-6 rounded-xl bg-gradient-to-r from-blue-950/40 to-blue-950/20 border border-blue-600/40 hover:border-blue-500/60 transition-all cursor-pointer relative overflow-hidden"
                    >
                      {/* Effet de brillance au survol */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      <div className="flex-shrink-0 relative z-10">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                          <Icon size={24} />
                        </div>
                      </div>
                      <div className="relative z-10 flex-1">
                        <h4 className="font-bold text-white text-base mb-1">{info.label}</h4>
                        <p className="text-gray-300 text-sm">{info.value}</p>
                      </div>
                    </motion.a>
                  )
                })}

                {/* Boutons d'action */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppReserve}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                  >
                    <MessageCircle size={20} />
                    Réserver via WhatsApp
                  </motion.button>
                  
                  <motion.a
                    href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-4 border-2 border-amber-500 text-amber-500 font-bold rounded-xl hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                  >
                    <Phone size={20} />
                    Appeler maintenant
                  </motion.a>
                </motion.div>

                {/* Réseaux sociaux */}
                <motion.div
                  variants={itemVariants}
                  className="flex gap-4 pt-4"
                >
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white transition-all"
                  >
                    <Instagram size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white transition-all"
                  >
                    <Facebook size={20} />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Right Side - Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-blue-950/40 to-blue-950/20 rounded-2xl border border-blue-600/40 p-6 overflow-hidden">
                  <div className="w-full h-[500px] rounded-xl overflow-hidden bg-slate-900/50 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.123456789!2d-7.6123456!3d33.5923456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzMyLjQiTiA3wrAzNic0NC40Ilc!5e0!3m2!1sfr!2sma!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl"
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="mt-4 flex items-center gap-3 p-4 rounded-lg bg-blue-950/30 border border-blue-600/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <MapPin className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-amber-400 text-sm font-semibold">Notre Localisation</p>
                      <p className="text-gray-300 text-xs">Legends Academy, Maroc</p>
                    </div>
                  </motion.div>
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
