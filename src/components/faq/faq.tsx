'use client';

import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styles from './FAQ.module.css';

interface FAQSectionProps {
  title: string;
  questions: { question: string; answer?: string }[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, questions }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-4">
      <h2 className="h5 fw-bold mb-3">{title}</h2>
      {questions.map((q, index) => (
        <div key={index} className="border-bottom">
          <button
            onClick={() => toggleQuestion(index)}
            className="w-100 text-start py-3 bg-transparent border-0 d-flex justify-content-between align-items-center"
            aria-expanded={openIndex === index}
            aria-controls={`collapse-${index}`}
          >
            <span className={styles.questionText}>{q.question}</span>
            <span className={styles.toggleIcon}>
              {openIndex === index ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </button>
          <Collapse in={openIndex === index}>
            <div id={`collapse-${index}`} className="pb-3 text-muted">
              {q.answer || 'This is a placeholder answer. Please provide the detailed answer here.'}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

const FAQ = () => {
  const faqData: Record<string, { question: string; answer?: string }[]> = {
    'Top Questions': [
      { question: 'What are the driving license requirements?' },
      { question: 'What is an insurance excess?' },
      { question: 'What are the age requirements for hiring a car?' },
      { question: "What you'll need to bring to collect the car?" },
      { question: 'What payment methods are accepted on CarYaati.com?' },
    ],
    'Booking Related Q/A': [
      { question: "What if I haven't received any confirmation of my booking?" },
      { question: 'What if my reservation is on request?' },
      { question: 'Can I make an instantly confirmed reservation?' },
      { question: "Where can I find my car's terms and conditions?" },
      { question: 'How to use CarYaati.com to check rates?' },
    ],
    'Driving License': [
      { question: 'What are the age requirements for hiring a car?' },
      { question: 'How long do I need to have held a license for?' },
      { question: 'Do I need an International Driving Permit (IDP) to rent a car?' },
    ],
    Insurance: [
      { question: 'What is an insurance excess?' },
      { question: "Where can I find out about my rental car's insurance?" },
      { question: 'What is Collision Damage Waiver or CDW?' },
      { question: 'What is Theft Protection or Theft Waiver?' },
      { question: 'What is Personal Accident Insurance or PAI?' },
      { question: 'What is Personal Effects Coverage (PEC) or PEP?' },
    ],
    'After rental': [
      { question: 'Why have I been charged by the car hire company?' },
      { question: 'How do I get a proof of payment?' },
      { question: 'What if I have queries after my rental is finished?' },
    ],
    'Payment and Fee': [
      { question: 'What payment methods are accepted on CarYaati.com?' },
      { question: 'Are there extra charges for late pick-up or drop-off?' },
      { question: 'Do I need to use the same card to book and pay the deposit?' },
      { question: 'Why was my payment declined?' },
      { question: 'What additional charges may I apply?' },
    ],
    'Amendment & Cancellation': [
      { question: 'What is the cancellation policy?' },
      { question: 'What is the no-show policy?' },
      { question: 'Can I amend my booking?' },
      { question: 'How do I cancel my booking?' },
    ],
    'Pick up & Drop Off': [
      { question: "What you'll need to bring to collect the car?" },
      { question: 'Will I have to leave a deposit when I pick my car up?' },
      { question: 'Can I drop the car off later the drop-off time?' },
      { question: 'My rental car was in a bad condition at pick-up, what should I do?' },
    ],
    'Fuel, Mileage & Travel Plans': [
      { question: 'Can I pick up my car at one location and return it at a different location?' },
      { question: 'What if I want to pick up or drop off my rental car outside office hours?' },
      { question: 'What fuel does my car take?' },
      { question: 'What is the fuel/refuel policy that my car have?' },
      { question: 'What mileage conditions does my car have?' },
    ],
  };

  const leftSections = Object.entries(faqData).slice(0, Math.ceil(Object.entries(faqData).length / 2));
  const rightSections = Object.entries(faqData).slice(Math.ceil(Object.entries(faqData).length / 2));

  return (
    <div className="container py-5">
      <h1 className="h2 fw-bold mb-4">Frequently asked questions</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          {leftSections.map(([sectionTitle, questions], index) => (
            <FAQSection key={index} title={sectionTitle} questions={questions} />
          ))}
        </div>
        <div className="col-12 col-md-6">
          {rightSections.map(([sectionTitle, questions], index) => (
            <FAQSection key={index} title={sectionTitle} questions={questions} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;