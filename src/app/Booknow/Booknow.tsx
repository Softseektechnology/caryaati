import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Booknow.module.css';
import Homepage from '../../components/homepage-subcategory/allCarscategory';
import Form from '../Form/Bookform';
import ExtrasSection from './ExtrasSection';
import FAQ from './FAQ';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import CarDetailsModal from './CarDetailsModal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import CustomDateRangePicker from '@/components/search-engine/CustomDateRangePicker';

const CarBookingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [carDetails, setCarDetails] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    dateRange: [null, null] as [Date | null, Date | null],
  });
  const totalSteps: number = 3;
  const router = useRouter();

  useEffect(() => {
    const startDateStr = localStorage.getItem('startDate');
    const endDateStr = localStorage.getItem('endDate');

    // Convert strings to Date objects or use default dates if null
    const startDate = startDateStr ? new Date(startDateStr) : new Date('2025-08-12T22:00:00+05:00');
    const endDate = endDateStr ? new Date(endDateStr) : new Date('2025-08-13T22:00:00+05:00');

    // Check if the parsed dates are valid
    const isValidStartDate = startDate instanceof Date && !isNaN(startDate.getTime());
    const isValidEndDate = endDate instanceof Date && !isNaN(endDate.getTime());

    setFormData({
      ...formData,
      dateRange: [
        isValidStartDate ? startDate : new Date('2025-08-12T22:00:00+05:00'),
        isValidEndDate ? endDate : new Date('2025-08-13T22:00:00+05:00'),
      ],
    });
  }, []);

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setFormData({
      ...formData,
      dateRange: [startDate, endDate],
    });
  };

  useEffect(() => {
    AOS.init();
  }, []);

  let images = [
    {
      id: 1,
      src: 'images/model_sp_596_639.webp',
      alt: 'Nissan Sunny 1',
    },
    {
      id: 2,
      src: 'images/live1.jpg',
      alt: 'Nissan Sunny 2',
    },
    {
      id: 3,
      src: 'images/live2.jpg',
      alt: 'Nissan Sunny 3',
    },
    {
      id: 4,
      src: 'images/live3.jpg',
      alt: 'Nissan Sunny 4',
    },
  ];

  const defaultStartDate = new Date('2025-08-12T22:00:00+05:00');
  const defaultEndDate = new Date('2025-08-13T22:00:00+05:00');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([defaultStartDate, defaultEndDate]);
  const [pickUpDateTime, setPickUpDateTime] = useState<string>(defaultStartDate.toISOString().slice(0, 16));
  const [dropOffDateTime, setDropOffDateTime] = useState<string>(defaultEndDate.toISOString().slice(0, 16));
  const [displayDateRange, setDisplayDateRange] = useState<string>('Pick-up: August 12, 2025 10:00 PM - Drop-off: August 13, 2025 10:00 PM');
  const [selectedCar, setSelectedCar] = useState<string>(images[0].src);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  const showStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleImageClick = (src: string) => {
    if (src === selectedCar) return; // prevent unnecessary animation
    setIsFlipping(true); // start flip
    setTimeout(() => {
      setSelectedCar(src); // update image
      setIsFlipping(false); // end flip
    }, 300); // duration must match the CSS animation time
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === totalSteps) {
      router.push('/Confirmation');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        }
      }
    ]
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div className={`${styles.mainContainer} md:ml-[60px] min-h-screen flex justify-center items-start p-0 max-sm:p-0 sm:p-6`}>
        <div className="w-full max-sm:w-[100vw] bg-white overflow-hidden">
          {/* Stepper for Progress Steps */}
          <div className={styles.stepper}>
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`${styles.stepperItem} ${step <= currentStep ? styles.stepperItemActive : ''}`}
                onClick={() => showStep(step)}
              >
                <div className={styles.stepperCircle}>
                  <span>{step}</span>
                </div>
                <p className={styles.stepperLabel}>
                  {step === 1 ? 'Booking Details' : step === 2 ? 'Extras' : step === 3 ? 'Privacy' : 'Confirmation'}
                </p>
              </div>
            ))}

          </div>

          {/* Main Content */}
          <div className="p-4 sm:p-6 lg:p-8 max-sm:py-2 max-sm:w-[100vw] max-sm:px-0">
            {/* Step 1: Booking Details */}
            <div className={`${styles.step} ${currentStep === 1 ? styles.stepActive : ''}`}>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 bg-white rounded-lg p-4 sm:p-6 max-sm:px-0 max-sm:py-2">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className={`${styles.carImage} w-full max-w-md mx-auto`}>
                    <div className={`${styles.flipContainer} ${isFlipping ? styles.flipping : ''}`}>
                      <img src={selectedCar} alt="Nissan Sunny" className={`w-full drop-shadow-2xl ${styles.carImage} h-[320px] rounded-lg`} />
                    </div>
                  </div>
                  <div className="w-full mt-1 max-w-md mx-auto p-3 max-sm:py-1 max-sm:px-0">
                    <Slider {...settings}>
                      {images.map((image) => (
                        <div
                          key={image.id}
                          className={`p-2 max-sm:p-1 border-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:border-gray-500 hover:shadow-lg hover:-translate-y-1 ${selectedCar === image.src ? 'border-[#ffc107] bg-[#ffffff] shadow-md' : 'border-gray-200'}`}
                          onClick={() => handleImageClick(image.src)}
                        >
                          <img
                            src={image.src}
                            className="h-12 sm:h-14 w-full object-cover rounded-sm hover:scale-105 transition-transform duration-300"
                            alt={image.alt}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1f1f1f] mb-2 cursor-pointer hover:text-shadow-lg" data-aos="fade-up">Nissan Sunny 2020</h2>
                  <div className='flex gap-2'>
                    <span className="px-4 text-white text-[14px] py-[5px] rounded-lg font-medium bg-[#ff0000] bg-opacity-50" data-aos='fade-left'>
                      Sedan
                    </span>
                    <span className="px-4 text-white text-[14px] py-[5px] ml-2 rounded-lg font-medium bg-[#ffc107c4] bg-opacity-50" data-aos='fade-left'>
                      Featured
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3 my-3">
                    <span className="flex items-center cursor-pointer bg-[#ffffff] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-[#1f1f1f] font-medium shadow hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M172.31-140q-29.92 0-51.12-21.19Q100-182.39 100-212.31v-415.38q0-29.92 21.19-51.12Q142.39-700 172.31-700H340v-67.69q0-29.92 21.19-51.11 21.2-21.2 51.12-21.2h135.38q29.92 0 51.12 21.2Q620-797.61 620-767.69V-700h167.69q29.92 0 51.12 21.19Q860-657.61 860-627.69v415.38q0 29.92-21.19 51.12Q817.61-140 787.69-140H172.31ZM400-700h160v-67.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H412.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-700Zm-140 60h-87.69q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v415.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85H260v-440Zm380 440v-440H320v440h320Zm60-440v440h87.69q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-415.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H700ZM480-420Z" /></svg> {`x3`}
                    </span>
                    <span className="flex items-center cursor-pointer bg-[#ffffff] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-[#1f1f1f] font-medium shadow hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M170-140q-12.75 0-21.37-8.63Q140-157.25 140-170v-306.92L221.69-710q4.47-13.77 16.39-21.88Q250-740 264.62-740h208.76q-1.23 8.85-1.34 17.39-.12 8.53.27 18 0 6.76.3 12.61.31 5.85 1.54 12H274.77l-50.46 143.08h333.23q31.08 27.77 68.81 43.88 37.73 16.12 85.19 16.12H200V-280h560v-202.46q16-3.23 30.81-8.5 14.8-5.27 29.19-13.19V-170q0 12.75-8.63 21.37Q802.75-140 790-140h-24.61q-12.75 0-21.38-8.63-8.62-8.62-8.62-21.37v-50H224.61v50q0 12.75-8.62 21.37-8.63 8.63-21.38 8.63H170Zm519.54-433.85L682-613.54q-13.69-3.61-24.96-10.19-11.27-6.58-20.27-15.73l-37.54 14.23-22-37.54 30-27.08q-3.54-13.92-3.54-27.07 0-13.16 3.54-27.08l-30-25.85 22.1-37.53 36.82 13q9-9.16 20.27-15.73 11.27-6.58 25.58-10.2l7.54-39.69h43.38l8.16 39.08q14.3 4.23 25.57 10.81 11.27 6.57 20.27 15.73l36.83-13 22.09 37.53L816.46-744q3.54 13.92 3.85 27.38.3 13.47-3.85 27.39l29.38 25.85-21.38 37.53-37.54-13.61q-9 9.15-20.57 15.73-11.58 6.58-25.27 10.19l-8.16 39.69h-43.38Zm22.04-82.3q25.34 0 43.03-17.74 17.7-17.74 17.7-43.08T754.57-760q-17.74-17.69-43.08-17.69t-43.03 17.74q-17.69 17.73-17.69 43.07t17.74 43.03q17.73 17.7 43.07 17.7ZM200-476.92V-280v-196.92Zm98.55 150.77q21.83 0 37.03-15.29 15.19-15.28 15.19-37.11t-15.28-37.03q-15.29-15.19-37.12-15.19t-37.02 15.28q-15.2 15.29-15.2 37.12t15.29 37.02q15.28 15.2 37.11 15.2Zm363.08 0q21.83 0 37.02-15.29 15.2-15.28 15.2-37.11t-15.29-37.03q-15.28-15.19-37.11-15.19t-37.03 15.28q-15.19 15.29-15.19 37.12t15.28 37.02q15.29 15.2 37.12 15.2Z" /></svg> Auto
                    </span>
                    <span className="flex items-center cursor-pointer bg-[#ffffff] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-[#1f1f1f] font-medium shadow hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M450-90v-179.85l-140 138L267.85-174 450-356.15V-450h-93.85L174-267.85 131.85-310l138-140H90v-60h179.85l-138-140L174-692.15 356.15-510H450v-93.85L267.85-786 310-828.15l140 138V-870h60v179.85l140-138L692.15-786 510-603.85V-510h93.85L786-692.15 828.15-650l-138 140H870v60H690.15l138 140L786-267.85 603.85-450H510v93.85L692.15-174 650-131.85l-140-138V-90h-60Z" /></svg> A/C
                    </span>
                    <span className="flex items-center cursor-pointer bg-[#ffffff] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-[#1f1f1f] font-medium shadow hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M595-180H327.31Q297-180 276-201q-21-21-21-51.31V-680h60v427.69q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85H595v60ZM445-710q-30.69 0-52.27-21.58-21.58-21.57-21.58-52.26 0-30.7 21.58-52.27 21.58-21.58 52.27-21.58 30.69 0 52.27 21.58 21.57 21.57 21.57 52.27 0 30.69-21.57 52.26Q475.69-710 445-710ZM645-90v-190H425q-29.15 0-49.58-20.42Q355-320.85 355-350v-225.38q0-38.16 25.92-64.08 25.93-25.92 64.08-25.92t64.08 25.92Q535-613.54 535-575.38V-380h100q29.15 0 49.58 20.42Q705-339.15 705-310v220h-60Z" /></svg> {`x5`}
                    </span>
                  </div>
                  <p className="text-red-500 text-xs sm:text-sm font-medium mb-3">
                    In High Demand! Only 1 Car Available for Booking
                  </p>
                  <div className="mb-3">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#ffc107] mb-1">1009.9 AED</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Price for 30 Day(s) <br /> Your Rental: 30 Day(s)</p>
                    <button className="mt-2 py-1 text-[#ffc107] font-medium rounded-full hover:text-[#1f1f1f] transition-all duration-300" onClick={() => setCarDetails(true)}>More Details</button>
                  </div>

                  <div className="flex flex-row flex-wrap sm:py-8 gap-2 sm:gap-3">
                    <div className="text-center mx-3 rounded-lg hover:-translate-y-1 transition-transform duration-300" data-aos="fade-up">
                      <svg
                        className="h-5 w-5 sm:h-5 sm:w-5 mx-auto mb-2 text-[#1f1f1f] hover:text-[#1f1f1f] transition-colors duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                        aria-label="Engine Icon"
                      >
                        <path d="m699.08-135.85-252-253.23q-21.16 9.16-43.01 14.12-21.86 4.96-46.38 4.96-95.83 0-162.91-67.08-67.09-67.09-67.09-162.92 0-31 7.89-59.27 7.88-28.27 22.42-53.81l143.69 142.93L387.54-656 245.39-798.92q25.53-14.54 53.45-22.81t58.85-8.27q95.84 0 162.92 67.08 67.08 67.09 67.08 162.92 0 25.31-4.77 47.15-4.77 21.85-14.31 42.24l253.24 252q10.46 10.59 10.46 25.6 0 15.01-10.38 25.39l-72.63 72.63q-10.38 10.37-25.07 9.99-14.69-.39-25.15-10.85Zm25.54-59.99 36.61-36.62-266.38-266.39q16.84-20.77 24.84-47.27 8-26.5 8-53.88 0-66.54-47.54-117.77Q432.61-769 359.84-768l86.7 86.69q10.84 10.85 10.84 25.31 0 14.46-10.84 25.31L327-511.15q-10.85 10.84-25.31 10.84-14.46 0-25.31-10.84l-86.69-86.7q.15 77 51.77 122.43Q293.08-430 357.69-430q26.26 0 52.52-7.81 26.25-7.8 48.02-24.42l266.39 266.39ZM472-486.46Z" />
                      </svg>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">Engine<br />1.5L</p>
                    </div>
                    <div className="text-center mx-3 rounded-lg hover:-translate-y-1 transition-transform duration-300" data-aos="fade-up" data-aos-delay="200">
                      <svg
                        className="h-5 w-5 sm:h-5 sm:w-5 mx-auto mb-2 text-[#1f1f1f] hover:text-[#1f1f1f] transition-colors duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                        aria-label="Fuel Policy Icon"
                      >
                        <path d="M180-140v-607.69Q180-778 201-799q21-21 51.31-21h215.38Q498-820 519-799q21 21 21 51.31v260h38.46q29.83 0 51.07 21.24 21.24 21.24 21.24 51.06v181.54q0 19.31 13.42 32.73 13.42 13.43 32.73 13.43 19.31 0 32.73-13.43 13.43-13.42 13.43-32.73v-280.3q-9 5.38-19 7.46-10 2.07-21 2.07-36.83 0-62.27-25.43-25.43-25.43-25.43-62.26 0-29.69 16.93-52.88 16.92-23.19 44.77-31.12l-90.16-90.15L620.46-800l142.61 140.16q13.47 13.46 20.58 31.19 7.12 17.73 7.12 36.34v358.46q0 39.42-27.2 66.63Q736.38-140 697-140q-39.39 0-66.66-27.22-27.26-27.21-27.26-66.63v-193.84q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H540v300H180Zm60-410h240v-197.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-550Zm463.08-2.31q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5ZM240-200h240v-290H240v290Zm240 0H240h240Z" />
                      </svg>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">Fuel Policy<br />Level to Level</p>
                    </div>
                    <div className="text-center mx-3 rounded-lg hover:-translate-y-1 transition-transform duration-300" data-aos="fade-up" data-aos-delay="400">
                      <svg
                        className="h-5 w-5 sm:h-5 sm:w-5 mx-auto mb-2 text-[#1f1f1f] hover:text-[#1f1f1f] transition-colors duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                        aria-label="Mileage Icon"
                      >
                        <path d="M424.15-346.15q21.31 21.3 54.89 20.23 33.57-1.08 49.27-24.23l217.07-314.46-315.23 216.3q-23.53 15.7-25.42 48.27-1.88 32.58 19.42 53.89ZM480-780q57.08 0 106.96 14.96 49.89 14.96 96.35 45.27l-56.39 36.46q-34.15-18.15-70.8-27.42Q519.46-720 480-720q-133 0-226.5 93.5T160-400q0 42 11.5 83t32.5 77h552q23-38 33.5-79t10.5-85q0-36-8.88-72.88-8.89-36.89-27.43-70.04l36.46-56.39q29.62 48.54 44.43 97.12 14.8 48.58 15.42 100.96.61 54.31-12.23 102.65-12.85 48.35-38.69 94.58-7.93 13-22.31 20.5Q772.38-180 756-180H204q-16 0-30.19-7.69-14.19-7.7-22.89-21.85-22.92-40-36.92-87.23Q100-344 100-400q0-78.38 29.74-147.37 29.74-68.99 81.19-120.85 51.46-51.86 120.99-81.82Q401.46-780 480-780Zm4.31 295.69Z" />
                      </svg>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">Mileage<br />4500 KM</p>
                    </div>
                    <div className="text-center mx-3 rounded-lg hover:-translate-y-1 transition-transform duration-300" data-aos="fade-up" data-aos-delay="600">
                      <svg
                        className="h-5 w-5 sm:h-5 sm:w-5 mx-auto mb-2 text-[#1f1f1f] hover:text-[#1f1f1f] transition-colors duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                        aria-label="Deposit Icon"
                      >
                        <path d="M860-707.69v455.38Q860-222 839-201q-21 21-51.31 21H172.31Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h615.38Q818-780 839-759q21 21 21 51.31Zm-700 83.85h640v-83.85q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v83.85Zm0 127.68v243.85q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h615.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-243.85H160ZM160-240v-480 480Z" />
                      </svg>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">Deposit<br />1000 AED (Net)<br />By Card</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="mb-4 sm:mb-6 ml-6 max-w-sm">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#1f1f1f] mb-3">Choose Rental Dates</h3>
                <div className="flex flex-row gap-3">
                  <div className="flex-1">
                    <CustomDateRangePicker
                      value={formData.dateRange}
                      onChange={handleDateRangeChange}
                      placeholder="Select date and time range"
                    />
                    <p className="text-xs text-gray-600 mt-1">{displayDateRange}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6 max-sm:p-2">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#1f1f1f] mb-3">Add Extra or Optional Charges</h3>
                <ExtrasSection />
              </div>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 bg-white rounded-lg shadow-md p-4 sm:p-6 max-sm:p-2">
                <img src="images/filter-icon/checkout_left.jpeg" className="w-24 h-24 sm:w-40 sm:h-40 lg:w-48 lg:h-32 object-cover rounded-lg" alt="Privacy Icon" />
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    We Value Your Privacy: CarYaati will NOT sell or distribute your contact information. We highly encourage our customers to read the Privacy Policy, Terms of Use and Rental terms before reservation or booking.
                  </p>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-2">
                    <input type="checkbox" className="mr-2" />
                    I have read and accepted the Terms of Use of carYaati.com
                  </label>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-2">
                    <input type="checkbox" className="mr-2" />
                    I have read and accepted the Terms & Conditions of Rent a Car Supplier
                  </label>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-2">
                    <input type="checkbox" className="mr-2" />
                    I have read and accepted the Privacy Policy
                  </label>
                </div>
              </div>
            </div>

            {/* Step 2: Extras */}
            <div className={`${styles.step} ${currentStep === 2 ? styles.stepActive : ''}`}>
              <Homepage />
            </div>

            {/* Step 3: Privacy */}
            <div className={`${styles.step} ${currentStep === 3 ? styles.stepActive : ''}`}>
              <Form />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-4 sm:mt-6 max-sm:px-2">
              <button
                className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-md text-white text-sm sm:text-base font-medium transition-all duration-300 ${currentStep === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600 hover:-translate-y-1'}`}
                onClick={prevStep}
              >
                Previous
              </button>
              <button
                className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-md bg-[#ffc107] text-[#1f1f1f] text-sm sm:text-base font-medium hover:bg-[#ff9800] hover:-translate-y-1 transition-all duration-300"
                onClick={nextStep}
              >
                {currentStep === totalSteps ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {carDetails && <CarDetailsModal onClose={() => setCarDetails(false)} />}
    </>
  );
};

export default CarBookingForm;
