'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Row, Col, Button, Form, Alert } from 'react-bootstrap';
import Navbar from '../../components/nevegation-header/Navbar';
import Footer from '../../components/foorter/Footer';
import UserDropdown from '../../components/customer-dashboard/user-dashboard';
import Sidebar from '../../components/multiplepages/Sidebar-multiplelinks';
import FAQPage from './Faq'; // Import the new component
import styles from '../../../public/styles/Home.module.css';

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: 5000,
    carType: 'Any',
  });

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
      <Navbar onMenuToggle={toggleSidebar} isHome={true} onUserToggle={toggleUserDropdown} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <UserDropdown isOpen={isUserDropdownOpen} />

      <main style={{ flex: 1, padding: '2rem' }}>
        <Row>
          <Col md={12}>
            <FAQPage /> {/* Add the FAQ page component here */}
          </Col>
        </Row>
      </main>

      <Footer />
    </div>
  );
}