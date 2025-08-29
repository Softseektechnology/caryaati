// components/PriceAnalysisNotification.jsx
import React, { useState } from "react";
import "./Price.module.css";
import { X } from "react-bootstrap-icons";

const PriceAnalysisNotification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [trackPrices, setTrackPrices] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleToggleTrackPrices = () => {
    setTrackPrices(!trackPrices);
    // Add logic here to handle tracking prices if needed
    console.log("Track prices:", !trackPrices);
  };

  if (!isVisible) return null;

  return (
    <div className='flex items-center z-[-1] content-center justify-between max-xl:w-[71vw] ml-[80px] max-xl:ml-[60px] max-sm:w-[92vw] max-sm:ml-0 py-[10px] px-[20px] bg-[#e6f0fa] max-md:ml-[0px] max-md:w-[80vw] border-[1px] border-[#d1e0ee] rounded-[4px] my-[10px] w-[57%]'>
      <div className='content flex items-center'>
        <div className='icon text-[16px] font-bold text-[#333] mr-[10px]'>C</div>
        <div className='textContent flex max-sm:w-[70%] flex-row max-sm:justify-between items-center content-center'>
          <div className='link text-[14px] max-sm:text-[12px] text-[#333]'>
            How payments to us affect ranking{" "}
            <span className='moreInfo text-[#007bff] font-[500] max-sm:font-[300] max-sm:ml-[2px] max-sm:text-[12px] cursor-pointer ml-[10px]'>MORE INFO</span>
          </div>
          <div className="inline float-right">

            <button className='closeButton absolute right-[39%] max-xl:right-[12%] max-sm:right-[5%] max-sm:translate-y-[-10px] sm:translate-y-[-9px] max-sm:ml-2 ' onClick={handleClose}>
          <X size={22} />
        </button>
          </div>
          
        </div></div>
    </div>
    
  );
};

export default PriceAnalysisNotification;