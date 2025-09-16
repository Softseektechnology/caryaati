import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface CarDetailsModalProps {
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('specifications');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const carImages = [
    "/images/model_sp_596_639.webp",
    "/images/live1.jpg",
    "/images/live2.jpg",
    "/images/live3.jpg"
  ];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carImages.length - 1 : prevIndex - 1
    );
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="fixed inset-0 bg-opacity-80 flex items-center backdrop-brightness-75 justify-center z-50 p-4 backdrop-blur-[3px]">
      <div
        className="bg-white rounded-2xl relative top-10 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-95"
        ref={modalRef}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 z-10 flex justify-between items-center px-6 py-4 shadow-md">
          <div>
            <h2 className="text-2xl font-bold text-white">Nissan Sunny 2020</h2>
            <p className="text-blue-100">Economy Sedan | Perfect for City Driving</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleBookmark}
              className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all"
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this car"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${isBookmarked ? 'text-yellow-400 fill-current' : 'text-white'}`}
                fill={isBookmarked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-full bg-opacity-0 hover:bg-opacity-10"
              onClick={onClose}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative p-6 bg-gray-100">
          <div className="relative h-80 w-full overflow-hidden rounded-xl">
            <Image
              src={carImages[currentImageIndex]}
              alt="Nissan Sunny"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition-all"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition-all"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carImages.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex mt-4 space-x-3 overflow-x-auto pb-2">
            {carImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-16 relative cursor-pointer rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? 'border-blue-500' : 'border-transparent'} transition-all`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'specifications', label: 'Specifications', icon: '⚙️' },
              { id: 'features', label: 'Features', icon: '✨' },
              { id: 'rental', label: 'Rental Info', icon: '📋' },
              { id: 'notes', label: 'Notes', icon: '📝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 font-medium text-sm flex items-center border-b-2 transition-colors ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm11 1a1 1 0 00-1 1v.5a1 1 0 001 1h.5a1 1 0 001-1V7a1 1 0 00-1-1h-.5zM5 7a1 1 0 00-1 1v.5a1 1 0 001 1h.5a1 1 0 001-1V8a1 1 0 00-1-1H5zm0 4a1 1 0 00-1 1v.5a1 1 0 001 1h.5a1 1 0 001-1V12a1 1 0 00-1-1H5zm10 0a1 1 0 00-1 1v.5a1 1 0 001 1h.5a1 1 0 001-1V12a1 1 0 00-1-1h-.5z" clipRule="evenodd" />
                  </svg>
                  Vehicle Specifications
                </h3>
                <div className="h-px bg-gray-200 mb-4"></div>
                <ul className="space-y-3">
                  {[
                    { label: 'Engine', value: '1.5L 4-Cylinder' },
                    { label: 'Transmission', value: 'Auto' },
                    { label: 'Fuel Type', value: 'Petrol' },
                    { label: 'Fuel Policy', value: 'Level to Level' },
                    { label: 'Mileage Limit', value: '4500 KM' },
                    { label: 'Seating Capacity', value: '5 Adults' },
                    { label: 'Luggage Capacity', value: '3 Bags' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{item.label}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Performance
                </h3>
                <div className="h-px bg-gray-200 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Horsepower', value: '110 HP' },
                    { label: 'Top Speed', value: '180 km/h' },
                    { label: '0-100 km/h', value: '11.5s' },
                    { label: 'Fuel Economy', value: '16 km/L' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow-sm text-center">
                      <div className="text-sm text-gray-500">{item.label}</div>
                      <div className="font-semibold text-gray-900 mt-1">{item.value}</div>
                    </div>
                  ))}
                </div>

                <h4 className="font-medium text-gray-900 mt-6 mb-3">Fuel Consumption</h4>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>City</span>
                    <span>Highway</span>
                    <span>Combined</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-blue-600">14 km/L</span>
                    <span className="text-green-600">18 km/L</span>
                    <span className="text-purple-600">16 km/L</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="flex h-2 rounded-full">
                      <div className="bg-blue-600 w-2/5"></div>
                      <div className="bg-green-600 w-3/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Interior Features
                </h3>
                <div className="h-px bg-gray-200 mb-4"></div>
                <ul className="grid grid-cols-1 gap-3">
                  {[
                    'Air Conditioning',
                    'Bluetooth Connectivity',
                    'Touchscreen Display',
                    'Steering Controls',
                    'USB Ports',
                    'Keyless Entry',
                    'Push Button Start'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 极速快3 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Safety Features
                </h3>
                <div className="h-px bg-gray-200 mb-4"></div>
                <ul className="grid grid-cols-1 gap-3">
                  {[
                    'ABS Brakes',
                    'Airbags',
                    'Rearview Camera',
                    'Stability Control',
                    'Traction Control',
                    'Tire Pressure Monitoring',
                    'Parking Sensors'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Rental Info Tab */}
          {activeTab === 'rental' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Rental Information
                </h3>
                <div className="h-px bg-gray-200 mb-4"></div>
                <ul className="space-y-4">
                  {[
                    { label: 'Price', value: '1009.9 AED for 30 Days', icon: '💰' },
                    { label: 'Deposit', value: '1000 AED (Net) by Card', icon: '💳' },
                    { label: 'Availability', value: 'Only 1 Car Available', icon: '⏱️' },
                    { label: 'Minimum Rental', value: '1 Day', icon: '📅' },
                    { label: 'Delivery', value: 'Available at extra cost', icon: '🚗' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-gray-600">{item.value}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9极速快3z" clipRule="evenodd" />
                  </svg>
                  Pricing Breakdown
                </h3>
                <div className="h-px bg-gray-200 mb-4"></div>
                <div className="space-y-3">
                  {[
                    { label: 'Base Rate (30 days)', value: '1009.9 AED' },
                    { label: 'Taxes & Fees', value: '50.5 AED' },
                    { label: 'Total', value: '1060.4 AED' }
                  ].map((item, index, array) => (
                    <div key={index} className={`flex justify-between py-2 ${index < array.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <span className={index === array.length - 1 ? 'font-bold text-gray-900' : 'text-gray-600'}>{item.label}</span>
                      <span className={index === array.length - 1 ? 'font-bold text-blue-600' : 'text-gray-900'}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg">
                  Reserve Now
                </button>

                <div className="flex mt-4 space-x-2 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p>Free cancellation up to 24 hours before pickup</p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Notes Tab */}
          {activeTab === 'notes' && (
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Additional Notes
              </h3>
              <div className="h-px bg-gray-200 mb-4"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Nissan Sunny 2020 is an economy sedan perfect for city driving, offering a balance of fuel efficiency, comfort, and modern features. Ideal for both short trips and extended rentals, this vehicle ensures a reliable and enjoyable driving experience.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Good to know:</strong> This vehicle comes with a full tank of fuel and should be returned with a full tank to avoid refueling charges.
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">Why choose this car?</h4>
              <ul className="space-y-2">
                {[
                  'Excellent fuel efficiency for city driving',
                  'Spacious interior with comfortable seating for 5',
                  'Modern technology features including Bluetooth connectivity',
                  'Reliable performance with low maintenance costs',
                  'Ample trunk space for luggage and groceries'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center rounded-b-2xl">
          <div>
            <p className="text-gray-500 text-sm">Total for 30 days</p>
            <p className="text-2xl font-bold text-blue-600">1009.9 AED</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ borderRadius: '10px' }}>
              Compare
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              style={{ borderRadius: '10px' }}>
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsModal;