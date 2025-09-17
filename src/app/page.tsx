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
