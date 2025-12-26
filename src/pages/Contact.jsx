import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function ContactPage() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false })

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])
  
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
      color: "from-amber-500 to-amber-600",
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
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="text-white min-h-screen relative overflow-x-hidden">
      {/* Gradient background - More black than blue like Membership */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black to-black z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-blue-950/10 via-blue-900/5 to-transparent z-0" />
      
      {/* Subtle animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl z-[1]"
        animate={{ 
          y: [0, 50, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl z-[1]"
        animate={{ 
          y: [0, -50, 0],
          x: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10">
        <Header />
        
        {/* Hero Section - Enhanced */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-0" />
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo with glow effect */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="mb-8 flex justify-center relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-2xl opacity-30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.img
                  src="/logo.jpg"
                  alt="Legends Academy Logo"
                  className="relative h-32 w-32 md:h-40 md:w-40 rounded-full object-cover border-4 border-amber-300/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-amber-400 font-semibold mb-4 uppercase tracking-widest text-sm"
              >
                Contactez-nous
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
              >
                Restons en <span className="text-amber-400">Contact</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6 max-w-md mx-auto"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
              >
                Rejoignez la communauté Legends Academy. Nous sommes là pour répondre à vos questions et rendre vos réservations simples et rapides.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Map Section - Enhanced */}
        <section ref={ref} className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Informations de <span className="text-amber-400">Contact</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6" />
              <p className="text-gray-400 text-lg">Trouvez-nous facilement et contactez-nous</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Contact Info Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="space-y-6"
              >
                {contactInfo.map((info, i) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={i}
                      href={info.link}
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative p-6 rounded-xl border transition-all cursor-pointer overflow-hidden bg-gradient-to-br from-black/60 to-black border-amber-600/20 hover:border-amber-500/50"
                    >
                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity blur-xl`} />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      <div className="relative flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-lg mb-1">{info.label}</h4>
                          <p className="text-gray-300 text-base">{info.value}</p>
                        </div>
                      </div>
                    </motion.a>
                  )
                })}

                {/* Action Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(34, 197, 94, 0.7)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppReserve}
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-green-500 to-green-600 text-white rounded transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Réserver via WhatsApp
                  </motion.button>
                  
                  <motion.a
                    href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                    whileHover={{ scale: 1.08, borderColor: "#FCD34D" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest border-2 border-amber-600/50 text-amber-400 hover:border-amber-400 rounded transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    Appeler maintenant
                  </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  variants={itemVariants}
                  className="flex gap-4 pt-4"
                >
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white transition-all"
                  >
                    <Instagram size={24} />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, rotate: -10, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white transition-all"
                  >
                    <Facebook size={24} />
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
                {/* Background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-3xl blur-xl" />
                
                <div className="relative bg-gradient-to-br from-black/80 to-black rounded-2xl border-2 border-amber-500/30 p-6 overflow-hidden backdrop-blur-sm">
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
                    className="mt-6 flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-amber-950/40 to-black border border-amber-500/30"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-amber-400 text-base font-semibold mb-1">Notre Localisation</p>
                      <p className="text-gray-300 text-sm">Legends Academy, Maroc</p>
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
