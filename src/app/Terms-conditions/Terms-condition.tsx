'use client';

import React, { useState } from 'react';
import styles from './Terms-condition.module.css';
import Footer from '../../components/foorter/Footer';

const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'personal-information', title: 'What is Personal Information?' },
    { id: 'collection-use', title: 'Why We Collect and Use Personal Information' },
    { id: 'how-we-collect', title: 'How We Collect Information' },
    { id: 'refund', title: 'Refund Policy' },
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Caryaati Terms and Conditions</div>
      <div className={styles.subtitle}>
        Understand the general policies and terms for using our car rental services and platforms to ensure a smooth and compliant experience.
      </div>

      <div className={styles.contentWrapper}>
        {/* Sidebar Navigation */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarTitle}>Table of Contents</div>
          {sections.map((section) => (
            <div
              key={section.id}
              className={`${styles.sidebarItem} ${activeSection === section.id ? styles.active : ''}`}
              onClick={() => handleSectionClick(section.id)}
            >
              {section.title}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <section id="introduction" className={styles.section}>
            <h2>Introduction</h2>
            <p>Last updated: September 05, 2025</p>
            <p>
              Caryaati.com is a product of Softseek Technologies. Softseek Technologies FZE (UAE) and Softseek Technologies Inc. (Canada) ("us", "our", and "we") are committed to protecting the privacy and security of your Personal Information throughout your relationship with us.
            </p>
            <p>
              We value your privacy and treat your information with the utmost care, just as we would our own. This Terms and Conditions document, which incorporates elements of our privacy practices, explains:
            </p>
            <ul className={styles.useList}>
              <li>The types of Personal Information we collect through our platforms (collectively, "Platform").</li>
              <li>How Personal Information is used and disclosed.</li>
              <li>The measures we take to handle your Personal Information appropriately.</li>
            </ul>
            <p>
              Unless permitted by law, we do not collect, use, or disclose Personal Information without your consent. By providing Personal Information to us or opening an online account to use our cloud services, you agree to the terms outlined here.
            </p>
            <p>
              Note: The use of this site constitutes your acceptance of these terms. If you do not agree, please discontinue use immediately. We reserve the right to update these terms at any time, with notice provided via the last updated date. We recommend reviewing this document each time you visit our website.
            </p>
            <p>
              Softseek Technologies Inc. operates from Brampton, ON, Canada, in accordance with Canadian law, and complies with applicable privacy laws in different jurisdictions.
            </p>
          </section>

          <hr className={styles.divider} />

          <section id="personal-information" className={styles.section}>
            <h2>What is Personal Information?</h2>
            <p>
              "Personal Information" refers to any information, recorded in any form, about an identifiable individual, excluding business contact information (e.g., name, title, business address). This policy does not cover business contact information or aggregated data from which an individual's identity cannot be determined. We retain the right to use such data as we deem appropriate.
            </p>
          </section>

          <hr className={styles.divider} />

          <section id="collection-use" className={styles.section}>
            <h2>Why We Collect and Use Personal Information</h2>
            <p>
              We collect and use Personal Information to assess your application for cloud services subscription, deliver our online software as a service, perform research and analysis on your usage or interest in Caryaati ERP Cloud Services, communicate with you via email, postal mail, telephone, mobile devices, or other platforms, enforce applicable terms and conditions, manage our business, and perform other functions as described at the time of collection.
            </p>
            <p>
              This information helps us personalize and improve our systems. We may also collect data you submit through our social media sites, including Facebook, Twitter, and Instagram.
            </p>
            <p>
              The Personal Information collected includes, but is not limited to, details from your cloud services subscription application. For participants in our programs, information is collected directly from the user where possible. Unless permitted by law, we obtain consent for the collection, use, and disclosure of Personal Information. You can modify your consent preferences with reasonable advance notice by contacting us.
            </p>
            <p>
              Caryaati Cloud Services aims to provide cloud-based solutions to help car rental companies enhance profitability, strengthen relationships with subscribers and vendors, accelerate business operations, and support growth.
            </p>
          </section>

          <hr className={styles.divider} />

          <section id="how-we-collect" className={styles.section}>
            <h2>How We Collect Information</h2>
            <p>
              Information about caryaati.com is collected in two ways:
            </p>
            <ol className={styles.useList}>
              <li>
                <strong>Passively</strong>: Through our site's technology, such as your unique Internet address, Internet service provider, browser type and version, and operating system.
              </li>
              <li>
                <strong>Actively</strong>: When you voluntarily provide it, e.g., requesting information about services, sending technical questions, or applying for employment opportunities.
              </li>
            </ol>
            <p>
              For example, if you request service information, we may store and use it for marketing. Technical questions may be recorded and potentially published (without personal identifiers). For employment inquiries, we collect details like name, contact information, and experience. Before submitting a resume/CV, you must consent to its storage, access, and use across jurisdictions, which may have varying privacy protections.
            </p>
          </section>

          <hr className={styles.divider} />

          <section id="refund" className={styles.section}>
            <h2>Refund Policy</h2>
            <p>
              Once the dashboard is created, no refunds will be issued.
            </p>
          </section>
        </div>
      </div>

    </div>
  );
};

export default TermsConditions;