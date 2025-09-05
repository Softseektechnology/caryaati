'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./Become-a-partner.module.css";

const BecomePartnerPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    contactPersonName: "",
    companyName: "",
    email: "",
    countryCode: "",
    mobileNumber: "",
    address: "",
    website: "",
    totalCars: "",
    ownerName: "",
    ownerEmail: "",
    ownerCountryCode: "",
    ownerMobileNumber: "",
    emiratesIdNumber: "",
    tradeLicenseNumber: "",
    emiratesIdCopy: null,
    tradeLicenseCopy: null,
  });

  const updateFormStep = (step) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Form Submitted Successfully!');
        setFormData({
          contactPersonName: "",
          companyName: "",
          email: "",
          countryCode: "",
          mobileNumber: "",
          address: "",
          website: "",
          totalCars: "",
          ownerName: "",
          ownerEmail: "",
          ownerCountryCode: "",
          ownerMobileNumber: "",
          emiratesIdNumber: "",
          tradeLicenseNumber: "",
          emiratesIdCopy: null,
          tradeLicenseCopy: null,
        });
        setCurrentStep(0);
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const steps = [
    {
      title: "Company Info",
      content: (
        <>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Person Name <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  placeholder="Enter Contact Person Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter Company Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email Address"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Country Code <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  as="select"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Country Code</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+91">+91</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Mobile Number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Address <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter Address"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Website (Optional)</Form.Label>
                <Form.Control
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Enter Website URL"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Total Cars <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="number"
                  name="totalCars"
                  value={formData.totalCars}
                  onChange={handleInputChange}
                  placeholder="Enter Total Number of Cars"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: "Owner Info",
      content: (
        <>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Owner Name <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="Enter Owner Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Owner Email <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleInputChange}
                  placeholder="Enter Owner Email"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Country Code <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  as="select"
                  name="ownerCountryCode"
                  value={formData.ownerCountryCode}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Country Code</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+91">+91</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Owner Mobile Number <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="ownerMobileNumber"
                  value={formData.ownerMobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Owner Mobile Number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: "Docs",
      content: (
        <>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Emirates ID Number <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="emiratesIdNumber"
                  value={formData.emiratesIdNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Emirates ID Number"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Trade License Number <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="tradeLicenseNumber"
                  value={formData.tradeLicenseNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Trade License Number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Emirates ID Copy (Optional)</Form.Label>
                <Form.Control
                  type="file"
                  name="emiratesIdCopy"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Trade License Copy (Optional)</Form.Label>
                <Form.Control
                  type="file"
                  name="tradeLicenseCopy"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  const services = [
    {
      title: "Fleet Management",
      icon: "directions_car",
      items: ["Single Screen Operation", "Vehicle Status Reports", "Smart Searching", "Smart Contract Creation"],
    },
    {
      title: "Fines and Salik Integration",
      icon: "toll",
      items: ["Salik Report", "Fines Report", "Smart Invoicing", "Real Time Updates"],
    },
    {
      title: "Booking Verification",
      icon: "verified",
      items: ["Check Documents", "Important Validations", "Save Time Easy Working", "Manage Reservations"],
    },
    {
      title: "Bookings and Reservations",
      icon: "event_available",
      items: ["Track Online Booking", "Convert Reservations to Bookings", "Useful Booking Reports"],
    },
    {
      title: "Excel Import and Export",
      icon: "import_export",
      items: ["Import Your Fleet Data", "Export Report to PDF and Excel", "One Click Report Download Option"],
    },
    {
      title: "Payments Gateway",
      icon: "payment",
      items: ["Easy Online Ordering", "Secure Gateways", "Record Your Transactions"],
    },
    {
      title: "Smart Printing",
      icon: "print",
      items: ["Reports Are Ready to Print", "Print or Email Invoices", "Stored Documents Printing"],
    },
    {
      title: "Reports & Analytics",
      icon: "analytics",
      items: ["Financial Reports", "Fleet Utilization Report", "Managerial Report", "Overdue Payment Report"],
    },
    {
      title: "Easy Configuration",
      icon: "settings",
      items: ["System Configuration", "Fuel Settings", "Accounts Settings", "Maintenance Protocols"],
    },
    {
      title: "Customer Portal",
      icon: "web",
      items: ["Booking Information", "Rental History", "Salik and Fines Reports", "Profile Settings", "Promotions and Referral"],
    },
  ];

  return (
    <div className={styles.container}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

      {/* Hero Section */}
      <div className={styles.title}>Join CarYaati as a Partner</div>
      <div className={styles.subtitle}>
        Partner with CarYaati to streamline your car rental business with our cutting-edge software, designed to boost productivity and growth.
      </div>

      {/* Steps Section */}
      <div className={styles.steps}>
        <Row>
          {[
            {
              image: "/images/register_online.png",
              title: "Register Online",
              description: "Easy and FREE registrations. A CarYaati representative will contact you for further assistance.",
            },
            {
              image: "/images/import_vehicle_caryaati.png",
              title: "Import Your Vehicles",
              description: "Effortless company setup: import your fleet data and connect with innovative solutions.",
            },
            {
              image: "/images/integration_caryaati.png",
              title: "Integrate Tolls and Fines",
              description: "Simplify operations with smart, seamless configurations for tolls and fines integration.",
            },
          ].map((step, index) => (
            <Col sm={12} md={4} key={index}>
              <div className={`${styles.step} justify-items-center text-center`}>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={150}
                  height={150}
                  className={`justify-self-center`}
                  style={{ objectFit: "contain" }}
                />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* Form Section */}
      <div className={styles.formContainer}>
        <div className={styles.title}>Become a Partner</div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ "--current-step": currentStep + 1 } as React.CSSProperties}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${styles.progressStep} ${currentStep >= index ? styles.completed : ""}`}
                onClick={() => updateFormStep(index)}
              >
                <span className={styles.stepNumber}>{index + 1}</span>
                <span className={`${styles.stepLabel} max-sm:text-[8px]`}>{step.title}</span>
              </div>
            ))}
          </div>
        </div>
        <Form id="multiStepForm" onSubmit={handleSubmit} encType="multipart/form-data">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.formStep} ${currentStep === index ? styles.active : ""}`}
              id={`step-${index + 1}`}
            >
              {step.content}
            </div>
          ))}
          <div className={`${styles.buttonGroup} inline float-right`}>
            <Button
              className={styles.prevButton}
              onClick={() => updateFormStep(currentStep - 1)}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              className={`${styles.nextButton} mx-2`}
              onClick={() => updateFormStep(currentStep + 1)}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </Button>
            {currentStep === steps.length - 1 && (
              <Button className={styles.nextButton} type="submit">
                Submit
              </Button>
            )}
          </div>
        </Form>
      </div>

      {/* Services Section */}
      <div className={`${styles.title} mt-[77px]`}>What You’ll Get with CarYaati</div>
      <div className={styles.subtitle}>Explore the powerful features of our Rental Management Software.</div>
      <Row>
        {services.map((service, index) => (
          <Col sm={12} md={6} lg={4} key={index}>
            <div className={styles.serviceCard}>
              <span className={`material-icons ${styles.serviceIcon}`}>{service.icon}</span>
              <h3>{service.title}</h3>
              <ul>
                {service.items.map((item, idx) => (
                  <li key={idx} className={styles.serviceItem}>{item}</li>
                ))}
              </ul>
            </div>
          </Col>
        ))}
      </Row>
      {/* Feature Section */}
<div className={`${styles.featureSection} hidden`}>
  <h2>Why Partner with CarYaati?</h2>
  <div className={styles.featureGrid}>
    {[
      {id: 1, src: 'https://www.caryaati.com/assets/become_partner/booking_and_reservation.png', content: 'Booking & Reservation'},
      {id: 2, src: 'https://www.caryaati.com/assets/become_partner/fleet_management_icon.jpg', content: 'Fleet Management'},
      {id: 3, src: 'https://www.caryaati.com/assets/become_partner/accounting_and_finance.jpg', content: 'Accounting and Finance'},
      {id: 4, src: 'https://www.caryaati.com/assets/become_partner/integration.png', content: 'Integration'}
    ].map((item) => (
      <div key={item.id} className={styles.featureItem}>
        <img src={item.src} className={styles.featureImage} />
        <p>{item.content}</p>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default BecomePartnerPage;