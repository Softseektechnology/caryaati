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

        <section className="benefits-section" data-aos="fade-up">
          <div className="container">
            <h2 className="section-title">Why Choose Our Airport Offers?</h2>
            <p className="section-description">Experience the ultimate in convenience, luxury, and value with our exclusive car rental services</p>

            <div className="benefits-grid">
              <div className="benefit-card" data-aos="zoom-in" data-aos-delay="100">
                <div className="benefit-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3>Flexible Rental Periods</h3>
                <p>Choose from hourly, daily, weekly, or monthly rentals to perfectly match your schedule and needs.</p>
              </div>

              <div className="benefit-card" data-aos="zoom-in" data-aos-delay="200">
                <div className="benefit-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3>Best Price Guarantee</h3>
                <p>We offer the most competitive rates in the UAE with no hidden fees. Found a better deal? We'll match it!</p>
              </div>

              <div className="benefit-card" data-aos="zoom-in" data-aos-delay="300">
                <div className="benefit-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                    <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3>Premium Fleet</h3>
                <p>Drive the latest models with regular maintenance and thorough sanitization for your safety and comfort.</p>
              </div>

              <div className="benefit-card" data-aos="zoom-in" data-aos-delay="400">
                <div className="benefit-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3>24/7 Roadside Assistance</h3>
                <p>Travel with peace of mind knowing our support team is available round the clock for any emergencies.</p>
              </div>
            </div>

            <div className="stats-container" data-aos="fade-up" data-aos-delay="500">
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Luxury Vehicles</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Cities Covered</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Customer Support</span>
              </div>
            </div>

            <div className="cta-container" data-aos="zoom-in" data-aos-delay="600">
              <h3>Ready to Experience Premium Car Rental?</h3>
              <p>Book now and enjoy exclusive deals with our special offers</p>
              <div className="cta-buttons">
                <Link href="/rent-a-car" className="cta-button primary">Browse All Cars</Link>
                <Link href="/Contact-us" className="cta-button secondary">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AirportCarRentalPage;
