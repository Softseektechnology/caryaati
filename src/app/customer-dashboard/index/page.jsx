'use client'

import { useState } from "react";
import { Menu, LogOut, User, Heart, Calendar, DollarSign, Car, LayoutGrid, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/foorter/Footer";
import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import UserDropdown from "@/components/customer-dashboard/user-dashboard"; // Adjust path as needed
import Link from "next/link";
import IndexMain from "./IndexMain";

export default function CustomerDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [widgetsDropdownOpen, setWidgetsDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [wishlistDropdownOpen, setWishlistDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileWidgetsOpen, setMobileWidgetsOpen] = useState(false);

    const cards = [
        { title: "Booking", subtitle: "Go to Booking", icon: <Calendar size={28} />, color: "from-blue-500 to-indigo-500" },
        { title: "Fines", subtitle: "Go to Fines", icon: <DollarSign size={28} />, color: "from-rose-500 to-red-500" },
        { title: "Salik", subtitle: "Go to Salik", icon: <Car size={28} />, color: "from-yellow-400 to-orange-500" },
        { title: "Profile", subtitle: "Go to Profile", icon: <User size={28} />, color: "from-purple-500 to-pink-500" },
    ];

    const wishlistItems = [
        { id: 1, name: "Luxury Sedan", price: "$50/day" },
        { id: 2, name: "Sports Car", price: "$100/day" },
        { id: 3, name: "SUV", price: "$80/day" },
    ];

    const widgetItems = [
        { id: 1, name: "Referral", icon: <User size={16} /> },
        { id: 2, name: "Reviews", icon: <Heart size={16} /> },
        { id: 3, name: "Reward", icon: <DollarSign size={16} /> },
        { id: 4, name: "Wallets", icon: <LayoutGrid size={16} /> },
    ];
      const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

    return (
        <>
        <Navbar
        isHome={true} 
        onMenuToggle={() => {
          setIsSidebarOpen(!isSidebarOpen);
          setIsDropdownOpen(false);
        }}
        onUserToggle={() => {
          setIsDropdownOpen(!isDropdownOpen);
          setIsSidebarOpen(false);
        }} />
              <Sidebar isOpen={isSidebarOpen} isDashboard={true} active={'dashboard'} onClose={handleSidebarClose} />
              {/* User Dropdown */}
              <UserDropdown isOpen={isDropdownOpen} />

        <IndexMain />
        <Footer />
        </>
    );
}

/* Sidebar Nav Item Component */
function NavItem({ icon, text, sidebarOpen, onClick, isActive = false, badge }) {
    return (
        <button
            onClick={onClick}
            className={`relative group flex items-center gap-1 px-1 py-2.5 rounded-xl w-full text-left transition-all duration-300 hover:bg-gray-100 hover:shadow-md ${isActive ? 'bg-indigo-50 text-indigo-700 shadow-md' : 'text-gray-700'}`}
            aria-label={`Navigate to ${text}`}
        >
            <motion.div
                className={`p-1 rounded-lg bg-white shadow-sm ring-1 ring-gray-200/50 ${isActive ? 'ring-indigo-300' : 'group-hover:ring-indigo-300'}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
            >
                {icon}
            </motion.div>
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="text-sm font-semibold overflow-hidden whitespace-nowrap"
                    >
                        {text}
                    </motion.span>
                )}
            </AnimatePresence>
            {badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {badge}
                </span>
            )}
            {!sidebarOpen && (
                <motion.span
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 10 }}
                    className="absolute left-full ml-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm shadow-lg whitespace-nowrap z-50 hidden group-hover:block"
                >
                    {text}
                </motion.span>
            )}
        </button>
    );
}

/* Mobile Nav Item Component */
function MobileNavItem({ icon, text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 w-full text-left transition-colors text-gray-800 text-sm"
        >
            {icon}
            <span>{text}</span>
        </button>
    );
}