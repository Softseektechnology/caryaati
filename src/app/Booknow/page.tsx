'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Slider from 'react-slick';

// Layout & Form Components
import Navbar from '../../components/nevegation-header/Navbar';
import Footer from '../../components/foorter/Footer';
import UserDropdown from '../../components/customer-dashboard/user-dashboard';
import Sidebar from '../../components/multiplepages/Sidebar-multiplelinks';
import Form from '../../components/Form/Bookform';
import CustomDateRangePicker from '@/components/search-engine/CustomDateRangePicker';
import Subcategory from '@/components/homepage-subcategory/allCarscategory';

// Styling
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './booknow.module.css';

// NOTE: Add Font Awesome to your project's layout for these icons to appear.
// Example: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

//=========== CAR DETAILS MODAL COMPONENT ===========//
interface CarDetailsModalProps {
  onClose: () => void;
}
const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('specifications');
    const [isBookmarked, setIsBookmarked] = useState(false);

    const carImages = ["/images/model_sp_596_639.webp", "/images/live1.jpg", "/images/live2.jpg", "/images/live3.jpg"];

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) onClose();
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    const nextImage = () => setCurrentImageIndex((prev) => (prev === carImages.length - 1 ? 0 : prev + 1));
    const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? carImages.length - 1 : prev - 1));
    const toggleBookmark = () => setIsBookmarked(!isBookmarked);

    return (
        <div className="fixed inset-0 bg-opacity-80 flex items-center backdrop-brightness-75 justify-center z-50 p-4 backdrop-blur-[3px]">
            <div className="bg-white rounded-2xl relative max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" ref={modalRef}>
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 z-10 flex justify-between items-center px-6 py-4 shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Nissan Sunny 2020</h2>
                        <p className="text-blue-100">Economy Sedan | Perfect for City Driving</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleBookmark} className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isBookmarked ? 'text-yellow-400' : 'text-white'}`} fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </button>
                        <button className="text-white hover:text-blue-200 p-2" onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="relative p-6 bg-gray-100">
                    <div className="relative h-80 w-full overflow-hidden rounded-xl">
                        <Image src={carImages[currentImageIndex]} alt="Nissan Sunny" fill className="object-cover transition-transform duration-500 hover:scale-105" priority />
                        <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                    <div className="flex mt-4 space-x-3 overflow-x-auto pb-2">
                        {carImages.map((img, index) => (
                            <div key={index} onClick={() => setCurrentImageIndex(index)} className={`flex-shrink-0 w-20 h-16 relative cursor-pointer rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}>
                                <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-b border-gray-200 px-6">
                    <nav className="flex space-x-8">
                        {[{ id: 'specifications', label: 'Specifications', icon: '⚙️' }, { id: 'features', label: 'Features', icon: '✨' }, { id: 'rental', label: 'Rental Info', icon: '📋' }, { id: 'notes', label: 'Notes', icon: '📝' }].map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-1 font-medium text-sm flex items-center border-b-2 transition-colors ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                                <span className="mr-2">{tab.icon}</span>{tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="p-6">
                    {activeTab === 'specifications' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-5 rounded-xl">
                                <h3 className="text-xl font-semibold mb-4">Vehicle Specifications</h3>
                                <ul className="space-y-3">
                                    {[{ label: 'Engine', value: '1.5L 4-Cylinder' }, { label: 'Transmission', value: 'Auto' }, { label: 'Fuel Type', value: 'Petrol' }, { label: 'Fuel Policy', value: 'Level to Level' }, { label: 'Mileage Limit', value: '4500 KM' }, { label: 'Seating', value: '5 Adults' }, { label: 'Luggage', value: '3 Bags' }].map((item, index) => (
                                        <li key={index} className="flex justify-between py-2 border-b last:border-b-0">
                                            <span className="text-gray-600">{item.label}</span>
                                            <span className="font-medium">{item.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-xl">
                                <h3 className="text-xl font-semibold mb-4">Performance</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[{ label: 'Horsepower', value: '110 HP' }, { label: 'Top Speed', value: '180 km/h' }, { label: '0-100 km/h', value: '11.5s' }, { label: 'Fuel Economy', value: '16 km/L' }].map((item, index) => (
                                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm text-center">
                                            <div className="text-sm text-gray-500">{item.label}</div>
                                            <div className="font-semibold mt-1">{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                     {activeTab === 'features' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[ { title: 'Interior Features', items: ['Air Conditioning', 'Bluetooth', 'Touchscreen', 'USB Ports', 'Keyless Entry'] }, { title: 'Safety Features', items: ['ABS Brakes', 'Airbags', 'Rearview Camera', 'Parking Sensors'] } ].map((section) => (
                                <div key={section.title} className="bg-gray-50 p-5 rounded-xl">
                                    <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                                    <ul className="grid grid-cols-1 gap-3">
                                        {section.items.map((feature, index) => (
                                            <li key={index} className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'rental' && <div>Rental Information Content...</div>}
                    {activeTab === 'notes' && <div>Additional Notes Content...</div>}
                </div>
                <div className="sticky bottom-0 bg-white border-t px-4 py-2 flex justify-between items-center rounded-b-2xl">
                    <div>
                        <p className="text-sm">Total for 30 days</p>
                        <p className="text-2xl font-bold text-blue-600">1009.9 AED</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">Reserve Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

//=========== EXTRAS SECTION COMPONENT ===========//
interface ExtrasSectionProps {
  onTotalsChange?: (protection: number, extras: number, additionalDriver: number) => void;
}
const ExtrasSection: React.FC<ExtrasSectionProps> = ({ onTotalsChange }) => {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['protection']));
    const [selectedPackage, setSelectedPackage] = useState<string>('Super');
    const [extraQuantities, setExtraQuantities] = useState<{ [key: string]: number }>({ infantSeat: 0, childBooster: 0, childSafety: 0 });
    const [additionalDriverQuantity, setAdditionalDriverQuantity] = useState<number>(0);

    const packages = [{ name: 'Super', price: '300.00 AED' }, { name: 'Basic', price: '0 AED' }];
    const extraItems = [{ id: 'infantSeat', name: 'Infant Safety Seat\n(Birth to 12 months)', price: '10 AED/Day', image: '/images/filter-icon/infant_seat.png' }, { id: 'childBooster', name: 'Child Booster Seat\n(4 to 7 years)', price: '10 AED/Day', image: '/images/filter-icon/booster.png' }, { id: 'childSafety', name: 'Child Safety Seat\n(1 to 3 years)', price: '10 AED/Day', image: '/images/filter-icon/child.png' }];
    const additionalDriver = { id: 'additionalDriver', name: 'Additional Driver', price: '50 AED/Driver', icon: 'fas fa-user-plus' };
    
    const toggleSection = (section: string) => setExpandedSections(prev => {
        const newSet = new Set(prev);
        newSet.has(section) ? newSet.delete(section) : newSet.add(section);
        return newSet;
    });

    const updateQuantity = (id: string, delta: number) => setExtraQuantities(prev => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }));
    const updateDriverQuantity = (delta: number) => setAdditionalDriverQuantity(prev => Math.max(0, prev + delta));
    
    const basePrice = 1009.9;
    const totalProtection = selectedPackage === 'Super' ? 300.00 : 0.00;
    const totalExtras = Object.values(extraQuantities).reduce((sum, qty) => sum + (qty * 10), 0);
    const totalAdditionalDriver = additionalDriverQuantity * 50;
    const securityDeposit = 1000.00;
    const subtotal = basePrice + totalProtection + totalExtras + totalAdditionalDriver + securityDeposit;
    const vat = subtotal * 0.05;
    const totalCharges = subtotal + vat;
    
    useEffect(() => {
        if (onTotalsChange) {
            onTotalsChange(totalProtection, totalExtras, totalAdditionalDriver);
        }
    }, [totalProtection, totalExtras, totalAdditionalDriver, onTotalsChange]);

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <div className="border-b">
                <div className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer" onClick={() => toggleSection('protection')}>
                    <span>Protection Packages</span>
                    <span className="font-bold text-orange-500">{totalProtection.toFixed(2)} AED</span>
                    <svg className={`w-5 h-5 transition-transform ${expandedSections.has('protection') ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
                <div className={`${styles.dropdownContent} ${expandedSections.has('protection') ? styles.dropdownOpen : ''}`}>
                    <div className="flex gap-4 p-4">
                        {packages.map(pkg => (
                            <div key={pkg.name} className={`${styles.packageCard} ${selectedPackage === pkg.name ? styles.selectedCard : ''}`} onClick={() => setSelectedPackage(pkg.name)}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.icon}><i className={pkg.name === "Super" ? "fas fa-user-shield" : "fas fa-truck"}></i></div>
                                    <div className={`${styles.radioCircle} ${selectedPackage === pkg.name ? styles.radioSelected : ''}`} />
                                </div>
                                <div className={styles.cardBody}>
                                    <h4 className={styles.cardTitle}>{pkg.name} Charges</h4>
                                    <p className={styles.cardPrice}>+ {pkg.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="border-b">
                <div className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer" onClick={() => toggleSection('extra')}>
                    <span>Extra Charges</span>
                    <span className="font-bold text-orange-500">{totalExtras.toFixed(2)} AED</span>
                    <svg className={`w-5 h-5 transition-transform ${expandedSections.has('extra') ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
                <div className={`${styles.dropdownContent} ${expandedSections.has('extra') ? styles.dropdownOpen : ''}`}>
                    <div className="p-5">
                        {extraItems.map(item => (
                            <div key={item.id} className="flex items-center gap-4 mb-4">
                                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                                <div className="flex-1">
                                    <span className="block text-sm text-gray-600 whitespace-pre-wrap">{item.name}</span>
                                    <span className="block text-sm font-bold text-orange-500">{item.price}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="w-8 h-8 border rounded" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <input type="number" className="w-12 h-8 border text-center rounded" value={extraQuantities[item.id]} readOnly />
                                    <button className="w-8 h-8 border rounded" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
             <div className="border-b">
                <div className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer" onClick={() => toggleSection('driver')}>
                    <span>Additional Driver</span>
                    <span className="font-bold text-orange-500">{totalAdditionalDriver.toFixed(2)} AED</span>
                    <svg className={`w-5 h-5 transition-transform ${expandedSections.has('driver') ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
                <div className={`${styles.dropdownContent} ${expandedSections.has('driver') ? styles.dropdownOpen : ''}`}>
                    <div className="p-5 flex items-center gap-4">
                        <i className={`${additionalDriver.icon} text-3xl text-blue-600`}></i>
                        <div className="flex-1">
                            <span className="block text-sm text-gray-600">{additionalDriver.name}</span>
                            <span className="block text-sm font-bold text-orange-500">{additionalDriver.price}</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <button className="w-8 h-8 border rounded" onClick={() => updateDriverQuantity(-1)}>-</button>
                            <input type="number" className="w-12 h-8 border text-center rounded" value={additionalDriverQuantity} readOnly />
                            <button className="w-8 h-8 border rounded" onClick={() => updateDriverQuantity(1)}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b">
                <div className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer" onClick={() => toggleSection('summary')}>
                    <span>Charges Summary</span>
                    <span className="font-bold text-orange-500">{totalCharges.toFixed(2)} AED</span>
                    <svg className={`w-5 h-5 transition-transform ${expandedSections.has('summary') ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
                <div className={`${styles.dropdownContent} ${expandedSections.has('summary') ? styles.dropdownOpen : ''}`}>
                    <div className="p-5 bg-white">
                        <div className="text-center text-base text-gray-800 mb-4">Charges Summary for Rental Period of 30 Days</div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between"><span>Rent for 30 days</span><span>{basePrice.toFixed(2)} AED</span></div>
                            <div className="flex justify-between"><span>Super Protection</span><span>{totalProtection.toFixed(2)} AED</span></div>
                            {totalExtras > 0 && <div className="flex justify-between"><span>Extra Items</span><span>{totalExtras.toFixed(2)} AED</span></div>}
                            {totalAdditionalDriver > 0 && <div className="flex justify-between"><span>Additional Driver</span><span>{totalAdditionalDriver.toFixed(2)} AED</span></div>}
                            <div className="flex justify-between"><span>Security Deposit</span><span>{securityDeposit.toFixed(2)} AED</span></div>
                            <div className="flex justify-between font-bold pt-2 border-t"><span>Sub Total:</span><span>{subtotal.toFixed(2)} AED</span></div>
                            <div className="flex justify-between font-bold"><span>VAT (5%):</span><span>{vat.toFixed(2)} AED</span></div>
                            <div className="flex justify-between text-base font-bold text-orange-500 pt-2 border-t"><span>Total Amount</span><span>{totalCharges.toFixed(2)} AED</span></div>
                        </div>
                        <a href="#" className="block w-full py-2 px-4 bg-orange-500 text-white text-center font-bold rounded-md hover:bg-orange-600 mt-4">Reserve Now & Pay at Counter</a>
                    </div>
                </div>
            </div>
        </div>
    );
};


//=========== MAIN PAGE COMPONENT ===========//
const BookingPage: React.FC = () => {
    // State for layout
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    
    // State for booking flow
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [carDetails, setCarDetails] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ dateRange: [Date | null, Date | null] }>({ dateRange: [null, null] });
    const [isClient, setIsClient] = useState(false);
    const [selectedImage, setSelectedImage] = useState('/images/model_sp_596_639.webp');
    
    const totalSteps: number = 5;
    const router = useRouter();

    // Handlers for layout
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        if (isUserDropdownOpen) setIsUserDropdownOpen(false);
    };
    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
        if (isSidebarOpen) setIsSidebarOpen(false);
    };
    
    // Initial data loading
    useEffect(() => {
        AOS.init({ duration: 400, once: true });
        const startDate = localStorage.getItem('startDate') ? new Date(localStorage.getItem('startDate')!) : new Date();
        const endDate = localStorage.getItem('endDate') ? new Date(localStorage.getItem('endDate')!) : new Date(new Date().setDate(new Date().getDate() + 4));
        setFormData({ dateRange: [startDate, endDate] });
        setIsClient(true);
    }, []);

    // Calculate number of days for pricing
    const calculateDays = () => {
        const [start, end] = formData.dateRange;
        if (start && end) {
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 ? diffDays : 1;
        }
        return 1;
    };
    const rentalDays = calculateDays();
    const pricePerDay = 33.66; // Base price for Nissan Sunny per day
    const totalBasePrice = rentalDays * pricePerDay;

    // Handlers for booking flow
    const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => setFormData({ ...formData, dateRange: [startDate, endDate] });
    const nextStep = () => currentStep < totalSteps ? setCurrentStep(currentStep + 1) : router.push('/Confirmation');
    const prevStep = () => currentStep > 1 ? setCurrentStep(currentStep - 1) : null;
    const showStep = (step: number) => step <= totalSteps ? setCurrentStep(step) : null;
    
    const carImages = [{ id: 1, src: '/images/model_sp_596_639.webp', alt: 'Nissan Sunny Front' }, { id: 2, src: '/images/live1.jpg', alt: 'Nissan Sunny Side' }, { id: 3, src: '/images/live2.jpg', alt: 'Nissan Sunny Interior' }, { id: 4, src: '/images/live3.jpg', alt: 'Nissan Sunny Back' }];
    const sliderSettings = { dots: false, infinite: true, speed: 500, slidesToShow: 4, slidesToScroll: 1, arrows: false, responsive: [{ breakpoint: 767, settings: { slidesToShow: 3 } }, { breakpoint: 400, settings: { slidesToShow: 2 } }] };
    
    if (!isClient) return <div className="min-h-screen bg-white flex items-center justify-center"><p>Loading...</p></div>;

    return (
        <div className="bg-gray-50">
            <Navbar onMenuToggle={toggleSidebar} isHome={true} onUserToggle={toggleUserDropdown} />
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <UserDropdown isOpen={isUserDropdownOpen} />

            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-12" data-aos="fade-down">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">Book Your Dream Car</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Complete your booking in a few simple steps and hit the road in style</p>
                    </div>

                    {/* STEPPER IS NOW RESTORED */}
                    <div className="relative max-w-4xl mx-auto mb-16" data-aos="fade-up">
                        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -translate-y-1/2 rounded-full"></div>
                        <div className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}></div>
                        <div className="relative flex justify-between items-center">
                            {['Vehicle', 'Extras', 'Options', 'Details', 'Confirm'].map((label, index) => (
                                <div key={label} className="z-10 text-center cursor-pointer group" onClick={() => showStep(index + 1)}>
                                    <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-lg ${currentStep >= index + 1 ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white' : 'bg-white border-2 text-gray-400'} ${currentStep === index + 1 ? 'scale-110' : ''}`}>
                                        {currentStep > index + 1 ? '✓' : index + 1}
                                    </div>
                                    <p className={`mt-3 text-sm font-medium ${currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-400'}`}>{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        {currentStep === 1 && (
                            <div className="grid lg:grid-cols-5 gap-8 items-start">
                                {/* Left Side: Vehicle Card */}
                                <div className="lg:col-span-3 bg-slate-900 text-white rounded-2xl p-6 shadow-2xl">
                                    <h2 className="text-3xl font-bold">Nissan Sunny <span className="text-gray-400 font-light">or similar</span></h2>
                                    <p className="text-gray-300 mb-4">Compact Sedan Automatic</p>
                                    
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="flex items-center bg-slate-800 rounded-full px-3 py-1 text-sm"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.558 4.772a.75.75 0 00-1.06-1.06-4.5 4.5 0 00-6.384 6.384.75.75 0 001.06-1.06A3 3 0 015.535 12H5a.5.5 0 010-1h.535zM14.5 6a3 3 0 100-6 3 3 0 000 6zM13 10.5c0-1.518.82-2.823 2-3.5V6a.5.5 0 00-1 0v1.126a4.502 4.502 0 00-2.372 1.487.75.75 0 001.06 1.06A3 3 0 0113 10.5z"></path></svg>5</div>
                                        <div className="flex items-center bg-slate-800 rounded-full px-3 py-1 text-sm"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v2a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zm0 6a1 1 0 00-1 1v5a1 1 0 001 1h10a1 1 0 001-1v-5a1 1 0 00-1-1H5z" clipRule="evenodd"></path></svg>3</div>
                                        <div className="flex items-center bg-slate-800 rounded-full px-3 py-1 text-sm"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 1.5a9.5 9.5 0 100-19 9.5 9.5 0 000 19z" clipRule="evenodd"></path></svg>Automatic</div>
                                    </div>
                                    
                                    <div className="relative overflow-hidden rounded-lg aspect-video mb-4 bg-slate-800"><Image src={selectedImage} alt="Selected Car" fill className="object-contain" priority/></div>
                                    <Slider {...sliderSettings}>
                                        {carImages.map(img => (<div key={img.id} className="px-2"><div className={`relative h-16 rounded-md overflow-hidden border-2 cursor-pointer ${selectedImage === img.src ? 'border-blue-500' : 'border-slate-700'}`} onClick={() => setSelectedImage(img.src)}><Image src={img.src} alt={img.alt} fill className="object-cover" /></div></div>))}
                                    </Slider>

                                    <div className="mt-6 pt-6 border-t border-slate-700">
                                        <div className="flex items-center text-green-400 mb-4"><svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Unlimited kilometers available</div>
                                        <div className="flex items-baseline"><p className="text-4xl font-bold">{pricePerDay.toFixed(2)} AED</p><p className="text-gray-400 ml-2">/ day</p></div>
                                    </div>
                                </div>

                                {/* Right Side: Booking Panel */}
                                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl sticky top-24">
                                     <h3 className="text-2xl font-bold text-gray-900 mb-1">Your Booking Details</h3>
                                     <p className="text-gray-500 mb-6">Select your rental period</p>
                                    
                                    <CustomDateRangePicker value={formData.dateRange} onChange={handleDateRangeChange} placeholder="Select Dates" isCarCard={false} />
                                    
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="space-y-3 text-gray-600">
                                            <div className="flex justify-between"><span>Base Rate ({rentalDays} {rentalDays > 1 ? 'days' : 'day'})</span><span className="font-medium text-gray-900">{totalBasePrice.toFixed(2)} AED</span></div>
                                            <div className="flex justify-between text-sm"><span>Taxes & Fees</span><span className="font-medium text-gray-900">{(totalBasePrice * 0.05).toFixed(2)} AED</span></div>
                                        </div>
                                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                            <span className="text-xl font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-blue-600">{(totalBasePrice * 1.05).toFixed(2)} AED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && <ExtrasSection />}
                        {currentStep === 3 && <Subcategory />}
                        {currentStep === 4 && <Form />}
                        {currentStep === 5 && <div>Confirmation Summary...</div>}

                        {/* Buttons are now consistent for all steps */}
                        <div className="flex justify-between items-center mt-10">
                            <button onClick={prevStep} disabled={currentStep === 1} className="py-2.5 px-6 rounded-lg disabled:opacity-50 hover:bg-gray-100 font-medium">Previous</button>
                            <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all">{currentStep === totalSteps ? 'Complete Booking' : 'Next'}</button>
                        </div>
                    </div>
                </div>
            </main>

            {carDetails && <CarDetailsModal onClose={() => setCarDetails(false)} />}
            
            <Footer />
        </div>
    );
};

export default BookingPage;