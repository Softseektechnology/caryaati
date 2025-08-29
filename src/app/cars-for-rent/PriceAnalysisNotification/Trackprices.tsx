// components/PriceAnalysisNotification.jsx
import React, { useState } from "react";
import styles from "./Price.module.css";
import { X } from "react-bootstrap-icons";

const Trackprice = () => {
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
    <div className='flex flex-wrap z-[-1] items-center max-sm:w-[92vw] max-sm:ml-0 justify-between max-xl:w-[71vw] ml-[80px] max-xl:ml-[60px] py-[10px] px-[20px] max-sm:px-[10px] bg-[#e6f0fa] border-[1px] max-md:ml-[0px] max-md:w-[80vw] border-[#d1e0ee] rounded-[4px] my-[10px] w-[57%]'>
      <div className={styles.content}>
      
          <div className={styles.analyzing}>
            <span className={styles.spinner}>⏳</span> Analysing price trends...
       
      <div className={styles.actions}>
        <div className={styles.trackPrices} style={{marginLeft: 'auto'}}>
          <span>Track prices:</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={trackPrices}
              onChange={handleToggleTrackPrices}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
       </div></div>
      </div>
        </div>
    
  );
};

export default Trackprice;