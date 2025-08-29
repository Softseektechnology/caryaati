'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/nevegation-header/Navbar';
import Sidebar from '../components/multiplepages/Sidebar-multiplelinks';
import UserDropdown from '../components/customer-dashboard/user-dashboard';
import Subcategory from '../components/homepage-subcategory/allCarscategory';
import Footer from '../components/foorter/Footer';
import Carcategory from '../components/car-categories/index-car-categories';
import FAQPage from '../components/faq/faq';
import styles from '../../public/styles/Home.module.css';
import SearchEngine from '../components/search-engine/search-console';
import DocumentsInfo from '@/components/Documents-info/documents-info';

export default function Home() {
  const [imageFailed, setImageFailed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isHome, setIsHome] = useState(false);
  
  // useEffect(()=>{
  //   setIsHome(true)
  // },[]) 



  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.container}>
      <Navbar
        onMenuToggle={() => {
          setIsSidebarOpen(!isSidebarOpen);
          setIsDropdownOpen(false);
        }}
        onUserToggle={() => {
          setIsDropdownOpen(!isDropdownOpen);
          setIsSidebarOpen(false);
        }}
        isHome={true}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <UserDropdown isOpen={isDropdownOpen} />
      <main className={`${styles.mainContent}`}>
        {/* Section with background color */}
        <div className={`${styles.backgroundSection}`}>
          <div className={`container text-center mb-10 mt-15 ${styles.contentWrapper}`}>
            <h1 className={`${styles.mainHeading}`}>Caryaati - Seamless Car Rental Solutions</h1>
            <div className={styles.componentWrapper}>
              <Carcategory />
            </div>
            <div className={styles.componentWrapper}>
              <SearchEngine />
            </div>
          </div>
        </div>
        {/* Section without background color */}
        <div className="container" style={{ marginTop: '50px' }}>
          <Subcategory /> {/* Includes the heading */}
        </div>
      </main>
      <DocumentsInfo />
      <FAQPage />
      <Footer />
    </div>
  );
}