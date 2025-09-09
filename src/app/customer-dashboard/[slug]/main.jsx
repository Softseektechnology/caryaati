'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, ArrowRight } from "lucide-react";

import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import Footer from "@/components/foorter/Footer";
import UserDropdown from "@/components/customer-dashboard/user-dashboard";

const Main = () => {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSidebarClose = () => setIsSidebarOpen(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed with email:", email);
    setEmail("");
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-indigo-900 mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Coming Soon
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We're building something amazing. Stay tuned for our launch!
            </motion.p>

            <motion.div 
              className="flex items-center justify-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Clock className="text-indigo-600 mr-2" size={24} />
              <span className="text-lg text-gray-700">Launching in Q4 2025</span>
            </motion.div>

            <motion.form 
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border bg-gradient-to-br from-indigo-50 to-purple-50 border-gray-300 rounded-full focus:outline-none focus:bg-transparent focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                Notify Me <ArrowRight size={16} />
              </button>
            </motion.form>

            <motion.p 
              className="text-sm text-gray-500 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Be the first to know when we launch. No spam, promise!
            </motion.p>
          </motion.div>
        </main>
        <Footer />
      </div>
  )
}

export default Main;