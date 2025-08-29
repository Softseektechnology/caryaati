import React, { useEffect, useRef } from 'react';
import styles from './Booknow.module.css';

interface CarDetailsModalProps {
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        modalRef.current.classList.add(styles.closing);
        setTimeout(onClose, 400); // Match the closing animation duration
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <button
          className={`${styles.closeButton} absolute top-0 right-0 z-[999]`}
          onClick={() => {
            modalRef.current?.classList.add(styles.closing);
            setTimeout(onClose, 400);
          }}
        >
          <span className="material-icons">close</span>
        </button>
        <div className={styles.modalHeader}>
          <img
            src="images/model_sp_596_639.webp"
            alt="Nissan Sunny"
            className={styles.headerImage}
          />
          <h2 className={styles.modalTitle}>Nissan Sunny 2020</h2>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>
              <span className="material-icons">directions_car</span>
              Vehicle Specifications
            </h3>
            <div className={styles.divider}></div>
            <ul className={styles.detailList}>
              <li><span className="material-icons">settings</span> Engine: 1.5L 4-Cylinder</li>
              <li><span className="material-icons">settings</span> Transmission: Auto</li>
              <li><span className="material-icons">local_gas_station</span> Fuel Type: Petrol</li>
              <li><span className="material-icons">local_gas_station</span> Fuel Policy: Level to Level</li>
              <li><span className="material-icons">speed</span> Mileage Limit: 4500 KM</li>
            </ul>
          </div>
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>
              <span className="material-icons">build</span>
              Features
            </h3>
            <div className={styles.divider}></div>
            <ul className={styles.detailList}>
              <li><span className="material-icons">ac_unit</span> Air Conditioning</li>
              <li><span className="material-icons">groups</span> Seating Capacity: x5</li>
              <li><span className="material-icons">luggage</span> Luggage Capacity: x3</li>
              <li><span className="material-icons">security</span> ABS Brakes</li>
              <li><span className="material-icons">bluetooth</span> Bluetooth Connectivity</li>
            </ul>
          </div>
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>
              <span className="material-icons">info</span>
              Rental Information
            </h3>
            <div className={styles.divider}></div>
            <ul className={styles.detailList}>
              <li><span className="material-icons">attach_money</span> Price: 1009.9 AED for 30 Days</li>
              <li><span className="material-icons">credit_card</span> Deposit: 1000 AED (Net) by Card</li>
              <li><span className="material-icons">event</span> Availability: Only 1 Car Available</li>
            </ul>
          </div>
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>
              <span className="material-icons">description</span>
              Additional Notes
            </h3>
            <div className={styles.divider}></div>
            <p className={styles.detailText}>
              The Nissan Sunny 2020 is an economy sedan perfect for city driving, offering a balance of fuel efficiency, comfort, and modern features. Ideal for both short trips and extended rentals, this vehicle ensures a reliable and enjoyable driving experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsModal;
