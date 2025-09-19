'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// --- GOOGLE MAPS IMPORTS ---
import { GoogleMap, useJsApiLoader, MarkerF, Autocomplete } from '@react-google-maps/api';

// Layout & Form Components
import Navbar from '../../components/nevegation-header/Navbar';
import Footer from '../../components/foorter/Footer';
import UserDropdown from '../../components/customer-dashboard/user-dashboard';
import Sidebar from '../../components/multiplepages/Sidebar-multiplelinks';
import DetailSection from '@/components/LuxuryRentalDealCard/DetailSection';

// Styling
import 'aos/dist/aos.css';
import AOS from 'aos';
import styles from './booknow.module.css';

// NOTE: You may need to add Font Awesome to your project's layout for some icons to appear.
// Example: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />

//=========== CAR DETAILS MODAL COMPONENT ===========//
interface CarDetailsModalProps { onClose: () => void; }
const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => { if (modalRef.current && !modalRef.current.contains(event.target as Node)) onClose(); };
        const handleEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);
        return () => { document.removeEventListener('mousedown', handleOutsideClick); document.removeEventListener('keydown', handleEscape); };
    }, [onClose]);
    return (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl relative max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" ref={modalRef}><div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 z-10 flex justify-between items-center px-6 py-4 shadow-md"><div><h2 className="text-2xl font-bold text-white">Nissan Sunny 2026</h2><p className="text-blue-100">Economy Sedan</p></div><button className="text-white hover:text-blue-200 p-2" onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div><div className="p-6"><p>Details about the Nissan Sunny 2026...</p></div></div></div>);
};

