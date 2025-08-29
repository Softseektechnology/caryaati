'use client';

import { useState, useEffect } from 'react';
import styles from './Sidebar-multiplelinks.module.css';
import Link from 'next/link';

export default function Sidebar({ isOpen: initialIsOpen = false, onClose }) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isExpanded, setIsExpanded] = useState(initialIsOpen);
  const [isMobile, setIsMobile] = useState(false);
  const [carRentalDropdownOpen, setCarRentalDropdownOpen] = useState(false);
  const [carRentalFlightDropdownOpen, setCarRentalFlightDropdownOpen] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !isOpen && !isExpanded) {
        setIsOpen(false);
        setIsExpanded(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, isExpanded]);

  useEffect(() => {
    setIsOpen(initialIsOpen);
    setIsExpanded(initialIsOpen);
  }, [initialIsOpen]);

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
    setCarRentalDropdownOpen(!carRentalFlightDropdownOpen);
  };

  return (
    <>
      <div
        className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ top: '63px', display: isMobile && !isOpen ? 'none' : 'block' }}
      >
 

        <ul>
          <li>
            <Link href="/car-rental-airport/dubai-international-airport-terminal-1" onClick={(e) => {
      e.preventDefault(); // Prevent page jump
      setCarRentalFlightDropdownOpen(!carRentalFlightDropdownOpen);
    }}>
              <i className="bi bi-airplane-fill"></i>
              <span className={styles.menuText}>Car Rental Airports</span>
            </Link>
            {carRentalFlightDropdownOpen && (
    <ul className={styles.submenu}>
      <li>
        <Link href="/car-rental-airport/dubai-international-airport-terminal-1" onClick={handleClose}>Dubai-International-Airport-terminal-1</Link>
      </li>
      <li>
        <Link href="/car-rental-airport/dubai-international-airport-terminal-2" onClick={handleClose}>Dubai-International-Airport-terminal-2</Link>
      </li>
      <li>
        <Link href="/car-rental-airport/dubai-international-airport-terminal-3" onClick={handleClose}>Dubai-International-Airport-terminal-3</Link>
      </li>
      <li>
        <Link href="/car-rental-airport/sharjah-international-airport" onClick={handleClose}>Sharjah-International-Airport</Link>
      </li>
      <li>
        <Link href="/car-rental-airport/al-maktoum-international-airport" onClick={handleClose}>Al-Maktoum-International-Airport</Link>
      </li>
      <li>
        <Link href="/car-rental-airport/zayed-international-airport" onClick={handleClose}>Zayed-International-Airport</Link>
      </li>
      <li>
        <Link href="/car-rental-airport/al-ain-international-airport" onClick={handleClose}>Al-Ain-International-Airport</Link>
      </li>
      <li>
        <Link href="/car-rental-airport/al-bateen-executive-airport" onClick={handleClose}>Al-Bateen-Executive-Airport</Link>
      </li>
      <li>
        <Link href="/car-rental-airport/ras-al-khaimah-executive-airport" onClick={handleClose}>Ras-Al-Khaimah-International-Airport</Link>
      </li>
      <li>
        <Link href="/car-rental-airport/fujairah-executive-airport" onClick={handleClose}>Fujairah-International-Airport</Link>
      </li>
    </ul>
  )}
          </li>

          {/* <li>
            <a href="#" onClick={handleClose}>
              <i className="bi bi-house-door-fill"></i>
              <span className={styles.menuText}>Stays</span>
            </a>
          </li> */}

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

          {/* <li>
            <a href="#" onClick={handleClose}>
              <i className="bi bi-compass-fill"></i>
              <span className={styles.menuText}>Explore</span>
            </a>
          </li>

          <li>
            <a href="#" onClick={handleClose}>
              <i className="bi bi-map-fill"></i>
              <span className={styles.menuText}>Direct</span>
            </a>
          </li>

          <li>
            <a href="#" onClick={handleClose}>
              <i className="bi bi-ban-fill"></i>
              <span className={styles.menuText}>Travel Restrictions</span>
            </a>
          </li>

          <li>
            <a href="#" onClick={handleClose}>
              <i className="bi bi-briefcase-fill"></i>
              <span className={styles.menuText}>KAYAK for Business</span>
            </a>
          </li>

          <li>
            <a href="#" onClick={handleClose}>
              <i className="bi bi-suitcase-fill"></i>
              <span className={styles.menuText}>Trips</span>
            </a>
          </li> */}

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

      {isExpanded && <div className={styles.overlay} onClick={handleClose}></div>}
    </>
  );
}