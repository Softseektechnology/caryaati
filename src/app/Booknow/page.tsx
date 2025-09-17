'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Layout & Form Components
import Navbar from '../../components/nevegation-header/Navbar';
import Footer from '../../components/foorter/Footer';
import UserDropdown from '../../components/customer-dashboard/user-dashboard';
import Sidebar from '../../components/multiplepages/Sidebar-multiplelinks';
import Form from '../../components/Form/Bookform';
import Subcategory from '@/components/homepage-subcategory/allCarscategory';
import DetailSection from '@/components/LuxuryRentalDealCard/DetailSection';

// Styling
import 'aos/dist/aos.css';
import AOS from 'aos';
import styles from './booknow.module.css';

// NOTE: Add Font Awesome to your project's layout for these icons to appear.
// Example: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

//=========== CAR DETAILS MODAL COMPONENT ===========//
interface CarDetailsModalProps {
  onClose: () => void;
}
const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

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

    const toggleBookmark = () => setIsBookmarked(!isBookmarked);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl relative max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" ref={modalRef}>
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 z-10 flex justify-between items-center px-6 py-4 shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Nissan Sunny 2026</h2>
                        <p className="text-blue-100">Economy Sedan | Perfect for City Driving</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleBookmark} className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition-all">
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
                 <div className="p-6">
                    <p>Details about the Nissan Sunny 2026...</p>
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
    
    const [bookingdates, setbookingdates] = useState<string>("Booking Dates");
    const [mileageOption, setMileageOption] = useState<'limited' | 'unlimited'>('limited');


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

    // Helper to format dates for display
    const formatDateTime = (date: Date | null): string => {
        if (!date) return '';
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleString('en-US', options).replace(',', ' |');
    };

    // Calculate costs based on selections
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
    const pricePerDay = 33.66;
    const totalBasePrice = rentalDays * pricePerDay;
    const mileageCost = mileageOption === 'unlimited' ? 6.55 * rentalDays : 0;
    const finalTotal = totalBasePrice + mileageCost;


    // Handlers for booking flow
    const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => setFormData({ ...formData, dateRange: [startDate, endDate] });
    const nextStep = () => currentStep < totalSteps ? setCurrentStep(currentStep + 1) : router.push('/Confirmation');
    const prevStep = () => currentStep > 1 ? setCurrentStep(currentStep - 1) : null;
    const showStep = (step: number) => step <= totalSteps ? setCurrentStep(step) : null;
    
    const carImages = [{ id: 1, src: '/images/model_sp_596_639.webp' }, { id: 2, src: '/images/live1.jpg' }, { id: 3, src: '/images/live2.jpg' }, { id: 4, src: '/images/live3.jpg' }];
    
    const handleEditDateTime = () => console.log("Edit date and time clicked!");

    if (!isClient) return <div className="min-h-screen bg-white flex items-center justify-center"><p>Loading...</p></div>;

    return (
        <div className="bg-gray-100">
            <Navbar onMenuToggle={toggleSidebar} isHome={true} onUserToggle={toggleUserDropdown} />
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <UserDropdown isOpen={isUserDropdownOpen} />

            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-12" data-aos="fade-down">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">Book Your Dream Car</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Complete your booking in a few simple steps and hit the road in style</p>
                    </div>

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
                            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                                {/* Left Side: Vehicle Card */}
                                <div className="lg:w-3/5 bg-white text-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                                    <div>
                                        <h2 className="text-3xl font-bold">Nissan Sunny 2026</h2>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Sedan</span>
                                            <span className="bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
                                        </div>
                                    </div>
                                    <div>
                                        {/* FIX: Title size reduced */}
                                        <h3 className="font-semibold text-base mb-2">Specification</h3>
                                        <div className="flex items-center space-x-6 text-gray-500">
                                            <span className="flex items-center text-sm"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>x 3</span>
                                            <span className="flex items-center text-sm"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>x 5</span>
                                            <span className="flex items-center text-sm"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>Automatic</span>
                                            <span className="flex items-center text-sm"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V8a2 2 0 00-4 0v8m-4 0h12m-4-8a4 4 0 100-8 4 4 0 000 8z"></path></svg>A/C</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-4 h-80">
                                        <div className="flex flex-col space-y-3">
                                            {carImages.map((img) => (<div key={img.id} className={`relative w-20 h-full cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img.src ? 'border-blue-500' : 'border-transparent'}`} onClick={() => setSelectedImage(img.src)}><Image src={img.src} alt={`Thumbnail ${img.id}`} fill className="object-cover" /></div>))}
                                        </div>
                                        {/* FIX: Background color removed */}
                                        <div className="relative flex-1 rounded-lg overflow-hidden"><Image src={selectedImage} alt="Selected Car" fill className="object-contain" priority/></div>
                                    </div>

                                    {/* FIX: DetailSection aligned to the right */}
                                    <div className="flex justify-between items-baseline pt-4 border-t border-gray-200">
                                        <div className="flex items-baseline"><p className="text-4xl font-bold">{pricePerDay.toFixed(2)} AED</p><p className="text-gray-500 ml-2">/ day</p></div>
                                        <DetailSection/>
                                    </div>

                                </div>

                                {/* Right Side: Booking Panel */}
                                <div className="lg:w-2/5 bg-white rounded-2xl p-6 shadow-xl flex flex-col">
                                    <div>
                                        <div className="bg-gray-800 text-white rounded-xl p-4 flex justify-between items-center mb-6">
                                            <div>
                                                <p className="font-semibold text-lg">{bookingdates}</p>
                                                <p className="text-sm text-gray-300">{formatDateTime(formData.dateRange[0])} - {formatDateTime(formData.dateRange[1])}</p>
                                            </div>
                                            <button onClick={handleEditDateTime} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <label className="text-lg font-semibold text-gray-800">Mileage</label>
                                            <div onClick={() => setMileageOption('limited')} className={`p-4 border rounded-lg cursor-pointer flex justify-between items-center transition-all ${mileageOption === 'limited' ? 'border-black ring-2 ring-black' : 'border-gray-300'}`}>
                                                <div className="flex items-center">
                                                    <div className="w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3">{mileageOption === 'limited' && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}</div>
                                                    <div>
                                                        <p className="font-semibold">1,200 km</p>
                                                        <p className="text-xs text-gray-500">+0.64 AED / for every additional km</p>
                                                    </div>
                                                </div>
                                                <p className="font-semibold">Included</p>
                                            </div>
                                            <div onClick={() => setMileageOption('unlimited')} className={`p-4 border rounded-lg cursor-pointer flex justify-between items-center transition-all ${mileageOption === 'unlimited' ? 'border-black ring-2 ring-black' : 'border-gray-300'}`}>
                                                <div className="flex items-center">
                                                    <div className="w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3">{mileageOption === 'unlimited' && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}</div>
                                                    <div>
                                                        <p className="font-semibold">Unlimited kilometers</p>
                                                        <p className="text-xs text-gray-500">All kilometers are included in the price</p>
                                                    </div>
                                                </div>
                                                <p className="font-semibold">+ {(6.55 * rentalDays).toFixed(2)} AED</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-auto pt-6">
                                        <div className="flex justify-between items-baseline mb-4">
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900">{finalTotal.toFixed(2)} AED total</p>
                                                <p className="text-sm text-gray-500">{(finalTotal / rentalDays).toFixed(2)} AED /day</p>
                                            </div>
                                        </div>
                                        {/* FIX: Button style updated */}
                                        <button onClick={nextStep} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-transform transform hover:scale-105 shadow-lg">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && <ExtrasSection />}
                        {currentStep === 3 && <Subcategory />}
                        {currentStep === 4 && <Form />}
                        {currentStep === 5 && <div>Confirmation Summary...</div>}

                        {currentStep > 1 && (
                            <div className="flex justify-between items-center mt-10">
                                <button onClick={prevStep} className="py-2.5 px-6 rounded-xl hover:bg-gray-200 font-medium">Previous</button>
                                {/* FIX: Button style updated */}
                                <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-8 rounded-xl shadow-md hover:shadow-lg transition-all">{currentStep === totalSteps ? 'Complete Booking' : 'Next'}</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {carDetails && <CarDetailsModal onClose={() => setCarDetails(false)} />}
            
            <Footer />
        </div>
    );
};

export default BookingPage;