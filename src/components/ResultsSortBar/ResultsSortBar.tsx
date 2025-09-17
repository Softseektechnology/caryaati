// components/ResultsSortBar.jsx
import React, { useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import styles from "./ResultsSortBar.module.css";

const ResultsSortBar = ({ resultCount = 375, defaultSort = "Our recommendation" }) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState(defaultSort);

  const sortOptions = [
    { value: "our_recommendation", label: "Our recommendation" },
    { value: "price_low_to_high", label: "Price: Low to High" },
    { value: "price_high_to_low", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
  ];

  const handleSortChange = (option) => {
    setSelectedSort(option.label);
    setShowSortDropdown(false);
    // Add logic here to handle sorting if needed (e.g., update parent state or fetch new data)
    console.log("Sort by:", option.value);
  };

  return (
    <div className={`${styles.resultsSortBar} flex resultSortBar max-lg:mt-5 z-[-1] justify-between items-center py-[10px] px-[20px] max-sm:px-[7px] flex-nowrap w-[60%] max-xl:w-[71vw] max-sm:w-[92vw] max-sm:ml-0 ml-[55px] max-xl:ml-[60px] max-md:ml-[0px] max-md:w-[80vw] bg-[#f0f3f5] gap-10`}>
      <div className='font-[400] text-[16px] max-sm:text-[14px] max-md:text-[14px] flex flex-nowrap'>{resultCount} results</div>
      <div className='relative flex items-center content-center gap-[10px] max-sm:gap-[2px]'>
      <span className="max-sm:text-[11px] max-[475px]:text-[11px]">Sort by:</span>
       <div
          className='flex flex-nowrap items-center cursor-pointer text-[14px] max-sm:text-[10px] max-[475px]:text-[10px] font-[500] max-sm:font-[300] text-[#333] py-[5px] px-[10px] max-sm:px-[2px] bg-[#f0f3f5] rounded-[4px]' 
          onClick={() => setShowSortDropdown(!showSortDropdown)}
        >
          <span>{selectedSort}</span>
          <ChevronDown size={14} className="" style={{ marginLeft: "4px" }} />
        </div>
        {showSortDropdown && (
          <div className={styles.sortDropdownMenu}>
            {sortOptions.map((option) => (
              <div
                key={option.value}
                className={styles.sortOption}
                onClick={() => handleSortChange(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
        <span className={styles.infoIcon}>ⓘ</span>
      </div>
    </div>
  );
};

export default ResultsSortBar;