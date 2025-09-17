"use client";

import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./list_filter.module.css";
import { ChevronDown, Star } from "react-bootstrap-icons";
import { SlidersHorizontal } from "lucide-react";
import ResultsSortBar from "../ResultsSortBar/ResultsSortBar";
import PriceAnalysisNotification from "../PriceAnalysisNotification/Price";
import Trackprice from "../PriceAnalysisNotification/Trackprices";
import { CaryaatiContext } from "@/app/ContextApi/CaryaatiStore";

const CustomCheckboxDropdown = ({
  options,
  selectedValues,
  onChange,
  leftIcon,
  dropdownLabel,
  dropdownLabel1,
  isTextInputMode = false,
  onTextSubmit,
  showLabelInTrigger = false,
  showFooter = false,
  onReset,
  resultCount = 0,
  showHeaderInsideDropdown = false,
  showSelectClearButtons = false,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [textInput, setTextInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getDropdownLabel = (
    value: string,
    defaultLabel: string,
    valueMap?: { [key: string]: string }
  ) => {
    if (!value) return defaultLabel;

    const values = value.split(",");

    if (values.length === 1) {
      return valueMap?.[values[0]] || values[0];
    }

    return `${values.length} selected`;
  };

  const handleToggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleSelectAll = () => {
    const allValues = options.flatMap((group) =>
      (group.items || group).map((opt) => opt.value)
    );
    onChange(allValues);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const handleTextSubmit = () => {
    if (textInput.trim() && onTextSubmit) {
      onTextSubmit(textInput);
      setTextInput("");
    }
  };

  const handleReset = () => {
    onChange([]);
    if (onReset) onReset();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.filterItem} ref={dropdownRef}>
      <div
        className={styles.filterDropdown}
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          fontWeight: "600",
          position: "relative",
          height: "40px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          paddingLeft: leftIcon ? "34px" : "12px",
          paddingRight: "12px",
          background: "#fff",
          width: showLabelInTrigger ? "auto" : "45px",
          minWidth: showLabelInTrigger ? "120px" : "45px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {leftIcon && (
            <span
              style={{
                position: "absolute",
                left: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {leftIcon}
            </span>
          )}
          {showLabelInTrigger && (
            <span style={{ marginLeft: leftIcon ? "2px" : "0" }}>
              {dropdownLabel || dropdownLabel1}
            </span>
          )}
        </div>
        <ChevronDown size={14} />
      </div>
      {showDropdown && (
        <div
          className={styles.checkboxDropdown}
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            padding: "10px",
            minWidth: "300px",
            maxWidth: "350px",
          }}
        >
          {(showHeaderInsideDropdown || (isTextInputMode && dropdownLabel)) && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "10px",
                top: 0,
                background: "#fff",
                zIndex: 1,
              }}
            >
              <h5 style={{ fontWeight: "700", marginBottom: "0" }}>
                {dropdownLabel || dropdownLabel1}
                {(dropdownLabel === "Smart Filters" ||
                  dropdownLabel1 === " Smart Filters") && (
                  <span
                    style={{ fontSize: "12px", color: "#666", marginLeft: "5px" }}
                  >
                    BETA • Powered by ChatGPT
                  </span>
                )}
              </h5>
              {showSelectClearButtons && (
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <button
                    onClick={handleSelectAll}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#007bff",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "14px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#007bff")}
                  >
                    Select ALL
                  </button>
                  <span style={{ color: "black" }}>|</span>
                  <button
                    onClick={handleClearAll}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#007bff",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "14px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#007bff")}
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
          {isTextInputMode ? (
            <div>
              <textarea
                placeholder="What are you looking for? Try something like: I want to see small cars less than £150."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                style={{
                  width: "100%",
                  height: "80px",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  resize: "none",
                }}
              />
              <button
                onClick={handleTextSubmit}
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Filter cars
              </button>
            </div>
          ) : (
            <div>
              {options.map((group, groupIndex) => (
                <div key={groupIndex} style={{ marginBottom: "20px" }}>
                  {group.group && (
                    <h6 style={{ fontWeight: "700", marginBottom: "10px" }}>
                      {group.group}
                    </h6>
                  )}
                  {(group.items || group).map((opt) => (
                    <div
                      key={opt.value}
                      className={styles.dropdownItem}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                        padding: "5px 8px",
                        borderRadius: "4px",
                        transition: "background-color 0.2s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                          width: "50%",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedValues.includes(opt.value)}
                          onChange={() => handleToggleOption(opt.value)}
                        />
                        {opt.label}
                      </label>
                      {opt.price && (
                        <span style={{ color: "#555", fontWeight: "500" }}>
                          {opt.price}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              {showFooter && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    borderTop: "1px solid #ddd",
                    paddingTop: "10px",
                    position: "sticky",
                    bottom: 0,
                    background: "#fff",
                    zIndex: 1,
                  }}
                >
                  <button
                    onClick={handleReset}
                    style={{
                      padding: "8px 16px",
                      background: "none",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "500",
                      width: "30%",
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowDropdown(false)}
                    style={{
                      padding: "8px 16px",
                      background: "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "500",
                      width: "67%",
                    }}
                  >
                    Show {resultCount} results
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const PriceRangeDropdown = ({
  dropdownLabel,
  showLabelInTrigger = false,
  showFooter = false,
  onReset,
  resultCount = 0,
  showHeaderInsideDropdown = false,
  onPriceChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [priceRange, setPriceRange] = useState([47, 5885]);
  const [priceType, setPriceType] = useState("Daily");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const minPrice = 47;
  const maxPrice = 5885;

  const handlePriceChangeInternal = (e) => {
    const newRange = [parseInt(e.target.value[0]), parseInt(e.target.value[1])];
    setPriceRange(newRange);
    if (onPriceChange) {
      onPriceChange(newRange);
    }
  };

  const handleReset = () => {
    setPriceRange([minPrice, maxPrice]);
    if (onReset) onReset();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const histogramBars = Array(20).fill(0).map((_, i) => {
    const height = Math.random() * 50 + 10;
    return (
      <div
        key={i}
        style={{
          height: `${height}px`,
          width: "5px",
          backgroundColor: "#333",
          marginRight: "2px",
        }}
      />
    );
  });

  return (
    <div className={styles.filterItem} ref={dropdownRef}>
      <div
        className={styles.filterDropdown}
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          fontWeight: "600",
          position: "relative",
          height: "40px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          paddingLeft: "12px",
          paddingRight: "12px",
          background: "#fff",
          width: showLabelInTrigger ? "auto" : "45px",
          minWidth: showLabelInTrigger ? "120px" : "45px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {showLabelInTrigger && <span>{dropdownLabel}</span>}
        </div>
        <ChevronDown size={14} />
      </div>
      {showDropdown && (
        <div
          className={styles.checkboxDropdown}
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            padding: "10px",
            minWidth: "300px",
            maxWidth: "350px",
          }}
        >
          {showHeaderInsideDropdown && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "10px",
                borderBottom: "1px solid #ddd",
                position: "sticky",
                top: 0,
                background: "#fff",
                zIndex: 1,
              }}
            >
              <h5 style={{ fontWeight: "700", marginBottom: "0" }}>
                {dropdownLabel}
              </h5>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <button
              onClick={() => setPriceType("Daily")}
              style={{
                padding: "5px 10px",
                backgroundColor: priceType === "Daily" ? "#f5f5f5" : "transparent",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Daily price
            </button>
            <button
              onClick={() => setPriceType("Total")}
              style={{
                padding: "5px 10px",
                backgroundColor: priceType === "Total" ? "#f5f5f5" : "transparent",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Total price
            </button>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                height: "60px",
                marginBottom: "10px",
              }}
            >
              {histogramBars}
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) =>
                  handlePriceChangeInternal({
                    target: { value: [e.target.value, priceRange[1]] },
                  })
                }
                style={{
                  position: "absolute",
                  width: "100%",
                  zIndex: 2,
                  background: "transparent",
                  pointerEvents: "none",
                }}
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceChangeInternal({
                    target: { value: [priceRange[0], e.target.value] },
                  })
                }
                style={{
                  position: "absolute",
                  width: "100%",
                  zIndex: 2,
                  background: "transparent",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "relative",
                  height: "5px",
                  background: "#ddd",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    height: "5px",
                    background: "#333",
                    borderRadius: "5px",
                    left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                    right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <span style={{ fontWeight: "500" }}>AED {priceRange[0]}</span>
                <span style={{ fontWeight: "500" }}>AED {priceRange[1]}</span>
              </div>
            </div>
          </div>
          {showFooter && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                borderTop: "1px solid #ddd",
                paddingTop: "10px",
                position: "sticky",
                bottom: 0,
                background: "#fff",
                zIndex: 1,
              }}
            >
              <button
                onClick={handleReset}
                style={{
                  padding: "8px 16px",
                  background: "none",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "500",
                  width: "30%",
                }}
              >
                Reset
              </button>
              <button
                onClick={() => setShowDropdown(false)}
                style={{
                  padding: "8px 16px",
                  background: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "500",
                  width: "67%",
                }}
              >
                Show {resultCount} results
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function SearchForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    carType: "",
    capacity: "",
    transmission: "",
    carFeatures: "",
    smartFilter: "",
    priceRange: [47, 5885],
    year: "",
    priceMin: "",
    priceMax: "",
    policies: "",
    supplier: "",
    location: "",
    paymentType: "",
  });
  const [isMounted, setIsMounted] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  const getDropdownLabel = (
    value: string,
    defaultLabel: string,
    valueMap?: { [key: string]: string }
  ) => {
    if (!value) return defaultLabel;

    const values = value.split(",");

    if (values.length === 1) {
      return valueMap?.[values[0]] || values[0];
    }

    return `${values.length} selected`;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPassengers = localStorage.getItem("passengers") || "";
      const storedCarType = localStorage.getItem("carType") || "";
      const storedYear = localStorage.getItem("year") || "";
      const storedMin = localStorage.getItem("priceMin") || "";
      const storedMax = localStorage.getItem("priceMax") || "";
      const storedTransmission = localStorage.getItem("transmission") || "";
      const storedCarFeatures = localStorage.getItem("carFeatures") || "";
      const storedPolicies = localStorage.getItem("policies") || "";
      const storedSupplier = localStorage.getItem("supplier") || "";
      const storedLocation = localStorage.getItem("location") || "";
      const storedPaymentType = localStorage.getItem("paymentType") || "";

      setFormData((prev) => ({
        ...prev,
        capacity: storedPassengers,
        carType: storedCarType,
        year: storedYear,
        priceMin: storedMin,
        priceMax: storedMax,
        transmission: storedTransmission,
        carFeatures: storedCarFeatures,
        policies: storedPolicies,
        supplier: storedSupplier,
        location: storedLocation,
        paymentType: storedPaymentType,
      }));
    }

    setIsMounted(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "passengers") {
      let mappedValue = "";
      const num = parseInt(value);
      if (num <= 2) mappedValue = "1to2";
      else if (num <= 5) mappedValue = "3to5";
      else if (num >= 6) mappedValue = "6";
      localStorage.setItem("passengers", mappedValue);
    }

    if (["year", "priceMin", "priceMax", "carType", "transmission", "carFeatures", "policies", "supplier", "location", "paymentType"].includes(name)) {
      localStorage.setItem(name, value);
    }
  };

  const handleSmartFilterSubmit = (text: string) => {
    setFormData({ ...formData, smartFilter: text });
    console.log("Smart Filter applied:", text);
  };

  const handleCarFeaturesChange = (values) => {
    const joined = values.join(",");
    localStorage.setItem("carFeatures", joined);
    setFormData({ ...formData, carFeatures: joined });
  };

  const handlePriceChange = (newRange) => {
    setFormData({ ...formData, priceRange: newRange });
    console.log("Price range applied:", newRange);
  };

  const handleResetCarFeatures = () => {
    localStorage.removeItem("carFeatures");
    setFormData({ ...formData, carFeatures: "" });
  };

  const handleResetPrice = () => {
    setFormData({ ...formData, priceRange: [47, 5885] });
  };

  const scrollLeft = () => {
    if (filterContainerRef.current) {
      filterContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (filterContainerRef.current) {
      filterContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const capacityLabelMap = {
    "1to2": "1 to 2 passengers",
    "3to5": "3 to 5 passengers",
    "6": "6 or more passengers",
  };

  const carFeatureLabelMap = {
    "4+door": "4+ doors",
    "4wd": "4WD",
    aircon: "Aircon",
    awd: "AWD",
    coupe: "Coupe",
    estatecar: "Estate Car",
    "open-air": "Open Air",
  };
  const { separateFilter } = CaryaatiContext();


  if (!isMounted) return null;

  return (
    <div className={`${styles.searchSection} ${separateFilter === true ? 'hidden': ''}`} style={{display: separateFilter === true ? 'none': ''}}>
      <div className={styles.filterBar}>
        <div className={styles.filterContainer} ref={filterContainerRef}>
          <CustomCheckboxDropdown
            leftIcon={<SlidersHorizontal size={16} color="#333" />}
            dropdownLabel="Car features"
            options={[
              {
                group: "Transmission",
                items: [
                  { value: "Automatic", label: "Automatic", price: "AED 1,268" },
                  { value: "Manual", label: "Manual", price: "AED 2,552" },
                ],
              },
              {
                group: "Car features",
                items: [
                  { value: "4doors", label: "4+ doors", price: "AED 1,268" },
                  { value: "4wd", label: "4WD", price: "AED 2,583" },
                  { value: "aircon", label: "Aircon", price: "AED 1,268" },
                  { value: "awd", label: "AWD", price: "AED 4,481" },
                  { value: "coupe", label: "Coupe", price: "AED 7,295" },
                ],
              },
            ]}
            selectedValues={formData.carFeatures ? formData.carFeatures.split(",") : []}
            onChange={handleCarFeaturesChange}
            showLabelInTrigger={false}
            showFooter={true}
            onReset={handleResetCarFeatures}
            resultCount={449}
          />
          <CustomCheckboxDropdown
            dropdownLabel1={getDropdownLabel(formData.carType, "Car Type")}
            options={[
              {
                group: "",
                items: [
                  { value: "small", label: "Small", price: "AED 1,200" },
                  { value: "medium", label: "Medium", price: "AED 1,450" },
                  { value: "large", label: "Large", price: "AED 1,600" },
                  { value: "suv", label: "SUV", price: "AED 1,950" },
                ],
              },
            ]}
            selectedValues={formData.carType ? formData.carType.split(",") : []}
            onChange={(values) => {
              const joined = values.join(",");
              localStorage.setItem("carType", joined);
              setFormData({ ...formData, carType: joined });
            }}
            showLabelInTrigger={true}
            showFooter={true}
            onReset={() => {
              localStorage.removeItem("carType");
              setFormData({ ...formData, carType: "" });
            }}
            resultCount={449}
            showHeaderInsideDropdown={true}
          />
          <CustomCheckboxDropdown
            dropdownLabel1={getDropdownLabel(formData.year, "Year")}
            options={[
              {
                group: "",
                items: [
                  { value: "2020", label: "2020", price: "AED 1,200" },
                  { value: "2021", label: "2021", price: "AED 1,450" },
                  { value: "2022", label: "2022", price: "AED 1,600" },
                  { value: "2023", label: "2023", price: "AED 1,950" },
                  { value: "2024", label: "2024", price: "AED 1,950" },
                  { value: "2025", label: "2025", price: "AED 1,950" },
                ],
              },
            ]}
            selectedValues={formData.year ? formData.year.split(",") : []}
            onChange={(values) => {
              const joined = values.join(",");
              localStorage.setItem("year", joined);
              setFormData({ ...formData, year: joined });
            }}
            showLabelInTrigger={true}
            showFooter={true}
            onReset={() => {
              localStorage.removeItem("year");
              setFormData({ ...formData, year: "" });
            }}
            resultCount={449}
            showHeaderInsideDropdown={true}
          />
          <CustomCheckboxDropdown
            dropdownLabel1={getDropdownLabel(formData.capacity, "Capacity", capacityLabelMap)}
            options={[
              {
                group: "Passengers",
                items: [
                  { value: "1to2", label: "1 to 2 passengers", price: "AED 1,200" },
                  { value: "3to5", label: "3 to 5 passengers", price: "AED 1,450" },
                  { value: "6", label: "6 or more", price: "AED 1,600" },
                ],
              },
              {
                group: "Bags",
                items: [
                  { value: "1bag", label: "1 to 2 bags", price: "AED 1,268" },
                  { value: "2bag", label: "3 to 4 bags", price: "AED 7,295" },
                ],
              },
            ]}
            selectedValues={formData.capacity ? formData.capacity.split(",") : []}
            onChange={(values) => {
              const joined = values.join(",");
              localStorage.setItem("passengers", joined);
              setFormData({ ...formData, capacity: joined });
            }}
            showLabelInTrigger={true}
            showFooter={true}
            onReset={() => {
              localStorage.removeItem("passengers");
              setFormData({ ...formData, capacity: "" });
            }}
            resultCount={449}
            showHeaderInsideDropdown={true}
          />
          <CustomCheckboxDropdown
            dropdownLabel1={getDropdownLabel(formData.transmission, "Transmission")}
            options={[
              {
                group: "",
                items: [
                  { value: "Automatic", label: "Automatic", price: "AED 1,268" },
                  { value: "Manual", label: "Manual", price: "AED 2,552" },
                ],
              },
            ]}
            selectedValues={formData.transmission ? formData.transmission.split(",") : []}
            onChange={(values) => {
              const joined = values.join(",");
              localStorage.setItem("transmission", joined);
              setFormData({ ...formData, transmission: joined });
            }}
            showLabelInTrigger={true}
            showFooter={true}
            onReset={() => {
              localStorage.removeItem("transmission");
              setFormData({ ...formData, transmission: "" });
            }}
            resultCount={449}
            showHeaderInsideDropdown={true}
          />
          <CustomCheckboxDropdown
            dropdownLabel1={getDropdownLabel(formData.carFeatures, "Car Features", carFeatureLabelMap)}
            options={[
              {
                group: "Transmission",
                items: [
                  { value: "automatic2", label: "Automatic", price: "AED 1,268" },
                  { value: "manual2", label: "Manual", price: "AED 2,552" },
                ],
              },
              {
                group: "Car features",
                items: [
                  { value: "4doors", label: "4+ doors", price: "AED 1,268" },
                  { value: "4wd", label: "4WD", price: "AED 2,583" },
                  { value: "aircon", label: "Aircon", price: "AED 1,268" },
                  { value: "awd", label: "AWD", price: "AED 4,481" },
                  { value: "coupe", label: "Coupe", price: "AED 7,295" },
                ],
              },
            ]}
            selectedValues={formData.carFeatures ? formData.carFeatures.split(",") : []}
            onChange={handleCarFeaturesChange}
            showLabelInTrigger={true}
            showFooter={true}
            onReset={handleResetCarFeatures}
            resultCount={449}
            showHeaderInsideDropdown={true}
          />
          <CustomCheckboxDropdown
            dropdownLabel1={getDropdownLabel(formData.policies, "Policies")}
            options={[
              {
                items: [
                  { value: "free", label: "Free cancellation", price: "AED 1,268" },
                  { value: "fair", label: "Fair Fuel Policy", price: "AED 2,552" },
                  { value: "unlimited", label: "Unlimited mileage", price: "AED 2,552" },
                ],
              },
            ]}
            selectedValues={formData.policies ? formData.policies.split(",") : []}
            onChange={(values) => {
              const joined = values.join(",");
              localStorage.setItem("policies", joined);
              setFormData({ ...formData, policies: joined });
            }}
            showLabelInTrigger={true}
            showFooter={true}
            onReset={() => {
              localStorage.removeItem("policies");
              setFormData({ ...formData, policies: "" });
            }}
            resultCount={449}
            showHeaderInsideDropdown={true}
          />
          <CustomCheckboxDropdown
            dropdownLabel1={getDropdownLabel(formData.supplier, "Supplier")}
            options={[
              {
                items: [
                  { value: "Free-cancellation", label: "Free Cancellation", price: "AED 1,268" },
                  { value: "fair", label: "Fair Fuel Policy", price: "AED 2,552" },
                  { value: "unlimited", label: "Unlimited mileage", price: "AED 2,552" },
                  { value: "Free-cancellation", label: "Free Cancellation", price: "AED 1,268" },
                  { value: "fair", label: "Fair Fuel Policy", price: "AED 2,552" },
                  { value: "unlimited", label: "Unlimited mileage", price: "AED 2,552" },
                ],
              },
            ]}
            selectedValues={formData.supplier ? formData.supplier.split(",") : []}
            onChange={(values) => {
              const joined = values.join(",");
              localStorage.setItem("supplier", joined);
              setFormData({ ...formData, supplier: joined });
            }}
            showLabelInTrigger={true}
            showFooter={true}
            onReset={() => {
              localStorage.removeItem("supplier");
              setFormData({ ...formData, supplier: "" });
            }}
            resultCount={449}
            showHeaderInsideDropdown={true}
            showSelectClearButtons={true}
          />
          <CustomCheckboxDropdown
            dropdownLabel1={getDropdownLabel(formData.location, "Location")}
            options={[
              {
                group: "DXB: Dubai Intl",
                items: [
                  { value: "at", label: "At Terminal", price: "AED 1,450" },
                  { value: "shu", label: "Shuttle", price: "AED 1,600" },
                  { value: "call", label: "Call for pick-up", price: "AED 1,950" },
                ],
              },
            ]}
            selectedValues={formData.location ? formData.location.split(",") : []}
            onChange={(values) => {
              const joined = values.join(",");
              localStorage.setItem("location", joined);
              setFormData({ ...formData, location: joined });
            }}
            showLabelInTrigger={true}
            showFooter={true}
            onReset={() => {
              localStorage.removeItem("location");
              setFormData({ ...formData, location: "" });
            }}
            resultCount={449}
            showHeaderInsideDropdown={true}
          />
          <CustomCheckboxDropdown
            dropdownLabel1={getDropdownLabel(formData.paymentType, "Payment Type")}
            options={[
              {
                group: "",
                items: [
                  { value: "now", label: "Pay now", price: "AED 1,450" },
                  { value: "par", label: "Partial Prepayment", price: "AED 1,600" },
                  { value: "pay", label: "Pay at counter", price: "AED 1,950" },
                ],
              },
            ]}
            selectedValues={formData.paymentType ? formData.paymentType.split(",") : []}
            onChange={(values) => {
              const joined = values.join(",");
              localStorage.setItem("paymentType", joined);
              setFormData({ ...formData, paymentType: joined });
            }}
            showLabelInTrigger={true}
            showFooter={true}
            onReset={() => {
              localStorage.removeItem("paymentType");
              setFormData({ ...formData, paymentType: "" });
            }}
            resultCount={449}
            showHeaderInsideDropdown={true}
          />
          <PriceRangeDropdown
            dropdownLabel="Price with taxes and fees"
            showLabelInTrigger={true}
            showFooter={true}
            onReset={handleResetPrice}
            resultCount={453}
            showHeaderInsideDropdown={true}
            onPriceChange={handlePriceChange}
          />
        </div>
      </div>
      <button
        className={styles.scrollButtonLeft}
        style={{ zIndex: "940" }}
        onClick={scrollLeft}
      >
        <FaChevronLeft />
      </button>
      <button
        className={styles.scrollButtonRight}
        style={{ zIndex: "940" }}
        onClick={scrollRight}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}