'use client';

import React, { useState } from "react";
import Image from "next/image";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./Blog.module.css";
import Link from "next/link";

// Simulated blog data (In production, fetch from API/CMS like WordPress/Strapi)
const blogPosts = [
  {
    id: 1,
    title: "Tips to Keep You From Getting Any Parking Tickets Practically",
    date: "2024-10-30 21:29:43",
    author: "Admin",
    excerpt: "Dubai is a tremendous tourist destination, but it has strict parking policies. Tourists...",
    image: "/images/trip.webp",
  },
  {
    id: 2,
    title: "Mastering Car Rental Caryyati",
    date: "2024-09-07 16:37:04",
    author: "Admin",
    excerpt: "Essential Pickup and Drop off Tips for a smooth experience in Dubai.",
    image: "/images/trip.webp",
  },
  {
    id: 3,
    title: "Ultimate Guide to SUV Car for Rent in Dubai",
    date: "2024-08-26 16:03:11",
    author: "Admin",
    excerpt: "Explore the best SUVs available for rent and why they're perfect for Dubai's roads.",
    image: "/images/trip.webp",
  },
  {
    id: 4,
    title: "Discover the Best Dubai Marina Restaurants",
    date: "2024-07-05 14:49:26",
    author: "Admin",
    excerpt: "Top dining spots in Dubai Marina to visit with your rental car.",
    image: "/images/trip.webp",
  },
  // Add more posts as needed
];

const categoriesData = [
  { name: "Rent a Car", count: 127, link: "#" },
  { name: "Car Rental", count: 4, link: "#" },
  { name: "Bus Rental", count: 1, link: "#" },
  { name: "Travel Tips", count: 0, link: "#" },
];

const recentPostsData = blogPosts.slice(0, 4); // Reuse posts for recent

const BlogSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Adjustable
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const paginatedPosts = blogPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container className={`${styles.blogContainer} bg-white rounded-lg shadow-md p-4`}>
      <Row className={styles.layout}>
        {/* Left: Blog Posts Grid */}
        <Col xs={12} md={8} className={styles.leftSection}>
          <div className={styles.blogPosts}>
            {paginatedPosts.map((post) => (
              <div key={post.id} className={styles.blogCard}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={200}
                  className={styles.carImage}
                />
                <div className={styles.blogContent}>
                  <h2>{post.title}</h2>
                  <p className={styles.meta}>
                    📅 {post.date} 👤 {post.author}
                  </p>
                  <p>{post.excerpt}</p>
                  <Link href={`/Blog/${post.id}`} className={`${styles.readMoreButton} no-underline`}>Read More</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === i + 1 ? styles.active : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </Col>

        {/* Right: Sidebar */}
        <Col xs={12} md={4} className={styles.rightSection}>
          {/* Search Bar */}
          <div className={styles.searchBar}>
            <Form.Control
              type="text"
              placeholder="Search blog..."
              className={styles.searchInput}
            />
            <Button className={styles.searchButton}>🔍</Button>
          </div>

          {/* Categories */}
          <div className={styles.categories}>
            <h3>Categories</h3>
            <ul className={styles.categoryList}>
              {categoriesData.map((cat) => (
                <li key={cat.name}>
                  <a href={cat.link}>{cat.name} <span>({cat.count})</span></a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className={styles.recentPosts}>
            <h3>Recent Posts</h3>
            {recentPostsData.map((post) => (
              <div key={post.id} className={styles.post}>
                <a href="#">{post.title}</a>
                <p>{post.date}</p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogSection;