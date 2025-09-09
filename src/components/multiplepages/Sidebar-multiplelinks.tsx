'use client';

import { useState, useEffect } from 'react';
import styles from './Sidebar-multiplelinks.module.css';
import Link from 'next/link';
import { Menu, LogOut, User, Heart, Calendar, DollarSign, Car, LayoutGrid, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function Sidebar({ isOpen: initialIsOpen = false, onClose, isDashboard, active }: { isOpen?: boolean; onClose?: () => void, isDashboard?: boolean, active?: string }) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isExpanded, setIsExpanded] = useState(initialIsOpen);

  const [Dashboard, setDashboard] = useState(isDashboard);
  const [isMobile, setIsMobile] = useState(false);
  const [carRentalDropdownOpen, setCarRentalDropdownOpen] = useState(false);
  const [carRentalFlightDropdownOpen, setCarRentalFlightDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [widgetsDropdownOpen, setWidgetsDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [wishlistDropdownOpen, setWishlistDropdownOpen] = useState(false);



  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(isOpen);
      }
      // For desktop, do not set isExpanded here; let it be controlled by hover (initially false)
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(initialIsOpen);
    setIsExpanded(initialIsOpen);
  }, [initialIsOpen]);
  let router = useRouter();

  const handleMouseEnter = () => {
    if (!isMobile) setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isOpen) setIsExpanded(false);
    setCarRentalDropdownOpen(false)
    setCarRentalFlightDropdownOpen(false)
  };

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setIsExpanded(newIsOpen);
    if (!newIsOpen && onClose) onClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
    if (onClose) onClose();
  };

  const toggleCarRentalDropdown = () => {
    setCarRentalDropdownOpen(!carRentalDropdownOpen);
  };
  const toggleCarRentalFlightDropdown = () => {
    setCarRentalFlightDropdownOpen(!carRentalFlightDropdownOpen);
  };
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
    <>
      {Dashboard && (
        <>
          {!isMobile && (
            <motion.aside
              initial={{ width: isExpanded ? 280 : 72 }}
              animate={{ width: isExpanded ? 280 : 72 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex z-[999] fixed flex-col bg-white text-gray-800 shadow-2xl border-r border-gray-200/30 overflow-y-hidden top-[60px] sm:top-[64px] h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)]"
              role="navigation"
              aria-label="Dashboard sidebar"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Animated Wave Background */}
              <div className="absolute inset-0 pointer-events-none wave-bg" />

              {/* Header: Logo and Toggle */}
              {/* <div className="relative z-10 p-4 flex items-center justify-between border-b border-gray-200/30">
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ scale: isExpanded ? 1 : 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-2xl"
                  >
                    <img src="" alt="" />
                  </motion.span>
                  <AnimatePresence>
                    {isExpanded && (
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
              </div> */}

              {/* User Profile Section */}
              <div className="relative z-10 py-1 px-4 border-b border-gray-200/30">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 max-sm:w-6 max-sm:h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      MA
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1"
                      >
                        <p className="font-semibold translate-y-3 max-sm:translate-y-5 text-gray-800">Maaz Aziz</p>
                        <p className="text-xs text-gray-500">Premium User</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isExpanded && (
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
                {/* <AnimatePresence>
                  {profileDropdownOpen && isExpanded && (
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
                </AnimatePresence> */}
              </div>

              {/* Navigation */}
              <nav className="relative z-10 flex-1 py-2 px-4 overflow-auto">
                <NavItem
                  icon={<LayoutGrid size={24} className="text-indigo-500" />}
                  text="Dashboard"
                  sidebarOpen={isExpanded}
                  onClick={() => router.push('/customer-dashboard/index')}
                  isActive={active === 'dashboard' ? true : false}
                />
                <NavItem
                  icon={<Calendar size={24} className="text-blue-500" />}
                  text="Booking"
                  sidebarOpen={isExpanded}
                  onClick={() => router.push('/customer-dashboard/booking')}
                  isActive={active === 'booking' ? true : false}
                />
                <NavItem
                  icon={<DollarSign size={24} className="text-red-500" />}
                  text="Fines"
                  sidebarOpen={isExpanded}
                  onClick={() => router.push('/customer-dashboard/fines')}
                  isActive={active === 'fines' ? true : false}
                />
                <NavItem
                  icon={<Car size={24} className="text-orange-500" />}
                  text="Salik"
                  sidebarOpen={isExpanded}
                  onClick={() => router.push('/customer-dashboard/salik')}
                  isActive={active === 'salik' ? true : false}
                />
                <NavItem
                  icon={<User size={24} className="text-purple-500" />}
                  text="Profile"
                  sidebarOpen={isExpanded}
                  onClick={() => router.push('/customer-dashboard/profile')}
                  isActive={active === 'profile' ? true : false}
                />
                <NavItem
                  icon={<Heart size={24} className="text-pink-500" />}
                  text="Wishlist"
                  sidebarOpen={isExpanded}
                  badge={wishlistItems.length}
                  isActive={active === 'wishlist' ? true : false}
                  onClick={() => {
                    setWishlistDropdownOpen(!wishlistDropdownOpen);
                    setWidgetsDropdownOpen(false);
                    setProfileDropdownOpen(false);
                  }}
                />
                {wishlistDropdownOpen && isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-8 space-y-1 border-l-2 border-indigo-200/50 pl-3"
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
                  sidebarOpen={isExpanded}
                  isActive={active === 'widgets' ? true : false}
                  onClick={() => {
                    setWidgetsDropdownOpen(!widgetsDropdownOpen);
                    setWishlistDropdownOpen(false);
                    setProfileDropdownOpen(false);
                  }}
                />
                {widgetsDropdownOpen && isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-8 space-y-1 border-l-2 border-indigo-200/50 pl-3"
                  >
                    {widgetItems.map(item => (
                      <button
                        key={item.id}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => { router.push(`/customer-dashboard/${item.name}`) }}
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
                  isActive={active === 'bookingEngine' ? true : false}
                  onClick={()=> router.push('/')}
                  sidebarOpen={isExpanded}
                />
              </nav>
            </motion.aside>
          )}

          {isMobile && isOpen && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 w-64 bg-white shadow-2xl z-50 h-screen overflow-y-hidden"
            >
              <div className="absolute inset-0 pointer-events-none wave-bg" />
              <nav className="relative z-10 flex flex-col h-full">
                {/* Header: Logo and Close Button */}
                <div className="p-4 flex items-center justify-between border-b border-gray-200/30">
                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="text-2xl"
                    >
                      🚗
                    </motion.span>
                    <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      Engine
                    </span>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 text-gray-600 hover:text-indigo-600"
                    aria-label="Close menu"
                  >
                    <Menu size={24} />
                  </button>
                </div>
                {/* User Profile */}
                <div className="p-4 border-b border-gray-200/30">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        MA
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Maaz Aziz</p>
                      <p className="text-xs text-gray-500">Premium User</p>
                    </div>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="User menu"
                    >
                      <User size={20} className="text-gray-600" />
                    </button>
                  </div>
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="mt-2 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200/50"
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
                {/* Navigation */}
                <div className="flex-1 p-4 space-y-2 overflow-y-hidden">
                  <NavItem
                    icon={<LayoutGrid size={24} className="text-indigo-500" />}
                    text="Dashboard"
                    sidebarOpen={true}
                    isActive={true}
                  />
                  <NavItem
                    icon={<Calendar size={24} className="text-blue-500" />}
                    text="Booking"
                    sidebarOpen={true}
                  />
                  <NavItem
                    icon={<DollarSign size={24} className="text-red-500" />}
                    text="Fines"
                    sidebarOpen={true}
                  />
                  <NavItem
                    icon={<Car size={24} className="text-orange-500" />}
                    text="Salik"
                    sidebarOpen={true}
                  />
                  <NavItem
                    icon={<User size={24} className="text-purple-500" />}
                    text="Profile"
                    sidebarOpen={true}
                  />
                  <NavItem
                    icon={<Heart size={24} className="text-pink-500" />}
                    text="Wishlist"
                    sidebarOpen={true}
                    badge={wishlistItems.length}
                    onClick={() => setWishlistDropdownOpen(!wishlistDropdownOpen)}
                  />
                  {wishlistDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-8 space-y-1 border-l-2 border-indigo-200/50 pl-3"
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
                    sidebarOpen={true}
                    onClick={() => setWidgetsDropdownOpen(!widgetsDropdownOpen)}
                  />
                  {widgetsDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-8 space-y-1 border-l-2 border-indigo-200/50 pl-3"
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
                    sidebarOpen={true}
                  />
                </div>
              </nav>
            </motion.div>
          )}
        </>
      )}

      {!Dashboard && (
        <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ top: '63px', display: isMobile && !isOpen ? 'none' : 'block' }}>
          <ul>
            {/* 🔽 Car Rental Airport with Dropdown */}
            <li className='transition-all duration-200'>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent page jump
                  setCarRentalFlightDropdownOpen(!carRentalFlightDropdownOpen);
                }}
              >
                <i className="bi bi-airplane-fill"></i>
                <span className={styles.menuText}>Car Rental Airport</span>
              </a>

              {carRentalFlightDropdownOpen && (
                <ul className={styles.submenu}>
                  <li>
                    <Link href="/car-rental-airport/dubai-international-airport" onClick={handleClose}>Dubai-International-Airport</Link>
                  </li>
                  <li>
                    <Link href="/car-rental-airport/al-maktoum-international-airport" onClick={handleClose}>Al-Maktoum-International-Airport</Link>
                  </li>
                  <li>
                    <Link href="/car-rental-airport/abu-dhabi-international-airport" onClick={handleClose}>Abu-Dhabi-International-Airport</Link>
                  </li>
                  <li>
                    <Link href="/car-rental-airport/sharjah-international-airport" onClick={handleClose}>Sharjah-International-Airport</Link>
                  </li>
                  <li>
                    <Link href="/car-rental-airport/ras-al-khaimah-international-airport" onClick={handleClose}>Ras-Al-Khaimah-International-Airport</Link>
                  </li>
                  <li>
                    <Link href="/car-rental-airport/fujairah-executive-airport" onClick={handleClose}>Fujairah-International-Airport</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 🔽 Car Rental with Dropdown */}
            <li className='transition-all duration-200'>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent page jump
                  setCarRentalDropdownOpen(!carRentalDropdownOpen);
                }}
              >
                <i className="bi bi-car-front-fill"></i>
                <span className={styles.menuText}>Car Rental</span>
              </a>

              {carRentalDropdownOpen && (
                <ul className={styles.submenu}>
                  <li>
                    <Link href="/rent-a-car/dubai" onClick={handleClose}>Dubai</Link>
                  </li>
                  <li>
                    <Link href="/rent-a-car/abu-dhabi" onClick={handleClose}>Abu Dhabi</Link>
                  </li>
                  <li>
                    <Link href="/rent-a-car/umm-al-quwain" onClick={handleClose}>Umm Al Quwain</Link>
                  </li>
                  <li>
                    <Link href="/rent-a-car/fujairah" onClick={handleClose}>Fujairah</Link>
                  </li>
                  <li>
                    <Link href="/rent-a-car/ras-al-khaimah" onClick={handleClose}>Ras Al Khaimah</Link>
                  </li>
                  <li>
                    <Link href="/rent-a-car/ajman" onClick={handleClose}>Ajman</Link>
                  </li>
                  <li>
                    <Link href="/rent-a-car/al-ain" onClick={handleClose}>Al Ain</Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a href="#" onClick={handleClose}>
                <i className="bi bi-heart-fill"></i>
                <span className={styles.menuText}>Favorites</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={handleClose}>
                <i className="bi bi-globe"></i>
                <span className={styles.menuText}>Language</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={handleClose}>
                <i className="bi bi-currency-dollar"></i>
                <span className={styles.menuText}>Currency</span>
              </a>
            </li>
          </ul>
        </div>
      )}

      {(isExpanded || isOpen) && <div className={styles.overlay} onClick={handleClose}></div>}
    </>
  );
}

/* Sidebar Nav Item Component */
function NavItem({ icon, text, sidebarOpen, onClick, isActive = false, badge }) {
  return (
    <button
      onClick={onClick}
      className={`relative group flex items-center gap-1 px-1 py-2.5 max-sm:py-2 rounded-xl w-full text-left transition-all duration-300 hover:bg-gray-100 hover:shadow-md ${isActive ? 'bg-indigo-50 text-indigo-700 shadow-md' : 'text-gray-700'}`}
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
          className="absolute left-full ml-2 px-3 py-1.5 max-sm:py-1 bg-indigo-600 text-white rounded-lg text-sm shadow-lg whitespace-nowrap z-50 hidden group-hover:block"
        >
          {text}
        </motion.span>
      )}
    </button>
  );
}