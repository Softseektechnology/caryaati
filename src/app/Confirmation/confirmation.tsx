import React from 'react';
import Link from 'next/link';
import styles from './confirmation.module.css';

const BookingConfirmation: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.headerButtons}>
          <Link href="/" className={styles.btn}>Home</Link>
          <Link href="/dashboard" className={styles.btn}>Dashboard</Link>
        </div>
        <div className={`${styles.carImage}`}>
          <img src="images/model_sp_596_639.webp" className='hover:drop-shadow-2xl transition-all hover:scale-102 duration-300' alt="Nissan Sunny 2020" />
        </div>
        <div className={styles.greeting}>
          <h2>Dear Yesaa Baig!</h2>
        </div>
        <div className={styles.message}>
          <p>
            Thank you for reservation at CarYaati. Your requested Nissan Sunny 2020 has been reserved with Reservation no. 94697, for more details you may check your DashBoard or registered email for Reservation Information Estimated Total, Supplier and Reserved Vehicle Details. Your Supplier will confirm reservation and contact you soon. Don&apos;t forget to carry your mandatory documents at the time of Pick-up.
          </p>
          <p>Have a wonderful Ride with CarYaati,</p>
          <p>Thank You ❤️</p>
        </div>
        <div className={styles.contactInfo}>
          <h3>Best Regards,</h3>
          <p>Team CarYaati</p>
          <h3>Premium Car Rentals</h3>
          <p>Email: sales@pcrrentals.ae</p>
          <p>Phone: +97152554527</p>
          <p>Mobile: +97143609991</p>
          <p>Address: Ground Floor, Lobby Area, Jumeirah Business Centre 1, Cluster G, Jumeirah Lake Towers, Dubai, UAE.</p>
          <p>Operation Hours:</p>
          <p>Monday to Saturday 9AM to 7:00PM</p>
          <p>Friday Prayer Break 12:30PM to 2:00PM</p>
          <p>Sunday close</p>
        </div>
        <div className={styles.mapSection}>
          <div className={styles.mapPlaceholder}>Map Placeholder (View larger map)</div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;