'use client';

import { useState } from 'react';
import { Row, Col, Button, Form, Alert } from 'react-bootstrap';
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
        <div className='bg-white py-15 rounded shadow-sm px-12'>

          <Row>
            <Col md={12}>
              <h4 className={styles.info}>Information</h4>
              <h1 className={styles.title}>Contact Us</h1>
              <p className={styles.subtitle}>
                We’re here to help! Fill out the form below, and our team will get back to you as soon as possible.
              </p>

              {/* Contact Info Section */}
              <div className={styles.contactInfoSection}>
                <Row className="text-center">
                  <Col md={4} className="mb-4">
                    <div className={styles.contactDetails}>
                      <i className="bi bi-geo-alt" style={{ fontSize: "28px", color: "#f39c12" }}></i>
                      <h3>UAE</h3>
                      <p>D-FXD-1001, Dubai Digital Park Building A5,<br />Dubai Silicon Oasis, Dubai, UAE.</p>
                    </div>
                  </Col>
                  <Col md={4} className="mb-4">
                    <div className={styles.contactDetails}>
                      <i className="bi bi-geo-alt" style={{ fontSize: "28px", color: "#f39c12" }}></i>
                      <h3>CANADA</h3>
                      <p>George Street South 41,<br />Brampton, ON L6Y 2E1, Canada.</p>
                    </div>
                  </Col>
                  <Col md={4} className="mb-4">
                    <div className={styles.contactDetails}>
                      <i className="bi bi-geo-alt" style={{ fontSize: "28px", color: "#f39c12" }}></i>
                      <h3>UK</h3>
                      <p>1 Cranwell Close, Shenley Brook End,<br />Milton Keynes MK5 7BU.</p>
                    </div>
                  </Col>
                </Row>

                <Row className="text-center mt-4">
                  <Col md={4} className="mb-4">
                    <div className={styles.contactDetails}>
                      <i className="bi bi-telephone" style={{ fontSize: "28px", color: "#f39c12" }}></i>
                      <h3>Support Phone</h3>
                      <p><strong>UAE:</strong> +971 (54) 3363 900</p>
                      <p><strong>Canada:</strong> +1 (647) 309 3619</p>
                      <p><strong>UK:</strong> +44 7791 733167</p>
                    </div>
                  </Col>
                  <Col md={4} className="mb-4">
                    <div className={styles.contactDetails}>
                      <i className="bi bi-envelope" style={{ fontSize: "28px", color: "#f39c12" }}></i>
                      <h3>Email</h3>
                      <p>info@caryaati.com</p>
                    </div>
                  </Col>
                  <Col md={4} className="mb-4">
                    <div className={styles.contactDetails}>
                      <i className="bi bi-clock" style={{ fontSize: "28px", color: "#f39c12" }}></i>
                      <h3>Working Hours</h3>
                      <p>09:30 - 21:00</p>
                    </div>
                  </Col>
                </Row>
              </div>

              {submitStatus && (
                <Alert variant={submitStatus.type} className={styles.alert}>
                  {submitStatus.message}
                </Alert>
              )}
              <p className='text-center xl:px-25 md:px-15 text-[#666] text-[16px]'>We are Caryaati.com, a trusted car rental online platform operated by SoftSeek Technology Inc. CarYaati.com is dedicated for easy, quick and instant car booking. Our Suppliers are experienced Car Rental specialists providing their services since years and understands your need. We are the bridge and right choice for car renting service..</p>
              <h1 className={`text-center text-[46px]`}>Get in Touch</h1>

              <Form onSubmit={handleSubmit} className={styles.contactForm}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
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
                  <Col md={6}>
                    <Form.Group className="mb-3">
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
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
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
                </Row>
                <Button type="submit" className={styles.submitButton}>
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
          <div className='w-full overflow-hidden'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3612.431844205196!2d55.374805!3d25.121087!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f657de5f2baf9%3A0x4416db1455f430fb!2sCaryaati%20Marketplace!5e0!3m2!1sen!2sus!4v1757073895687!5m2!1sen!2sus" width="1600" height="600" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className='text-center my-4'>
            <p className='text-gray-600 text-[16px]'>We are Caryaati.com, a trusted online Rent a car booking platform operated by SoftSeek Technology Inc. CarYaati is dedicated to easy, quick and instant car booking. Our Suppliers are experienced Car Rental specialists providing their services for years and understand your needs. We are the bridge and right choice for Car Hire service.</p>
            <h1>How to Get the Best Rent a Car Deals </h1>
            <p className='text-gray-600 text-left text-[16px]'>Compare offers from our listed car rental companies across UAE, filter your search based on your desired location, budget and travel requirements. <br />
              Narrow down your search preferences: car specs, mileage limit, comprehensive & additional insurance packages, car features and Payment options. <br />
              Short-list the best rent a car offers by our specialist provider and contact them directly over the phone, email, WhatsApp or even request a callback. <br />
              Ask for the real images and specifications of the car before car hire. <br />
              Book directly from Suppliers with no additional charges.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}