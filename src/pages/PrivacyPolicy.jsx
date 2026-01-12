import { motion } from "framer-motion"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Breadcrumb from "../components/Breadcrumb"

export default function PrivacyPolicy() {
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
                    { label: "Privacy Policy" }
                  ]} 
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
              >
                Privacy <span className="text-amber-400">Policy</span>
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
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Legends Academy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>

                <h2 className="text-3xl font-bold text-white mb-4">2. Information We Collect</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may collect information about you in a variety of ways:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>Personal information you provide (name, email, phone number)</li>
                  <li>Information automatically collected when you visit our website</li>
                  <li>Information from third-party sources</li>
                </ul>

                <h2 className="text-3xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process reservations and bookings</li>
                  <li>Send you promotional communications</li>
                  <li>Respond to your inquiries and provide customer support</li>
                </ul>

                <h2 className="text-3xl font-bold text-white mb-4">4. Data Security</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2 className="text-3xl font-bold text-white mb-4">5. Your Rights</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                </ul>

                <h2 className="text-3xl font-bold text-white mb-4">6. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-amber-400 mb-2">Email: contact@legendsacademy.ma</p>
                <p className="text-amber-400 mb-6">Phone: 0673-848023</p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}

