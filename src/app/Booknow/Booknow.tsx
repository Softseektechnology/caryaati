'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Homepage from '../../components/homepage-subcategory/allCarscategory';
import Form from '../Form/Bookform';
import ExtrasSection from './ExtrasSection';
import CustomDateRangePicker from '@/components/search-engine/CustomDateRangePicker';
import Subcategory from '@/components/homepage-subcategory/allCarscategory';
import 'aos/dist/aos.css';
import AOS from 'aos';
import CarDetailsModal from './CarDetailsModal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const CarBookingForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [carDetails, setCarDetails] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ dateRange: [Date | null, Date | null] }>({
        dateRange: [null, null],
    });
    const [displayDateRange, setDisplayDateRange] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    const totalSteps: number = 5; // Updated to 5 steps
    const router = useRouter();

    useEffect(() => {
        try {
            AOS.init({ duration: 600, once: true });
            
            // Set initial dates from localStorage or default
            const startDateStr = localStorage.getItem('startDate');
            const endDateStr = localStorage.getItem('endDate');
            const defaultStartDate = new Date('2025-09-02T22:00:00+05:00');
            const defaultEndDate = new Date('2025-09-03T22:00:00+05:00');
            const startDate = startDateStr ? new Date(startDateStr) : defaultStartDate;
            const endDate = endDateStr ? new Date(endDateStr) : defaultEndDate;

            setFormData({
                dateRange: [
                    startDate instanceof Date && !isNaN(startDate.getTime()) ? startDate : defaultStartDate,
                    endDate instanceof Date && !isNaN(endDate.getTime()) ? endDate : defaultEndDate,
                ],
            });

            setIsClient(true);
        } catch (error) {
            console.error("Error during client-side initialization:", error);
        }
    }, []);

    // Effect to update the display string when dates change
    useEffect(() => {
        const [start, end] = formData.dateRange;
        if (start && end) {
            const formatOptions: Intl.DateTimeFormatOptions = {
                month: 'long', day: 'numeric', year: 'numeric',
                hour: 'numeric', minute: '2-digit', hour12: true,
            };
            setDisplayDateRange(
                `Pick-up: ${start.toLocaleString('en-US', formatOptions)} - Drop-off: ${end.toLocaleString('en-US', formatOptions)}`
            );
        }
    }, [formData.dateRange]);

    const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
        setFormData({ ...formData, dateRange: [startDate, endDate] });
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            router.push('/Confirmation');
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const showStep = (step: number) => {
        if (step <= totalSteps) {
          setCurrentStep(step);
        }
    };

    const carImages = [
        { id: 1, src: '/images/model_sp_596_639.webp', alt: 'Nissan Sunny Front' },
        { id: 2, src: '/images/live1.jpg', alt: 'Nissan Sunny Side' },
        { id: 3, src: '/images/live2.jpg', alt: 'Nissan Sunny Interior' },
        { id: 4, src: '/images/live3.jpg', alt: 'Nissan Sunny Back' },
    ];
    const [selectedImage, setSelectedImage] = useState(carImages[0].src);
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
    ]
    };

    if (!isClient) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p>Loading...</p></div>;
    }

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {/* Stepper */}
                    <div data-aos="fade-up" className="relative max-w-3xl mx-auto mb-10">
                        <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-gray-200 z-0"></div>
                        <div 
                            className="absolute top-1/2 -translate-y-1/2 h-1 bg-[#ffc107] z-10 transition-all duration-300 ease-in-out" 
                            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                        ></div>
                        <div className="relative flex justify-between items-center">
                            {['Car Details', 'Extras', 'Suggestions', 'Privacy', 'Confirmation'].map((label, index) => (
                                <div key={label} className="z-20 text-center cursor-pointer" onClick={() => showStep(index + 1)}>
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ease-in-out ${currentStep >= index + 1 ? 'bg-[#ffc107] text-white border-2 border-[#ffc107]' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                                        {index + 1}
                                    </div>
                                    <p className={`relative top-5 left-[-30px] text-xs font-medium w-24 ${currentStep >= index + 1 ? 'text-gray-800' : 'text-gray-400'}`}>
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="mt-16">
                        {currentStep === 1 && (
                            <div data-aos="fade-up" className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Left Side: Image Gallery */}
                                    <div className="flex-shrink-0 lg:w-1/2">
                                        <img src={selectedImage} alt="Selected Car" className="w-full h-auto aspect-[16/10] object-cover rounded-lg mb-4" />
                                        <div className="px-1">
                                            <Slider {...sliderSettings}>
                                                {carImages.map(img => (
                                                    <div key={img.id} className="px-2">
                                                        <img src={img.src} alt={img.alt} className={`w-full h-[70px] object-cover rounded-md border-2 cursor-pointer transition-colors hover:border-yellow-300 ${selectedImage === img.src ? 'border-[#ffc107]' : 'border-transparent'}`} onClick={() => setSelectedImage(img.src)} />
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    </div>

                                    {/* Right Side: Car Info */}
                                    <div className="flex-1">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Nissan Sunny 2020</h2>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">Sedan</span>
                                            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
                                        </div>
                                        <p className="text-sm text-red-600 my-4 font-semibold">In High Demand! Only 1 Car Available for Booking</p>
                                        
                                        <div className="mb-4">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-[#ffc107]">1009.9 AED</h3>
                                            <p className="text-xs text-gray-500">Price for 30 Day(s) | Your Rental: 30 Day(s)</p>
                                            <button onClick={() => setCarDetails(true)} className="text-sm font-medium text-yellow-600 hover:text-yellow-700 mt-1">More Details</button>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-4 border-t border-b border-gray-200">
                                            <div data-aos="fade-up" data-aos-delay="100"><img src="/images/filter-icon/engin_img.png" className="h-6 w-6 mx-auto mb-1" alt="Engine"/> <p className="text-xs text-gray-600 font-medium">Engine<br />1.5L</p></div>
                                            <div data-aos="fade-up" data-aos-delay="200"><img src="/images/filter-icon/automatic-black.svg" className="h-6 w-6 mx-auto mb-1" alt="Transmission"/> <p className="text-xs text-gray-600 font-medium">Fuel Policy<br/>Level to Level</p></div>
                                            <div data-aos="fade-up" data-aos-delay="300"><img src="/images/filter-icon/ac-black.svg" className="h-6 w-6 mx-auto mb-1" alt="AC"/> <p className="text-xs text-gray-600 font-medium">Mileage<br />4500 KM</p></div>
                                            <div data-aos="fade-up" data-aos-delay="400"><img src="/images/filter-icon/luggage-black.svg" className="h-6 w-6 mx-auto mb-1" alt="Deposit"/> <p className="text-xs text-gray-600 font-medium">Deposit<br />1000 AED</p></div>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose Rental Dates</h3>
                                            <CustomDateRangePicker value={formData.dateRange} onChange={handleDateRangeChange} />
                                            <p className="text-xs text-gray-500 mt-1">{displayDateRange}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div data-aos="fade-up" className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">Add Extra or Optional Charges</h2>
                                <ExtrasSection />
                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-6">
                                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                                        <img src="/images/filter-icon/checkout_left.jpeg" className="w-24 h-24 object-cover rounded-lg" alt="Privacy First" />
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 mb-3">We Value Your Privacy: Caryaati will NOT sell or distribute your contact information.</p>
                                            <label className="flex items-center text-sm text-gray-600 mb-2">
                                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500" />
                                                <span className="ml-2">I have read and accepted the <a href="/Terms-conditions" className="text-yellow-600 hover:underline">Terms of Use</a>.</span>
                                            </label>
                                            <label className="flex items-center text-sm text-gray-600">
                                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500" />
                                                <span className="ml-2">I have read and accepted the <a href="/Privacy-policy" className="text-yellow-600 hover:underline">Privacy Policy</a>.</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div data-aos="fade-up">
                                <Subcategory />
                            </div>
                        )}
                        
                        {currentStep === 4 && (
                            <div data-aos="fade-up">
                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">Your Information & Privacy</h2>
                                    <Form />
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div data-aos="fade-up" className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmation</h2>
                                <p className="text-gray-600 mb-6">Please review your booking details below. Click "Finish" to complete your reservation.</p>
                                <div className="text-left max-w-2xl mx-auto">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Booking Summary</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600"><strong>Car:</strong> Nissan Sunny 2020</p>
                                            <p className="text-sm text-gray-600"><strong>Price:</strong> 1009.9 AED for 30 Day(s)</p>
                                            <p className="text-sm text-gray-600"><strong>Rental Dates:</strong> {displayDateRange}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600"><strong>Engine:</strong> 1.5L</p>
                                            <p className="text-sm text-gray-600"><strong>Fuel Policy:</strong> Level to Level</p>
                                            <p className="text-sm text-gray-600"><strong>Mileage:</strong> 4500 KM</p>
                                            <p className="text-sm text-gray-600"><strong>Deposit:</strong> 1000 AED</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-between items-center mt-8">
                            <button onClick={prevStep} disabled={currentStep === 1} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button onClick={nextStep} className="bg-[#ffc107] hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-all shadow-sm hover:shadow-md">
                                {currentStep === totalSteps ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {carDetails && <CarDetailsModal onClose={() => setCarDetails(false)} />}
        </>
    );
};

export default CarBookingForm;



