'use client'

import Navbar from '@/components/nevegation-header/Navbar';
import Sidebar from '@/components/multiplepages/Sidebar-multiplelinks';
import Footer from '@/components/foorter/Footer';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './airport.css';
import UserDropdown from '@/components/customer-dashboard/user-dashboard';

const airports = [
  {
    name: "Dubai International Airport",
    slug: "dubai-international-airport",
    code: "DXB",
    description: "The world's busiest airport by international passenger traffic.",
    image: "/images/dubai.jpg" // Replace with actual image path
  },
  {
    name: "Al Maktoum International Airport",
    slug: "al-maktoum-international-airport",
    code: "DWC",
    description: "Dubai's second international airport, set to become one of the largest.",
    image: "/images/al-makhtoum.jpg"
  },
  {
    name: "Abu Dhabi International Airport",
    slug: "abu-dhabi-international-airport",
    code: "AUH",
    description: "The main international airport serving Abu Dhabi.",
    image: "/images/abu-dhabi.jpg"
  },
  {
    name: "Sharjah International Airport",
    slug: "sharjah-international-airport",
    code: "SHJ",
    description: "A major cargo and passenger hub in the UAE.",
    image: "/images/sharjah.jpg"
  },
  {
    name: "Ras Al Khaimah International Airport",
    slug: "ras-al-khaimah-international-airport",
    code: "RKT",
    description: "Serving the northern emirate of Ras Al Khaimah.",
    image: "/images/ras-al-khaimah.jpg"
  },
  {
    name: "Fujairah International Airport",
    slug: "fujairah-international-airport",
    code: "FJR",
    description: "Located on the east coast of the UAE.",
    image: "/images/fujairah.jpg"
  }
];

const AirportCarRentalPage = () => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isUserDropdownOpen) setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);


  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };
  

  return (
    <div className='min-h-screen'>
     <Navbar onMenuToggle={toggleSidebar} isHome={false} onUserToggle={toggleUserDropdown} />
           <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
           <UserDropdown isOpen={isUserDropdownOpen} />
     
      <main className="airport-main-container min-h-screen">
        {/* Hero Section */}
        <section className="hero-section" data-aos="fade-in">
          <div className="hero-overlay">
            <h1 className="hero-title">Airport Car Rental</h1>
            <p className="hero-subtitle">Convenient car rentals at major UAE airports. Start your journey seamlessly!</p>
            <Link href="/rent-a-car" className="hero-cta">Browse All Cars</Link>
          </div>
        </section>

        {/* Airports List Section */}
        <section className="airports-section" data-aos="fade-up" data-aos-delay="200">
          <div className="container">
            <h2 className="section-title">Available Airports</h2>
            <p className="section-description">Choose from our partnered airports across the UAE for hassle-free car rentals.</p>
            <div className="airports-grid">
              {airports.map((airport, index) => (
                <div key={index} className="airport-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <img src={airport.image} alt={airport.name} className="airport-image" />
                  <div className="airport-content">
                    <h3 className="airport-name">{airport.name}</h3>
                    <span className="airport-code">{airport.code}</span>
                    <p className="airport-description">{airport.description}</p>
                    <Link href={`/car-rental-airport/${airport.slug}`} className="airport-button">
                      Rent a Car Here
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AirportCarRentalPage;
