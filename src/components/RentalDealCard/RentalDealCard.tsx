import React, { useEffect, useState, useRef } from 'react';
import styles from './RentalDealCard.module.css';
import CarCard from './CarCard';
import { availableMemory } from 'process';
import { Form } from 'react-bootstrap';
import CustomDateRangePicker from '@/components/search-engine/CustomDateRangePicker';
import { useParams, useRouter } from 'next/navigation';
import ResultsSortBar from '../ResultsSortBar/ResultsSortBar';
import { CaryaatiContext } from '@/app/ContextApi/CaryaatiStore';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

export default function CarAndMapLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [isMapSticky, setIsMapSticky] = useState(true);
  const [isFiltersSticky, setIsFiltersSticky] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const { separateFilter, setSeparateFilter } = CaryaatiContext();
  const [formData, setFormData] = useState({
    location: '',
    dateRange: [null, null] as [Date | null, Date | null],
    rating: '',
    policies: '',
    supplier: '',
    pickupLocation: '',
    paymentType: '',
    priceRange: [1000, 10000] as [number, number],
  });

  const router = useRouter();
  const params = useParams();
  const slugFromUrl = Array.isArray(params?.slug)
    ? params?.slug[params?.slug.length - 1]
    : params?.slug || '';

  const [cars, setCars] = useState<any[]>([]);
  const [visibleCars, setVisibleCars] = useState(10);

  useEffect(() => {
    setSeparateFilter(filtersVisible);
  }, [filtersVisible, setSeparateFilter]);

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

  useEffect(() => {
    const sentinel = document.getElementById('scroll-end-marker');
    if (sentinel && isMounted) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isSticky = !entry.isIntersecting;
          setIsMapSticky(isSticky);
          setIsFiltersSticky(isSticky);
        },
        {
          root: null, // Use viewport as root
          threshold: 0, // Trigger when sentinel is fully out of view
          rootMargin: '0px 0px 0px 0px', // No margin
        }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }
  }, [visibleCars, isMounted]);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleRatingToggle = (value: string) => {
    const values = formData.rating ? formData.rating.split(',') : [];
    if (values.includes(value)) {
      const newValues = values.filter((v) => v !== value);
      setFormData({ ...formData, rating: newValues.join(',') });
      localStorage.setItem('rating', newValues.join(','));
    } else {
      const newValues = [...values, value];
      setFormData({ ...formData, rating: newValues.join(',') });
      localStorage.setItem('rating', newValues.join(','));
    }
  };

  const handlePoliciesToggle = (value: string) => {
    const values = formData.policies ? formData.policies.split(',') : [];
    if (values.includes(value)) {
      const newValues = values.filter((v) => v !== value);
      setFormData({ ...formData, policies: newValues.join(',') });
      localStorage.setItem('policies', newValues.join(','));
    } else {
      const newValues = [...values, value];
      setFormData({ ...formData, policies: newValues.join(',') });
      localStorage.setItem('policies', newValues.join(','));
    }
  };

  const handleSupplierToggle = (value: string) => {
    const values = formData.supplier ? formData.supplier.split(',') : [];
    if (values.includes(value)) {
      const newValues = values.filter((v) => v !== value);
      setFormData({ ...formData, supplier: newValues.join(',') });
      localStorage.setItem('supplier', newValues.join(','));
    } else {
      const newValues = [...values, value];
      setFormData({ ...formData, supplier: newValues.join(',') });
      localStorage.setItem('supplier', newValues.join(','));
    }
  };

  const handlePickupLocationToggle = (value: string) => {
    const values = formData.pickupLocation ? formData.pickupLocation.split(',') : [];
    if (values.includes(value)) {
      const newValues = values.filter((v) => v !== value);
      setFormData({ ...formData, pickupLocation: newValues.join(',') });
      localStorage.setItem('pickupLocation', newValues.join(','));
    } else {
      const newValues = [...values, value];
      setFormData({ ...formData, pickupLocation: newValues.join(',') });
      localStorage.setItem('pickupLocation', newValues.join(','));
    }
  };

  const handlePaymentTypeToggle = (value: string) => {
    const values = formData.paymentType ? formData.paymentType.split(',') : [];
    if (values.includes(value)) {
      const newValues = values.filter((v) => v !== value);
      setFormData({ ...formData, paymentType: newValues.join(',') });
      localStorage.setItem('paymentType', newValues.join(','));
    } else {
      const newValues = [...values, value];
      setFormData({ ...formData, paymentType: newValues.join(',') });
      localStorage.setItem('paymentType', newValues.join(','));
    }
  };

  const resetFilters = () => {
    setFormData({
      ...formData,
      rating: '',
      policies: '',
      supplier: '',
      pickupLocation: '',
      paymentType: '',
      priceRange: [1000, 10000],
    });
    localStorage.removeItem('rating');
    localStorage.removeItem('policies');
    localStorage.removeItem('supplier');
    localStorage.removeItem('pickupLocation');
    localStorage.removeItem('paymentType');
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

  return (
    <>
{/* Search Toggle Button - Simple, clean, responsive */}
      <div className="flex justify-end w-full xl:hidden pr-4 md:pr-0 mb-4">
        <button
          className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          {searchOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#FFFFFF">
              <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#FFFFFF">
              <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z"/>
            </svg>
          )}
          {/* {searchOpen ? 'Close' : 'Search'} */}
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
                <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z"/>
              </svg>
              Search
            </button>
          </Form>
        </div>
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

            <div
              className={`${styles.filtersWrapper} ${separateFilter ? '' : 'hidden'} ${isFiltersSticky ? '' : styles.filtersAbsolute}`}
            >
              <div className="p-6 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button onClick={toggleFilters} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
      
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Price Range</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={formData.priceRange[0]}
                      onChange={(e) => setFormData({ ...formData, priceRange: [parseInt(e.target.value), formData.priceRange[1]] })}
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={formData.priceRange[1]}
                      onChange={(e) => setFormData({ ...formData, priceRange: [formData.priceRange[0], parseInt(e.target.value)] })}
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer mt-2"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>AED {formData.priceRange[0]}</span>
                    <span>AED {formData.priceRange[1]}</span>
                  </div>
                </div>
      
                {/* Rating */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Rating</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: '4.5', label: '4.5+', price: 'AED 2,552' },
                      { value: '4', label: '4+', price: 'AED 2,552' },
                      { value: '3.5', label: '3.5+', price: 'AED 1,268' },
                      { value: '3', label: '3+', price: 'AED 2,552' },
                    ].map((rating) => (
                      <div
                        key={rating.value}
                        onClick={() => handleRatingToggle(rating.value)}
                        className={`px-4 py-3 border rounded-md cursor-pointer transition-colors ${formData.rating.split(',').includes(rating.value) ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-5 h-5 border rounded-sm mr-2 flex items-center justify-center ${formData.rating.split(',').includes(rating.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
                              {formData.rating.split(',').includes(rating.value) && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span>{rating.label}</span>
                          </div>
                          <span className="text-sm text-gray-600">{rating.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
      
                {/* Policies */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Policies</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'Free-cancellation', label: 'Free Cancellation', price: 'AED 1,268' },
                      { value: 'fair', label: 'Fair Fuel Policy', price: 'AED 2,552' },
                      { value: 'unlimited', label: 'Unlimited mileage', price: 'AED 2,552' },
                    ].map((policy) => (
                      <div
                        key={policy.value}
                        onClick={() => handlePoliciesToggle(policy.value)}
                        className={`px-4 py-3 border rounded-md cursor-pointer transition-colors ${formData.policies.split(',').includes(policy.value) ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-5 h-5 border rounded-sm mr-2 flex items-center justify-center ${formData.policies.split(',').includes(policy.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
                              {formData.policies.split(',').includes(policy.value) && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span>{policy.label}</span>
                          </div>
                          <span className="text-sm text-gray-600">{policy.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
      
                {/* Supplier */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Supplier</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'Free-cancellation', label: 'Free Cancellation', price: 'AED 1,268' },
                      { value: 'fair', label: 'Fair Fuel Policy', price: 'AED 2,552' },
                      { value: 'unlimited', label: 'Unlimited mileage', price: 'AED 2,552' },
                    ].map((supplier) => (
                      <div
                        key={supplier.value}
                        onClick={() => handleSupplierToggle(supplier.value)}
                        className={`px-4 py-3 border rounded-md cursor-pointer transition-colors ${formData.supplier.split(',').includes(supplier.value) ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-5 h-5 border rounded-sm mr-2 flex items-center justify-center ${formData.supplier.split(',').includes(supplier.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
                              {formData.supplier.split(',').includes(supplier.value) && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span>{supplier.label}</span>
                          </div>
                          <span className="text-sm text-gray-600">{supplier.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
      
                {/* Pickup Location */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Pickup Location</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'at', label: 'At Terminal', price: 'AED 1,450' },
                      { value: 'shu', label: 'Shuttle', price: 'AED 1,600' },
                      { value: 'call', label: 'Call for pick-up', price: 'AED 1,950' },
                    ].map((location) => (
                      <div
                        key={location.value}
                        onClick={() => handlePickupLocationToggle(location.value)}
                        className={`px-4 py-3 border rounded-md cursor-pointer transition-colors ${formData.pickupLocation.split(',').includes(location.value) ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-5 h-5 border rounded-sm mr-2 flex items-center justify-center ${formData.pickupLocation.split(',').includes(location.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
                              {formData.pickupLocation.split(',').includes(location.value) && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span>{location.label}</span>
                          </div>
                          <span className="text-sm text-gray-600">{location.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
      
                {/* Payment Type */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'now', label: 'Pay now', price: 'AED 1,450' },
                      { value: 'par', label: 'Partial Prepayment', price: 'AED 1,600' },
                      { value: 'pay', label: 'Pay at counter', price: 'AED 1,950' },
                    ].map((payment) => (
                      <div
                        key={payment.value}
                        onClick={() => handlePaymentTypeToggle(payment.value)}
                        className={`px-4 py-3 border rounded-md cursor-pointer transition-colors ${formData.paymentType.split(',').includes(payment.value) ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-5 h-5 border rounded-sm mr-2 flex items-center justify-center ${formData.paymentType.split(',').includes(payment.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
                              {formData.paymentType.split(',').includes(payment.value) && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span>{payment.label}</span>
                          </div>
                          <span className="text-sm text-gray-600">{payment.price}</span>
                        </div>
                      </div>
                    ))}
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

      <div id="scroll-end-marker" style={{ height: '1px' }}></div>

      <div
              className={`${styles.mapWrapper} ${separateFilter ? 'hidden' : ''} ${isMapSticky ? styles.mapFixed : styles.mapAbsolute}`}
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