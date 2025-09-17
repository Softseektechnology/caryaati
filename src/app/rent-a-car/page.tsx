'use client'

import Navbar from '@/components/nevegation-header/Navbar';
import Sidebar from '@/components/multiplepages/Sidebar-multiplelinks';
import Footer from '@/components/foorter/Footer';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './rent-a-car.css';
import UserDropdown from '@/components/customer-dashboard/user-dashboard';

const airports = [
  {
    name: "Dubai",
    slug: "dubai",
    code: "Rent a Car in Dubai",
    description: "The world's busiest airport by international passenger traffic.",
    image: "/images/cities/dubai.jpg" // Replace with actual image path
  },
  {
    name: "Abu Dhabi",
    slug: "abu-dhabi",
    code: "Rent a Car in Abu Dhabi",
    description: "Dubai's second international airport, set to become one of the largest.",
    image: "/images/cities/abu-dhabi.jpg"
  },
  {
    name: "Umm Al Quwain",
    slug: "umm-al-quwain",
    code: "Rent a Car in Umm Al Quwain",
    description: "A small emirate located in the northern part of the UAE.",
    image: "/images/cities/umm-al-quwain.jpg"
  },
  {
    name: "Fujairah",
    slug: "fujairah",
    code: "Rent a Car in Fujairah",
    description: "A major cargo and passenger hub in the UAE.",
    image: "/images/cities/fujairah.jpg"
  },
  {
    name: "Ras Al Khaimah",
    slug: "ras-al-khaimah",
    code: "Rent a Car in Ras Al Khaimah",
    description: "Serving the northern emirate of Ras Al Khaimah.",
    image: "/images/cities/ras-al-khaimah.jpg"
  },
  {
    name: "Ajman",
    slug: "ajman",
    code: "Rent a Car in Ajman",
    description: "Located on the east coast of the UAE.",
    image: "/images/cities/ajman.jpg"
  },
  {
    name: "Al Ain",
    slug: "al-ain",
    code: "Rent a Car in Al Ain",
    description: "A city in the Emirate of Abu Dhabi, known for its greenery.",
    image: "/images/cities/al-ain.jpg"
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
    <div className={styles.container}>
      <Navbar onMenuToggle={toggleSidebar} isHome={false} onUserToggle={toggleUserDropdown} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <UserDropdown isOpen={isUserDropdownOpen} />

      <main style={{ flex: 1, padding: '2rem' }}>
        <Row>
          <div className='relative z-[998] bg-white'>
          <div className='fixed top-[70px] py-2 z-[998] bg-white'>
            <div className={`absolute z-[998] ${separateFilter ? 'hidden' : ''}`} style={{display: separateFilter ? 'none' : '' }}>
          <CustomCheckboxDropdown />
            </div>
            </div>
          </div>
          <div className={`fixed top-[60px] py-[40px] z-[995] bg-white right-0 left-0 ${separateFilter === true ? 'hidden' : ''}`}> </div>
          <div className={`relative top-[40px] ${styles.rentalLayout} max-[725px]:ml-0 max-xl:justify-center max-xl:justify-items-center`}>
          {/* Add the ResultsSortBar component below the filter bar */}
                      {/* <ResultsSortBar resultCount={375} defaultSort="Our recommendation" /> */}
                 {/* Add the PriceAnalysisNotification component below the ResultsSortBar */}
          {/* <PriceAnalysisNotification /> */}
           {/* Add the trackprice component below the ResultsSortBar */}
           {/* <Trackprice /> */}
          <RentalLayout />
          </div>
         
        </Row>
      </main>

      <Footer />
    </div>
  );
};

export default AirportCarRentalPage;
