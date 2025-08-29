import React, { useState, useEffect } from 'react';
import styles from './ExtrasSection.module.css';

interface Package {
  name: string;
  price: string;
  selected?: boolean;
}

interface ExtraItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface AdditionalDriver {
  id: string;
  name: string;
  price: string;
  icon: string;
  quantity: number;
}

interface ExtrasSectionProps {
  onTotalsChange?: (protection: number, extras: number, additionalDriver: number) => void;
}

const ExtrasSection: React.FC<ExtrasSectionProps> = ({ onTotalsChange }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['protection']));
  const [selectedPackage, setSelectedPackage] = useState<string>('Super');
  const [extraQuantities, setExtraQuantities] = useState<{ [key: string]: number }>({
    infantSeat: 0,
    childBooster: 0,
    childSafety: 0,
  });
  const [additionalDriverQuantity, setAdditionalDriverQuantity] = useState<number>(0);

  const packages: Package[] = [
    { name: 'Super', price: '300.00 AED', selected: true },
    { name: 'Basic', price: '0 AED' },
  ];

  const extraItems: ExtraItem[] = [
    {
      id: 'infantSeat',
      name: 'Infant Safety Seat\nRecommended for children weighing under 20 lbs / 9kg (Birth to approx 1-12 months)',
      price: '10 AED/Unit/Day',
      image: 'images/filter-icon/infant_seat.png',
      quantity: 0,
    },
    {
      id: 'childBooster',
      name: 'Child Booster Seat\nRecommended for children weighing 18kg-30kg (approx 4 - 7 years)',
      price: '10 AED/Unit/Day',
      image: 'images/filter-icon/booster.png',
      quantity: 0,
    },
    {
      id: 'childSafety',
      name: 'Child Safety Seat\nRecommended for children weighing 20-40 lbs / 9-18kg (Approx 1 - 3 years)',
      price: '10 AED/Unit/Day',
      image: 'images/filter-icon/child.png',
      quantity: 0,
    },
  ];

  const additionalDriver: AdditionalDriver = {
    id: 'additionalDriver',
    name: 'Additional Driver\nAdd an extra driver to your rental agreement',
    price: '50 AED/Driver',
    icon: 'fas fa-user-plus',
    quantity: 0,
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handlePackageSelect = (name: string) => {
    setSelectedPackage(name);
  };

  const updateQuantity = (id: string, delta: number) => {
    setExtraQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }));
  };

  const updateDriverQuantity = (delta: number) => {
    setAdditionalDriverQuantity((prev) => Math.max(0, prev + delta));
  };

  const basePrice = 1009.9;
  const totalProtection = selectedPackage === 'Super' ? 300.00 : 0.00;
  const totalExtras = extraItems.reduce((sum, item) => sum + (extraQuantities[item.id] * 10), 0);
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
    <div className="bg-white rounded-lg mb-4 sm:mb-5 overflow-hidden">
      <div className="border-b border-gray-200">
        <div
          className={`flex justify-between items-center p-3 sm:p-4 bg-gray-50 cursor-pointer font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-300 ${styles.sectionHeader}`}
          onClick={() => toggleSection('protection')}
        >
          <span className="text-sm sm:text-base">Protection Packages</span>
          <span className="font-bold text-orange-500 text-sm sm:text-base">{totalProtection.toFixed(2)} AED</span>
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${expandedSections.has('protection') ? styles.rotated : ''}`}
            fill="none"
            stroke="#1f2937"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className={`${styles.dropdownContent} ${expandedSections.has('protection') ? styles.dropdownOpen : ''}`}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 p-3 sm:p-5 bg-white">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`flex flex-col items-center w-full sm:w-36 h-32 sm:h-36 p-2 sm:p-3 border-2 border-orange-400 rounded-lg bg-white hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer ${selectedPackage === pkg.name ? 'bg-orange-50 shadow-md' : ''} ${styles.packageOption}`}
                onClick={() => handlePackageSelect(pkg.name)}
              >
                {selectedPackage === pkg.name && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mb-2">Selected</span>
                )}
                <span className="text-xs sm:text-sm text-gray-700 text-center">{pkg.name}</span>
                <span className="text-sm sm:text-base font-bold text-orange-500 mt-2">{pkg.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div
          className={`flex justify-between items-center p-3 sm:p-4 bg-gray-50 cursor-pointer font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-300 ${styles.sectionHeader}`}
          onClick={() => toggleSection('extra')}
        >
          <span className="text-sm sm:text-base">Extra Charges</span>
          <span className="font-bold text-orange-500 text-sm sm:text-base">{totalExtras.toFixed(2)} AED</span>
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${expandedSections.has('extra') ? styles.rotated : ''}`}
            fill="none"
            stroke="#1f2937"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className={`${styles.dropdownContent} ${expandedSections.has('extra') ? styles.dropdownOpen : ''}`}>
          <div className="p-3 sm:p-5 bg-white">
            {extraItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <img src={item.image} alt={item.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                <div className="flex-1">
                  <span className="block text-xs sm:text-sm text-gray-600 whitespace-pre-wrap">{item.name}</span>
                  <span className="block text-xs sm:text-sm font-bold text-orange-500">{item.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-300 bg-white text-gray-600 rounded hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-10 h-7 sm:w-12 sm:h-8 border border-gray-300 text-center text-xs sm:text-sm bg-white rounded"
                    value={extraQuantities[item.id]}
                    readOnly
                  />
                  <button
                    className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-300 bg-white text-gray-600 rounded hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="p-2 sm:p-3 bg-blue-50 rounded-md mt-3 sm:mt-4 text-xs text-blue-800 text-center">
              <p>
                Please note: Usually Companies run out of Extras, Caryati do not take payments for any extra item at the
                time of booking. However, by selecting Extras now, you will help to pass on your requirements to the Car
                Rental company so they may arrange selected extras before pickup. Companies will ask for extra charges
                only if they provide you with that particular item at the booking counter.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div
          className={`flex justify-between items-center p-3 sm:p-4 bg-gray-50 cursor-pointer font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-300 ${styles.sectionHeader}`}
          onClick={() => toggleSection('additionalDriver')}
        >
          <span className="text-sm sm:text-base">Additional Driver</span>
          <span className="font-bold text-orange-500 text-sm sm:text-base">{totalAdditionalDriver.toFixed(2)} AED</span>
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${expandedSections.has('additionalDriver') ? styles.rotated : ''}`}
            fill="none"
            stroke="#1f2937"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className={`${styles.dropdownContent} ${expandedSections.has('additionalDriver') ? styles.dropdownOpen : ''}`}>
          <div className="p-3 sm:p-5 bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <i className={`${additionalDriver.icon} text-2xl sm:text-3xl text-blue-600`} />
              <div className="flex-1">
                <span className="block text-xs sm:text-sm text-gray-600 whitespace-pre-wrap">{additionalDriver.name}</span>
                <span className="block text-xs sm:text-sm font-bold text-orange-500">{additionalDriver.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-300 bg-white text-gray-600 rounded hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => updateDriverQuantity(-1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-10 h-7 sm:w-12 sm:h-8 border border-gray-300 text-center text-xs sm:text-sm bg-white rounded"
                  value={additionalDriverQuantity}
                  readOnly
                />
                <button
                  className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-300 bg-white text-gray-600 rounded hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => updateDriverQuantity(1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-blue-50 rounded-md mt-3 sm:mt-4 text-xs text-blue-800 text-center">
              <p>
                Adding an additional driver allows another person to drive the rental vehicle. Please ensure the additional driver meets the rental company's requirements. Charges will be confirmed at the booking counter.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div
          className={`flex justify-between items-center p-3 sm:p-4 bg-gray-50 cursor-pointer font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-300 ${styles.sectionHeader}`}
          onClick={() => toggleSection('summary')}
        >
          <span className="text-sm sm:text-base">Charges Summary</span>
          <span className="font-bold text-orange-500 text-sm sm:text-base">{totalCharges.toFixed(2)} AED</span>
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${expandedSections.has('summary') ? styles.rotated : ''}`}
            fill="none"
            stroke="#1f2937"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className={`${styles.dropdownContent} ${expandedSections.has('summary') ? styles.dropdownOpen : ''}`}>
          <div className="p-3 sm:p-5 bg-white">
            <div className="text-center text-sm sm:text-base text-gray-800 mb-3 sm:mb-4">Charges Summary for Rental Period of 30 Days</div>
            <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-600">
              <span className="font-bold bg-gray-800 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded">Rental Charges</span>
              <span></span>
            </div>
            <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-600">
              <span>Rent for 30 days</span>
              <span>{basePrice.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-600">
              <span className="font-bold bg-gray-800 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded">Extra's Charges</span>
              <span></span>
            </div>
            <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-600">
              <span>Super Protection</span>
              <span>{totalProtection.toFixed(2)} AED</span>
            </div>
            {totalExtras > 0 && (
              <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-600">
                <span>Extra Items</span>
                <span>{totalExtras.toFixed(2)} AED</span>
              </div>
            )}
            {totalAdditionalDriver > 0 && (
              <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-600">
                <span>Additional Driver</span>
                <span>{totalAdditionalDriver.toFixed(2)} AED</span>
              </div>
            )}
            <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-600">
              <span className="font-bold bg-gray-800 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded">Security Deposit</span>
              <span></span>
            </div>
            <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-600">
              <span>Security Deposit</span>
              <span>{securityDeposit.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between mb-2 text-xs sm:text-sm font-bold text-gray-600">
              <span>Sub Total:</span>
              <span>{subtotal.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between mb-2 text-xs sm:text-sm font-bold text-gray-600">
              <span>VAT:</span>
              <span>{vat.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between mb-2 text-sm sm:text-base font-bold text-orange-500">
              <span>Total Amount</span>
              <span>{totalCharges.toFixed(2)} AED</span>
            </div>
            <a
              href="#"
              className="block w-full py-2 px-3 sm:px-4 bg-orange-500 text-white text-center font-bold rounded-md hover:bg-orange-600 transition-colors duration-300 mt-3 sm:mt-4 text-xs sm:text-sm"
            >
              Reserve Now & Pay at Booking Counter
            </a>
            <div className="mt-2 sm:mt-3 text-xs text-gray-600 text-center">
              Reserve this car now and pay at Rent a Car Booking Counter. The total amount payable at the counter is {totalCharges.toFixed(2)} AED incl. 5% VAT<br />
              For extra charges like child seats, additional drivers, etc., availability can be confirmed only at the counter; however, providing us details will help vendors to arrange it before pick-up.
            </div>
            <div className="mt-2 sm:mt-3 p-2 bg-orange-500 text-white rounded-md text-xs text-center">
              If you want to avoid delay and save time at the booking counter, complete your profile by uploading documents.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtrasSection;