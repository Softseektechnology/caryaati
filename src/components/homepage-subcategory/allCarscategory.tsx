'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Telephone, Whatsapp, Star, Tag } from 'react-bootstrap-icons';
import styles from './carcategories.module.css';
import { Car, cars } from '../../data/carsData';
import QuickBooking from './Modalbox';
import InquiryButtton from '@/app/cars-for-rent/RentalDealCard/InquiryButtton';
import DetailSection from '@/app/cars-for-rent/RentalDealCard/DetailSection';

interface SubcategoryProps {
  category?: string;
}

const chunkArray = (array: Car[], size: number): Car[][] => {
  const result: Car[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function allCarscategory({ category }: SubcategoryProps) {
  const router = useRouter();
  const categories = ['Sedan', 'Hatchback', 'SUV', 'Off-road', 'Sports', 'Luxury'];

  const groupedCars: { [key: string]: Car[] } = categories.reduce((acc, cat) => {
    acc[cat] = cars.filter((car) => car.carType === cat);
    return acc;
  }, {} as { [key: string]: Car[] });

  const [showTelephoneModal, setShowTelephoneModal] = useState(false);
  const [telephoneCar, setTelephoneCar] = useState<Car | null>(null);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Suitcase':
        return <span className="material-icons">luggage</span>;
      case 'People':
        return <span className="material-icons">groups</span>;
      case 'Gear':
        return <span className="material-icons">settings</span>;
      case 'Snow':
        return <span className="material-icons">ac_unit</span>;
      case 'Telephone':
        return Telephone;
      case 'Whatsapp':
        return Whatsapp;
      case 'Airplane':
        return <span className="material-icons">flight</span>;
      case 'Building':
        return <span className="material-icons">apartment</span>;
      case 'GeoAlt':
        return <span className="material-icons">place</span>;
      default:
        return null;
    }
  };

  const renderFeatures = (features: { icon: string; label: string }[]) => {
    const orderedFeatures = [];
    let luggageCount = 0;
    let passengerCount = 0;

    const luggage = features.find(f => f.icon === 'Suitcase');
    if (luggage) {
      luggageCount = parseInt(luggage.label.match(/\d+/)?.[0] || '3');
      orderedFeatures.push({ icon: 'Suitcase', label: `x${luggageCount}` });
    }

    const passengers = features.find(f => f.icon === 'People');
    if (passengers) {
      passengerCount = parseInt(passengers.label.match(/\d+/)?.[0] || '4');
      orderedFeatures.push({ icon: 'People', label: `x${passengerCount}` });
    } else {
      orderedFeatures.push({ icon: 'People', label: 'x4' });
    }

    const ac = features.find(f => f.icon === 'Snow');
    if (ac) {
      orderedFeatures.push({ icon: 'Snow', label: 'A/C' });
    }

    const automatic = features.find(f => f.icon === 'Gear');
    if (automatic) {
      orderedFeatures.push({ icon: 'Gear', label: 'Auto' });
    }

    return orderedFeatures;
  };

  const handleTelephoneClick = (car: Car) => {
    setTelephoneCar(car);
    setShowTelephoneModal(true);
  };

  const handleCloseTelephoneModal = () => {
    setShowTelephoneModal(false);
    setTelephoneCar(null);
  };

  const handleBookNowClick = (car: Car, index: number) => {
    const carId = `${car.name}-${car.year}`.replace(/\s+/g, '-').toLowerCase();
    router.push(`/cars-for-rent/${carId}`);
    localStorage.setItem('carImage', car.image);
    localStorage.setItem('carName', car.name);
    localStorage.setItem('providerImage', car.providerImage);
  };

  return (
    <div className={styles.subcategorySlider}>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <h1 className={styles.subcategoryHeading}>
        Find Your Next Rent a Car with Caryaati Exclusive Deals
      </h1>
      <h2 className={styles.subcategorySubheading}>
        Exclusive Deals for {category || 'All'} Cars for Rent
      </h2>
      <p className={styles.subcategoryDescription}>
        Our goal is to provide you with affordable car rental prices in Dubai, Abu Dhabi, and Sharjah! You can rent an Economy Car Rental in Dubai and all over UAE at one of our locations nationwide or through your hotel in Dubai Jumeirah or Dubai Hotel.
      </p>

      {categories.map((cat) => {
        const categoryCars = category ? (cat === category ? groupedCars[cat] : []) : groupedCars[cat];
        if (categoryCars.length === 0) return null;

        const carChunks = chunkArray(categoryCars, 4);

        return carChunks.map((chunk, chunkIndex) => (
          <div key={`${cat}-${chunkIndex}`}>
            {chunkIndex === 0 && (
              <>
                <h3 className={styles.categoryHeading}>
                  Exclusive Deals for {cat} Cars for Rent
                </h3>
                <p className={styles.categoryDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </>
            )}
            <Row className="g-4">
              {chunk.map((car, idx) => (
                <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                  {car.isLuxury ? (
                    <Card className={styles.luxuryCard}>
                      <div className={styles.luxuryImageContainer}>
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="d-block w-100"
                          onError={() => console.log(`Image failed to load: ${car.image}`)}
                          crossOrigin="anonymous"
                        />
                        <span className={`${styles.carType} carType-${car.carType.toLowerCase()}`}>
                          {car.carType}
                        </span>
                        {idx === 0 && (
                          <Badge pill bg="warning" text="dark" className={styles.featuredBadge}>
                            <Star /> Featured
                          </Badge>
                        )}
                        {idx === chunk.length - 1 && (
                          <Badge pill bg="primary" className={styles.specialOffersBadge}>
                            <Tag /> Special Offers
                          </Badge>
                        )}
                      </div>
                      <Card.Body className={styles.luxuryCardBody}>
                        <Card.Title className={styles.luxuryCardTitle}>{car.name}</Card.Title>
                        <div className={styles.luxuryTitleDetails}>
                          <span>{car.year}</span>
                          {car.option && (
                            <span className={styles.luxuryOptionBadge}>
                              <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="white"><path d="m699.08-135.85-252-253.23q-21.16 9.16-43.01 14.12-21.86 4.96-46.38 4.96-95.83 0-162.91-67.08-67.09-67.09-67.09-162.92 0-31 7.89-59.27 7.88-28.27 22.42-53.81l143.69 142.93L387.54-656 245.39-798.92q25.53-14.54 53.45-22.81t58.85-8.27q95.84 0 162.92 67.08 67.08 67.09 67.08 162.92 0 25.31-4.77 47.15-4.77 21.85-14.31 42.24l253.24 252q10.46 10.59 10.46 25.6 0 15.01-10.38 25.39l-72.63 72.63q-10.38 10.37-25.07 9.99-14.69-.39-25.15-10.85Zm25.54-59.99 36.61-36.62-266.38-266.39q16.84-20.77 24.84-47.27 8-26.5 8-53.88 0-66.54-47.54-117.77Q432.61-769 359.84-768l86.7 86.69q10.84 10.85 10.84 25.31 0 14.46-10.84 25.31L327-511.15q-10.85 10.84-25.31 10.84-14.46 0-25.31-10.84l-86.69-86.7q.15 77 51.77 122.43Q293.08-430 357.69-430q26.26 0 52.52-7.81 26.25-7.8 48.02-24.42l266.39 266.39ZM472-486.46Z" /></svg> {car.option}
                            </span>
                          )}
                        </div>
                        <div className={`${styles.features} relative left-[-6px]`} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <span className={`${styles.luxuryFeatureItem} items-center content-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="white"><path d="M306.5-177q-23.72 0-40.61-16.89T249-234.5v-408q0-23.72 16.89-40.61T306.5-700h88v-65.52q0-23.73 16.89-40.61Q428.28-823 452-823h56q23.72 0 40.61 16.89t16.89 40.61v65.5h88q23.72 0 40.61 16.89T711-642.5v408q0 23.72-16.89 40.61T653.5-177v13q0 11-8 19t-18.75 8Q616-137 608-145t-8-19v-13H360v13q0 11-8 19t-18.75 8q-10.75 0-18.75-8t-8-19v-13Zm0-25.5h347q14 0 23-9t9-23v-408q0-14-9-23t-23-9h-347q-14 0-23 9t-9 23v408q0 14 9 23t23 9Zm88-82.5H420v-307h-25.5v307Zm145.5 0h25.5v-307H540v307ZM420-700h120v-65.5q0-14-9-23t-23-9h-56q-14 0-23 9t-9 23v65.5Zm60 261.5Z" /></svg>x 4
              </span>
              <span className={`${styles.luxuryFeatureItem} items-center content-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="white"><path d="M338.54-137Q328-137 321-144.86t-7-17.64q0-9.78 6.96-16.89 6.97-7.11 17.75-7.11 10.79 0 17.79 7.04 7 7.05 7 17.46 0 9.5-7 17.25-6.99 7.75-17.96 7.75Zm140.5 0q-10.54 0-17.54-7.86t-7-17.64q0-9.78 6.96-16.89 6.97-7.11 17.75-7.11 10.79 0 17.79 7.04 7 7.05 7 17.46 0 9.5-7 17.25-6.99 7.75-17.96 7.75Zm140.46 0q-9.5 0-17-7.86T595-162.5q0-9.78 7.5-16.89 7.5-7.11 17.75-7.11t17.25 7.04q7 7.05 7 17.46 0 9.5-7.01 17.25-7 7.75-17.99 7.75Zm-258-146.5V-393H342q-22 0-38.8-15.21-16.8-15.2-18.7-37.79l-27-337h62.74q30.99 0 53.72 20.44 22.72 20.44 27.54 51.56l23.76 170h159.31q49.25 0 83.84 35.25T703-419.5v26.5h-70.5v109.5H607V-393H387v109.5h-25.5Zm316-136q0-39.5-27.32-67.75T584.5-515.5H403.42L377-707.5q-4-22-20.04-36t-36.96-14h-35.5l25.5 310q1 13 9.5 21t21.5 8l336.5-1Zm-367.5 1Z" /></svg>x 4
              </span>
              <span className={`${styles.luxuryFeatureItem} items-center content-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="white"><path d="M168.18-177q-38.68 0-65.68-27.01-27-27-27-66.07 0-34.92 23-60.92t57-30.74v-236.52q-34-4.74-57-30.68-23-25.95-23-61.56 0-38.54 26.97-65.52Q129.44-783 167.97-783t65.78 27.05Q261-728.9 261-690.26 261-655 237.75-629T181-597.98V-493h286.5v-104.98q-34-5.02-57-30.96-23-25.95-23-61.56 0-38.54 26.97-65.52Q441.44-783 479.97-783t65.78 27.05Q573-728.9 573-690.26 573-655 549.75-629T493-597.98V-493h220.05q27.51 0 47.48-19.79Q780.5-532.58 780.5-560v-37.79q-34-5.21-57-31.15-23-25.95-23-61.56 0-38.54 26.97-65.52Q754.44-783 792.97-783t65.78 27.05Q886-728.9 886-690.26 886-655 862.75-629T806-597.79V-560q0 38.54-27.12 65.52Q751.75-467.5 713-467.5H493v105.48q33.5 5.02 56.75 30.96Q573-305.11 573-269.84q0 38.96-27.07 65.9Q518.85-177 480.18-177q-38.68 0-65.68-27.01-27-27-27-66.07 0-34.92 23-60.92t57-30.82V-467.5H181v105.68q33.5 4.82 56.75 30.76Q261-305.11 261-269.84q0 38.96-27.07 65.9Q206.85-177 168.18-177Zm-.13-25.5q27.45 0 47.45-19.71 20-19.7 20-47.5 0-27.79-19.9-47.54Q195.69-337 168.1-337q-27.6 0-47.35 19.77Q101-297.45 101-270.04q0 28.04 19.8 47.79 19.81 19.75 47.25 19.75Zm0-420.5q27.45 0 47.45-19.71 20-19.7 20-47.5 0-27.79-19.9-47.54-19.91-19.75-47.5-19.75-27.6 0-47.35 19.77Q101-717.95 101-690.54q0 28.04 19.8 47.79Q140.61-623 168.05-623Zm312 420.5q27.45 0 47.45-19.71 20-19.7 20-47.5 0-27.79-19.9-47.54Q507.69-337 480.1-337q-27.6 0-47.35 19.77Q413-297.45 413-270.04q0 28.04 19.8 47.79 19.81 19.75 47.25 19.75Zm0-420.5q27.45 0 47.45-19.71 20-19.7 20-47.5 0-27.79-19.9-47.54-19.91-19.75-47.5-19.75-27.6 0-47.35 19.77Q413-717.95 413-690.54q0 28.04 19.8 47.79Q452.61-623 480.05-623Zm313 0q27.45 0 47.45-19.71 20-19.7 20-47.5 0-27.79-19.9-47.54-19.91-19.75-47.5-19.75-27.6 0-47.35 19.77Q726-717.95 726-690.54q0 28.04 19.8 47.79Q765.61-623 793.05-623ZM168-270Zm0-420.5ZM480-270Zm0-420.5Zm313 0Z"/></svg> Auto
              </span>
              <span className={`${styles.luxuryFeatureItem} items-center content-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M467.5-312.5 320-166.5q-4 4-9 3.75t-8.5-4.75Q298-171 298-176t4.5-9.5l165-165v-117h-117l-166 166Q181-298 176-298t-9.5-4.5q-3.5-3.5-3.5-8.75t3.5-8.75l146-147.5H122q-5 0-8.5-3.75t-3.5-9.25q0-4.5 3.75-8.5t9.25-4h189.5l-146-147q-4-3.5-3.75-8.75t4.75-9.25q3.5-3.5 8.5-3.5t9.5 3.5l165 165h117v-117l-166-165q-3.5-3.5-3.5-8.5t4.5-9.5q3.5-3.5 8.75-3.5T320-793l147.5 145v-190q0-4.5 3.75-8.5t9.25-4q4.5 0 8.5 4t4 8.5v190l147-145.5q3.5-3.5 8.75-3.25T658-793q3.5 4.5 3.5 9.5T658-775L493-610v117h117l165-165q3.5-3.5 8.5-3.5t9.5 4q3.5 4 3.5 9.25t-3.5 8.75L648-493h190q4.5 0 8.5 4t4 8.5q0 5.5-4 9.25t-8.5 3.75H648L793.5-320q3.5 4 3.25 9t-3.75 8.5q-4.5 4.5-9.5 4.5t-8.5-4.5l-165-165H493v117l165 166q3.5 3.5 3.5 8.5t-4 9.5q-4 3.5-9.25 3.5t-8.75-3.5L493-312.5V-122q0 5-4 8.5t-8.5 3.5q-5.5 0-9.25-3.75T467.5-123v-189.5Z"/></svg> A/C
              </span>
            </div>
                        <div className={styles.luxuryChargesContainer}>
                          <div className={styles.luxuryChargeItem}>
                            <span className={styles.luxuryChargeLabel}>7 Days</span>
                            <span className={styles.luxuryChargePrice}>{car.charges['7 days'].toFixed(2)}</span>
                            <span className={styles.luxuryChargeCurrency}>AED</span>
                          </div>
                        </div>
                        <div className={styles.inquiryButtons}>
                          <Button
                            className={styles.callButton}
                            onClick={() => handleTelephoneClick(car)}
                          >
                            <Telephone />
                          </Button>
                          <Button
                            className={styles.whatsappButton}
                            href="https://wa.me/971123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Whatsapp />
                          </Button>
                          <Button
                            variant="dark"
                            className={styles.luxuryBookButton}
                            onClick={() => handleBookNowClick(car, idx)}
                          >
                            Book Now
                          </Button>
                        </div>
                        <div className={styles.luxuryProviderContainer}>
                          <div className={styles.providerAndLocation}>
                            <div className={styles.providerRow}>
                              <div className={styles.providerContainer}>
                                <span className={styles.greenDot}></span>
                                <div className={styles.providerPlaceholder}>
                                  <Image
                                    src={car.providerImage}
                                    alt={`${car.name} Provider Logo`}
                                    width={50}
                                    height={50}
                                    style={{ width: 'auto', height: '100%' }}
                                    className={styles.providerLogo}
                                    onError={(e) => {
                                      console.log(`Provider image failed to load: ${car.providerImage}`, e);
                                      (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                                    }}
                                    crossOrigin="anonymous"
                                  />
                                </div>
                              </div>
                              <span className={styles.luxuryLocationIcons}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="m379-137.5-17-18 136-136 18 17.5-137 136.5Zm187 .5-18-18.5 117-117 18 18.5-117 117ZM155.5-546.5 137-564l118-118 18.5 17-118 118.5Zm0 185.5L137-378l137-137 18.5 17.5-137 136.5Zm589-29-88-221.5L548-503l17.5 88-12 11.5-54-96-96-54 11.5-11 88 16.5 108.5-107.5-221.5-89 19-18L677-720l93.5-93.5q4.5-5 10-7.25t12-2.25q5.5 0 11.5 2.25t10.5 7.25q4.5 4.5 6.5 10t2 11q0 6-2.5 12t-7 11L720-676l42.5 267-18 19Z"/></svg>
                                <span className={styles.luxuryLocationText}>{car.availability?.[0]}</span>
                              </span>
                            </div>
                            <div className={styles.locationRow}>
                              <span className={styles.luxuryLocationIcons}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="white"><path d="M480.07-485.39q29.85 0 51.04-21.26 21.2-21.26 21.2-51.11 0-29.85-21.26-51.05Q509.79-630 479.93-630q-29.85 0-51.04 21.26-21.2 21.26-21.2 51.12 0 29.85 21.26 51.04 21.26 21.19 51.12 21.19ZM480-179.46q117.38-105.08 179.65-201.58 62.27-96.5 62.27-169.04 0-109.38-69.5-179.84-69.5-70.46-172.42-70.46-102.92 0-172.42 70.46-69.5 70.46-69.5 179.84 0 72.54 62.27 169.04 62.27 96.5 179.65 201.58Zm0 79.84Q329-230.46 253.54-343.15q-75.46-112.7-75.46-206.93 0-138.46 89.57-224.19Q357.23-860 480-860t212.35 85.73q89.57 85.73 89.57 224.19 0 94.23-75.46 206.93Q631-230.46 480-99.62Zm0-458.07Z"/></svg>
                                <span className={styles.luxuryLocationText}>{car.location}</span>
                              </span>
                              <span className={styles.luxuryLocationIcons}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M407-173.31v-217.46L460.5-544q1.5-2.5 3.21-3.75T471-549h282q4.05 0 6.95 1.04 2.89 1.04 3.55 3.96L817-390.77v217.39q0 5.8-3.75 9.59t-9.69 3.79h.67q-5.65 0-9.44-3.68-3.79-3.69-3.79-10.06V-230H433v56.38q0 6.04-3.75 9.83t-9.69 3.79h.67q-5.65 0-9.44-3.84-3.79-3.84-3.79-9.47ZM445-418h334l-36.19-104.5H481L445-418Zm-11.5 26v136-136Zm63.5 97.5q13.95 0 23.72-9.77 9.78-9.78 9.78-23.73 0-13.95-9.78-23.73-9.77-9.77-23.72-9.77t-23.73 9.77q-9.77 9.78-9.77 23.73 0 13.95 9.77 23.73 9.78 9.77 23.73 9.77Zm230 0q13.95 0 23.72-9.77 9.78-9.78 9.78-23.73 0-13.95-9.78-23.73-9.77-9.77-23.72-9.77t-23.72 9.77q-9.78 9.78-9.78 23.73 0 13.95 9.78 23.73 9.77 9.77 23.72 9.77Zm-466.5-183V-532H315v54.5h-54.5ZM405-662v-54.5h54.5v54.5H405ZM260.5-318.5V-373H315v54.5h-54.5Zm0 158.5v-54.5H315v54.5h-54.5ZM143-160v-489.5h144.5v-184H577V-641h-25.5v-167H313v184H168.5v464H143Zm290.5-96h357v-136h-357v136Z"/></svg>
                                <span className={styles.luxuryLocationText}>{car.availability?.[1]}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <DetailSection /> */}
                      </Card.Body>
                    </Card>
                  ) : (
                    <Card className={styles.carCard}>
                      <div className={styles.imageContainer}>
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="d-block w-100"
                          onError={() => console.log(`Image failed to load: ${car.image}`)}
                          crossOrigin="anonymous"
                        />
                        <span className={`${styles.carType} carType-${car.carType.toLowerCase()}`}>
                          {car.carType}
                        </span>
                        {idx === 0 && (
                          <Badge pill bg="warning" text="dark" className={styles.featuredBadge}>
                            <Star /> Featured
                          </Badge>
                        )}
                        {idx === chunk.length - 1 && (
                          <Badge pill bg="primary" className={styles.specialOffersBadge}>
                            <Tag /> Special Offers
                          </Badge>
                        )}
                      </div>
                      <Card.Body style={{ padding: '1.2rem' }}>
                        <Card.Title className={styles.cardTitle}>{car.name}</Card.Title>
                        <div className={styles.titleDetails}>
                          <span>{car.year}</span>
                          {car.option && (
                            <span className={styles.optionBadge}>
                              <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="white"><path d="m699.08-135.85-252-253.23q-21.16 9.16-43.01 14.12-21.86 4.96-46.38 4.96-95.83 0-162.91-67.08-67.09-67.09-67.09-162.92 0-31 7.89-59.27 7.88-28.27 22.42-53.81l143.69 142.93L387.54-656 245.39-798.92q25.53-14.54 53.45-22.81t58.85-8.27q95.84 0 162.92 67.08 67.08 67.09 67.08 162.92 0 25.31-4.77 47.15-4.77 21.85-14.31 42.24l253.24 252q10.46 10.59 10.46 25.6 0 15.01-10.38 25.39l-72.63 72.63q-10.38 10.37-25.07 9.99-14.69-.39-25.15-10.85Zm25.54-59.99 36.61-36.62-266.38-266.39q16.84-20.77 24.84-47.27 8-26.5 8-53.88 0-66.54-47.54-117.77Q432.61-769 359.84-768l86.7 86.69q10.84 10.85 10.84 25.31 0 14.46-10.84 25.31L327-511.15q-10.85 10.84-25.31 10.84-14.46 0-25.31-10.84l-86.69-86.7q.15 77 51.77 122.43Q293.08-430 357.69-430q26.26 0 52.52-7.81 26.25-7.8 48.02-24.42l266.39 266.39ZM472-486.46Z" /></svg> {car.option}
                            </span>
                          )}
                        </div>
                        <div className={`${styles.features} relative left-[-7px]`} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <span className={`${styles.featureItem} items-center content-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#1f1f1f"><path d="M306.5-177q-23.72 0-40.61-16.89T249-234.5v-408q0-23.72 16.89-40.61T306.5-700h88v-65.52q0-23.73 16.89-40.61Q428.28-823 452-823h56q23.72 0 40.61 16.89t16.89 40.61v65.5h88q23.72 0 40.61 16.89T711-642.5v408q0 23.72-16.89 40.61T653.5-177v13q0 11-8 19t-18.75 8Q616-137 608-145t-8-19v-13H360v13q0 11-8 19t-18.75 8q-10.75 0-18.75-8t-8-19v-13Zm0-25.5h347q14 0 23-9t9-23v-408q0-14-9-23t-23-9h-347q-14 0-23 9t-9 23v408q0 14 9 23t23 9Zm88-82.5H420v-307h-25.5v307Zm145.5 0h25.5v-307H540v307ZM420-700h120v-65.5q0-14-9-23t-23-9h-56q-14 0-23 9t-9 23v65.5Zm60 261.5Z" /></svg>x 4
              </span>
              <span className={`${styles.featureItem} items-center content-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#1f1f1f"><path d="M338.54-137Q328-137 321-144.86t-7-17.64q0-9.78 6.96-16.89 6.97-7.11 17.75-7.11 10.79 0 17.79 7.04 7 7.05 7 17.46 0 9.5-7 17.25-6.99 7.75-17.96 7.75Zm140.5 0q-10.54 0-17.54-7.86t-7-17.64q0-9.78 6.96-16.89 6.97-7.11 17.75-7.11 10.79 0 17.79 7.04 7 7.05 7 17.46 0 9.5-7 17.25-6.99 7.75-17.96 7.75Zm140.46 0q-9.5 0-17-7.86T595-162.5q0-9.78 7.5-16.89 7.5-7.11 17.75-7.11t17.25 7.04q7 7.05 7 17.46 0 9.5-7.01 17.25-7 7.75-17.99 7.75Zm-258-146.5V-393H342q-22 0-38.8-15.21-16.8-15.2-18.7-37.79l-27-337h62.74q30.99 0 53.72 20.44 22.72 20.44 27.54 51.56l23.76 170h159.31q49.25 0 83.84 35.25T703-419.5v26.5h-70.5v109.5H607V-393H387v109.5h-25.5Zm316-136q0-39.5-27.32-67.75T584.5-515.5H403.42L377-707.5q-4-22-20.04-36t-36.96-14h-35.5l25.5 310q1 13 9.5 21t21.5 8l336.5-1Zm-367.5 1Z" /></svg>x 4
              </span>
              <span className={`${styles.featureItem} items-center content-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#1f1f1f"><path d="M168.18-177q-38.68 0-65.68-27.01-27-27-27-66.07 0-34.92 23-60.92t57-30.74v-236.52q-34-4.74-57-30.68-23-25.95-23-61.56 0-38.54 26.97-65.52Q129.44-783 167.97-783t65.78 27.05Q261-728.9 261-690.26 261-655 237.75-629T181-597.98V-493h286.5v-104.98q-34-5.02-57-30.96-23-25.95-23-61.56 0-38.54 26.97-65.52Q441.44-783 479.97-783t65.78 27.05Q573-728.9 573-690.26 573-655 549.75-629T493-597.98V-493h220.05q27.51 0 47.48-19.79Q780.5-532.58 780.5-560v-37.79q-34-5.21-57-31.15-23-25.95-23-61.56 0-38.54 26.97-65.52Q754.44-783 792.97-783t65.78 27.05Q886-728.9 886-690.26 886-655 862.75-629T806-597.79V-560q0 38.54-27.12 65.52Q751.75-467.5 713-467.5H493v105.48q33.5 5.02 56.75 30.96Q573-305.11 573-269.84q0 38.96-27.07 65.9Q518.85-177 480.18-177q-38.68 0-65.68-27.01-27-27-27-66.07 0-34.92 23-60.92t57-30.82V-467.5H181v105.68q33.5 4.82 56.75 30.76Q261-305.11 261-269.84q0 38.96-27.07 65.9Q206.85-177 168.18-177Zm-.13-25.5q27.45 0 47.45-19.71 20-19.7 20-47.5 0-27.79-19.9-47.54Q195.69-337 168.1-337q-27.6 0-47.35 19.77Q101-297.45 101-270.04q0 28.04 19.8 47.79 19.81 19.75 47.25 19.75Zm0-420.5q27.45 0 47.45-19.71 20-19.7 20-47.5 0-27.79-19.9-47.54-19.91-19.75-47.5-19.75-27.6 0-47.35 19.77Q101-717.95 101-690.54q0 28.04 19.8 47.79Q140.61-623 168.05-623Zm312 420.5q27.45 0 47.45-19.71 20-19.7 20-47.5 0-27.79-19.9-47.54Q507.69-337 480.1-337q-27.6 0-47.35 19.77Q413-297.45 413-270.04q0 28.04 19.8 47.79 19.81 19.75 47.25 19.75Zm0-420.5q27.45 0 47.45-19.71 20-19.7 20-47.5 0-27.79-19.9-47.54-19.91-19.75-47.5-19.75-27.6 0-47.35 19.77Q413-717.95 413-690.54q0 28.04 19.8 47.79Q452.61-623 480.05-623Zm313 0q27.45 0 47.45-19.71 20-19.7 20-47.5 0-27.79-19.9-47.54-19.91-19.75-47.5-19.75-27.6 0-47.35 19.77Q726-717.95 726-690.54q0 28.04 19.8 47.79Q765.61-623 793.05-623ZM168-270Zm0-420.5ZM480-270Zm0-420.5Zm313 0Z"/></svg> Auto
              </span>
              <span className={`${styles.featureItem} items-center content-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M467.5-312.5 320-166.5q-4 4-9 3.75t-8.5-4.75Q298-171 298-176t4.5-9.5l165-165v-117h-117l-166 166Q181-298 176-298t-9.5-4.5q-3.5-3.5-3.5-8.75t3.5-8.75l146-147.5H122q-5 0-8.5-3.75t-3.5-9.25q0-4.5 3.75-8.5t9.25-4h189.5l-146-147q-4-3.5-3.75-8.75t4.75-9.25q3.5-3.5 8.5-3.5t9.5 3.5l165 165h117v-117l-166-165q-3.5-3.5-3.5-8.5t4.5-9.5q3.5-3.5 8.75-3.5T320-793l147.5 145v-190q0-4.5 3.75-8.5t9.25-4q4.5 0 8.5 4t4 8.5v190l147-145.5q3.5-3.5 8.75-3.25T658-793q3.5 4.5 3.5 9.5T658-775L493-610v117h117l165-165q3.5-3.5 8.5-3.5t9.5 4q3.5 4 3.5 9.25t-3.5 8.75L648-493h190q4.5 0 8.5 4t4 8.5q0 5.5-4 9.25t-8.5 3.75H648L793.5-320q3.5 4 3.25 9t-3.75 8.5q-4.5 4.5-9.5 4.5t-8.5-4.5l-165-165H493v117l165 166q3.5 3.5 3.5 8.5t-4 9.5q-4 3.5-9.25 3.5t-8.75-3.5L493-312.5V-122q0 5-4 8.5t-8.5 3.5q-5.5 0-9.25-3.75T467.5-123v-189.5Z"/></svg> A/C
              </span>
            </div>
                        <div className={styles.chargesContainer}>
                          {Object.entries(car.charges).map(([duration, price]) => (
                            <div key={duration} className={styles.chargeItem}>
                              <span className={styles.chargeLabel}>{duration}</span>
                              <span className={styles.chargePrice}>{price.toFixed(2)}</span>
                              <span className={styles.chargeCurrency}>AED</span>
                            </div>
                          ))}
                        </div>
                        <div className={styles.inquiryButtons}>
                          <div className='flex'>
                          <Button
                            className={styles.callButton}
                            onClick={() => handleTelephoneClick(car)}
                          >
                            <Telephone />
                          </Button>
                          <Button
                            className={styles.whatsappButton}
                            href="https://wa.me/971123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            <Whatsapp />
                          </Button>
                            </div>
                          <Button
                            variant="dark"
                            className={`${styles.bookNowButton} float-right`}
                            onClick={() => handleBookNowClick(car, idx)}
                          >
                            Book Now
                          </Button>
                        </div>
                        <div className={styles.carTypeContainer}>
                          <div className={styles.providerAndLocation}>
                            <div className={styles.providerRow}>
                              <div className={styles.providerContainer}>
                                <span className={styles.greenDot}></span>
                                <div className={styles.providerPlaceholder}>
                                  <Image
                                    src={car.providerImage}
                                    alt={`${car.name} Provider Logo`}
                                    width={40}
                                    height={40}
                                    style={{ width: 'auto', height: '100%' }}
                                    className={styles.providerLogo}
                                    onError={(e) => {
                                      console.log(`Provider image failed to load: ${car.providerImage}`, e);
                                      (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                                    }}
                                    crossOrigin="anonymous"
                                  />
                                </div>
                              </div>
                              <span className={styles.locationIcons}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m379-137.5-17-18 136-136 18 17.5-137 136.5Zm187 .5-18-18.5 117-117 18 18.5-117 117ZM155.5-546.5 137-564l118-118 18.5 17-118 118.5Zm0 185.5L137-378l137-137 18.5 17.5-137 136.5Zm589-29-88-221.5L548-503l17.5 88-12 11.5-54-96-96-54 11.5-11 88 16.5 108.5-107.5-221.5-89 19-18L677-720l93.5-93.5q4.5-5 10-7.25t12-2.25q5.5 0 11.5 2.25t10.5 7.25q4.5 4.5 6.5 10t2 11q0 6-2.5 12t-7 11L720-676l42.5 267-18 19Z"/></svg>
                                <span className={styles.locationText}>{car.availability?.[0]}</span>
                              </span>
                            </div>
                            <div className={styles.locationRow}>
                              <span className={styles.locationIcons}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M480.07-485.39q29.85 0 51.04-21.26 21.2-21.26 21.2-51.11 0-29.85-21.26-51.05Q509.79-630 479.93-630q-29.85 0-51.04 21.26-21.2 21.26-21.2 51.12 0 29.85 21.26 51.04 21.26 21.19 51.12 21.19ZM480-179.46q117.38-105.08 179.65-201.58 62.27-96.5 62.27-169.04 0-109.38-69.5-179.84-69.5-70.46-172.42-70.46-102.92 0-172.42 70.46-69.5 70.46-69.5 179.84 0 72.54 62.27 169.04 62.27 96.5 179.65 201.58Zm0 79.84Q329-230.46 253.54-343.15q-75.46-112.7-75.46-206.93 0-138.46 89.57-224.19Q357.23-860 480-860t212.35 85.73q89.57 85.73 89.57 224.19 0 94.23-75.46 206.93Q631-230.46 480-99.62Zm0-458.07Z"/></svg>
                                <span className={styles.locationText}>{car.location}</span>
                              </span>
                              <span className={styles.locationIcons}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M407-173.31v-217.46L460.5-544q1.5-2.5 3.21-3.75T471-549h282q4.05 0 6.95 1.04 2.89 1.04 3.55 3.96L817-390.77v217.39q0 5.8-3.75 9.59t-9.69 3.79h.67q-5.65 0-9.44-3.68-3.79-3.69-3.79-10.06V-230H433v56.38q0 6.04-3.75 9.83t-9.69 3.79h.67q-5.65 0-9.44-3.84-3.79-3.84-3.79-9.47ZM445-418h334l-36.19-104.5H481L445-418Zm-11.5 26v136-136Zm63.5 97.5q13.95 0 23.72-9.77 9.78-9.78 9.78-23.73 0-13.95-9.78-23.73-9.77-9.77-23.72-9.77t-23.73 9.77q-9.77 9.78-9.77 23.73 0 13.95 9.77 23.73 9.78 9.77 23.73 9.77Zm230 0q13.95 0 23.72-9.77 9.78-9.78 9.78-23.73 0-13.95-9.78-23.73-9.77-9.77-23.72-9.77t-23.72 9.77q-9.78 9.78-9.78 23.73 0 13.95 9.78 23.73 9.77 9.77 23.72 9.77Zm-466.5-183V-532H315v54.5h-54.5ZM405-662v-54.5h54.5v54.5H405ZM260.5-318.5V-373H315v54.5h-54.5Zm0 158.5v-54.5H315v54.5h-54.5ZM143-160v-489.5h144.5v-184H577V-641h-25.5v-167H313v184H168.5v464H143Zm290.5-96h357v-136h-357v136Z"/></svg>
                                <span className={styles.locationText}>{car.availability?.[1]}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              ))}
            </Row>
          </div>
        ));
      })}

      <Modal show={showTelephoneModal} onHide={handleCloseTelephoneModal} centered>
        <Modal.Body>
          <QuickBooking car={telephoneCar!} onClose={handleCloseTelephoneModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
}