'use client';

import React, { useState } from "react";
import { Container, Row, Col, Accordion, Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./Faq.module.css";

// Sample FAQ data structured by categories (fetch from API in production)
const faqData = [
  {
    category: "Top Questions",
    tag:'top-questions',
    questions: [
      {
        id: "0",
        question: "What are the driving license requirements?",
        answer: "You will need to bring your driving license with you to pick up your hire car. Car hire companies expect drivers to have held their full license for at least two years. Provisional licenses and Copy version aren't accepted. When you hire a car abroad in some countries you will need an International Driving Permit (IDP), as well as your own driving license. If you have a UK driving license, you may be asked for a code at the car hire counter. Please visit the DVLA* website (https://www.gov.uk/view-driving-licence) before your trip. <strong>IMPORTANT NOTE:</strong> You will find more specific driving license requirements in Terms and Conditions of each car during the booking process. If you still have any questions, please feel free to contact us."
      },
      {
        id: "1",
        question: "What is an insurance excess?",
        answer: "Insurance excess is the amount you pay towards a claim before the insurance covers the rest. Contact us for more details."
      },
      {
        id: "2",
        question: "What are the age requirements for hiring a car?",
        answer: "The minimum age is typically 21, with some companies requiring drivers to be 25. Check with the provider."
      },
      {
        id: "3",
        question: "What you'll need to bring to collect the car?",
        answer: "Bring your driving license, passport, and booking confirmation."
      },
      {
        id: "4",
        question: "What payment methods are accepted on Caryyati.com?",
        answer: "We accept credit/debit cards and certain digital wallets. Check at checkout."
      },
      {
        id: "5",
        question: "Will I have to leave a deposit when I pick my car up?",
        answer: "Yes, a refundable deposit may be required. Details vary by provider."
      },
      {
        id: "6",
        question: "Can I pick up my car at one location and return it at a different location?",
        answer: "Yes, some providers offer one-way rentals. Additional fees may apply."
      },
      {
        id: "7",
        question: "Can I reserve a specific make, model, or color of the car?",
        answer: "Specific requests are subject to availability. Contact the provider."
      },
      {
        id: "8",
        question: "Will I have to pay for anything when I collect my car?",
        answer: "Additional fees may apply (e.g., deposit, insurance). Check terms."
      }
    ]
  },
  {
    category: "Booking Related Q/A",
    tag: 'booking-related-q/a',
    questions: [
      {
        id: "0",
        question: "What if I haven't received any confirmation of my booking?",
        answer: "Check your email (including spam). Contact us if not received."
      }
    ]
  }
];
const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaq, setFilteredFaq] = useState(faqData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = faqData.map(category => ({
      ...category,
      questions: category.questions.filter(q => 
        q.question.toLowerCase().includes(term) || q.answer.toLowerCase().includes(term)
      )
    })).filter(category => category.questions.length > 0);

    setFilteredFaq(filtered);
  };

  return (
    <Container className={`${styles.faqContainer} bg-white rounded-lg shadow-md p-4`}>
      <h1 className={styles.header}>Get answers to your queries</h1>

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <Button variant="outline-secondary" className={styles.searchButton}>
          <FaSearch />
        </Button>
      </InputGroup>

      <Row>
        {/* Main FAQ Content */}
        <Col md={8}>
          {filteredFaq.map((section, sectionIndex) => (
            <section key={sectionIndex} className={styles.section}>
              <h2 className={styles.sectionTitle} id={`${section.tag}`}>{section.category}</h2>
              <Accordion>
                {section.questions.map((faq) => (
                  <Accordion.Item eventKey={faq.id} key={faq.id} className={styles.faqItem}>
                    <Accordion.Header className={styles.faqHeader}>{faq.question}</Accordion.Header>
                    <Accordion.Body className={styles.faqBody}>
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      <div className={styles.helpfulSection}>
                        <span>Was this helpful?</span>
                        <Button variant="link" className={styles.thumbsUp}>👍 Yes</Button>
                        <Button variant="link" className={styles.thumbsDown}>👎 No</Button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </section>
          ))}
          {filteredFaq.length === 0 && (
            <p className={styles.noResults}>No results found. Try a different search term or contact support.</p>
          )}
        </Col>

        {/* Sidebar for Quick Links/Categories */}
        <Col md={4} className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>FAQ Categories</h3>
          <ul className={styles.categoryList}>
            {faqData.map((section, index) => (
              <li key={index}>
                <a href={`#${section.category.replace(/\s+/g, '-').toLowerCase()}`} className={styles.categoryLink}>
                  {section.category}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.contactSupport}>
            <h4>Still need help?</h4>
            <Button variant="primary" className={styles.supportButton}>Contact Support</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQPage;