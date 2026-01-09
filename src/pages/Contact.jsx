import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook, Send, CheckCircle, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

export default function ContactPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      description: "Appelez-nous pour toute question",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@legendsacademy.ma",
      link: "mailto:contact@legendsacademy.ma",
      color: "from-amber-500 to-amber-600",
      description: "Envoyez-nous un email",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "Legends Academy, Maroc",
      link: "#",
      color: "from-amber-500 to-amber-600",
      description: "Visitez-nous sur place",
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Lun-Jeu: 17h-00h | Ven-Dim: 14h-02h",
      link: "#",
      color: "from-purple-500 to-purple-600",
      description: "Nos heures d'ouverture",
    },
  ]

  const handleWhatsAppReserve = () => {
    const message = encodeURIComponent("Bonjour ! Je souhaite réserver une table à Legends Academy")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
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
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="text-white min-h-screen relative overflow-x-hidden bg-black">
      {/* Background */}
      <div className="fixed inset-0 bg-black z-0" />

      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex justify-start mb-6"
              >
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Retour</span>
                </button>
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
                Parlons de votre <span className="text-amber-500">Projet</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="h-1 bg-amber-500 mb-6 max-w-md mx-auto"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
              >
                Notre équipe est prête à répondre à toutes vos questions et à vous aider à réserver votre expérience inoubliable.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Side - Contact Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {contactInfo.map((info, i) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={i}
                      href={info.link}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative p-5 rounded-xl transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-base mb-0.5 group-hover:text-amber-400 transition-colors">
                            {info.label}
                          </h4>
                          <p className="text-amber-400 text-sm font-medium truncate">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  )
                })}

                {/* Quick Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 pt-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsAppReserve}
                    className="w-full px-5 py-3.5 text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Réserver via WhatsApp
                  </motion.button>
                  
                  <motion.a
                    href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                    whileHover={{ scale: 1.02, borderColor: "#FCD34D" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-5 py-3.5 text-sm font-semibold border border-amber-600 text-amber-400 hover:border-amber-400 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone size={18} />
                    Appeler maintenant
                  </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3 pt-2"
                >
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white transition-all"
                  >
                    <Instagram size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white transition-all"
                  >
                    <Facebook size={20} />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Right Side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="relative">
                  <div className="relative bg-slate-900 rounded-2xl border border-amber-500 p-8">
                    <div className="mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Envoyez-nous un <span className="text-amber-500">Message</span>
                      </h2>
                      <p className="text-gray-400">
                        Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>

                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                          <CheckCircle size={40} className="text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                        <p className="text-gray-400">Nous vous répondrons très bientôt.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                              Nom complet *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-slate-950 border border-amber-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 transition-all"
                              placeholder="Votre nom"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-slate-950 border border-amber-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 transition-all"
                              placeholder="votre@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                              Téléphone
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-slate-950 border border-amber-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 transition-all"
                              placeholder="+212 6XX XXX XXX"
                            />
                          </div>

                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                              Sujet *
                            </label>
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-slate-950 border border-amber-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 transition-all"
                              placeholder="Sujet de votre message"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 bg-slate-950 border border-amber-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                            placeholder="Votre message..."
                          />
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full"
                              />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              Envoyer le message
                            </>
                          )}
                        </motion.button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Map Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mt-8 relative"
                >
                  <div className="relative bg-slate-900 rounded-2xl border border-amber-500 p-6 overflow-hidden">
                    <div className="w-full h-[400px] rounded-xl overflow-hidden bg-slate-950 relative">
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
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    className="mt-6 flex items-center gap-4 p-5 rounded-xl bg-slate-900 border border-amber-500"
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
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}
