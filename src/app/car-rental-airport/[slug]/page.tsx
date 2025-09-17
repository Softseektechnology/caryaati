'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Row, Col, Button, Form, Alert } from 'react-bootstrap';
import Navbar from '../../../components/nevegation-header/Navbar';
import Footer from '../../../components/foorter/Footer';
import UserDropdown from '../../../components/customer-dashboard/user-dashboard';
import Sidebar from '../../../components/multiplepages/Sidebar-multiplelinks';
import CustomCheckboxDropdown from '../../../components/listing_filter/listing_filters';
import styles from '../../../../public/styles/Home.module.css';
import RentalLayout from '../../../components/RentalDealCard/RentalDealCard';
import ResultsSortBar from '../../../components/ResultsSortBar/ResultsSortBar';
import PriceAnalysisNotification from '../../../components/PriceAnalysisNotification/Price';
import Trackprice from '../../../components/PriceAnalysisNotification/Trackprices';
import { CaryaatiContext } from '@/app/ContextApi/CaryaatiStore';
// Define the Car interface (kept for potential future use)
interface Car {
  name: string;
  type: string;
  image: string;
  charges: { [key: string]: number };
  features: { icon: string; label: string }[];
  providerImage: string;
  location: { lat: number; lng: number };
}

export default function RentACarListings() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || 'Dubai';
  const pickUpDate = searchParams.get('pickUpDate') || 'Not specified';
  const returnDate = searchParams.get('returnDate') || 'Not specified';
  const carType = searchParams.get('carType') || 'Not specified';
  const [filters, setFilters] = useState({
    priceRange: 5000,
    carType: 'Any',
  });
    let { separateFilter } = CaryaatiContext();

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

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === 'priceRange' ? parseInt(value) : value,
    }));
  };

  // Apply filters (now a no-op since cards are removed)
  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
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
}