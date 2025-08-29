'use client';

import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';

interface Car {
  name: string;
  type: string;
  image: string;
  charges: { [key: string]: number };
  features: { icon: string; label: string }[];
  providerImage: string;
  location: { lat: number; lng: number };
}

interface CarListProps {
  filteredCars: Car[];
}

export default function CarList({ filteredCars }: CarListProps) {
  return (
    <div>
      <h3 className="mb-3">Available Cars ({filteredCars.length})</h3>
      {filteredCars.length === 0 ? (
        <Alert variant="info">No cars match your filters. Try adjusting the criteria.</Alert>
      ) : (
        <Row>
          {filteredCars.map((car, index) => (
            <Col key={index} md={6} className="mb-4">
              <Card className="carCard">
                <Card.Img
                  variant="top"
                  src={car.image}
                  alt={car.name}
                  style={{
                    marginTop: '10px',
                    width: '280px',
                    height: '200px',
                    display: 'block',
                    margin: 'auto',
                    borderRadius: '10px',
                  }}
                />
                <Card.Body>
                  <Card.Title style={{ marginRight: '100px' }}>{car.name}</Card.Title>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Card.Text className="carType">{car.type}</Card.Text>
                    <div className="providerPlaceholder">
                      <Card.Img
                        src={car.providerImage}
                        alt={`${car.name} Provider Logo`}
                        className="providerLogo"
                      />
                    </div>
                  </div>
                  <div className="features">
                    {car.features.map((feature, i) => (
                      <span key={i} className="featureItem" style={{ fontSize: '15px', marginTop: '20px' }}>
                        <i className={feature.icon} style={{ fontSize: '18px', marginTop: '0px' }}></i> {feature.label}
                      </span>
                    ))}
                  </div>
                  <div className="chargesContainer" style={{ marginRight: '100px', marginTop: '30px' }}>
                    {Object.entries(car.charges).map(([duration, price]) => (
                      <div key={duration} className="chargeItem">
                        <span className="chargeLabel">{duration}</span>
                        <span className="chargePrice" style={{ fontSize: '25px' }}>
                          {price.toFixed(2)}
                        </span>
                        <span className="chargeCurrency">AED</span>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-around mb-2" style={{ marginRight: '100px', marginTop: '-20px' }}>
                    <div className="inquiryButtons">
                      <Button
                        variant="outline-primary"
                        style={{
                          backgroundColor: '#feb321',
                          color: '#fff',
                          borderColor: '#feb321',
                          marginRight: '10px',
                          width: '100px',
                          height: '40px',
                        }}
                        href="tel:+971123456789"
                      >
                        <i className="bi bi-telephone-fill" style={{ marginRight: '5px' }}></i> Call
                      </Button>
                      <Button
                        variant="outline-success"
                        style={{
                          backgroundColor: 'green',
                          color: '#fff',
                          borderColor: 'green',
                          width: '150px',
                          height: '40px',
                        }}
                        href="https://wa.me/971123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-whatsapp" style={{ marginRight: '5px' }}></i> WhatsApp
                      </Button>
                    </div>
                  </div>
                  <Button variant="dark" className="w-100">Book Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}