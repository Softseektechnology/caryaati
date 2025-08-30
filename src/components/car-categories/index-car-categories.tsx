import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './index-car-categories.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Category {
  name: string;
  link: string;
  image: string;
}

export default function CarCategories() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories: Category[] = [
    { name: 'Sedan', link: '/cars-for-rent/sedan', image: '/images/category-images/sedan.webp' },
    { name: 'Hatchback', link: '/cars-for-rent/hatchback', image: '/images/category-images/hatchback.webp' },
    { name: 'SUV', link: '/cars-for-rent/suv', image: '/images/category-images/suv.webp' },
    { name: 'Off-Road', link: '/cars-for-rent/off-road', image: '/images/category-images/off-road.webp' },
    { name: 'Sports', link: '/cars-for-rent/sports', image: '/images/category-images/sports.webp' },
    { name: 'Luxury', link: '/cars-for-rent/luxury', image: '/images/category-images/luxury.webp' },
  ];

  const handleCategoryClick = (link: string) => {
    router.push(link);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.searchSection}>
      {/* Desktop View */}
      <div className={styles.desktopOnly}>
        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <div
              key={category.name}
              className={styles.categoryCard}
              onClick={() => handleCategoryClick(category.link)}
            >
              <div className={styles.imagePlaceholder}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={80}
                  height={50}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = '/images/fallback-placeholder.jpg';
                  }}
                />
              </div>
              <div className={styles.categoryName}>{category.name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Carousel View */}
      <div className={styles.mobileOnly}>
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          emulateTouch={true}
          swipeable={true}
          infiniteLoop={true}
          centerMode={true}
          centerSlidePercentage={33.33} /* Adjusted to show 3 items at a time */
          className={styles.mobileCarousel}
          renderIndicator={false}
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className={styles.carouselItem}
              onClick={() => handleCategoryClick(category.link)}
            >
              <div className={styles.imagePlaceholder}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={80}
                  height={50}
                  style={{ objectFit: 'cover', }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = '/images/fallback-placeholder.jpg';
                  }}
                />
              </div>
              <div className={styles.categoryName}>{category.name}</div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}