//=========== EXTRAS SECTION COMPONENT (STEP 2) ===========//
const ExtrasSection: React.FC = () => {
    const [selectedPackage, setSelectedPackage] = useState<string>('No extra protection');
    const [extraQuantities, setExtraQuantities] = useState<{ [key: string]: number }>({ babySeat: 0, toddlerSeat: 0, boosterSeat: 0 });
    const [additionalDriverQuantity, setAdditionalDriverQuantity] = useState<number>(0);
    const [isSummaryOpen, setIsSummaryOpen] = useState(true);
    const [openDetails, setOpenDetails] = useState<Set<string>>(new Set());
    const extraItems = [{ id: 'babySeat', name: 'Baby seat', price: 16.00, description: 'For babies up to 1 year old with a height of 16-33 inches (40-85 cm). The seat can only be used rear-facing.' }, { id: 'toddlerSeat', name: 'Toddler seat', price: 16.00, description: 'For children 6 months to 4 years old with a height of 24-41 inches (61-105 cm).' }, { id: 'boosterSeat', name: 'Booster seat', price: 14.82, description: 'For children 4-12 years old with a height of 40-59 inches (100-150 cm).' }];
    const packages = [{ name: 'No extra protection', priceValue: 0, priceDisplay: '0.00 AED', description: 'Basic third-party liability coverage included.', icon: 'fas fa-shield-alt' }, { name: 'Smart Protection', priceValue: 55.50, priceDisplay: '+ 55.50 AED / day', description: 'Covers damage with a deductible.', icon: 'fas fa-user-shield' }, { name: 'All-Inclusive Protection', priceValue: 95.00, priceDisplay: '+ 95.00 AED / day', description: 'Zero deductible for damages, plus tire and glass coverage.', icon: 'fas fa-star-of-life' }];
    const additionalDriver = { id: 'additionalDriver', name: 'Additional Driver', price: 50.00, icon: 'fas fa-user-plus' };
    const toggleDetails = (id: string) => { setOpenDetails(prev => { const newSet = new Set(prev); if (newSet.has(id)) newSet.delete(id); else newSet.add(id); return newSet; }); };
    const updateQuantity = (id: string, delta: number) => setExtraQuantities(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
    const updateDriverQuantity = (delta: number) => setAdditionalDriverQuantity(prev => Math.max(0, prev + delta));
    const rentalCharge = 2550.00;
    const totalProtection = packages.find(pkg => pkg.name === selectedPackage)?.priceValue || 0;
    const totalExtras = extraItems.reduce((sum, item) => sum + ((extraQuantities[item.id] || 0) * item.price), 0);
    const totalAdditionalDriver = additionalDriverQuantity * additionalDriver.price;
    const securityDeposit = 1000.00;
    const subtotal = rentalCharge + totalProtection + totalExtras + totalAdditionalDriver;
    const vat = subtotal * 0.05;
    const totalAmount = subtotal + vat;
    const upfrontPayment = (rentalCharge * 0.10) * 1.05;
    const balancePayable = (totalAmount + securityDeposit) - upfrontPayment;

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden space-y-8 p-6">
            <div>
                <div className="flex justify-between items-baseline mb-4"><h3 className="text-xl font-bold text-gray-800">Protection packages</h3><span className="font-bold text-gray-700">{totalProtection.toFixed(2)} AED</span></div>
                <div className="flex flex-col md:flex-row gap-4">
                    {packages.map(pkg => ( <div key={pkg.name} className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex flex-col justify-between ${selectedPackage === pkg.name ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-400'}`} onClick={() => setSelectedPackage(pkg.name)}><div><div className="flex justify-between items-center"><div className="flex items-center"><div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${selectedPackage === pkg.name ? 'border-blue-600' : 'border-gray-400'}`}>{selectedPackage === pkg.name && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}</div><h4 className="font-bold text-gray-900 text-base">{pkg.name}</h4></div><i className={`${pkg.icon} text-2xl ${selectedPackage === pkg.name ? 'text-blue-600' : 'text-gray-400'}`}></i></div><p className="text-sm text-gray-600 mt-2 pl-8">{pkg.description}</p></div><p className="text-right font-semibold text-gray-800 mt-3">{pkg.priceDisplay}</p></div>))}
                </div>
            </div>
            <div>
                <div className="flex justify-between items-baseline mb-4"><h3 className="text-xl font-bold text-gray-800">Extra Charges</h3><span className="font-bold text-gray-700">{totalExtras.toFixed(2)} AED</span></div>
                <div className="space-y-4">
                    {extraItems.map(item => { const quantity = extraQuantities[item.id] || 0; return ( <div key={item.id} className={`p-4 border rounded-lg transition-all ${quantity > 0 ? 'border-black' : 'border-gray-300'}`}><div className="grid grid-cols-[1fr_auto_auto] items-center gap-4"><div className="flex items-center space-x-4"><svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg><div><h4 className="font-semibold text-gray-900">{item.name}</h4><p className="text-sm text-gray-500">{item.price.toFixed(2)} AED / day</p></div></div><button onClick={() => toggleDetails(item.id)} className="text-sm font-medium text-black underline justify-self-end">Details</button><div className="justify-self-end">{quantity === 0 ? (<button onClick={() => updateQuantity(item.id, 1)} className="bg-gray-200 w-10 h-5 rounded-full flex items-center p-0.5 cursor-pointer"><span className="w-4 h-4 bg-white rounded-full shadow transform transition-transform"></span></button>) : (<div className="flex items-center space-x-2 bg-black text-white rounded-full px-1"><button onClick={() => updateQuantity(item.id, -1)} className="font-bold w-6 h-6 flex items-center justify-center">-</button><span className="font-bold w-5 text-center">{quantity}</span><button onClick={() => updateQuantity(item.id, 1)} className="font-bold w-6 h-6 flex items-center justify-center">+</button></div>)}</div></div>{openDetails.has(item.id) && <div className="mt-4 ml-10 p-3 bg-gray-100 rounded-md text-sm text-gray-600">{item.description}</div>}</div>)})}
                </div>
            </div>
            <div>
                <div className="flex justify-between items-baseline mb-4"><h3 className="text-xl font-bold text-gray-800">Additional Driver</h3><span className="font-bold text-gray-700">{totalAdditionalDriver.toFixed(2)} AED</span></div>
                <div className={`p-4 border rounded-lg ${additionalDriverQuantity > 0 ? 'border-black' : 'border-gray-300'}`}><div className="grid grid-cols-[1fr_auto] items-center gap-4"><div className="flex items-center space-x-4"><i className={`${additionalDriver.icon} text-2xl text-blue-600`}></i><div><h4 className="font-semibold text-gray-900">{additionalDriver.name}</h4><p className="text-sm text-gray-500">{additionalDriver.price.toFixed(2)} AED / driver</p></div></div><div className="flex items-center space-x-2 bg-black text-white rounded-full px-1 justify-self-end"><button onClick={() => updateDriverQuantity(-1)} className="font-bold w-6 h-6 flex items-center justify-center">-</button><span className="font-bold w-5 text-center">{additionalDriverQuantity}</span><button onClick={() => updateDriverQuantity(1)} className="font-bold w-6 h-6 flex items-center justify-center">+</button></div></div></div>
            </div>
            <div className="border-t pt-6">
                <div className="flex justify-between items-center"><h3 className="text-xl font-bold text-gray-800">Charges Summary</h3><span className="font-bold text-blue-600 text-lg">{ (totalAmount + securityDeposit).toFixed(2) } AED</span></div>
                <div className="mt-4 space-y-4"><div className="border rounded-lg p-4"><h4 className="text-center font-bold mb-4">Charges Summary for Rental Period of 30 Days</h4><div className="space-y-2 text-sm"><div className="font-bold bg-black text-white inline-block px-2 py-1 rounded-md text-xs mb-2">Rental Charges</div><div className="flex justify-between"><span>Rent for 30 days</span><span>{rentalCharge.toFixed(2)} AED</span></div><div className="font-bold bg-black text-white inline-block px-2 py-1 rounded-md text-xs mt-3 mb-2">Security Deposit</div><div className="flex justify-between"><span>Security Deposit</span><span>{securityDeposit.toFixed(2)} AED</span></div><hr className="my-2"/><div className="flex justify-between"><span>Sub Total:</span><span>{subtotal.toFixed(2)} AED</span></div><div className="flex justify-between"><span>VAT:</span><span>{vat.toFixed(2)} AED</span></div><div className="flex justify-between font-bold text-lg mt-2"><span>Total Amount</span><span className="bg-orange-400 text-white px-2 rounded">{totalAmount.toFixed(2)} AED</span></div></div></div><div className="text-right"><span className="text-xs bg-black text-white font-semibold p-2 rounded-md">Reserve now by only Paying 10.00% of the Rental Charges</span></div><div className="border rounded-lg p-4 text-sm text-gray-600 space-y-3"><p>Reserve this car now by paying <strong>10.00%</strong> of rent value i.e. <strong>{upfrontPayment.toFixed(2)} AED</strong> incl. 5% VAT</p><p>Extra charges like Child seats, Baby Seats, Additional Driver Delivery/Pickup etc. availability can be confirmed only at the pickup/booking counter however proving us details will help vendors to arrange it before pickup.</p><p>Security Deposit <strong>{securityDeposit.toFixed(2)} AED</strong> is payable at the pickup/booking counter which is refundable after 21-30 days from the off-hire date.</p><p>Balance payable at pickup/booking counter <strong>{balancePayable.toFixed(2)} AED</strong></p></div><div className="p-3 bg-orange-400 text-white rounded-lg text-sm text-center font-semibold">If you want to avoid delay and save time at the booking counter, complete your profile by uploading documents.</div></div>
            </div>
        </div>
    );
};

//=========== DELIVERY STEP COMPONENT (STEP 3) ===========//
const DeliveryStep: React.FC<any> = ({ collectionMethod, setCollectionMethod, location, setLocation, dateRange, formatDateTime }) => {
    const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: "AIzaSyBT9pX_rmVtSS98h9YzqEgKxkyoZsEgPAU", libraries: ['places'] });
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [markerPosition, setMarkerPosition] = useState({ lat: 25.2528, lng: 55.3644 });
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const onLoad = (autocomplete: google.maps.places.Autocomplete) => { autocompleteRef.current = autocomplete; };
    const onPlaceChanged = () => { if (autocompleteRef.current) { const place = autocompleteRef.current.getPlace(); if (place.geometry && place.geometry.location) { const newPos = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }; setMarkerPosition(newPos); setLocation(place.formatted_address || 'Selected Location'); map?.panTo(newPos); map?.setZoom(15); } } };
    if (!isLoaded) return <div className="bg-white rounded-2xl shadow-xl p-8 text-center">Loading Map...</div>;
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div><h2 className="text-2xl font-bold text-gray-900">CAR COLLECTION</h2><p className="text-gray-500">Select a preferred method to get your car</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div onClick={() => setCollectionMethod('pickup')} className={`p-4 border-2 rounded-lg cursor-pointer flex items-center space-x-4 ${collectionMethod === 'pickup' ? 'border-blue-600' : 'border-gray-300'}`}><div className={`w-6 h-6 rounded flex items-center justify-center ${collectionMethod === 'pickup' ? 'bg-blue-600 text-white' : 'border-2 border-gray-400'}`}>{collectionMethod === 'pickup' && '✓'}</div><div><h4 className="font-semibold">Booking Counter Pickup</h4><p className="text-sm text-gray-500">Pickup your car from a set location</p></div></div><div onClick={() => setCollectionMethod('delivery')} className={`p-4 border-2 rounded-lg cursor-pointer flex items-center space-x-4 ${collectionMethod === 'delivery' ? 'border-blue-600' : 'border-gray-300'}`}><div className={`w-6 h-6 rounded flex items-center justify-center ${collectionMethod === 'delivery' ? 'bg-blue-600 text-white' : 'border-2 border-gray-400'}`}>{collectionMethod === 'delivery' && '✓'}</div><div><h4 className="font-semibold">Delivery</h4><p className="text-sm text-gray-500">Get your car at your doorstep</p></div></div></div>
            <div className="space-y-4">
                 <label className="text-lg font-semibold text-gray-800">{collectionMethod === 'pickup' ? 'Search for a pickup location' : 'Enter delivery address'}</label>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}><input type="text" placeholder="Enter a location" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/></Autocomplete>
                <div className="h-80 w-full rounded-lg overflow-hidden"><GoogleMap mapContainerClassName="w-full h-full" center={markerPosition} zoom={15} onLoad={(map) => setMap(map)} options={{ disableDefaultUI: true, zoomControl: true }}><MarkerF position={markerPosition} /></GoogleMap></div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-800">Confirm details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div className="bg-gray-100 p-4 rounded-lg"><label className="text-xs font-semibold text-gray-500">Location</label><p className="text-sm text-black truncate">{location}</p></div><div className="bg-gray-100 p-4 rounded-lg"><label className="text-xs font-semibold text-gray-500">Date & Time</label><p className="text-sm text-black">From: {formatDateTime(dateRange[0])}</p><p className="text-sm text-black">To: &nbsp;&nbsp;&nbsp;&nbsp; {formatDateTime(dateRange[1])}</p></div></div>
            </div>
        </div>
    );
};

//=========== OPTIONS STEP COMPONENT (STEP 4) ===========//
const OptionsStep = () => {
    const carPlaceholder = '/images/model_sp_596_639.webp';
    const sameVendorCars = [{ name: 'Ford Fiesta', year: 2019, category: 'Sedan', image: carPlaceholder, specs: { luggage: 3, transmission: 'Auto', ac: true, passengers: 5 }, deposit: 1000, rent: 1800 }, { name: 'Kia Rio', year: 2019, category: 'Hatchback', image: carPlaceholder, specs: { luggage: 2, transmission: 'Auto', ac: true, passengers: 4 }, deposit: 1000, rent: 1950 }, { name: 'Nissan Sentra', year: 2019, category: 'Sedan', image: carPlaceholder, specs: { luggage: 3, transmission: 'Auto', ac: true, passengers: 5 }, deposit: 1000, rent: 2100 }, { name: 'Kia Forte', year: 2020, category: 'Sedan', image: carPlaceholder, specs: { luggage: 2, transmission: 'Auto', ac: true, passengers: 5 }, deposit: 1000, rent: 2250 }];
    const differentVendorCars = [{ name: 'Toyota RAV4', year: 2023, category: 'SUV', image: carPlaceholder, specs: { luggage: 3, transmission: 'Auto', ac: true, passengers: 5 }, deposit: 2000, rent: 112.50 }, { name: 'Nissan Sunny', year: 2022, category: 'Sedan', image: carPlaceholder, specs: { luggage: 3, transmission: 'Auto', ac: true, passengers: 5 }, deposit: 1000, rent: 1260 }, { name: 'Kia Pegas', year: 2022, category: 'Sedan', image: carPlaceholder, specs: { luggage: 2, transmission: 'Auto', ac: true, passengers: 5 }, deposit: 1000, rent: 1350 }, { name: 'Hyundai Accent', year: 2020, category: 'Sedan', image: carPlaceholder, specs: { luggage: 3, transmission: 'Auto', ac: true, passengers: 5 }, deposit: 1000, rent: 1350 }];
    const CarOptionCard = ({ car }: { car: any }) => (
        <div className="border rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 bg-white">
            <div className="relative h-40 w-full"><Image src={car.image} alt={`${car.name} ${car.year}`} layout="fill" objectFit="cover" /><span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">{car.category}</span></div>
            <div className="p-4 space-y-3"><h4 className="text-lg font-bold">{car.name} {car.year}</h4><div className="flex items-center space-x-4 text-sm text-gray-600"><span>🧳 {car.specs.luggage}</span><span>👤 {car.specs.passengers}</span><span>⚙️ {car.specs.transmission}</span></div><div className="text-sm space-y-1"><p><strong>Total Days:</strong> 30</p><p><strong>Deposit:</strong> {car.deposit.toLocaleString()} AED</p><p><strong>Rent Charges:</strong> {car.rent.toLocaleString()} AED + VAT@5</p></div><button className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-colors">Select</button></div>
        </div>
    );
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <div><h2 className="text-2xl font-bold text-gray-900">We know the importance of your Priority</h2><p className="mt-2 text-gray-600">You have selected a vehicle, in case the selected vehicle is not available we make sure to provide you with a car from the given priorities. Please select any vehicles from the following list of cars, telling us your priorities will help us to serve you better.</p></div>
            <div className="space-y-4"><h3 className="text-xl font-bold text-gray-800">More Booking options from the same Vendor(s)</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{sameVendorCars.map(car => <CarOptionCard key={car.name} car={car} />)}</div></div>
            <div className="space-y-4"><h3 className="text-xl font-bold text-gray-800">More Booking options from the different Vendor(s)</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{differentVendorCars.map(car => <CarOptionCard key={car.name} car={car} />)}</div></div>
            <div className="pt-6 border-t"><label className="flex items-center"><input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-3 text-gray-700">Yes, I understand and read the Priority Statement.</span></label></div>
        </div>
    );
};

