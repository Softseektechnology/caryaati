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
  const [carsForRentDropdownOpen, setCarsForRentDropdownOpen] = useState(false);
  const [languagesDropdownOpen, setLanguagesDropdownOpen] = useState(false);
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
    setCarRentalDropdownOpen(false);
    setCarsForRentDropdownOpen(false);
    setLanguagesDropdownOpen(false);
    setCarRentalFlightDropdownOpen(false);
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
  const toggleCarsForRentDropdown = () => {
    setCarsForRentDropdownOpen(!carsForRentDropdownOpen);
  };
  const toggleLanguagesDropdown = () => {
    setLanguagesDropdownOpen(!languagesDropdownOpen);
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
              className="flex z-[999] fixed flex-col bg-white text-gray-800 border-r border-gray-200/30 overflow-y-hidden top-[60px] sm:top-[63px] h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)]"
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
                    className="ml-3 space-y-1 border-l-2 border-indigo-200/50 pl-1"
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
                    className="ml-3 space-y-1 border-l-2 border-indigo-200/50 pl-1"
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
                  onClick={() => router.push('/')}
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
              className="fixed top-0 left-0 w-64 bg-white z-50 h-screen overflow-y-hidden"
            >
              <div className="absolute inset-0 pointer-events-none wave-bg" />
              <nav className="relative z-10 flex flex-col h-full">

                {/* Navigation */}
                <div className="flex-1 p-4 space-y-2 overflow-y-hidden">
                  <NavItem
                    icon={<LayoutGrid size={24} className="text-indigo-500" />}
                    text="Dashboard"
                    sidebarOpen={true}
                    onClick={() => router.push('/customer-dashboard/index')}  // Add this
                    isActive={active === 'dashboard' ? true : false}  // Optional: Add if you want active state
                  />
                  <NavItem
                    icon={<Calendar size={24} className="text-blue-500" />}
                    text="Booking"
                    sidebarOpen={true}
                    onClick={() => router.push('/customer-dashboard/booking')}  // Add this
                    isActive={active === 'booking' ? true : false}  // Optional
                  />
                  <NavItem
                    icon={<DollarSign size={24} className="text-red-500" />}
                    text="Fines"
                    sidebarOpen={true}
                    onClick={() => router.push('/customer-dashboard/fines')}  // Add this
                    isActive={active === 'fines' ? true : false}  // Optional
                  />
                  <NavItem
                    icon={<Car size={24} className="text-orange-500" />}
                    text="Salik"
                    sidebarOpen={true}
                    onClick={() => router.push('/customer-dashboard/salik')}  // Add this
                    isActive={active === 'salik' ? true : false}  // Optional
                  />
                  <NavItem
                    icon={<User size={24} className="text-purple-500" />}
                    text="Profile"
                    sidebarOpen={true}
                    onClick={() => router.push('/customer-dashboard/profile')}  // Add this
                    isActive={active === 'profile' ? true : false}  // Optional
                  />
                  <NavItem
                    icon={<Heart size={24} className="text-pink-500" />}
                    text="Wishlist"
                    sidebarOpen={true}
                    badge={wishlistItems.length}
                    onClick={() => setWishlistDropdownOpen(!wishlistDropdownOpen)}  // Already present
                    isActive={active === 'wishlist' ? true : false}  // Optional
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
                    onClick={() => setWidgetsDropdownOpen(!widgetsDropdownOpen)}  // Already present, but if you want direct nav, change to router.push
                    isActive={active === 'widgets' ? true : false}  // Optional
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
                    sidebarOpen={true}
                    onClick={() => router.push('/')}  // Add this (matches desktop)
                    isActive={active === 'bookingEngine' ? true : false}  // Optional
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
                    <Link href="/car-rental-airport/" onClick={handleClose}>Airport car Rental</Link>
                  </li>
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
                    <Link href="/rent-a-car" onClick={handleClose}>Rent a Car</Link>
                  </li>
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
            <li className='transition-all duration-200'>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent page jump
                  setCarsForRentDropdownOpen(!carsForRentDropdownOpen);
                }}
              >
                <i className="bi bi-car-front-fill"></i>
                <span className={styles.menuText}>Special Car Offers</span>
              </a>
              {carsForRentDropdownOpen && (
                <ul className={styles.submenu}>
                  <li>
                    <Link href="/rent-a-car/special-car-offers" onClick={handleClose}>Special Car Offers</Link>
                  </li>
                  <li>
                    <Link href="/special-car/sports" onClick={handleClose}>Sports Cars on Rent</Link>
                  </li>
                  <li>
                    <Link href="/special-car/standard" onClick={handleClose}>Standard Cars on Rent</Link>
                  </li>
                  <li>
                    <Link href="/special-car/mini" onClick={handleClose}>Mini Cars on Rent</Link>
                  </li>
                  <li>
                    <Link href="/special-car/mid-size" onClick={handleClose}>Mid-Size Cars on Rent</Link>
                  </li>
                  <li>
                    <Link href="/luxury-cars-for-rent" onClick={handleClose}>Luxury Cars on Rent</Link>
                  </li>
                  <li>
                    <Link href="/special-car/premium" onClick={handleClose}>Premium Cars on Rent</Link>
                  </li>
                  <li>
                    <Link href="/special-car/economy" onClick={handleClose}>Economy Cars on Rent</Link>
                  </li>
                  <li>
                    <Link href="/special-car/monthly" onClick={handleClose}>Monthly Car on Rent</Link>
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
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent page jump
                  setLanguagesDropdownOpen(!languagesDropdownOpen);
                }}
              >
                <i className="bi bi-globe"></i>
                <span className={styles.menuText}>Language</span>
              </a>
              {languagesDropdownOpen && (
                <ul className={styles.submenu}>
                  <li>
                    <Link href="#English" onClick={handleClose}>English</Link>
                  </li>
                  <li>
                    <Link href="#Arabic" onClick={handleClose}>Arabic</Link>
                  </li>
                  <li>
                    <Link href="#Turkish" onClick={handleClose}>Turkish</Link>
                  </li>
                  <li>
                    <Link href="#Spanish" onClick={handleClose}>Spanish</Link>
                  </li>
                  <li>
                    <Link href="#French" onClick={handleClose}>French</Link>
                  </li>
                  <li>
                    <Link href="#German" onClick={handleClose}>German</Link>
                  </li>
                </ul>
              )}
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