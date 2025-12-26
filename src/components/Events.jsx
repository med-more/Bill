import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, Sparkles } from "lucide-react"

export default function EventsSection() {
  const events = [
    {
      id: 1,
      title: "Championship Tournament",
      date: "January 15, 2024",
      time: "7:00 PM - 11:00 PM",
      location: "Main Hall",
      attendees: "32 Players",
      description: "Elite pool tournament with prize pool of $5,000. First come, first served.",
      icon: Sparkles,
      color: "from-amber-500/10 to-amber-600/5",
      borderColor: "border-amber-500/20",
    },
    {
      id: 2,
      title: "VIP Members Night",
      date: "January 20, 2024",
      time: "6:00 PM - 10:00 PM",
      location: "Private Lounge",
      attendees: "Invitation Only",
      description: "Exclusive evening for VIP members with complimentary drinks and premium snacks.",
      icon: Users,
      color: "from-emerald-500/10 to-emerald-600/5",
      borderColor: "border-emerald-500/20",
    },
    {
      id: 3,
      title: "Beginners Workshop",
      date: "January 25, 2024",
      time: "5:00 PM - 7:00 PM",
      location: "Training Area",
      attendees: "20 Spots",
      description: "Learn the fundamentals of pool from our professional instructors. Equipment provided.",
      icon: Users,
      color: "from-slate-900/10 to-black/5",
      borderColor: "border-slate-900/20",
    },
    {
      id: 4,
      title: "Friday Night Social",
      date: "Every Friday",
      time: "8:00 PM - Midnight",
      location: "Main Floor",
      attendees: "Open to All",
      description: "Casual play, networking, and great company. DJ and premium beverages available.",
      icon: Sparkles,
      color: "from-pink-500/10 to-pink-600/5",
      borderColor: "border-pink-500/20",
    },
  ]

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="events" className="relative py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Upcoming <span className="text-amber-500">Events</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Join us for exclusive tournaments, workshops, and social gatherings at Legends Academy
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {events.map((event) => {
            const IconComponent = event.icon
            return (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className={`group relative bg-gradient-to-br ${event.color} backdrop-blur-sm border ${event.borderColor} rounded-lg p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden`}
              >
                {/* Background accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent" />

                <div className="relative z-10">
                  {/* Icon and Title */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-slate-300 text-sm">{event.description}</p>
                    </div>
                    <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <IconComponent className="w-6 h-6 text-amber-500" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Users className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">{event.attendees}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full px-4 py-2 text-xs font-bold uppercase tracking-widest border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 rounded"
                  >
                    Register Now
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/20 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">Never Miss an Event</h3>
          <p className="text-slate-300 mb-6">
            Subscribe to our newsletter for exclusive event announcements and special offers.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 bg-slate-800/50 border border-amber-500/20 rounded text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-amber-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-xs font-bold uppercase tracking-widest bg-amber-500 text-slate-950 rounded hover:bg-amber-600 transition-colors"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

