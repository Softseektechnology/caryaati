'use client'

import { useState } from "react";
import { Menu, LogOut, User, Heart, Calendar, DollarSign, Car, LayoutGrid, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./components/Footer";

export default function CustomerDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [wishlistDropdownOpen, setWishlistDropdownOpen] = useState(false);
    const [widgetsDropdownOpen, setWidgetsDropdownOpen] = useState(false);
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

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
                {/* New Desktop Sidebar */}
                <motion.aside
                    initial={{ width: sidebarOpen ? 280 : 72 }}
                    animate={{ width: sidebarOpen ? 280 : 72 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="hidden md:flex flex-col bg-white text-gray-800 shadow-2xl border-r border-gray-200/30 relative overflow-y-hidden"
                    role="navigation"
                    aria-label="Dashboard sidebar"
                >
                    {/* Animated Wave Background */}
                    <div className="absolute inset-0 pointer-events-none wave-bg" />

                    {/* Header: Logo and Toggle */}
                    <div className="relative z-10 p-4 flex items-center justify-between border-b border-gray-200/30">
                        <motion.div
                            className="flex items-center gap-2"
                            animate={{ scale: sidebarOpen ? 1 : 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.span
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="text-2xl"
                            >
                                🚗
                            </motion.span>
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
                                    >
                                        Engine
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                        >
                            <motion.div animate={{ rotate: sidebarOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                <Menu size={24} />
                            </motion.div>
                        </button>
                    </div>

                    {/* User Profile Section */}
                    <div className="relative z-10 p-4 border-b border-gray-200/30">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    MA
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                            </div>
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="flex-1"
                                    >
                                        <p className="font-semibold text-gray-800">Maaz Aziz</p>
                                        <p className="text-xs text-gray-500">Premium User</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {sidebarOpen && (
                                <button
                                    onClick={() => {
                                        setProfileDropdownOpen(!profileDropdownOpen);
                                        setWidgetsDropdownOpen(false);
                                        setWishlistDropdownOpen(false);
                                    }}
                                    className="ml-auto p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="User menu"
                                >
                                    <User size={20} className="text-gray-600" />
                                </button>
                            )}
                        </div>
                        <AnimatePresence>
                            {profileDropdownOpen && sidebarOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute left-4 right-4 mt-2 bg-white shadow-lg rounded-xl overflow-hidden z-20 border border-gray-200/50"
                                >
                                    <button className="w-full px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 border-b text-gray-700 transition-colors">
                                        <User size={16} className="text-gray-600" /> My Profile
                                    </button>
                                    <button className="w-full px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600 transition-colors">
                                        <LogOut size={16} /> Log Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Search Bar */}
                    <div className="relative z-10 p-4 border-b border-gray-200/30">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={sidebarOpen ? "Search dashboard..." : ""}
                                className={`w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-indigo-400 transition-all text-sm ${!sidebarOpen ? 'cursor-default' : ''}`}
                                disabled={!sidebarOpen}
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="relative z-10 flex-1 p-4 space-y-2">
                        <NavItem
                            icon={<LayoutGrid size={24} className="text-indigo-500" />}
                            text="Dashboard"
                            sidebarOpen={sidebarOpen}
                            isActive={true}
                        />
                        <NavItem
                            icon={<Calendar size={24} className="text-blue-500" />}
                            text="Booking"
                            sidebarOpen={sidebarOpen}
                        />
                        <NavItem
                            icon={<DollarSign size={24} className="text-red-500" />}
                            text="Fines"
                            sidebarOpen={sidebarOpen}
                        />
                        <NavItem
                            icon={<Car size={24} className="text-orange-500" />}
                            text="Salik"
                            sidebarOpen={sidebarOpen}
                        />
                        <NavItem
                            icon={<User size={24} className="text-purple-500" />}
                            text="Profile"
                            sidebarOpen={sidebarOpen}
                        />
                        <NavItem
                            icon={<Heart size={24} className="text-pink-500" />}
                            text="Wishlist"
                            sidebarOpen={sidebarOpen}
                            badge={wishlistItems.length}
                            onClick={() => {
                                setWishlistDropdownOpen(!wishlistDropdownOpen);
                                setWidgetsDropdownOpen(false);
                                setProfileDropdownOpen(false);
                            }}
                        />
                        {wishlistDropdownOpen && sidebarOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="ml-10 space-y-1 border-l-2 border-indigo-200/50 pl-3"
                            >
                                {wishlistItems.map(item => (
                                    <button
                                        key={item.id}
                                        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        <Heart size={14} className="text-pink-400" />
                                        <span>{item.name}</span>
                                        <span className="ml-auto text-gray-500">{item.price}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                        <NavItem
                            icon={<LayoutGrid size={24} className="text-green-500" />}
                            text="Widgets"
                            sidebarOpen={sidebarOpen}
                            onClick={() => {
                                setWidgetsDropdownOpen(!widgetsDropdownOpen);
                                setWishlistDropdownOpen(false);
                                setProfileDropdownOpen(false);
                            }}
                        />
                        {widgetsDropdownOpen && sidebarOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="ml-10 space-y-1 border-l-2 border-indigo-200/50 pl-3"
                            >
                                {widgetItems.map(item => (
                                    <button
                                        key={item.id}
                                        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        {item.icon}
                                        {item.name}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                        <NavItem
                            icon={<Car size={24} className="text-teal-500" />}
                            text="Booking Engine"
                            sidebarOpen={sidebarOpen}
                        />
                    </nav>

                    {/* Logout */}
                    <div className="relative z-10 p-4 border-t border-gray-200/30 mt-auto">
                        <NavItem
                            icon={<LogOut size={24} className="text-red-500" />}
                            text="Logout"
                            sidebarOpen={sidebarOpen}
                        />
                    </div>
                </motion.aside>

                {/* Main Content (unchanged) */}
                <main className="flex-1 px-1 py-2 sm:p-6 md:p-8 overflow-auto min-w-[280px]">
                    <header className="flex items-center justify-between mb-6 bg-white content-center p-4 rounded-xl shadow-sm relative">
                        <div classNameమ
                            className="flex items-center relative max-sm:left-[-10px] w-full justify-between">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
                                >
                                    <Menu size={24} className="text-gray-800" />
                                </button>
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
                                                <button className="w-full px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
                                                    <LogOut size={16} /> Log Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                        <AnimatePresence>
                            {mobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-full left-0 w-full bg-white shadow-lg z-50 md:hidden overflow-auto max-h-[80vh]"
                                >
                                    <nav className="flex flex-col px-4 py-6 space-y-6">
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase mb-3 font-semibold tracking-wider">
                                                Main
                                            </p>
                                            <MobileNavItem icon={<LayoutGrid size={18} />} text="Dashboard" />
                                            <MobileNavItem icon={<Calendar size={18} />} text="Booking" />
                                            <MobileNavItem icon={<DollarSign size={18} />} text="Fines" />
                                            <MobileNavItem icon={<Car size={18} />} text="Salik" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase mb-3 font-semibold tracking-wider">
                                                Profile
                                            </p>
                                            <MobileNavItem icon={<User size={18} />} text="Profile" />
                                            <MobileNavItem icon={<Heart size={18} />} text="Wishlist" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase mb-3 font-semibold tracking-wider">
                                                Widgets
                                            </p>
                                            <MobileNavItem
                                                icon={<LayoutGrid size={18} />}
                                                text="Widgets"
                                                onClick={() => setMobileWidgetsOpen(!mobileWidgetsOpen)}
                                            />
                                            {mobileWidgetsOpen && (
                                                <div className="ml-6 mt-2 space-y-2">
                                                    {widgetItems.map(item => (
                                                        <button
                                                            key={item.id}
                                                            className="w-full flex items-center gap-2 py-2 text-sm text-gray-700 hover:bg-gray-50 px-2 rounded"
                                                        >
                                                            {item.icon}
                                                            {item.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase mb-3 font-semibold tracking-wider">
                                                Booking Engine
                                            </p>
                                            <MobileNavItem icon={<User size={18} />} text="Booking Engine" />
                                        </div>
                                        <div className="pt-4 border-t border-gray-200">
                                            <MobileNavItem icon={<LogOut size={18} />} text="Logout" />
                                        </div>
                                    </nav>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
            <Footer />
        </div>
    );
}

/* Sidebar Nav Item Component */
function NavItem({ icon, text, sidebarOpen, onClick, isActive = false, badge }) {
    return (
        <button
            onClick={onClick}
            className={`relative group flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left transition-all duration-300 hover:bg-gray-100 hover:shadow-md ${isActive ? 'bg-indigo-50 text-indigo-700 shadow-md' : 'text-gray-700'}`}
            aria-label={`Navigate to ${text}`}
        >
            <motion.div
                className={`p-2 rounded-lg bg-white shadow-sm ring-1 ring-gray-200/50 ${isActive ? 'ring-indigo-300' : 'group-hover:ring-indigo-300'}`}
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