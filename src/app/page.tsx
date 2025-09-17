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
        <div className={`${styles.backgroundSection} max-lg:bg-[#0080F6]`}>
          <div className={`container text-center mb-45 max-xl:mb-15 mt-15 ${styles.contentWrapper}`}>
            <h1 className={`${styles.mainHeading}`}>Caryaati - Seamless Car Rental Solutions</h1>
            <div className={styles.componentWrapper}>
              <Carcategory />
            </div>
            <div className={`${styles.componentWrapper} xl:h-[300px] xl:max-h-[300px]`}>
              <SearchEngine />
            </div>
          </div>
        </div>
        <div className='absolute overflow-hidden top-[0%] max-xl:top-[-450px] max-lg:hidden brightness-60'>
          <video src="/videos/bg-video.mp4" autoPlay muted loop preload='auto' className='max-xl:h-[1600px] max-lg:hidden'></video>
        </div>
        {/* Section without background color */}
        <div className="container relative" style={{ top: '50px' }}>
          <Subcategory /> {/* Includes the heading */}
        </div>
      </main>
      <DocumentsInfo />
      <FAQPage />
      <Footer />
    </div>
  );
}
