'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import styles from './Blog.module.css';

interface BlogPost {
  title: string;
  date: string;
  author: string;
  image: string;
  content: string;
  categories: string[];
}

const BlogLayout = () => {
  // Sample blog post data (replace with dynamic data from API or props in a real app)
  const blogPost: BlogPost = {
    title: 'Tips to Keep You From Getting Any Parking Tickets Practically',
    date: '2024-10-30 21:29:43',
    author: 'Admin',
    image: '/images/trip.webp',
    content: `
      Dubai is a tremendous tourist destination, but it has strict parking policies. Tourists often find themselves confused by the myriad of rules and signage, which can lead to unexpected fines. In this article, we’ll share practical tips to help you navigate Dubai’s parking system like a pro, ensuring a hassle-free experience during your visit.

      ### Understand Dubai’s Parking Zones
      Dubai’s parking zones are color-coded, each with specific rules and time restrictions. Familiarize yourself with these zones to avoid penalties:
      - **Blue Zones**: Paid parking, usually for short-term use.
      - **Red Zones**: Paid parking with longer durations.
      - **Green Zones**: Free for residents but may have restrictions for non-residents.
      
      Always check the signage for parking hours and payment requirements. Most zones require payment via SMS, mobile apps, or parking meters.

      ### Use Technology to Your Advantage
      Apps like RTA Dubai and ParkKey can help you locate parking spots, check zone details, and pay for parking seamlessly. These tools are invaluable for tourists unfamiliar with local regulations.

      ### Park During Off-Peak Hours
      Many parking zones are free during certain hours (e.g., 10 PM to 7 AM). Plan your parking around these times to save money and avoid fines.

      ### Avoid Common Mistakes
      - Don’t park in reserved or handicapped spaces without authorization.
      - Ensure your vehicle is within the designated lines to avoid penalties.
      - Double-check signage for any special restrictions, such as loading/unloading zones.

      By following these tips and staying vigilant, you can enjoy your time in Dubai without the stress of parking tickets!
    `,
    categories: ['Travel Tips', 'Rent a Car'],
  };

  return (
    <Container className={`${styles.blogContainer} bg-white rounded-lg shadow-md p-4`}>
      <Row className={styles.layout}>
        {/* Left: Blog Content */}
        <Col xs={12} md={8} className={styles.leftSection}>
          <h1 className={styles.blogTitle}>{blogPost.title}</h1>
          <p className={styles.meta}>
            📅 {blogPost.date} 👤 {blogPost.author}
          </p>
          <Image
            src={blogPost.image}
            alt={blogPost.title}
            width={800}
            height={400}
            className={styles.carImage}
            style={{ borderRadius: '12px', marginBottom: '20px' }}
          />
          <div className={styles.blogContent}>
            <div
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
              className={styles.blogText}
            />
            <Button className={styles.shareButton}>Share this Post</Button>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}><FaFacebookF /></a>
              <a href="#" className={styles.socialIcon}><FaTwitter /></a>
              <a href="#" className={styles.socialIcon}><FaLinkedinIn /></a>
              <a href="#" className={styles.socialIcon}><FaWhatsapp /></a>
            </div>
          </div>
        </Col>

        {/* Sidebar */}
        <Col xs={12} md={4} className={styles.rightSection}>
          {/* Search Bar */}
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
            />
            <Button className={styles.searchButton}>🔍</Button>
          </div>

          {/* Categories */}
          <div className={styles.categories}>
            <h3>Categories</h3>
            <ul className={styles.categoryList}>
              <li>
                <a href="#">Rent a Car <span>(127)</span></a>
              </li>
              <li>
                <a href="#">Car Rental <span>(4)</span></a>
              </li>
              <li>
                <a href="#">Bus Rental <span>(1)</span></a>
              </li>
              <li>
                <a href="#">Travel Tips <span>(0)</span></a>
              </li>
            </ul>
          </div>

          {/* Recent Posts */}
          <div className={styles.recentPosts}>
            <h3>Recent Posts</h3>
            <div className={styles.post}>
              <a href="#">Tips to Keep You From Getting Any Parking Tickets Practically</a>
              <p>2024-10-30 21:29:43</p>
            </div>
            <div className={styles.post}>
              <a href="#">Mastering Car Rental Caryyati</a>
              <p>2024-09-07 16:37:04</p>
            </div>
            <div className={styles.post}>
              <a href="#">Ultimate Guide to SUV Car for Rent in Dubai</a>
              <p>2024-08-26 16:03:11</p>
            </div>
            <div className={styles.post}>
              <a href="#">Discover the Best Dubai Marina Restaurants</a>
              <p>2024-07-05 14:49:26</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogLayout;