"use client";

import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { format, parse } from "date-fns";
import styles from "./search-console.module.css";
import CustomDateRangePicker from "./CustomDateRangePicker";
import './CustomDateRangePicker.css';

interface SearchOption {
  slug: string;
  title: string;
  value: string;
  label: string;
}

export default function SearchForm() {
  const router = useRouter();
  const params = useParams();
  const slugFromUrl = Array.isArray(params?.slug)
    ? params?.slug[params?.slug.length - 1]
    : params?.slug || "";

  const [formData, setFormData] = useState({
    location: "",
    dateRange: [null, null] as [Date | null, Date | null],
    city: "",
    carType: "",
    priceMin: "",
    priceMax: "",
    year: "",
    passengers: "",
    searchInput: "",
    selectedOption: null as SearchOption | null,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");
  const [showPriceInputs, setShowPriceInputs] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const priceRangeRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchOptions: SearchOption[] = [
    { slug: "airport-car-rentals", title: "Airport car rentals", value: "dxb-airport-t1", label: "DXB airport T1" },
    { slug: "airport-car-rentals", title: "Airport car rentals", value: "dxb-airport-t2", label: "DXB airport T2" },
    { slug: "airport-car-rentals", title: "Airport car rentals", value: "dxb-airport-t3", label: "DXB airport T3" },
    { slug: "airport-car-rentals", title: "Airport car rentals", value: "sharjah-international-airport", label: "Sharjah Intl. Airport" },
    { slug: "car-rentals", title: "Cars on Rent", value: "dubai", label: "Dubai" },
    { slug: "car-rentals", title: "Cars on Rent", value: "sharjah", label: "Sharjah" },
    { slug: "car-rentals", title: "Cars on Rent", value: "ajman", label: "Ajman" },
    { slug: "car-rentals", title: "Cars on Rent", value: "abu-dhabi", label: "Abu Dhabi" },
    { slug: "rent-a-car", title: "Rent a Car", value: "nissan", label: "Nissan" },
    { slug: "rent-a-car", title: "Rent a Car", value: "toyota", label: "Toyota" },
    { slug: "rent-a-car", title: "Rent a Car", value: "nissan-sunny", label: "Nissan Sunny" },
    { slug: "rent-a-car", title: "Rent a Car", value: "toyota-corolla", label: "Toyota Corolla" },
    { slug: "rent-a-car", title: "Rent a Car", value: "nissan-sunny-2025", label: "Nissan Sunny 2025" },
    { slug: "rent-a-car", title: "Rent a Car", value: "toyota-corolla-2025", label: "Toyota Corolla 2025" },
    { slug: "rent-a-car", title: "Rent a Car", value: "sedan", label: "Sedan" },
    { slug: "rent-a-car", title: "Rent a Car", value: "hatchback", label: "Hatchback" },
    { slug: "rent-a-car", title: "Rent a Car", value: "offroad", label: "Offroad" },
    { slug: "rent-a-car", title: "Rent a Car", value: "suv", label: "SUV" },
    { slug: "rent-a-car", title: "Rent a Car", value: "sports", label: "Sports" },
    { slug: "rent-a-car", title: "Rent a Car", value: "luxury", label: "Luxury" },
  ];

  useEffect(() => {
    setIsMounted(true);

    const storedStart = localStorage.getItem("startDate");
    const storedEnd = localStorage.getItem("endDate");
    if (storedStart && storedEnd) {
      const startDate = new Date(storedStart);
      const endDate = new Date(storedEnd);
      if (startDate && endDate) {
        setFormData((prev) => ({
          ...prev,
          dateRange: [startDate, endDate],
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        dateRange: [new Date("2025-03-17T12:00:00Z"), new Date("2025-03-18T12:00:00Z")],
      }));
    }

    if (slugFromUrl && !formData.location) {
      const formattedLocation = slugFromUrl.replace(/-/g, " ").toUpperCase();
      setFormData((prev) => ({
        ...prev,
        location: formattedLocation,
        searchInput: formattedLocation,
      }));
    }
  }, [slugFromUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "searchInput") {
      setShowDropdown(true);
    }

    if (name === "passengers") {
      const num = parseInt(value);
      const mappedValue = num <= 2 ? "1to2" : num <= 5 ? "3to5" : "6";
      localStorage.setItem("passengers", mappedValue);
    }
  };

  const handleOptionSelect = (option: SearchOption) => {
    setFormData({
      ...formData,
      selectedOption: option,
      searchInput: option.label,
      location: option.label,
    });
    setShowDropdown(false);
  };

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setFormData({
      ...formData,
      dateRange: [startDate, endDate],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.dateRange[0] && formData.dateRange[1]) {
      localStorage.setItem("startDate", formData.dateRange[0].toISOString());
      localStorage.setItem("endDate", formData.dateRange[1].toISOString());
    }
    localStorage.setItem("carType", formData.carType);
    localStorage.setItem("priceMin", formData.priceMin);
    localStorage.setItem("priceMax", formData.priceMax);
    localStorage.setItem("year", formData.year);

    const selectedSlug = formData.selectedOption?.slug || "cars-for-rent";
    const locationSlug = formData.selectedOption?.value || formData.searchInput.toLowerCase().trim().replace(/\s+/g, "-");

    let route = `/cars-for-rent/${locationSlug}`;
    if (selectedSlug === "airport-car-rentals") {
      route = `/car-rental-airport/${locationSlug}`;
    } else if (selectedSlug === "car-rentals") {
      route = `/rent-a-car/${locationSlug}`;
    } else if (selectedSlug === "rent-a-car") {
      route = `/cars-for-rent/${locationSlug}`;
    }

    router.push(route);
  };

  const handlePriceClick = () => {
    setShowPriceInputs(!showPriceInputs);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const filteredOptions = searchOptions.filter((option) =>
    option.label.toLowerCase().includes(formData.searchInput.toLowerCase())
  );

  const groupedOptions = filteredOptions.reduce((acc, option) => {
    acc[option.title] = acc[option.title] || [];
    acc[option.title].push(option);
    return acc;
  }, {} as Record<string, SearchOption[]>);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (priceRangeRef.current && !priceRangeRef.current.contains(event.target as Node)) {
        setShowPriceInputs(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPriceRangeText = () => {
    if (!formData.priceMin && !formData.priceMax) return "Any";
    if (formData.priceMin && formData.priceMax) return `${formData.priceMin} - ${formData.priceMax}`;
    if (formData.priceMin) return `${formData.priceMin} - Any`;
    return `Any - ${formData.priceMax}`;
  };

  if (!isMounted) return null;

  return (
    <div className={styles.searchSection}>
      <div className={styles.tabs}>
        <ul className={styles.tabList}>
          <li
            className={`${styles.tabItem} ${activeTab === "basic" ? styles.active : ""}`}
            onClick={() => setActiveTab("basic")}
            role="tab"
            aria-selected={activeTab === "basic"}
            aria-label="Basic Search Tab"
          >
            Basic Search
          </li>
          <li
            className={`${styles.tabItem} ${activeTab === "advanced" ? styles.active : ""}`}
            onClick={() => setActiveTab("advanced")}
            role="tab"
            aria-selected={activeTab === "advanced"}
            aria-label="Advanced Search Tab"
          >
            Advanced Search
          </li>
        </ul>
      </div>
      <div className={styles.searchBarContainer}>
        <Form onSubmit={handleSubmit} className={styles.searchForm}>
          {activeTab === "basic" ? (
            <div className={styles.searchFormInner}>
              <div className={styles.formGroup} ref={dropdownRef}>
                <Form.Control
                  type="text"
                  placeholder="Search by Airport, City, or Car (e.g., DXB, Dubai, Nissan)"
                  name="searchInput"
                  value={formData.searchInput}
                  onChange={handleInputChange}
                  className={styles.searchInput}
                  aria-label="Search by airport, city, or car"
                />
                {showDropdown && (
                  <div
                    className={styles.dropdown}
                  >
                    {Object.entries(groupedOptions).map(([title, options]) => (
                      <div key={title} className={styles.dropdownGroup}>
                        <h6 className={styles.dropdownTitle}>{title}</h6>
                        {options.map((option) => (
                          <div
                            key={option.value}
                            onClick={() => handleOptionSelect(option)}
                            className={styles.dropdownItem}
                            role="option"
                            aria-label={`Select ${option.label}`}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <CustomDateRangePicker
                value={formData.dateRange}
                onChange={handleDateRangeChange}
                placeholder="Select date and time range"
              />
              <Button type="submit" className={styles.searchButton}>
                <FaSearch />
              </Button>
            </div>
          ) : (
            <>
              <div className={styles.advancedSearchContainer}>
                <div className={styles.advancedFirstRow}>
                  <div className={styles.advancedColumn}>
                    <Form.Control
                      type="text"
                      placeholder="Enter location (e.g., Dubai, UAE)"
                      name="searchInput"
                      value={formData.searchInput}
                      onChange={handleInputChange}
                      className={`${styles.searchInput} w-full`}
                      aria-label="Search location"
                    />
                  </div>
                  <div className={` ${styles.advancedDate} w-[50%]`}>
                  <CustomDateRangePicker
                    value={formData.dateRange}
                    onChange={handleDateRangeChange}
                    placeholder="Select date and time range"
                    />
                    </div>
                </div>
                <div className={styles.advancedSearchRow}>
                  <div className={styles.advancedField}>
                    <label className={styles.advancedLabel}>Car Type</label>
                    <Form.Select
                      name="carType"
                      value={formData.carType}
                      onChange={handleInputChange}
                      className={styles.advancedInput}
                      aria-label="Car type"
                    >
                      <option value="">Select Car Type</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="suv">SUV</option>
                    </Form.Select>
                  </div>
                  <div className={`${styles.priceRangeContainer} ${showPriceInputs ? styles.active : ""}`} ref={priceRangeRef}>
  <label className={styles.advancedLabel}>Price Range</label>
  <div
    className={`${styles.priceRangeTrigger} ${formData.priceMin || formData.priceMax ? styles.hasValues : ""}`}
    onClick={(e) => {
      e.stopPropagation(); // Prevent click from triggering click-outside handler
      console.log("Price range clicked, showPriceInputs:", !showPriceInputs); // Debugging
      setShowPriceInputs(!showPriceInputs);
    }}
  >
    {getPriceRangeText()}
  </div>
  {showPriceInputs && (
    <div
      className={`${styles.priceRangeInputs} ${showPriceInputs ? styles.active : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.priceInputWrapper}>
        <Form.Control
          type="number"
          placeholder="Min"
          name="priceMin"
          value={formData.priceMin}
          onChange={handleInputChange}
          className={styles.priceInput}
          aria-label="Minimum Price"
        />
      </div>
      <span className={styles.priceDash}>-</span>
      <div className={styles.priceInputWrapper}>
        <Form.Control
          type="number"
          placeholder="Max"
          name="priceMax"
          value={formData.priceMax}
          onChange={handleInputChange}
          className={styles.priceInput}
          aria-label="Maximum Price"
        />
      </div>
    </div>
  )}
  <div className={styles.priceUnderline}></div>
</div>
                  <div className={styles.advancedField}>
                    <label className={styles.advancedLabel}>Year</label>
                    <Form.Select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className={styles.advancedInput}
                      aria-label="Year"
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 6 }, (_, i) => 2020 + i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className={styles.advancedField}>
                    <label className={styles.advancedLabel}>Passengers</label>
                    <Form.Select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleInputChange}
                      className={styles.advancedInput}
                      aria-label="Number of passengers"
                    >
                      <option value="">Select Passengers</option>
                      {[2, 4, 5, 7, 11, 13, 16, 22].map((num) => (
                        <option key={num} value={num}>
                          {num} pax
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </div>
              <div className={styles.buttonRow}>
                <Button type="submit" className={styles.searchButton}>
                  <FaSearch /> Search
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}