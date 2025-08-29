import React, { useEffect, useState, useRef } from 'react';
import styles from './RentalDealCard.module.css';
import CarCard from './CarCard';
import { availableMemory } from 'process';
import { Form } from 'react-bootstrap';
import CustomDateRangePicker from '@/components/search-engine/CustomDateRangePicker';
import { useParams, useRouter } from 'next/navigation';
import ResultsSortBar from '../ResultsSortBar/ResultsSortBar';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

export default function CarAndMapLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [carCard, setCarCard] = useState(true);
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
    if (slugFromUrl && !formData.location) {
      const formattedLocation = slugFromUrl.replace(/-/g, ' ').toUpperCase();
      setFormData((prev) => ({
        ...prev,
        location: formattedLocation,
      }));
    }
  }, [slugFromUrl]);


  const dummyCars = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `${typeof window !== 'undefined'
        ? localStorage.getItem('carName') || 'Mitsubishi'
        : 'Mitsubishi'
      } ${i + 1}`,
    company: `Company ${i + 1}`,
    price: `${1000 + i * 50} AED`,
    location: 'Dubai Intl',
    seats: 4 + (i % 2),
    luggage: i % 3,
    availability: i + 1,
    doors: 4,
    transmission: 'Automatic',
    ac: true,
    image:
      typeof window !== 'undefined'
        ? localStorage.getItem('carImage') || '/images/cars/car-placeholder.jpg'
        : '/images/cars/car-placeholder.jpg',
    logo:
      typeof window !== 'undefined'
        ? localStorage.getItem('providerImage') ||
        '/images/company-logos/Clogo__280_1738575302.jpg'
        : '/images/company-logos/Clogo__280_1738575302.jpg',
  }));

  const images: ImageItem[] = [
    {
      id: 1,
      src: typeof window !== 'undefined'
        ? localStorage.getItem('carImage') || '/images/cars/car-placeholder.jpg'
        : '/images/cars/car-placeholder.jpg', // Add leading '/' for public folder
      alt: 'Nissan Sunny',
    },
    {
      id: 2,
      src: 'https://static.icartea.com/cc/20250513193126_20250513-154120.jpeg?imageMogr2/format/webp/interlace/1/quality/60/thumbnail/1200x',
      alt: 'Nissan Sunny',
    },
    {
      id: 3,
      src: 'https://cdn-cmocf.nitrocdn.com/LQTUbucCTNnUuJtbwDgwnTBnMQOwMXKo/assets/images/optimized/rev-63c8605/rentalcarsuae.com/wp-content/uploads/2024/06/Rent-Nissan-Sunny-in-Dubai-4-381x251.jpg',
      alt: 'Nissan Sunny',
    },
    {
      id: 4,
      src: 'https://carpla.vn/blog/wp-content/uploads/2024/02/tu-tin-trai-nghiem-cung-nissan-sunny-2020-voi-do-an-toan-cao.jpg',
      alt: 'Nissan Sunny',
    },
    {
      id: 5,
      src: 'https://cdn-cmocf.nitrocdn.com/LQTUbucCTNnUuJtbwDgwnTBnMQOwMXKo/assets/images/optimized/rev-63c8605/rentalcarsuae.com/wp-content/uploads/2024/06/Rent-Nissan-Sunny-in-Dubai-4-381x251.jpg',
      alt: 'Nissan Sunny',
    },
    {
      id: 6,
      src: 'https://carpla.vn/blog/wp-content/uploads/2024/02/tu-tin-trai-nghiem-cung-nissan-sunny-2020-voi-do-an-toan-cao.jpg',
      alt: 'Nissan Sunny',
    },
  ];

  const [cars, setCars] = useState<any[]>([]);
  const [visibleCars, setVisibleCars] = useState(10);
  const [isMapSticky, setIsMapSticky] = useState(true);
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

  useEffect(() => {
    const fetchCars = async () => {
      const data = dummyCars; // Simulate API fetch
      setCars(data);
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const sentinel = document.getElementById('scroll-end-marker');
    const observer = new IntersectionObserver(
      ([entry]) => setIsMapSticky(!entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );
    if (sentinel) observer.observe(sentinel);
    return () => sentinel && observer.disconnect();
  }, []);

  return (
    <>

          <div className='xl:hidden justify-items-end w-full justify-end text-right'>
            <button className={`border bg-[#0080F6] max-md:translate-x-[-25px] hover:bg-[#42C3F7] text-white transition-all duration-150 rounded px-5 py-2`} onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z"/></svg>}</button>
          </div>
      <div className={`justify-center justify-self-center w-[93%] md:ml-[55px] md:px-5 px-2 mb-2 xl:hidden border h-auto md:py-5 py-3  ${searchOpen ? 'z-[999]' : 'z-[-1]'} `}>
        {searchOpen && (
          <Form onSubmit={handleSubmit} className={`flex flex-row gap-3 max-sm:flex-wrap max-sm:gap-2 max-sm:flex-col`}>
            <Form.Control
              type="text"
              placeholder="Enter location (e.g., Dubai, UAE)"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`${styles.navbarSearchInput} ${styles.openSearchInput}`}
              aria-label="Search location"
            />
            <div className={`w-full ${styles.openSearchDate}`}>
              <CustomDateRangePicker
                value={formData.dateRange}
                isCarCard={true}
                onChange={handleDateRangeChange}
                placeholder="Select date and time range"
              />
            </div>
            <button type="submit" className={styles.navbarSearchButton}>
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" /></svg>
            </button>
          </Form>
        )}
      </div>
      <div className='relative mb-3 max-[725px]:ml-0 max-xl:justify-center max-xl:justify-items-center'>
        {/* Add the ResultsSortBar component below the filter bar */}
        <ResultsSortBar resultCount={375} defaultSort="Our recommendation" />
        {/* Add the PriceAnalysisNotification component below the ResultsSortBar */}
        {/* <PriceAnalysisNotification /> */}
        {/* Add the trackprice component below the ResultsSortBar */}
        {/* <Trackprice /> */}
      </div>
    
      <div className="mb-17 max-xl:mt-5">
        <div className="row max-xl:justify-center">
          <div className="col-12 col-md-8 px-5 max-sm:px-2">
            {cars.slice(0, visibleCars).map((car) => (
              <CarCard key={car.id} {...car} images={images} />
            ))}
            {visibleCars < cars.length && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => setVisibleCars((prev) => prev + 10)}
                  className={styles.dealBtn}
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="scroll-end-marker" style={{ height: '1px' }}></div>

      <div
        className={`${styles.mapWrapper} ${isMapSticky ? styles.mapFixed : styles.mapAbsolute
          }`}
        style={{ zIndex: '0' }}
      >
        <iframe
          className={styles.map}
          title="Rental Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.1695071737676!2d55.36443667534433!3d25.253174827315214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43474bb87a6f%3A0x44d6df1b20a0ac32!2sDubai%20International%20Airport!5e0!3m2!1sen!2sae!4v1648378305617!5m2!1sen!2sae"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}