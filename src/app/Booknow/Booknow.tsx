'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../../components/Form/Bookform';
import ExtrasSection from '../../components/Booknow/ExtrasSection';
import CustomDateRangePicker from '@/components/search-engine/CustomDateRangePicker';
import Subcategory from '@/components/homepage-subcategory/allCarscategory';
import 'aos/dist/aos.css';
import AOS from 'aos';
import CarDetailsModal from '../../components/Booknow/CarDetailsModal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Image from 'next/image';

const CarBookingForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [carDetails, setCarDetails] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ dateRange: [Date | null, Date | null] }>({
        dateRange: [null, null],
    });
    const [displayDateRange, setDisplayDateRange] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    const totalSteps: number = 5;
    const router = useRouter();

    useEffect(() => {
        try {
            AOS.init({ duration: 400, once: true });

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

    useEffect(() => {
        const [start, end] = formData.dateRange;
        if (start && end) {
            const formatOptions: Intl.DateTimeFormatOptions = {
                month: 'short', day: 'numeric', year: 'numeric',
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
        return <div className="min-h-screen bg-white flex items-center justify-center"><p className="text-gray-600">Loading...</p></div>;
    }

    return (
        <>
            <div className="bg-white min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Book Your Car</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">Complete your booking in a few simple steps</p>
                    </div>

                    {/* Stepper */}
                    <div className="relative max-w-4xl mx-auto mb-16">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
                        <div
                            className="absolute top-1/2 left-0 h-0.5 bg-blue-600 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
                            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                        ></div>
                        <div className="relative flex justify-between items-center">
                            {['Vehicle', 'Extras', 'Options', 'Details', 'Confirm'].map((label, index) => (
                                <div key={label} className="z-20 text-center cursor-pointer group" onClick={() => showStep(index + 1)}>
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ease-in-out ${currentStep >= index + 1 ? 'bg-blue-600 text-white border-2 border-blue-600' : 'bg-white border-2 border-gray-300 text-gray-400'} ${currentStep === index + 1 ? 'ring-4 ring-blue-100 scale-110' : ''}`}>
                                        {index + 1}
                                    </div>
                                    <p className={`mt-3 text-xs text-left font-medium w-20 ${currentStep >= index + 1 ? 'text-gray-900 font-semibold' : 'text-gray-400'} group-hover:text-gray-700`}>
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="mt-10">
                        {currentStep === 1 && (
                            <div className="bg-white">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    {/* Left Side: Image Gallery */}
                                    <div className="flex-shrink-0 lg:w-1/2">
                                        <div className="relative overflow-hidden rounded-lg aspect-video mb-4">
                                            <Image
                                                src={selectedImage}
                                                alt="Selected Car"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="px-1">
                                            <Slider {...sliderSettings}>
                                                {carImages.map(img => (
                                                    <div key={img.id} className="px-2">
                                                        <div className={`relative h-16 rounded-md overflow-hidden border cursor-pointer transition-all duration-200 ${selectedImage === img.src ? 'border-blue-500 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedImage(img.src)}>
                                                            <Image
                                                                src={img.src}
                                                                alt={img.alt}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    </div>

                                    {/* Right Side: Car Info */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Nissan Sunny 2020</h2>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Sedan</span>
                                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Popular</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setCarDetails(true)}
                                                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                                            >
                                                Details
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 my-4">
                                            <p className="text-sm text-red-700 font-medium flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                                High Demand - Only 1 Car Available
                                            </p>
                                        </div>

                                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">1009.9 AED</h3>
                                            <p className="text-xs text-gray-500">Price for 30 Day(s) | Your Rental: 30 Day(s)</p>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center py-4 border-t border-b border-gray-200">
                                            <div className="p-2">
                                                <div className="bg-gray-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center mx-auto mb-2">
                                                    <img src="/images/filter-icon/engin_img.png" className="h-5 w-5" alt="Engine" />
                                                </div>
                                                <p className="text-xs text-gray-600">Engine<br /><span className="font-medium">1.5L</span></p>
                                            </div>
                                            <div className="p-2">
                                                <div className="bg-gray-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center mx-auto mb-2">
                                                    <img src="/images/filter-icon/automatic-black.svg" className="h-5 w-5" alt="Transmission" />
                                                </div>
                                                <p className="text-xs text-gray-600">Fuel Policy<br /><span className="font-medium">Level to Level</span></p>
                                            </div>
                                            <div className="p-2">
                                                <div className="bg-gray-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center mx-auto mb-2">
                                                    <img src="/images/filter-icon/ac-black.svg" className="h-5 w-5" alt="AC" />
                                                </div>
                                                <p className="text-xs text-gray-600">Mileage<br /><span className="font-medium">4500 KM</span></p>
                                            </div>
                                            <div className="p-2">
                                                <div className="bg-gray-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center mx-auto mb-2">
                                                    <img src="/images/filter-icon/luggage-black.svg" className="h-5 w-5" alt="Deposit" />
                                                </div>
                                                <p className="text-xs text-gray-600">Deposit<br /><span className="font-medium">1000 AED</span></p>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                Choose Rental Dates
                                            </h3>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <CustomDateRangePicker value={formData.dateRange} onChange={handleDateRangeChange} />
                                                <p className="text-xs text-gray-500 mt-3 bg-white p-2 rounded">{displayDateRange}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="bg-white">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                    </svg>
                                    Add Extra Services
                                </h2>
                                <ExtrasSection />
                                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mt-6">
                                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                                        <div className="bg-blue-100 p-4 rounded-lg">
                                            <img src="/images/filter-icon/checkout_left.jpeg" className="w-16 h-16 object-contain" alt="Privacy First" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 mb-4">We Value Your Privacy: Caryaati will NOT sell or distribute your contact information.</p>
                                            <label className="flex items-center text-sm text-gray-600 mb-3 p-2 rounded hover:bg-gray-100 transition-colors">
                                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" />
                                                <span>I have read and accepted the <a href="/Terms-conditions" className="text-blue-600 hover:underline font-medium">Terms of Use</a>.</span>
                                            </label>
                                            <label className="flex items-center text-sm text-gray-600 p-2 rounded hover:bg-gray-100 transition-colors">
                                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" />
                                                <span>I have read and accepted the <a href="/Privacy-policy" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>.</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div>
                                <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        Similar Vehicles
                                    </h2>
                                    <p className="text-gray-600 mb-6">Check out these similar vehicles that might suit your needs</p>
                                </div>
                                <Subcategory />
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div>
                                <div className="bg-white">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Your Information
                                    </h2>
                                    <Form />
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="bg-white rounded-lg border border-gray-100 p-8 shadow-sm text-center">
                                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmation</h2>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">Please review your booking details below. Click "Finish" to complete your reservation.</p>
                                <div className="text-left max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">Booking Summary</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-1">Car</p>
                                                <p className="font-medium">Nissan Sunny 2020</p>
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-1">Price</p>
                                                <p className="font-medium">1009.9 AED for 30 Day(s)</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Rental Dates</p>
                                                <p className="font-medium">{displayDateRange}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-1">Engine</p>
                                                <p className="font-medium">1.5L</p>
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-1">Fuel Policy</p>
                                                <p className="font-medium">Level to Level</p>
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-1">Mileage</p>
                                                <p className="font-medium">4500 KM</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Deposit</p>
                                                <p className="font-medium">1000 AED</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-between items-center mt-10">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="flex items-center text-gray-600 font-medium py-2.5 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                                style={{borderRadius: '10px'}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Previous
                            </button>
                            <button
                                onClick={nextStep}
                                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-8 transition-all shadow-sm hover:shadow-md"
                                style={{borderRadius: '10px'}}
                            >
                                {currentStep === totalSteps ? 'Complete Booking' : 'Next'}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
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