'use client';

import Image from 'next/image';
import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useRouter, useParams } from 'next/navigation';
import CustomDateRangePicker from '../search-engine/CustomDateRangePicker';
import { isSea } from 'node:sea';
import Link from 'next/link';
import { DoorOpen } from 'lucide-react';


interface NavbarProps {
  onMenuToggle: () => void;
  onUserToggle: () => void;
  isHome: boolean;
}

export default function Navbar({ onMenuToggle, onUserToggle, isHome }: NavbarProps) {
  const [formData, setFormData] = useState({
    location: '',
    dateRange: [null, null] as [Date | null, Date | null],
  });
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const params = useParams();
  const slugFromUrl = Array.isArray(params?.slug)
    ? params?.slug[params?.slug.length - 1]
    : params?.slug || '';

  useEffect(() => {
    setIsMounted(true);

    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');

    let start: Date | null = null;
    let end: Date | null = null;

    if (storedStartDate && storedEndDate) {
      start = new Date(storedStartDate);
      end = new Date(storedEndDate);
    } else {
      const now = new Date();
      start = new Date(now);
      end = new Date(now);
      end.setDate(now.getDate() + 1);
    }

    setFormData((prev) => ({
      ...prev,
      dateRange: [start, end],
    }));
  }, []);

  useEffect(() => {
    if (slugFromUrl && !formData.location && !isHome) {
      const formattedLocation = slugFromUrl.replace(/-/g, ' ').toUpperCase();
      setFormData((prev) => ({
        ...prev,
        location: formattedLocation,
      }));
    }
  }, [slugFromUrl, isHome]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    console.log('Selected Range:', startDate?.toLocaleString(), endDate?.toLocaleString()); // Debug
    setFormData({
      ...formData,
      dateRange: [startDate, endDate],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const location = formData.location.toLowerCase().trim();
    const slug = location.replace(/\s+/g, '-');
    const citySlugs = ['dubai', 'abu-dhabi', 'sharjah', 'ajman', 'umm-al-quwain', 'al-ain', 'fujairah', 'ras-al-khaimah'];

    localStorage.setItem('startDate', formData.dateRange[0]?.toISOString() || '');
    localStorage.setItem('endDate', formData.dateRange[1]?.toISOString() || '');

    if (slug === 'nissan') {
      router.push(`/cars-for-rent/nissan`);
    } else if (citySlugs.includes(slug)) {
      router.push(`/rent-a-car/${slug}`);
    } else if (slug === 'dubai-international-airport') {
      router.push(`/car-rental-airport/dubai-international-airport-terminal-1`);
    } else {
      router.push(`/cars-for-rent/${slug}`);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <button className={styles.hamburger} onClick={onMenuToggle}>
              <i className="bi bi-list" style={{ fontSize: '24px' }}></i>
            </button>
            <a className="navbar-brand" href="/">
              <Image src="/images/temp-logo.jpeg" alt="Logo" width={100} height={25} />
            </a>
          </div>

          <div className='max-xl:hidden flex justify-center flex-grow'>

          {!isHome && (
            <Form onSubmit={handleSubmit} className={`${styles.navbarSearchForm} max-xl:hidden`}>
              <Form.Control
                type="text"
                placeholder="Enter location (e.g., Dubai, UAE)"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={styles.navbarSearchInput}
                aria-label="Search location"
                />
                <div className='w-[415px]'>
              <CustomDateRangePicker
                value={formData.dateRange}
                onChange={handleDateRangeChange}
                placeholder="Select date and time range"
                />
                </div>
              <button type="submit" className={styles.navbarSearchButton}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#FFFFFF"><path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z"/></svg>
              </button>
            </Form>
          )}
          </div>

          <div className="ms-auto">
              {localStorage.getItem('isLoggedIn') === 'true' ? (
            <button className="btn" onClick={onUserToggle}>
                <Image src="/images/user-image.png" alt="User" width={30} height={30} />
                </button>
              ) : (
                <Link href="/login" className="no-underline text-red-600 font-medium" style={{ textDecoration: 'none' }}>
                  <div className="flex content-center no-underline text-red-600 font-medium items-center"><DoorOpen /> Login</div>
                </Link>
              )}
          </div>
        </div>
      </nav>
      <div style={{ height: '70px' }}></div> 

    </>
  );
}