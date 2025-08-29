import React, { useState } from 'react';
import { Row, Col, Form, Button, Dropdown, Image } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Car } from '../../data/carsData';
import styles from './Modalbox.module.css';

interface QuickBookingProps {
  car: Car;
  onClose: () => void;
}

interface CarOption {
  name: string;
  year: number;
  price: number;
  image: string;
}

export default function QuickBooking({ car, onClose }: QuickBookingProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    countryCode: '93 (Afghanistan)',
    request: 'Hello, I want to Book Kia Sportage 2016 From 09-05-2025 to 08-06-2025 for 30 days(s) Please call back on my number.',
    pickUpLocation: '30',
    pickUpDate: new Date('2025-05-07'), // Default to Wed, 07 May 2025
    pickUpTime: '14:30',
    dropoffDate: new Date('2025-05-08'), // Default to Thu, 08 May 2025
    dropoffTime: '14:30',
  });

  const [selectedCar, setSelectedCar] = useState<CarOption>({
    name: car.name,
    year: car.year,
    price: car.charges['7 days'],
    image: 'images/category-images/muv.webp',
  });

  const carOptions: CarOption[] = [
    { name: 'Toyota Corolla', year: 2024, price: 450, image: 'images/category-images/hatchback.webp' },
    { name: 'Honda Civic', year: 2023, price: 400, image: 'images/category-images/station.webp' },
    { name: 'MG MG20', year: 2025, price: 378, image: 'images/category-images/suv.webp' },
  ];

  // Handle form input changes for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle date change
  const handleDateChange = (date: Date, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  // Handle car selection
  const handleCarSelect = (carOption: CarOption) => {
    setSelectedCar(carOption);
  };

  return (
    <Row>
      <Col md={12} className={styles.bookingSection}>
        <h3>Book on Call</h3>
        <Form.Group className="mb-3">
          <Form.Label>Booking a Car</Form.Label>
          <Dropdown>
            <Dropdown.Toggle className={styles.dropdown}>
              <Image
                src={selectedCar.image}
                alt="Car Image"
                width={50}
                height={50}
                className="me-2"
              />
              <span style={{ color: '#000' }}>{`${selectedCar.name} ${selectedCar.year} - AED - ${selectedCar.price}`}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownContent}>
              {carOptions.map((carOption, index) => (
                <Dropdown.Item
                  key={index}
                  className={styles.option}
                  onClick={() => handleCarSelect(carOption)}
                >
                  <Image
                    src={carOption.image}
                    alt="Car Image"
                    width={50}
                    height={50}
                    className="me-2"
                  />
                  <span>{`${carOption.name} ${carOption.year} - AED - ${carOption.price}`}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Days :</Form.Label>
          <Form.Control
            type="text"
            name="pickUpLocation"
            value={formData.pickUpLocation}
            readOnly
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Dropoff Date</Form.Label>
              <DatePicker
                selected={formData.dropoffDate}
                onChange={(date: Date) => handleDateChange(date, 'dropoffDate')}
                dateFormat="d MMMM yyyy"
                className="form-control"
                placeholderText="Select Dropoff Date"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className={styles.formGroup}>
              <Form.Label>Pick Up Date</Form.Label>
              <DatePicker
                selected={formData.pickUpDate}
                onChange={(date: Date) => handleDateChange(date, 'pickUpDate')}
                dateFormat="d MMMM yyyy"
                className="form-control"
                placeholderText="Select Pick Up Date"
              />
            </Form.Group>
          </Col>
        </Row>
       
        <Form.Group className={styles.formGroup}>
          <Form.Label>Request</Form.Label>
          <Form.Control
            as="textarea"
            name="request"
            value={formData.request}
            onChange={handleInputChange}
            rows={3}
          />
        </Form.Group>
        <div className="d-flex justify-content-between mt-3">
          <Button onClick={onClose}>
            Update
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Col>
    </Row>
  );
}