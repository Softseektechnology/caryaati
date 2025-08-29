'use client';

import { useState } from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Filters.module.css';

// Custom Next Arrow Component
const NextArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button className={styles.nextArrow} onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
};

// Custom Previous Arrow Component
const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button className={styles.prevArrow} onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
};

interface FilterBarProps {
  onMenuToggle: () => void;
}

export default function FilterBar({ onMenuToggle }: FilterBarProps) {
  const [smartFilters, setSmartFilters] = useState('');
  const [carType, setCarType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [transmission, setTransmission] = useState('');
  const [carFeatures, setCarFeatures] = useState('');
  const [location, setLocation] = useState('');
  const [policies, setPolicies] = useState('');
  const [rentalAgency, setRentalAgency] = useState('');
  const [paymentType, setPaymentType] = useState('');

  // Placeholder options for dropdowns (customize as needed)
  const filterOptions = ['Option 1', 'Option 2', 'Option 3'];

  // Slider settings with custom arrows
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.filterBar} style={{marginTop:'-30px'}}>
      {/* <Button variant="light" className={styles.hamburger} onClick={onMenuToggle}>
        <i className="bi bi-list" style={{ fontSize: '24px' }}></i>
      </Button>
      <Button variant="light" className={styles.star}>
        <i className="bi bi-star" style={{ fontSize: '16px' }}></i>
      </Button> */}
      <Slider {...sliderSettings} className={styles.slider}>
        <div className={styles.slide}>
          <Dropdown as={ButtonGroup} className={styles.dropdown} >
            <Button variant="light">Smart Filters</Button>
            <Dropdown.Toggle split variant="light" id="dropdown-smart-filters" />
            <Dropdown.Menu>
              {filterOptions.map((option, index) => (
                <Dropdown.Item key={index} onClick={() => setSmartFilters(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.slide}>
          <Dropdown as={ButtonGroup} className={styles.dropdown} >
            <Button variant="light">Car type</Button>
            <Dropdown.Toggle split variant="light" id="dropdown-car-type" />
            <Dropdown.Menu>
              {filterOptions.map((option, index) => (
                <Dropdown.Item key={index} onClick={() => setCarType(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.slide}>
          <Dropdown as={ButtonGroup} className={styles.dropdown} >
            <Button variant="light">Capacity</Button>
            <Dropdown.Toggle split variant="light" id="dropdown-capacity" />
            <Dropdown.Menu>
              {filterOptions.map((option, index) => (
                <Dropdown.Item key={index} onClick={() => setCapacity(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.slide}>
          <Dropdown as={ButtonGroup} className={styles.dropdown} >
            <Button variant="light">Transmission</Button>
            <Dropdown.Toggle split variant="light" id="dropdown-transmission" />
            <Dropdown.Menu>
              {filterOptions.map((option, index) => (
                <Dropdown.Item key={index} onClick={() => setTransmission(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.slide}>
          <Dropdown as={ButtonGroup} className={styles.dropdown}>
            <Button variant="light">Car features</Button>
            <Dropdown.Toggle split variant="light" id="dropdown-car-features" />
            <Dropdown.Menu>
              {filterOptions.map((option, index) => (
                <Dropdown.Item key={index} onClick={() => setCarFeatures(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.slide}>
          <Dropdown as={ButtonGroup} className={styles.dropdown}>
            <Button variant="light">Location</Button>
            <Dropdown.Toggle split variant="light" id="dropdown-location" />
            <Dropdown.Menu>
              {filterOptions.map((option, index) => (
                <Dropdown.Item key={index} onClick={() => setLocation(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.slide}>
          <Dropdown as={ButtonGroup} className={styles.dropdown} >
            <Button variant="light">Policies</Button>
            <Dropdown.Toggle split variant="light" id="dropdown-policies" />
            <Dropdown.Menu>
              {filterOptions.map((option, index) => (
                <Dropdown.Item key={index} onClick={() => setPolicies(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.slide}>
          <Dropdown as={ButtonGroup} className={styles.dropdown} >
            <Button variant="light">Rental agency</Button>
            <Dropdown.Toggle split variant="light" id="dropdown-rental-agency" />
            <Dropdown.Menu>
              {filterOptions.map((option, index) => (
                <Dropdown.Item key={index} onClick={() => setRentalAgency(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.slide}>
          <Dropdown as={ButtonGroup} className={styles.dropdown}  >
            <Button variant="light">Payment type</Button>
            <Dropdown.Toggle split variant="light" id="dropdown-payment-type" />
            <Dropdown.Menu>
              {filterOptions.map((option, index) => (
                <Dropdown.Item key={index} onClick={() => setPaymentType(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* <div className={styles.slide}>
          <Button variant="primary" className={styles.bookButton}>
            Book on KAYAK <i className="bi bi-chevron-right"></i>
          </Button>
        </div> */}
      </Slider>
    </div>
  );
}