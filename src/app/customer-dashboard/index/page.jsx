'use client'

import { useState } from "react";
import { Menu, LogOut, User, Heart, Calendar, DollarSign, Car, LayoutGrid } from "lucide-react";
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
                {/* Sidebar (Desktop only) */}
                <motion.aside
                    initial={{ width: sidebarOpen ? 280 : 80 }}
                    animate={{ width: sidebarOpen ? 280 : 80 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="hidden md:flex flex-col bg-white text-gray-800 shadow-xl border-r border-gray-200/50 overflow-y-auto"
                >
                    {/* Logo + Burger */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <AnimatePresence>
                            {sidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2"
                                >
                                    <span className="text-indigo-600">🚗</span> Engine
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:rotate-180 hover:scale-105 text-gray-600"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-8 space-y-8">
                        {/* Main Section */}
                        <div>
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-xs uppercase font-semibold tracking-wider text-gray-500 px-4 mb-4 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-4 after:w-8 after:h-0.5 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:rounded-full"
                                    >
                                        Main
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <NavItem icon={<LayoutGrid size={20} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />} text="Dashboard" sidebarOpen={sidebarOpen} active={true} />
                            <NavItem icon={<Calendar size={20} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />} text="Booking" sidebarOpen={sidebarOpen} />
                            <NavItem icon={<DollarSign size={20} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />} text="Fines" sidebarOpen={sidebarOpen} />
                            <NavItem icon={<Car size={20} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />} text="Salik" sidebarOpen={sidebarOpen} />
                        </div>

                        {/* Profile Section */}
                        <div>
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-xs uppercase font-semibold tracking-wider text-gray-500 px-4 mb-4 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-4 after:w-8 after:h-0.5 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:rounded-full"
                                    >
                                        Profile
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <NavItem icon={<User size={20} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />} text="Profile" sidebarOpen={sidebarOpen} />
                            <NavItem icon={<Heart size={20} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />} text="Wishlist" sidebarOpen={sidebarOpen} />
                        </div>

                        {/* Widgets Section */}
                        <div>
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-xs uppercase font-semibold tracking-wider text-gray-500 px-4 mb-4 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-4 after:w-8 after:h-0.5 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:rounded-full"
                                    >
                                        Widgets
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <div className="relative">
                                <NavItem
                                    icon={<LayoutGrid size={20} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />}
                                    text="Widgets"
                                    sidebarOpen={sidebarOpen}
                                    onClick={() => {
                                        setWidgetsDropdownOpen(!widgetsDropdownOpen);
                                        setProfileDropdownOpen(false);
                                        setWishlistDropdownOpen(false);
                                    }}
                                />
                                <AnimatePresence>
                                    {widgetsDropdownOpen && sidebarOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, x: -10 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-full ml-4 mt-[-40px] w-56 bg-white shadow-xl rounded-xl overflow-hidden z-50 ring-1 ring-gray-200/50"
                                        >
                                            {widgetItems.map(item => (
                                                <button
                                                    key={item.id}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border-b last:border-none"
                                                >
                                                    {item.icon}
                                                    {item.name}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Booking Engine Section */}
                        <div>
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-xs uppercase font-semibold tracking-wider text-gray-500 px-4 mb-4 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-4 after:w-8 after:h-0.5 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:rounded-full"
                                    >
                                        Booking Engine
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <NavItem icon={<User size={20} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />} text="Booking Engine" sidebarOpen={sidebarOpen} />
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-200 mt-auto">
                        <NavItem icon={<LogOut size={20} className="text-red-500 group-hover:text-red-600 transition-colors" />} text="Logout" sidebarOpen={sidebarOpen} />
                    </div>
                </motion.aside>

                {/* Main Content */}
                <main className="flex-1 px-1 py-2 sm:p-6 md:p-8 overflow-auto min-w-[280px]">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm relative">
                        <div className="flex items-center relative max-sm:left-[-10px] w-full justify-between">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
                                >
                                    <Menu size={24} className="text-gray-800 min-h-[30px] min-w-[30px]" />
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4">
                                {/* Wishlist Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setWishlistDropdownOpen(!wishlistDropdownOpen);
                                            setProfileDropdownOpen(false);
                                            setWidgetsDropdownOpen(false);
                                        }}
                                        className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
                                    >
                                        <Heart size={22} className="text-gray-600" />
                                        {wishlistItems.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
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
                                                className="absolute right-0 mt-2 w-56 sm:w-64 bg-white shadow-lg rounded-xl overflow-hidden z-10 ring-1 ring-gray-200/50"
                                            >
                                                <div className="p-4 border-b bg-gray-50">
                                                    <h3 className="font-semibold text-gray-800">Wishlist</h3>
                                                </div>
                                                {wishlistItems.length === 0 ? (
                                                    <p className="p-4 text-center text-gray-500 text-sm">Your wishlist is empty</p>
                                                ) : (
                                                    wishlistItems.map(item => (
                                                        <div key={item.id} className="p-3 hover:bg-gray-50 flex justify-between items-center border-b last:border-0 transition-colors">
                                                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                                            <span className="text-sm text-gray-500">{item.price}</span>
                                                        </div>
                                                    ))
                                                )}
                                                {wishlistItems.length > 0 && (
                                                    <button className="w-full p-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors">
                                                        View All
                                                    </button>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setProfileDropdownOpen(!profileDropdownOpen);
                                            setWishlistDropdownOpen(false);
                                            setWidgetsDropdownOpen(false);
                                        }}
                                        className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <User size={20} className="text-indigo-600" />
                                        </div>
                                        <span className="font-medium hidden sm:inline text-gray-800">Maaz Aziz</span>
                                    </button>

                                    <AnimatePresence>
                                        {profileDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl overflow-hidden z-10 ring-1 ring-gray-200/50"
                                            >
                                                <button className="w-full px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 border-b transition-colors text-gray-700">
                                                    <User size={16} className="text-gray-600" /> My Profile
                                                </button>
                                                <button className="w-full px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600 transition-colors">
                                                    <LogOut size={16} /> Log Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Dropdown */}
                        <AnimatePresence>
                            {mobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-full left-0 w-full bg-white shadow-lg z-50 md:hidden overflow-auto max-h-[80vh] rounded-b-xl ring-1 ring-gray-200/50"
                                >
                                    <nav className="flex flex-col px-4 py-6 space-y-6">
                                        {/* Main Section */}
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase mb-3 font-semibold tracking-wider">
                                                Main
                                            </p>
                                            <MobileNavItem icon={<LayoutGrid size={18} />} text="Dashboard" />
                                            <MobileNavItem icon={<Calendar size={18} />} text="Booking" />
                                            <MobileNavItem icon={<DollarSign size={18} />} text="Fines" />
                                            <MobileNavItem icon={<Car size={18} />} text="Salik" />
                                        </div>

                                        {/* Profile Section */}
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase mb-3 font-semibold tracking-wider">
                                                Profile
                                            </p>
                                            <MobileNavItem icon={<User size={18} />} text="Profile" />
                                            <MobileNavItem icon={<Heart size={18} />} text="Wishlist" />
                                        </div>

                                        {/* Widgets Section */}
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase mb-3 font-semibold tracking-wider">
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
                                                            className="w-full flex items-center gap-2 py-2 text-sm text-gray-700 hover:bg-gray-50 px-2 rounded transition-colors"
                                                        >
                                                            {item.icon}
                                                            {item.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Booking Engine Section */}
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase mb-3 font-semibold tracking-wider">
                                                Booking Engine
                                            </p>
                                            <MobileNavItem icon={<User size={18} />} text="Booking Engine" />
                                        </div>

                                        {/* Logout */}
                                        <div className="pt-4 border-t border-gray-200">
                                            <MobileNavItem icon={<LogOut size={18} className="text-red-500" />} text="Logout" />
                                        </div>
                                    </nav>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </header>

                    {/* Dashboard Cards */}
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
function NavItem({ icon, text, sidebarOpen, onClick, active = false }) {
    return (
        <button
            onClick={onClick}
            className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-sm ${
                active ? 'bg-indigo-50 text-indigo-600 shadow-sm before:absolute before:left-0 before:inset-y-0 before:w-1 before:bg-indigo-600 before:rounded-r' : 'text-gray-700'
            }`}
        >
            {icon}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="text-sm font-medium overflow-hidden whitespace-nowrap"
                    >
                        {text}
                    </motion.span>
                )}
            </AnimatePresence>
            {!sidebarOpen && (
                <motion.span
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute left-full ml-2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm shadow-lg z-50 hidden group-hover:block"
                    style={{ whiteSpace: 'nowrap' }}
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