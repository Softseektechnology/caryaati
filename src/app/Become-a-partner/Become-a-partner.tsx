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
  });

  const updateFormStep = (step) => {
    setCurrentStep(step);
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
      title: "Company Information",
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
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Enter Website Address"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Total Number of Cars <span className={styles.required}>*</span></Form.Label>
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
          <div className={styles.buttonGroup}>
            <Button onClick={() => updateFormStep(1)} className={styles.nextButton}>
              Next
            </Button>
          </div>
        </>
      ),
    },
    {
      title: "Owner Information",
      content: (
        <>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Owner Name <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="Enter Company Owner Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
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
                <Form.Label>Mobile Number <span className={styles.required}>*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="ownerMobileNumber"
                  value={formData.ownerMobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Mobile Number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <div className={styles.buttonGroup}>
            <Button onClick={() => updateFormStep(0)} className={styles.prevButton}>
              Previous
            </Button>
            <Button onClick={() => updateFormStep(2)} className={styles.nextButton}>
              Next
            </Button>
          </div>
        </>
      ),
    },
    {
      title: "Document Upload",
      content: (
        <>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Emirates ID Number (optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="emiratesIdNumber"
                  value={formData.emiratesIdNumber}
                  onChange={handleInputChange}
                  placeholder="Enter ID Number"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Emirates ID Front Image (optional)</Form.Label>
                <Form.Control
                  type="file"
                  name="emiratesIdFrontImage"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Emirates ID Back Image (optional)</Form.Label>
                <Form.Control
                  type="file"
                  name="emiratesIdBackImage"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Trade License Number (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="tradeLicenseNumber"
                  value={formData.tradeLicenseNumber}
                  onChange={handleInputChange}
                  placeholder="Enter ID Number"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Trade License Image (Optional)</Form.Label>
                <Form.Control
                  type="file"
                  name="tradeLicenseImage"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className={styles.buttonGroup}>
            <Button onClick={() => updateFormStep(1)} className={styles.prevButton}>
              Previous
            </Button>
            <Button type="submit" className={styles.nextButton}>
              Submit
            </Button>
          </div>
        </>
      ),
    },
  ];

  const services = [
    {
      title: "Car Booking Portal",
      image: "/images/car-booking-portal.jpg",
      items: ["Attractive Booking Page", "Show Complete Fleet", "Customer Booking", "Online Payment"],
    },
    {
      title: "Invoice Designer",
      image: "/images/invoice-designer.jpg",
      items: ["Customize Your Invoice", "Innovative Design", "Place Your Logo"],
    },
    {
      title: "Asset Management",
      image: "/images/assets-management.jpg",
      items: ["Manage Your Vehicle", "Finance Module", "Monthly and Yearly Asset Report", "Important Alerts and Reminder", "ROI Reports"],
    },
    {
      title: "Staff Performance",
      image: "/images/staff-performance.jpg",
      items: ["Create Separate User Profile", "Manage Data Base", "Assign Controls", "Monitor Tasks"],
    },
    {
      title: "Unpaid Invoices",
      image: "/images/unpaid-invoices.jpg",
      items: ["Get Accurate Report", "Messages Integration", "Invoice Aging", "Notes and Remarks"],
    },
    {
      title: "Fleet Status",
      image: "/images/fleet-status.jpg",
      items: ["Single Screen Operation", "Vehicle Status Reports", "Smart Searching", "Smart Contract Creation"],
    },
    {
      title: "Fines and Salik Integration",
      image: "/images/fines-salik-integration.jpg",
      items: ["Salik Report", "Fines Report", "Smart Invoicing", "Real Time Updates"],
    },
    {
      title: "Booking Verification",
      image: "/images/booking-verification.jpg",
      items: ["Check Documents", "Important Validations", "Save Time Easy Working", "Manage Reservations"],
    },
    {
      title: "Bookings and Reservations",
      image: "/images/booking-reservation.jpg",
      items: ["Track Online Booking", "Convert Reservations to Bookings", "Useful Booking Reports"],
    },
    {
      title: "Excel Import and Export",
      image: "/images/excel-import.jpg",
      items: ["Import Your Fleet Data", "Export Report to PDF and Excel", "One Click Report Download Option"],
    },
    {
      title: "Payments Gateway",
      image: "/images/payment-gateways.jpg",
      items: ["Easy Online Ordering", "Secure Gateways", "Record Your Transactions"],
    },
    {
      title: "Smart Printing",
      image: "/images/smart-printing.jpg",
      items: ["Reports Are Ready to Print", "Print or Email Invoices", "Stored Documents Printing"],
    },
    {
      title: "Reports & Analytics",
      image: "/images/reports-analytics.jpg",
      items: ["Financial Reports", "Fleet Utilization Report", "Managerial Report", "Overdue Payment Report"],
    },
    {
      title: "Easy Configuration",
      image: "/images/easy-configuration.jpg",
      items: ["System Configuration", "Fuel Settings", "Accounts Settings", "Maintenance Protocols"],
    },
    {
      title: "Customer Portal",
      image: "/images/customer-portal.jpg",
      items: ["Booking Information", "Rental History", "Salik and Fines Reports", "Profile Settings", "Promotions and Referral"],
    },
  ];

  return (
    <div className={styles.container}>
      {/* Car Rental Software Section */}
      <div className={styles.title}>Car Rental Software for Fast-Growing Companies</div>
      <div className={styles.subtitle}>
        CarYaati is the easiest way to encourage your customers, work more productively, and grow faster.
      </div>
      <div className={styles.steps}>
        <Row>
          <Col sm={6} md={4}>
            <div className={styles.step}>
              <Image
                src="/images/register_online.png"
                alt="Register Online"
                width={50}
                height={50}
              />
              <h3>Register Online</h3>
              <p>Easy and FREE registrations. CarYaati Representative will contact you for further assistance.</p>
            </div>
          </Col>
          <Col sm={6} md={4}>
            <div className={styles.step}>
              <Image
                src="/images/import_vehicle_caryaati.png"
                alt="Import Your Vehicles"
                width={50}
                height={50}
              />
              <h3>Import Your Vehicles</h3>
              <p>Easy Company Setup, just import your important/required data, and connect with innovative solutions.</p>
            </div>
          </Col>
          <Col sm={6} md={4}>
            <div className={styles.step}>
              <Image
                src="/images/integration_caryaati.png"
                alt="Integrate Tolls and Fines"
                width={50}
                height={50}
              />
              <h3>Integrate Tolls and Fines</h3>
              <p>Simple, Smart Easy configurations to streamline your operations and integrate calculations.</p>
            </div>
          </Col>
        </Row>
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* Form Section */}
    
      <div className={styles.formContainer}>
      <div className={styles.title}>Become A Partner</div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${styles.progressStep} ${currentStep >= index ? styles.completed : ""}`}
              >
                <span className={styles.stepNumber}>{index + 1}</span>
                <span className={styles.stepLabel}>{step.title}</span>
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
              <h4>{step.title}</h4>
              {step.content}
            </div>
          ))}
        </Form>
      </div>

      {/* What You Will Get Section */}
      <div className={styles.title} style={{marginTop:"50px"}}>What You Will Get? Rental Management Software</div>
      <Row>
        {services.map((service, index) => (
          <Col md={4} key={index}>
            <div className={styles.serviceCard}>
              <Image
                src={service.image}
                alt={`${service.title} Icon`}
                width={100}
                height={100}
              />
              <h3 style={{ color: "#000" }}>{service.title}</h3>
              <ul>
                {service.items.map((item, idx) => (
                  <li key={idx} style={{ fontSize: "14px" }}>{item}</li>
                ))}
              </ul>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BecomePartnerPage;