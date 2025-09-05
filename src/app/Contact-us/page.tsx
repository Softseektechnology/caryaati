'use client';

import { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../../components/nevegation-header/Navbar';
import Footer from '../../components/foorter/Footer';
import UserDropdown from '../../components/customer-dashboard/user-dashboard';
import Sidebar from '../../components/multiplepages/Sidebar-multiplelinks';
import styles from './Contact-us.module.css';

export default function ContactUs() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<{ type: string; message: string } | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isUserDropdownOpen) setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Your message has been sent successfully!' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus({ type: 'danger', message: 'Failed to send your message. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ type: 'danger', message: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <div className={styles.container}>
      <Navbar onMenuToggle={toggleSidebar} isHome={true} onUserToggle={toggleUserDropdown} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <UserDropdown isOpen={isUserDropdownOpen} />

      <main className={styles.main}>
        <Container className={styles.innerContainer}>
          <Row className="justify-content-center text-center mb-5">
            <Col xs={12}>
              <h1 className={styles.title}>Contact Us</h1>
              <p className={styles.subtitle}>We're here to help! Reach out with any questions or feedback.</p>
            </Col>
          </Row>

          {/* Contact Info Section */}
          <Row className="mb-5 g-4">
            <Col xs={12} sm={6} md={4}>
              <div className={styles.contactCard}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <h3>UAE</h3>
                <p>D-FXD-1001, Dubai Digital Park Building A5, Dubai Silicon Oasis, Dubai, UAE</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <div className={styles.contactCard}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <h3>CANADA</h3>
                <p>George Street South 41, Brampton, ON L6Y 2E1, Canada.</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <div className={styles.contactCard}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <h3>UK</h3>
                <p>1 cranwell close, Shenley Brook end Milton Keynes MK5 7BU</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <div className={styles.contactCard}>
                <FaPhone className={styles.contactIcon} />
                <h3>Phone</h3>
                <p>+971 (54) 3363 900<br />+1 (647) 309 3619<br />+44 7791 733167</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <div className={styles.contactCard}>
                <FaEnvelope className={styles.contactIcon} />
                <h3>Working Hours</h3>
                <p>09:30-21:00</p>
              </div>
            </Col>
          </Row>

          {/* Form Section */}
          <Row className="mb-5">
            <Col xs={12}>
              {submitStatus && (
                <Alert variant={submitStatus.type} className={styles.alert}>
                  {submitStatus.message}
                </Alert>
              )}
              <Form onSubmit={handleSubmit} className={styles.contactForm}>
                <Row className="g-3">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Name <span className={styles.required}>*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Email <span className={styles.required}>*</span></Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Message <span className={styles.required}>*</span></Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Enter your message"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Button type="submit" className={styles.submitButton}>
                      Send Message
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          {/* Map */}
          <Row className="mb-5">
            <Col xs={12}>
              <div className={styles.mapContainer}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3612.431844205196!2d55.374805!3d25.121087!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x3e5f657de5f2baf9%3A0x4416db1455f430fb!2sCaryaati%20Marketplace!5e0!3m2!1sen!2sus!4v1757073895687!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Col>
          </Row>

          {/* About Section */}
          <Row className="justify-content-center">
            <Col xs={12} md={10}>
              <h2 className={styles.aboutTitle}>About Caryaati</h2>
              <p className={styles.aboutText}>
                We are Caryaati.com, a trusted online Rent a car booking platform operated by SoftSeek Technology Inc. Caryaati is dedicated to easy, quick and instant car booking. Our Suppliers are experienced Car Rental specialists providing their services for years and understand your needs. We are the bridge and right choice for Car Rental service.
              </p>
              <h3 className={styles.tipsTitle}>How to Get the Best Rent a Car Deals</h3>
              <ul className={styles.tipsList}>
                <li>Compare offers from our listed car rental companies across UAE, filter your search based on your desired location, budget and travel requirements.</li>
                <li>Narrow down your search preferences: car specs, mileage limit, comprehensive & additional insurance packages, car features and Payment options.</li>
                <li>Short-list the best rent a car offers by our specialist provider and contact them directly over the phone, email, WhatsApp or even request a callback.</li>
                <li>Ask for the real images and specifications of the car before car hire.</li>
                <li>Book directly from Suppliers with no additional charges.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
}