import React from "react";
import Image from "next/image";
import { Row, Col, Form, Button } from "react-bootstrap";
import styles from "./Blog.module.css";

const BlogLayout = () => {
  return (
    <div className={styles.blogContainer}>
      <Row className={styles.layout}>
        {/* Left Side: Car Image and Content Below */}
        <Col xs={12} md={8} className={styles.leftSection}>
          <Image
            src="/images/trip.webp"
            alt="Parking Garage"
            width={100}
            height={100}
            className={styles.carImage}
          />
          <div className={styles.blogContent}>
            <h2>Tips to Keep You From Getting Any Parking Tickets Practically</h2>
            <p className={styles.meta}>
              📅 2024-10-30 21:29:43 👤 Admin
            </p>
            <h3>
              Are You Thinking of Visiting Dubai? Tips to Keep You From Getting
              Any Parking Tickets Practically!
            </h3>
            <p>
              Dubai is a tremendous tourist destination, but it has strict
              parking policies. Tourists...
            </p>
            <Button className={styles.readMoreButton}>Get the full story</Button>
          </div>
        </Col>

        {/* Right Side: Search, Categories, and Recent Posts */}
        <Col xs={12} md={4} className={styles.rightSection}>
          {/* Search Bar */}
          <div className={styles.searchBar}>
            <Form.Control
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
              <p>Essential Pickup and Drop off Tips</p>
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
    </div>
  );
};

export default BlogLayout;