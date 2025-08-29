// components/Documents-info/documents-info.tsx
import Image from 'next/image';
import styles from '../Documents-info/documents-info';

export default function DocumentsInfo() {
  return (
    <section className={styles.documentsSection}>
      <div className="container">
        <h2 className={styles.sectionHeading}>
          Documents Required for Car Rental in <span>UAE</span>
        </h2>
        <div className="row">
          {/* UAE Resident Column */}
          <div className="col-md-6">
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/info-documents/uae-resident.png"
                  alt="UAE Resident"
                  width={150}
                  height={150}
                  className={styles.image}
                />
              </div>
              <h3 className={styles.subHeading}>For UAE Resident</h3>
              <ul className={styles.documentList}>
                <li>Passport Copy</li>
                <li>Valid UAE Driving License</li>
                <li>Copy of Emirates ID</li>
              </ul>
            </div>
          </div>
          {/* Tourist Column */}
          <div className="col-md-6">
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/info-documents/tourist.webp"
                  alt="Tourist"
                  width={150}
                  height={150}
                  className={styles.image}
                />
              </div>
              <h3 className={styles.subHeading}>For Tourist Visiting the UAE</h3>
              <ul className={styles.documentList}>
                <li>Passport Copy</li>
                <li>Valid International driving license</li>
                <li>Copy of Visit Visa/Visa stamp</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Note at the bottom */}
        <div className={styles.note}>
          Visitors from the GCC, US, UK, Canada and Certain other countries can drive with their home country driving license alone in the UAE.
        </div>
      </div>
    </section>
  );
}