import React, { useState } from 'react';
import styles from './FAQ.module.css';

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

const ExtrasSection: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['protection']));
  const [selectedPackage, setSelectedPackage] = useState<string>('Super');
  const [extraQuantities, setExtraQuantities] = useState<{ [key: string]: number }>({
    infantSeat: 0,
    childBooster: 0,
    childSafety: 0,
  });

  const packages: Package[] = [
    { name: 'Super', price: '300.00 AED', selected: true },
    { name: 'Basic', price: '0 AED' },
  ];

  const extraItems: ExtraItem[] = [
    {
      id: 'infantSeat',
      name: 'Infant Safety Seat\nRecommended for children weighing under 20 lbs / 9kg (Birth to approx 1-12 months)',
      price: '10 AED/Unit/Day',
      image: 'https://via.placeholder.com/50',
      quantity: 0,
    },
    {
      id: 'childBooster',
      name: 'Child Booster Seat\nRecommended for children weighing 18kg-30kg (approx 4 - 7 years)',
      price: '10 AED/Unit/Day',
      image: 'https://via.placeholder.com/50',
      quantity: 0,
    },
    {
      id: 'childSafety',
      name: 'Child Safety Seat\nRecommended for children weighing 20-40 lbs / 9-18kg (Approx 1 - 3 years)',
      price: '10 AED/Unit/Day',
      image: 'https://via.placeholder.com/50',
      quantity: 0,
    },
  ];

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

  const totalProtection = selectedPackage === 'Super' ? 300.00 : 0.00;
  const totalExtras = extraItems.reduce((sum, item) => sum + (item.quantity * 10), 0);

  return (
    <div className={styles.extrasContainer}>
      <div className={styles.section}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('protection')}
        >
          <span>Protection Packages</span>
          <span className={styles.totalPrice}>{totalProtection.toFixed(2)} AED</span>
          <svg
            className={`${styles.arrow} ${expandedSections.has('protection') ? styles.rotated : ''}`}
            fill="none"
            stroke="#1f2937"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.has('protection') && (
          <div className={styles.packageOptions}>
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`${styles.packageOption} ${selectedPackage === pkg.name ? styles.selected : ''}`}
                onClick={() => handlePackageSelect(pkg.name)}
              >
                {selectedPackage === pkg.name && <span className={styles.selectedLabel}>Selected</span>}
                <span>{pkg.name} ?</span>
                <span className={styles.price}>{pkg.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('extra')}
        >
          <span>Extra Charges</span>
          <span className={styles.totalPrice}>{totalExtras.toFixed(2)} AED</span>
          <svg
            className={`${styles.arrow} ${expandedSections.has('extra') ? styles.rotated : ''}`}
            fill="none"
            stroke="#1f2937"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.has('extra') && (
          <div className={styles.extraItems}>
            {extraItems.map((item) => (
              <div key={item.id} className={styles.extraItem}>
                <img src={item.image} alt={item.name} className={styles.extraImage} />
                <div className={styles.extraDetails}>
                  <span>{item.name}</span>
                  <span className={styles.extraPrice}>{item.price}</span>
                </div>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className={styles.quantityInput}
                    value={extraQuantities[item.id]}
                    readOnly
                  />
                  <button
                    className={styles.quantityButton}
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.note}>
              <p>
                Please note: Usually Companies run out of Extras, Caryati do not take payments for any extra item at the
                time of booking. However, by selecting Extras now, you will help to pass on your requirements to the Car
                Rental company so they may arrange selected extras before pickup. Companies will ask for extra charges
                only if they provide you with that particular item at the booking counter.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtrasSection;