'use client'

import { useState } from "react";
import { Menu, LogOut, User, Heart, Calendar, DollarSign, Car, LayoutGrid, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/foorter/Footer";
import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import UserDropdown from "@/components/customer-dashboard/user-dashboard"; // Adjust path as needed
import Link from "next/link";

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
              <Sidebar isOpen={isSidebarOpen} isDashboard={true} onClose={handleSidebarClose} />
              {/* User Dropdown */}
              <UserDropdown isOpen={isDropdownOpen} />
        
        <div className="flex flex-col min-h-screen md:pl-[72px]">
            <div className="flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Main Content (unchanged) */}
                <main className="flex-1 px-1 py-2 sm:p-6 md:p-8 overflow-auto min-w-[280px]">
                    <header className="flex items-center justify-between mb-6 bg-white content-center p-4 rounded-xl shadow-sm relative">
                        <div className="flex items-center relative max-sm:left-[-10px] w-full justify-between">
                            <div className="flex items-center">
                                <h1 className="text-xl dashboard-text sm:text-2xl font-bold text-gray-800">Dashboard</h1>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setWishlistDropdownOpen(!wishlistDropdownOpen);
                                            setProfileDropdownOpen(false);
                                            setWidgetsDropdownOpen(false);
                                        }}
                                        className="p-2 hover:bg-gray-100 rounded-full relative"
                                    >
                                        <Heart size={22} className="text-gray-600" />
                                        {wishlistItems.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                                {wishlistItems.length}
                                            </span>
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {wishlistDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute right-0 mt-2 w-56 sm:w-64 bg-white shadow-lg rounded-xl overflow-hidden z-10"
                                            >
                                                <div className="p-4 border-b bg-gray-50">
                                                    <h3 className="font-semibold text-gray-800">Wishlist</h3>
                                                </div>
                                                {wishlistItems.length === 0 ? (
                                                    <p className="p-4 text-center text-gray-500 text-sm">Your wishlist is empty</p>
                                                ) : (
                                                    wishlistItems.map(item => (
                                                        <div key={item.id} className="p-3 hover:bg-gray-50 flex justify-between items-center border-b last:border-0">
                                                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                                            <span className="text-sm text-gray-500">{item.price}</span>
                                                        </div>
                                                    ))
                                                )}
                                                {wishlistItems.length > 0 && (
                                                    <button className="w-full p-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                                                        View All
                                                    </button>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setProfileDropdownOpen(!profileDropdownOpen);
                                            setWishlistDropdownOpen(false);
                                            setWidgetsDropdownOpen(false);
                                        }}
                                        className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <User size={28} className="text-indigo-500" />
                                        <span className="font-medium hidden sm:inline text-gray-800">Maaz Aziz</span>
                                    </button>
                                    <AnimatePresence>
                                        {profileDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute right-0 mt-2 w-44 sm:w-48 bg-white shadow-lg rounded-xl overflow-hidden z-10"
                                            >
                                                <button className="w-full px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 border-b">
                                                    <User size={16} className="text-gray-600" /> My Profile
                                                </button>
                                                <Link href={`/login`} className="w-full px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 no-underline text-red-600" style={{ textDecoration: 'none' }}>
                                                    <button className="w-full text-sm hover:bg-gray-50 flex items-center gap-2 no-underline text-red-600"><LogOut size={16} /> Log Out</button>
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`rounded-2xl p-4 sm:p-6 shadow-lg bg-gradient-to-r ${card.color} text-white hover:scale-105 transition-transform duration-300 cursor-pointer`}
                            >
                                <div className="flex items-center justify-between mb-3 sm:mb-4">
                                    <span className="text-3xl sm:text-4xl opacity-90">{card.icon}</span>
                                </div>
                                <h2 className="text-base sm:text-lg font-semibold mb-1">{card.title}</h2>
                                <p className="text-xs sm:text-sm opacity-90">{card.subtitle}</p>
                            </motion.div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
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