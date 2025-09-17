'use client';
import React, { useEffect, useState } from 'react';
import styles from './RentalDealCard.module.css';
import CarCard from './CarCard';
import { Form } from 'react-bootstrap';
import CustomDateRangePicker from '@/components/search-engine/CustomDateRangePicker';
import { useParams, useRouter } from 'next/navigation';
import ResultsSortBar from '../ResultsSortBar/ResultsSortBar';
import { Filter } from 'lucide-react';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

export default function CarAndMapLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [carCard, setCarCard] = useState(true);
  const [formData, setFormData] = useState({
    location: '',
    dateRange: [null, null] as [Date | null, Date | null],
  });
  const [isMapSticky, setIsMapSticky] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [squareFootage, setSquareFootage] = useState([500, 5000]);

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
  
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handlePropertyTypeToggle = (type: string) => {
    if (propertyType.includes(type)) {
      setPropertyType(propertyType.filter(t => t !== type));
    } else {
      setPropertyType([...propertyType, type]);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const resetFilters = () => {
    setPriceRange([1000, 10000]);
    setBedrooms(null);
    setBathrooms(null);
    setPropertyType([]);
    setAmenities([]);
    setSquareFootage([500, 5000]);
  };

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
        ? localStorage.getItem('carImage') || '/images/cars/32_sedan_white.png'
        : '/images/cars/32_sedan_white.png',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    console.log('Selected Range:', startDate?.toLocaleString(), endDate?.toLocaleString());
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
    if (sentinel) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsMapSticky(!entry.isIntersecting);
        },
        { root: null, threshold: 0.1 }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }
  }, [visibleCars]); // Re-run when visibleCars changes to update observer

  return (
    <>
      {/* Search Toggle Button - Simple, clean, responsive */}
      <button
        className={`px-4 py-2 text-white bg-gradient-to-r to-[#0080F6] from-[#00aaff] transition-all duration-150 mb-3 flex items-center content-center ${styles.filtersBtn}`}
        style={{ borderRadius: '10px' }}
        onClick={toggleFilters}
      >
        <Filter size={16} /> &nbsp; Filters
      </button>
      
      {/* Filters Panel */}
      <div className={`z-[1000] transition-all duration-300 bg-white ${filtersVisible ? 'right-0' : 'right-[-100%]'} overflow-y-auto fixed top-0 bottom-0 w-[90%] md:w-130 shadow-2xl`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
            <button onClick={toggleFilters} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Price Range</h3>
            <div className="px-2">
              <input 
                type="range" 
                min="500" 
                max="15000" 
                value={priceRange[0]} 
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
              <input 
                type="range" 
                min="500" 
                max="15000" 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer mt-2"
              />
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex-1 mr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input 
                    type="number" 
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="pl-8 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex-1 ml-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input 
                    type="number" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="pl-8 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Property Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Apartment', 'House', 'Condo', 'Townhouse'].map(type => (
                <div 
                  key={type}
                  onClick={() => handlePropertyTypeToggle(type)}
                  className={`px-4 py-3 border rounded-md cursor-pointer transition-colors ${propertyType.includes(type) ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 min-w-5 border rounded-sm mr-2 flex items-center justify-center ${propertyType.includes(type) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
                      {propertyType.includes(type) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span>{type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Bedrooms & Bathrooms</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <div className="flex space-x-2">
                  {[0, 1, 2, 3, 4].map(count => (
                    <button
                      key={count}
                      onClick={() => setBedrooms(count === bedrooms ? null : count)}
                      className={`px-3 py-1 rounded-md text-sm ${bedrooms === count ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {count === 0 ? 'Any' : count === 4 ? '4+' : count}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <div className="flex space-x-2">
                  {[0, 1, 2, 3].map(count => (
                    <button
                      key={count}
                      onClick={() => setBathrooms(count === bathrooms ? null : count)}
                      className={`px-3 py-1 rounded-md text-sm ${bathrooms === count ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {count === 0 ? 'Any' : count === 3 ? '3+' : count}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {['WiFi', 'Parking', 'Pool', 'Gym', 'AC', 'Pet Friendly'].map(amenity => (
                <div 
                  key={amenity}
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`px-4 py-3 border rounded-md cursor-pointer transition-colors ${amenities.includes(amenity) ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 border rounded-sm mr-2 flex items-center justify-center ${amenities.includes(amenity) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
                      {amenities.includes(amenity) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span>{amenity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Square Footage */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Square Footage</h3>
            <div className="px-2">
              <input 
                type="range" 
                min="0" 
                max="10000" 
                value={squareFootage[0]} 
                onChange={(e) => setSquareFootage([parseInt(e.target.value), squareFootage[1]])}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
              <input 
                type="range" 
                min="0" 
                max="10000" 
                value={squareFootage[1]} 
                onChange={(e) => setSquareFootage([squareFootage[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer mt-2"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{squareFootage[0]} sq ft</span>
              <span>{squareFootage[1]} sq ft</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-4">
            <button 
              onClick={resetFilters}
              className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
            <button 
              onClick={toggleFilters}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {filtersVisible && (
        <div 
          onClick={toggleFilters}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}

      <div className="flex justify-end w-full xl:hidden pr-4 md:pr-0 mb-4">
        <button
          className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          {searchOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#FFFFFF">
              <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#FFFFFF">
              <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Search Section - Simple, clean, responsive */}
      <div className={`w-full max-sm:w-[98vw] xl:hidden px-4 md:px-6 ${searchOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
          <Form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-center">
            {/* Location Input */}
            <Form.Control
              type="text"
              placeholder="Enter location (e.g., Dubai, UAE)"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 w-full"
              aria-label="Search location"
            />
            {/* Date Picker */}
            <div className="w-full">
              <CustomDateRangePicker
                value={formData.dateRange}
                isCarCard={true}
                onChange={handleDateRangeChange}
                placeholder="Select date and time range"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 w-full md:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#FFFFFF">
                <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
              </svg>
              Search
            </button>
          </Form>
        </div>
      </div>

      <div className="relative mb-3 max-[725px]:ml-0 max-xl:justify-center max-xl:justify-items-center">
        <ResultsSortBar resultCount={375} defaultSort="Our recommendation" />
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
            <div id="scroll-end-marker" style={{ height: '1px' }}></div>
          </div>
        </div>
      </div>

      <div
        className={`${styles.mapWrapper} ${isMapSticky ? styles.mapFixed : styles.mapAbsolute}`}
        style={{ zIndex: '0' }}
      >
        <iframe
          className={styles.map}
          title="Rental Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.1695071737676!2d55.36443677534433!3d25.253174827315214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43474bb87a6f%3A0x44d6df1b20a0ac32!2sDubai%20International%20Airport!5e0!3m2!1sen!2sae!4v1648378305617!5m2!1sen!2sae"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}