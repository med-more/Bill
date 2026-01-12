import { motion } from "framer-motion"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Breadcrumb from "../components/Breadcrumb"

export default function TermsOfService() {
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
                    { label: "Terms of Service" }
                  ]} 
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
              >
                Terms of <span className="text-amber-400">Service</span>
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
                <h2 className="text-3xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  By accessing and using Legends Academy's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-3xl font-bold text-white mb-4">2. Use License</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Permission is granted to temporarily access the materials on Legends Academy's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or other proprietary notations</li>
                </ul>

                <h2 className="text-3xl font-bold text-white mb-4">3. Reservations and Bookings</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  When making a reservation:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>Reservations are subject to availability</li>
                  <li>Cancellation policies apply as stated at time of booking</li>
                  <li>We reserve the right to refuse service</li>
                  <li>Age restrictions may apply for certain services</li>
                </ul>

                <h2 className="text-3xl font-bold text-white mb-4">4. Code of Conduct</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  All guests are expected to maintain appropriate behavior. We reserve the right to remove any guest who violates our code of conduct without refund.
                </p>

                <h2 className="text-3xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Legends Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
                </p>

                <h2 className="text-3xl font-bold text-white mb-4">6. Contact Information</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  For questions about these Terms of Service, please contact us:
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

