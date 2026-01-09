import { motion } from "framer-motion"
import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { Check, ArrowLeft, Star, Users, Zap, Trophy, Clock, Gift, Shield, Sparkles, Crown, Award } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Membership() {
  const { pack } = useParams()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])
  
  const packs = {
    casual: {
      name: "Casual Play",
      price: "150",
      period: "/hour",
      description: "Perfect for casual games and relaxed sessions",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-950/20 to-black",
      features: [
        { icon: Check, text: "Standard pool table access", highlight: true },
        { icon: Check, text: "Cue and ball rental included", highlight: true },
        { icon: Check, text: "Coffee and soft drinks available", highlight: true },
        { icon: Check, text: "Weekday discounts (20% off)", highlight: true },
        { icon: Check, text: "Flexible hourly booking", highlight: false },
        { icon: Check, text: "Free Wi-Fi access", highlight: false },
      ],
      benefits: [
        { icon: Users, title: "Beginner Friendly", desc: "Perfect for newcomers" },
        { icon: Clock, title: "Flexible Hours", desc: "No commitment required" },
        { icon: Gift, title: "Pay as You Play", desc: "Book when you want" },
      ],
      cta: "Book Now",
      ctaAction: () => {
        const whatsappNumber = "212673848023"
        const message = encodeURIComponent("Hi! I'd like to book a Casual Play session at Legends Academy")
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
      }
    },
    premium: {
      name: "Premium Member",
      price: "300",
      period: "/hour",
      description: "The ultimate experience for serious players",
      icon: Crown,
      color: "from-amber-500 to-amber-600",
      bgColor: "from-amber-950/30 to-black",
      features: [
        { icon: Check, text: "Championship table priority access", highlight: true },
        { icon: Check, text: "Professional cue selection", highlight: true },
        { icon: Check, text: "Premium bar access with discounts", highlight: true },
        { icon: Check, text: "Priority booking (24h advance)", highlight: true },
        { icon: Check, text: "Tournament eligibility", highlight: true },
        { icon: Check, text: "VIP lounge access", highlight: true },
        { icon: Check, text: "Monthly coaching session (1h)", highlight: true },
        { icon: Check, text: "Exclusive member events", highlight: true },
      ],
      benefits: [
        { icon: Trophy, title: "Elite Experience", desc: "Premium facilities access" },
        { icon: Award, title: "Tournaments", desc: "Compete with professionals" },
        { icon: Crown, title: "VIP Status", desc: "Exclusive privileges" },
        { icon: Sparkles, title: "Monthly Coaching", desc: "Improve your skills" },
      ],
      cta: "Become Premium Member",
      ctaAction: () => {
        const whatsappNumber = "212673848023"
        const message = encodeURIComponent("Hi! I'm interested in becoming a Premium Member at Legends Academy")
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
      }
    },
    private: {
      name: "Private Events",
      price: "Custom",
      period: "pricing",
      description: "Exclusive packages for your special occasions",
      icon: Gift,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-950/20 to-black",
      features: [
        { icon: Check, text: "Multiple tables reserved", highlight: true },
        { icon: Check, text: "Private space rental", highlight: true },
        { icon: Check, text: "Professional catering available", highlight: true },
        { icon: Check, text: "Event coordination service", highlight: true },
        { icon: Check, text: "Entertainment options (DJ, live music)", highlight: true },
        { icon: Check, text: "Professional photography included", highlight: true },
        { icon: Check, text: "Custom decoration setup", highlight: true },
        { icon: Check, text: "Dedicated event manager", highlight: true },
      ],
      benefits: [
        { icon: Gift, title: "Corporate Events", desc: "Perfect for business" },
        { icon: Sparkles, title: "Celebrations", desc: "Birthdays & anniversaries" },
        { icon: Users, title: "Team Building", desc: "Group activities" },
        { icon: Shield, title: "Custom Packages", desc: "Tailored to your needs" },
      ],
      cta: "Request Quote",
      ctaAction: () => {
        const whatsappNumber = "212673848023"
        const message = encodeURIComponent("Hi! I'd like to get a quote for a Private Event at Legends Academy")
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
      }
    }
  }

  const currentPack = packs[pack] || packs.casual
  const Icon = currentPack.icon

  return (
    <div className="text-white min-h-screen relative overflow-x-hidden">
      {/* Gradient background - More black than blue */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black to-black z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-blue-950/10 via-blue-900/5 to-transparent z-0" />
      
      {/* Subtle animated gradient orbs - more subtle */}
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
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 flex justify-start"
              >
                <Link to="/#pricing">
                  <motion.button
                    whileHover={{ x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors px-4 py-2 rounded-lg hover:bg-black/50"
                  >
                    <ArrowLeft size={20} />
                    <span>Back to Membership</span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Icon with glow effect */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8 flex justify-center relative"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${currentPack.color} rounded-full blur-2xl opacity-30`}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className={`relative w-32 h-32 rounded-full bg-gradient-to-r ${currentPack.color} flex items-center justify-center border-4 border-amber-300/20`}>
                  <Icon className="w-16 h-16 text-white" />
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-4 text-white"
              >
                {currentPack.name} <span className="text-amber-400">Package</span>
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
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                {currentPack.description}
              </motion.p>

              {/* Price Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-black/80 to-black/60 border-2 border-amber-500/30 backdrop-blur-sm"
              >
                <span className="text-6xl font-bold text-amber-400">{currentPack.price} DH</span>
                <span className="text-gray-400 text-xl">{currentPack.period}</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section - Enhanced */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                What's <span className="text-amber-400">Included</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6" />
              <p className="text-gray-400 text-lg">Everything you need for an exceptional experience</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {currentPack.features.map((feature, i) => {
                const FeatureIcon = feature.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`group relative p-6 rounded-xl border transition-all ${
                      feature.highlight
                        ? "bg-gradient-to-br from-amber-950/40 to-black border-amber-500/50"
                        : "bg-gradient-to-br from-black/60 to-black border-amber-600/20"
                    }`}
                  >
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentPack.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity blur-xl`} />
                    
                    <div className="relative flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentPack.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <FeatureIcon className="text-white" size={24} />
                      </div>
                      <p className="text-gray-200 text-base flex-1 leading-relaxed">{feature.text}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section - Enhanced */}
        <section className="py-20 relative">
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
                Why Choose This <span className="text-amber-400">Package</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {currentPack.benefits.map((benefit, i) => {
                const BenefitIcon = benefit.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="group relative p-8 rounded-2xl bg-gradient-to-br from-black/80 to-black border border-amber-600/20 hover:border-amber-500/50 transition-all text-center"
                  >
                    {/* Background glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentPack.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity blur-2xl`} />
                    
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentPack.color} flex items-center justify-center mx-auto mb-4`}
                      >
                        <BenefitIcon className="text-white" size={28} />
                      </motion.div>
                      <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-400 text-sm">{benefit.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-20 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Background glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${currentPack.color} opacity-20 rounded-3xl blur-3xl`} />
              
              <div className="relative p-12 rounded-3xl bg-gradient-to-br from-black/90 to-black border-2 border-amber-500/30 backdrop-blur-sm">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mb-6 flex justify-center"
                  >
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${currentPack.color} flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
                    Join Legends Academy and experience the premium billiards lifestyle. Reserve your spot today and elevate your game.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(217, 119, 6, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={currentPack.ctaAction}
                      className={`px-10 py-5 bg-gradient-to-r ${currentPack.color} text-white font-bold rounded-xl transition-all uppercase tracking-widest text-sm`}
                    >
                      {currentPack.cta}
                    </motion.button>
                    <Link to="/#pricing">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 border-2 border-amber-500 text-amber-500 font-bold rounded-xl hover:bg-amber-500 hover:text-black transition-all uppercase tracking-widest text-sm"
                      >
                        View All Packages
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