//=========== DETAILS FORM STEP COMPONENT (STEP 5) ===========//
const DetailsFormStep = () => {
    const [formData, setFormData] = useState({ name: 'Yeseaa Baig', gender: '', dob: '2000-07-05', phoneCode: '+971', phone: '551234567', email: 'yeseaa.bag@gmail.com', nationality: '', countryResidence: '', docType: '', docNo: '', docExpiry: '2025-07-05', docIssuedBy: '', frontDoc: null as File | null, backDoc: null as File | null, driverDocType: 'uae', driverDocNo: '', driverDob: '2000-07-05', driverIssueDate: '2022-07-05', driverExpiry: '2025-07-05', driverIssuedBy: '', driverFrontDoc: null as File | null, driverBackDoc: null as File | null });
    const [uploadDocuments, setUploadDocuments] = useState(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => setFormData(prev => ({ ...prev, [field]: e.target.files?.[0] || null }));
    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <form className="space-y-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Hirer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-sm font-medium text-gray-600 mb-1">Name *</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"/></div>
                        <div><label className="block text-sm font-medium text-gray-600 mb-1">Gender *</label><select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option></select></div>
                        <div><label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth *</label><input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"/></div>
                        <div><label className="block text-sm font-medium text-gray-600 mb-1">Phone *</label><div className="flex"><select name="phoneCode" value={formData.phoneCode} onChange={handleInputChange} className="px-4 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50"><option>+971</option></select><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-r-lg"/></div></div>
                        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-600 mb-1">Email *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"/></div>
                    </div>
                </div>
                <div className="border-t pt-8">
                    <label htmlFor="uploadToggle" className="flex items-center cursor-pointer">
                        <input id="uploadToggle" type="checkbox" checked={uploadDocuments} onChange={() => setUploadDocuments(!uploadDocuments)} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                        <span className="ml-3 text-sm font-medium text-gray-700">I want to avoid delay and save time at the booking counter. Let's complete my profile by uploading documents.</span>
                    </label>
                </div>
                {uploadDocuments && (
                    <>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Hirer Document Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label className="block text-sm font-medium text-gray-600 mb-1">Document Type *</label><select name="docType" value={formData.docType} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"><option value="">Select</option><option value="passport">Passport</option><option value="emirates_id">Emirates ID</option></select></div>
                                <div><label className="block text-sm font-medium text-gray-600 mb-1">Document Number *</label><input type="text" name="docNo" value={formData.docNo} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"/></div>
                                <div><label className="block text-sm font-medium text-gray-600 mb-1">Document Expiry *</label><input type="date" name="docExpiry" value={formData.docExpiry} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"/></div>
                                <div><label className="block text-sm font-medium text-gray-600 mb-1">Issued By *</label><input type="text" name="docIssuedBy" value={formData.docIssuedBy} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"/></div>
                                <div><label className="block text-sm font-medium text-gray-600 mb-1">Attach Front *</label><input type="file" name="frontDoc" onChange={(e) => handleFileChange(e, 'frontDoc')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/></div>
                                <div><label className="block text-sm font-medium text-gray-600 mb-1">Attach Back *</label><input type="file" name="backDoc" onChange={(e) => handleFileChange(e, 'backDoc')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/></div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Driver's License Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div><label className="block text-sm font-medium text-gray-600 mb-1">License Type *</label><select name="driverDocType" value={formData.driverDocType} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"><option value="uae">UAE License</option><option value="international">International</option></select></div>
                                 <div><label className="block text-sm font-medium text-gray-600 mb-1">License Number *</label><input type="text" name="driverDocNo" value={formData.driverDocNo} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"/></div>
                                 <div><label className="block text-sm font-medium text-gray-600 mb-1">Issue Date *</label><input type="date" name="driverIssueDate" value={formData.driverIssueDate} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"/></div>
                                 <div><label className="block text-sm font-medium text-gray-600 mb-1">Expiry Date *</label><input type="date" name="driverExpiry" value={formData.driverExpiry} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg"/></div>
                                 <div><label className="block text-sm font-medium text-gray-600 mb-1">Attach Front *</label><input type="file" name="driverFrontDoc" onChange={(e) => handleFileChange(e, 'driverFrontDoc')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/></div>
                                 <div><label className="block text-sm font-medium text-gray-600 mb-1">Attach Back *</label><input type="file" name="driverBackDoc" onChange={(e) => handleFileChange(e, 'driverBackDoc')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/></div>
                            </div>
                        </div>
                    </>
                )}
                 <div className="border-t pt-8 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-1">
                        <Image src="/images/privacy-illustration.svg" alt="Privacy Policy" width={150} height={150} className="mx-auto" />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                        <h4 className="font-bold text-gray-800">We Value Your Privacy:</h4>
                        <p className="text-sm text-gray-600">Caryaati will not sell or distribute your contact information, we highly encourage our customers to read the Privacy Policy, Terms of Use and Rental terms before reservation or booking.</p>
                        <div className="space-y-2">
                            <label className="flex items-center text-sm"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />I have read and accepted the <a href="#" className="text-blue-600 hover:underline ml-1">Terms of Use</a> of caryaati.com</label>
                            <label className="flex items-center text-sm"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />I have read the accepted the <a href="#" className="text-blue-600 hover:underline ml-1">Terms & Conditions</a> of Rent a Car Supplier</label>
                            <label className="flex items-center text-sm"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />I have read and accept <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy and Cookie Policy</a></label>
                        </div>
                    </div>
                 </div>
            </form>
        </div>
    );
};

//=========== MAIN PAGE COMPONENT ===========//
const BookingPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [carDetails, setCarDetails] = useState(false);
    const [formData, setFormData] = useState<{ dateRange: [Date | null, Date | null] }>({ dateRange: [null, null] });
    const [isClient, setIsClient] = useState(false);
    const [selectedImage, setSelectedImage] = useState('/images/model_sp_596_639.webp');
    const [bookingdates, setbookingdates] = useState("Booking Dates");
    const [mileageOption, setMileageOption] = useState<'limited' | 'unlimited'>('limited');
    const [collectionMethod, setCollectionMethod] = useState<'pickup' | 'delivery'>('pickup');
    const [pickupLocation, setPickupLocation] = useState('Dubai International Airport (DXB), Dubai, UAE');

    const totalSteps: number = 6;
    const router = useRouter();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
    
    useEffect(() => {
        AOS.init({ duration: 400, once: true });
        const startDate = localStorage.getItem('startDate') ? new Date(localStorage.getItem('startDate')!) : new Date();
        const endDate = localStorage.getItem('endDate') ? new Date(localStorage.getItem('endDate')!) : new Date(new Date().setDate(new Date().getDate() + 4));
        setFormData({ dateRange: [startDate, endDate] });
        setIsClient(true);
    }, []);

    const formatDateTime = (date: Date | null): string => {
        if (!date) return '';
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');
    };

    const calculateDays = () => {
        const [start, end] = formData.dateRange;
        if (start && end) {
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 ? diffDays : 1;
        } return 1;
    };
    const rentalDays = calculateDays();
    const pricePerDay = 33.66;
    const totalBasePrice = rentalDays * pricePerDay;
    const mileageCost = mileageOption === 'unlimited' ? 6.55 * rentalDays : 0;
    const finalTotal = totalBasePrice + mileageCost;

    const nextStep = () => currentStep < totalSteps ? setCurrentStep(currentStep + 1) : null;
    const prevStep = () => currentStep > 1 ? setCurrentStep(currentStep - 1) : null;
    const showStep = (step: number) => step <= totalSteps ? setCurrentStep(step) : null;
    
    const carImages = [{ id: 1, src: '/images/model_sp_596_639.webp' }, { id: 2, src: '/images/live1.jpg' }, { id: 3, src: '/images/live2.jpg' }, { id: 4, src: '/images/live3.jpg' }];
    const handleEditDateTime = () => console.log("Edit date and time clicked!");

    if (!isClient) return <div className="min-h-screen bg-white flex items-center justify-center"><p>Loading...</p></div>;

    const Step1_Vehicle = () => (
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="lg:w-3/5 bg-white text-gray-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col">
                <div>
                    <h2 className="text-3xl font-bold">Nissan Sunny 2026</h2>
                    <div className="flex items-center space-x-2 mt-2"><span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Sedan</span><span className="bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full">Featured</span></div>
                </div>
                <div>
                    <h3 className="font-semibold text-base mb-2">Specification</h3>
                    <div className="flex items-center space-x-6 text-gray-500"><span className="flex items-center text-sm"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>x 3</span><span className="flex items-center text-sm"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>x 5</span><span className="flex items-center text-sm"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>Automatic</span><span className="flex items-center text-sm"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V8a2 2 0 00-4 0v8m-4 0h12m-4-8a4 4 0 100-8 4 4 0 000 8z"></path></svg>A/C</span></div>
                </div>
                <div className="flex-grow flex gap-4 h-80">
                    <div className="flex flex-col space-y-3">
                        {carImages.map((img) => (<div key={img.id} className={`relative w-20 h-full cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img.src ? 'border-blue-500' : 'border-transparent'}`} onClick={() => setSelectedImage(img.src)}><Image src={img.src} alt={`Thumbnail ${img.id}`} fill className="object-cover" /></div>))}
                    </div>
                    <div className="relative flex-1 rounded-lg overflow-hidden"><Image src={selectedImage} alt="Selected Car" fill className="object-contain" priority/></div>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-gray-200">
                    <div className="flex items-baseline"><p className="text-4xl font-bold">{pricePerDay.toFixed(2)} AED</p><p className="text-gray-500 ml-2">/ day</p></div>
                    <DetailSection/>
                </div>
            </div>
            <div className="lg:w-2/5 bg-white rounded-2xl p-6 shadow-xl flex flex-col">
                <div>
                    <div className="bg-gray-800 text-white rounded-xl p-4 flex justify-between items-center mb-6">
                        <div><p className="font-semibold text-lg">{bookingdates}</p><p className="text-sm text-gray-300">{formatDateTime(formData.dateRange[0])} - {formatDateTime(formData.dateRange[1])}</p></div>
                        <button onClick={handleEditDateTime} className="p-2 rounded-full hover:bg-gray-700 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    </div>
                    <div className="space-y-4">
                        <label className="text-lg font-semibold text-gray-800">Mileage</label>
                        <div onClick={() => setMileageOption('limited')} className={`p-4 border rounded-lg cursor-pointer flex justify-between items-center transition-all ${mileageOption === 'limited' ? 'border-black ring-2 ring-black' : 'border-gray-300'}`}><div className="flex items-center"><div className="w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3">{mileageOption === 'limited' && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}</div><div><p className="font-semibold">1,200 km</p><p className="text-xs text-gray-500">+0.64 AED / for every additional km</p></div></div><p className="font-semibold">Included</p></div>
                        <div onClick={() => setMileageOption('unlimited')} className={`p-4 border rounded-lg cursor-pointer flex justify-between items-center transition-all ${mileageOption === 'unlimited' ? 'border-black ring-2 ring-black' : 'border-gray-300'}`}><div className="flex items-center"><div className="w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3">{mileageOption === 'unlimited' && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}</div><div><p className="font-semibold">Unlimited kilometers</p><p className="text-xs text-gray-500">All kilometers are included in the price</p></div></div><p className="font-semibold">+ {(6.55 * rentalDays).toFixed(2)} AED</p></div>
                    </div>
                </div>
                <div className="mt-auto pt-6">
                    <div className="flex justify-between items-baseline mb-4">
                        <div><p className="text-2xl font-bold text-gray-900">{finalTotal.toFixed(2)} AED total</p><p className="text-sm text-gray-500">{(finalTotal / rentalDays).toFixed(2)} AED /day</p></div>
                    </div>
                    <button onClick={nextStep} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-transform transform hover:scale-105 shadow-lg">Next</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100">
            <Navbar onMenuToggle={toggleSidebar} isHome={true} onUserToggle={toggleUserDropdown} />
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <UserDropdown isOpen={isUserDropdownOpen} />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {currentStep < totalSteps && (
                        <div className="text-center mb-12" data-aos="fade-down">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">Book Your Dream Car</h1>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Complete your booking in a few simple steps.</p>
                        </div>
                    )}
                    <div className="relative max-w-4xl mx-auto mb-16" data-aos="fade-up">
                        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -translate-y-1/2 rounded-full"></div>
                        <div className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}></div>
                        <div className="relative flex justify-between items-center">
                            {['Vehicle', 'Extras', 'Delivery', 'Options', 'Details', 'Confirm'].map((label, index) => (
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
                        {currentStep === 1 && <Step1_Vehicle />}
                        {currentStep === 2 && <ExtrasSection />}
                        {currentStep === 3 && <DeliveryStep collectionMethod={collectionMethod} setCollectionMethod={setCollectionMethod} location={pickupLocation} setLocation={setPickupLocation} dateRange={formData.dateRange} formatDateTime={formatDateTime}/>}
                        {currentStep === 4 && <OptionsStep />}
                        {currentStep === 5 && <DetailsFormStep />}
                        {currentStep === 6 && (
                             <div className="bg-white rounded-2xl shadow-xl p-8">
                                <div className="flex justify-end space-x-4 mb-8">
                                    <Link href="/" className="bg-orange-400 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-500 transition-colors">Home</Link>
                                    <Link href="/dashboard" className="bg-orange-400 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-500 transition-colors">Dashboard</Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-1">
                                        <Image src="/images/model_sp_596_639.webp" alt="Jeep Renegade" width={400} height={300} className="w-full object-cover rounded-lg" />
                                    </div>
                                    <div className="md:col-span-2 space-y-4 text-gray-700">
                                        <h2 className="text-xl font-bold">Dear MAAZ AZIZ ABDUL QADRI !</h2>
                                        <p>Thank you for reservation at CarYaati. Your requested <strong>Jeep Renegade 2020</strong> has been reserved with Reservation no. <strong>107343</strong>, for more details you may check your DashBoard or registered email for Reservation Information Estimated Total, Supplier and Reserved Vehicle Details. Your Supplier will confirm reservation and contact you soon. Don't forget to carry your mandatory documents at the time of Pickup.</p>
                                        <p>Have a wonderful Ride with Caryaati.</p>
                                        <p>Thank You</p>
                                        <div>
                                            <p className="font-semibold">Best Regards,</p>
                                            <p>Team CarYaati</p>
                                        </div>
                                        <div className="pt-6 border-t mt-6">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-bold">DISCOUNT CARS RENTAL LLC</h3>
                                                <p className="text-sm font-semibold">Dubai</p>
                                            </div>
                                            <div className="text-sm mt-2">
                                                <p><strong>Email:</strong> riyazkabeer01@gmail.com</p>
                                                <p><strong>Phone:</strong> 971562762345</p>
                                                <p><strong>Mobile:</strong> 971562762345</p>
                                                <p><strong>Address:</strong> Ground Floor, Mermaid Beach Hotel, Ajman Corniche, Ajman, UAE</p>
                                                <p className="mt-2"><strong>Operation Hours:</strong> 19</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        )}

                        {currentStep < totalSteps && (
                             <div className="flex justify-between items-center mt-10">
                                <button onClick={prevStep} disabled={currentStep === 1} className="py-2.5 px-6 rounded-xl hover:bg-gray-200 font-medium disabled:opacity-50">Previous</button>
                                <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-8 rounded-xl shadow-md">{currentStep === totalSteps - 1 ? 'Finish Booking' : 'Next'}</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default BookingPage;