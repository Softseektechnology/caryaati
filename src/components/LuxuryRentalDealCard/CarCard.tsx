'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './RentalDealCard.module.css';
import Link from 'next/link';
import DetailSection from './DetailSection';
import InquiryButton from './InquiryButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Info, StarIcon, StarOffIcon } from 'lucide-react';
import { CaryaatiContext } from '@/app/ContextApi/CaryaatiStore';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaCross } from 'react-icons/fa';
import BookingForm from '../RentalDealCard/BookingForm';



interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

interface CarProps {
  name: string;
  company: string;
  price: string;
  location: string;
  availability: number;
  seats: number;
  luggage: number;
  doors: number;
  transmission: string;
  ac: boolean;
  image: string;
  logo: string;
  images: ImageItem[];
}

interface Feature {
  icon: string;
  label: string;
}

const extraCosts: { [key: string]: number } = {
  insurance: 350,
  gps: 300,
  infantSeat: 300,
  childBoosterSeat: 300,
  childSafetySeat: 300,
  additionalDriver: 0,
  deliveryCharges: 0,
  pickupCharges: 0,
};

const extraContent: { [key: string]: { image: string; description: string } } = {
  insurance: {
    image: 'https://www.caryaati.com/images/car-card/Full_Insurance.jpg',
    description: 'Full comprehensive insurance including drivers and passengers. In case of an accident Insurance Excess will be applicable if the driver is at fault or the second party is unknown. If it is not a driver at fault no charges. In the event of an accident or any damage to the vehicle, a police report must be obtained for insurance coverage to be applicable. Insurance excess will not be applicable if Super Collision Damage Waiver (SCDW) is purchased by the hirer.',
  },
  gps: {
    image: 'https://www.caryaati.com/images/car-card/gps.png',
    description: 'The satellite navigation system provides turn-by-turn directions. Usually provided by the local stores, the interface and voice are usually in the local language. Please note: If you request any extras that are payable at pick-up, we can’t guarantee that you’ll get them. Companies will ask for extra charges only if they provide you with that particular item at the booking counter.',
  },
  infantSeat: {
    image: 'https://www.caryaati.com/images/car-card/infant2.png',
    description: 'Recommended for children weighing under 20 lbs / 9kg (Birth to approx 1-12 months)  Please note: If you request any extras that are payable at pick-up, we can’t guarantee that you’ll get them. Companies will ask for extra charges only if they provide you with that particular item at the booking counter.',
  },
  childBoosterSeat: {
    image: 'https://www.caryaati.com/images/car-card/booster2.png',
    description: 'Recommended for children weighing 18kg-30 (Approx 4 - 7 years)  Please note: If you request any extras that are payable at pick-up, we can’t guarantee that you’ll get them. Companies will ask for extra charges only if they provide you with that particular item at the booking counter.',
  },
  childSafetySeat: {
    image: 'https://www.caryaati.com/images/car-card/chalid_safty2.png',
    description: 'Recommended for children weighing 20-40 lbs / 9-18kg (Approx 1 - 3 years)  Please note: If you request any extras that are payable at pick-up, we can’t guarantee that you’ll get them. Companies will ask for extra charges only if they provide you with that particular item at the booking counter.',
  },
  additionalDriver: {
    image: 'https://www.caryaati.com/images/car-card/add_driver.jpg',
    description: `Take turns in the driver's seat and enjoy the journey. Additional drivers will need to provide a full driving license in their name with no major endorsements. The license should be held for at least 1 year(s). A valid passport for a Resident outside UAE is required at the time of booking. Supplier may request to see your Passport at the Booking/Pickup Counter.`,
  },
  deliveryCharges: {
    image: 'https://www.caryaati.com/images/car-card/delivery.jpeg',
    description: 'Delivery charges may vary as per location, we use your current location to show you the charges later you may change your location chance rates will be updated. However, some companies may offer free delivery at a particular location or as per the rental period.',
  },
  pickupCharges: {
    image: 'https://www.caryaati.com/images/car-card/pickup.jpeg',
    description: 'Pickup charges may vary as per location, we use your current location to show you the charges later you may change your location chance rates will be updated. However, some companies may offer free pickup at a particular location or as per the rental period.',
  },
  totalCharges: {
    image: 'https://www.caryaati.com/images/car-card/total_cahrges.jpg',
    description: 'This is the estimated total of optional/additional charges only. You may update or edit any of the listed charges on the Booking Detail page, e.g Delivery/pickup location, additional driver, Insurance Package etc.',
  },
};

const CarCard: React.FC<CarProps> = ({
  name,
  company,
  price,
  location,
  availability,
  seats,
  luggage,
  doors,
  transmission,
  ac,
  image,
  logo,
  images,
}) => {
  const [carDetail, setCarDetail] = useState(false);
  const [carCard, setCarCard] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedExtra, setSelectedExtra] = useState<string | null>(null);
  const [insurance, setInsurance] = useState(false);
  const [gps, setGps] = useState(false);
  const [infantSeat, setInfantSeat] = useState(false);
  const [childBoosterSeat, setChildBoosterSeat] = useState(false);
  const [childSafetySeat, setChildSafetySeat] = useState(false);
  const [additionalDriver, setAdditionalDriver] = useState(false);
  const [deliveryCharges, setDeliveryCharges] = useState(false);
  const [pickupCharges, setPickupCharges] = useState(false);
  const [totalCharges, setTotalCharges] = useState(false);
  const [totalExtraCharges, setTotalExtraCharges] = useState(0);
  const { bookingForm, setBookingForm } = CaryaatiContext();
  const [isSignup, setIsSignup] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loginFormRef = useRef<HTMLDivElement>(null);
  const signupFormRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  useEffect(()=>{
    AOS.init();
  },[])
  
  const [selectedCar, setSelectedCar] = useState<string>(
    images[0]?.src || image || '/images/cars/car-placeholder.jpg'
  );

  const handleImageClick = (src: string) => {
    if (src === selectedCar) return;
    try {
      new URL(src, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      setSelectedCar(src);
    } catch {
      setSelectedCar('/images/cars/car-placeholder.jpg');
    }
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`absolute z-10 top-1 ${styles.rightArrow} bg-white px-2 py-1 border rounded-full text-[14px] right-0`}
        onClick={onClick}
      >{'>'}</div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`absolute z-10 top-1 ${styles.leftArrow} bg-white px-2 py-1 border rounded-full text-[14px] left-[-13px]`}
        onClick={onClick}
      >{'<'}</div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true
        }
      },
      {
        breakpoint: 641,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false
        }
      }
    ]
  };

  // Function to get icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Suitcase': return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M304-172q-24.75 0-42.37-17.63Q244-207.25 244-232v-408q0-24.75 17.63-42.38Q279.25-700 304-700h88v-68q0-24.75 17.63-42.38Q427.25-828 452-828h56q24.75 0 42.38 17.62Q568-792.75 568-768v68h88q24.75 0 42.38 17.62Q716-664.75 716-640v408q0 24.75-17.62 42.37Q680.75-172 656-172v12q0 11-8.5 19.5T628-132q-11 0-19.5-8.5T600-160v-12H360v12q0 11-8.5 19.5T332-132q-11 0-19.5-8.5T304-160v-12Zm88-108h28v-312h-28v312Zm148 0h28v-312h-28v312ZM420-700h120v-68q0-14-9-23t-23-9h-56q-14 0-23 9t-9 23v68Z" /></svg>;
      case 'People': return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M52-262v-26q0-35 38-58.5t97-23.5q8 0 18 1t22 3q-8 15-11.5 30.5T212-305v43H52Zm240 0v-39q0-21.84 13-39.92Q318-359 344-372t60-19.5q34-6.5 75.6-6.5 42.4 0 76.4 6.5 34 6.5 60 19.5t39 31.08q13 18.08 13 39.92v39H292Zm456 0v-42.7q0-17.08-3.5-32.19T734-366q13-2 22.5-3t17.5-1q59 0 96.5 23.5T908-288v26H748ZM186.73-407q-20.73 0-35.23-14.69Q137-436.38 137-457q0-20 14.69-34.5T187-506q20 0 35 14.5t15 34.8q0 19.7-14.45 34.7-14.45 15-35.82 15ZM774-407q-20 0-35-15t-15-34.7q0-20.3 15-34.8 15-14.5 35.19-14.5 20.81 0 35.31 14.5Q824-477 824-457q0 20.62-14.37 35.31Q795.25-407 774-407Zm-293.65-21Q448-428 425-450.75T402-506q0-33.15 22.75-55.58Q447.5-584 480-584q33.15 0 55.58 22.32Q558-539.35 558-506.35 558-474 535.68-451q-22.33 23-55.33 23Z" /></svg>;
      case 'Gear': return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="m416-132-14-112q-21-6-46.5-20T313-294l-103 44-64-112 89-67q-2-12-3.5-25t-1.5-25q0-11 1.5-23.5T235-531l-89-67 64-110 102 43q20-17 43.5-30.5T401-716l15-112h128l14 113q26 9 45.5 20.5T644-665l106-43 64 110-93 70q4 14 4.5 25.5t.5 22.5q0 10-1 21.5t-4 28.5l91 68-64 112-104-45q-21 18-42 30.5T558-245l-14 113H416Zm62-260q37 0 62.5-25.5T566-480q0-37-25.5-62.5T478-568q-37 0-62.5 25.5T390-480q0 37 25.5 62.5T478-392Z" /></svg>;
      case 'Snow': return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M466-106v-202L310-154l-20-20 176-176v-116H350L174-290l-20-20 154-156H106v-28h202L154-650l20-20 176 176h116v-116L290-786l20-20 156 154v-202h28v202l156-154 20 20-176 176v116h116l176-176 20 20-154 156h202v28H652l154 156-20 20-176-176H494v116l176 176-20 20-156-154v202h-28Z" /></svg>;
      default: return null;
    }
  };

  // Function to render features
  const renderFeatures = (): Feature[] => {
    const features: Feature[] = [
      { icon: 'Suitcase', label: `x${luggage}` },
      { icon: 'People', label: `x${seats}` },
      { icon: 'Gear', label: transmission === 'Automatic' ? 'Auto' : 'Manual' },
    ];
    if (ac) {
      features.push({ icon: 'Snow', label: 'A/C' });
    }
    return features;
  };

  // Update total charges when any checkbox changes
  useEffect(() => {
    let total = 0;
    if (insurance) total += extraCosts.insurance;
    if (gps) total += extraCosts.gps;
    if (infantSeat) total += extraCosts.infantSeat;
    if (childBoosterSeat) total += extraCosts.childBoosterSeat;
    if (childSafetySeat) total += extraCosts.childSafetySeat;
    if (additionalDriver) total += extraCosts.additionalDriver;
    if (deliveryCharges) total += extraCosts.deliveryCharges;
    if (pickupCharges) total += extraCosts.pickupCharges;
    setTotalExtraCharges(total);
  }, [insurance, gps, infantSeat, childBoosterSeat, childSafetySeat, additionalDriver, deliveryCharges, pickupCharges]);

  const handleInfoClick = (extra: string) => {
    setSelectedExtra(extra);
    setShowInfo(true);
  };

  const closePopup = () => {
    setShowInfo(false);
    setSelectedExtra(null);
  };

  const handleGoogleAuth = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (e) {
      console.error('Google Auth Error:', e);
    }
  };

  const validateForm = (isSignupMode: boolean) => {
    const newErrors: { [key: string]: string } = {};
    if (loginMethod === 'email' || isSignupMode) {
      if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    }
    if (loginMethod === 'mobile') {
      if (!countryCode) newErrors.countryCode = 'Country code is required';
    }
    if (!password) newErrors.password = 'Password is required';
    if (isSignupMode && !countryCode) newErrors.countryCode = 'Country code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (isSignupMode: boolean) => {
    if (validateForm(isSignupMode)) {
      console.log('Form submitted:', { email, password, countryCode, loginMethod });
      if (!isSignupMode) {
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/');
      }
    }
  };

  const handleHover = () => {
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = 'blue';
      buttonRef.current.style.color = 'white';
    }
  };

  const handleLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = 'black';
      buttonRef.current.style.color = 'white';
    }
  };

  const countryCodes = [
    { value: "+93", label: "+93 (Afghanistan)" },
    { value: "+355", label: "+355 (Albania)" },
    { value: "+213", label: "+213 (Algeria)" },
    { value: "+1-684", label: "+1-684 (American Samoa)" },
    { value: "+376", label: "+376 (Andorra)" },
    { value: "+244", label: "+244 (Angola)" },
    { value: "+1-264", label: "+1-264 (Anguilla)" },
    { value: "+672", label: "+672 (Antarctica)" },
    { value: "+1-268", label: "+1-268 (Antigua and Barbuda)" },
    { value: "+54", label: "+54 (Argentina)" },
    { value: "+374", label: "+374 (Armenia)" },
    { value: "+297", label: "+297 (Aruba)" },
    { value: "+61", label: "+61 (Australia)" },
    { value: "+43", label: "+43 (Austria)" },
    { value: "+994", label: "+994 (Azerbaijan)" },
    { value: "+1-242", label: "+1-242 (Bahamas)" },
    { value: "+973", label: "+973 (Bahrain)" },
    { value: "+880", label: "+880 (Bangladesh)" },
    { value: "+1-246", label: "+1-246 (Barbados)" },
    { value: "+375", label: "+375 (Belarus)" },
    { value: "+32", label: "+32 (Belgium)" },
    { value: "+501", label: "+501 (Belize)" },
    { value: "+229", label: "+229 (Benin)" },
    { value: "+1-441", label: "+1-441 (Bermuda)" },
    { value: "+975", label: "+975 (Bhutan)" },
    { value: "+591", label: "+591 (Bolivia)" },
    { value: "+387", label: "+387 (Bosnia and Herzegovina)" },
    { value: "+267", label: "+267 (Botswana)" },
    { value: "+55", label: "+55 (Brazil)" },
    { value: "+246", label: "+246 (British Indian Ocean Territory)" },
    { value: "+1-284", label: "+1-284 (British Virgin Islands)" },
    { value: "+673", label: "+673 (Brunei)" },
    { value: "+359", label: "+359 (Bulgaria)" },
    { value: "+226", label: "+226 (Burkina Faso)" },
    { value: "+257", label: "+257 (Burundi)" },
    { value: "+855", label: "+855 (Cambodia)" },
    { value: "+237", label: "+237 (Cameroon)" },
    { value: "+1", label: "+1 (Canada)" },
    { value: "+238", label: "+238 (Cape Verde)" },
    { value: "+1-345", label: "+1-345 (Cayman Islands)" },
    { value: "+236", label: "+236 (Central African Republic)" },
    { value: "+235", label: "+235 (Chad)" },
    { value: "+56", label: "+56 (Chile)" },
    { value: "+86", label: "+86 (China)" },
    { value: "+61", label: "+61 (Christmas Island)" },
    { value: "+61", label: "+61 (Cocos Islands)" },
    { value: "+57", label: "+57 (Colombia)" },
    { value: "+269", label: "+269 (Comoros)" },
    { value: "+682", label: "+682 (Cook Islands)" },
    { value: "+506", label: "+506 (Costa Rica)" },
    { value: "+385", label: "+385 (Croatia)" },
    { value: "+53", label: "+53 (Cuba)" },
    { value: "+599", label: "+599 (Curacao)" },
    { value: "+357", label: "+357 (Cyprus)" },
    { value: "+420", label: "+420 (Czech Republic)" },
    { value: "+243", label: "+243 (Democratic Republic of the Congo)" },
    { value: "+45", label: "+45 (Denmark)" },
    { value: "+253", label: "+253 (Djibouti)" },
    { value: "+1-767", label: "+1-767 (Dominica)" },
    { value: "+1-809", label: "+1-809 (Dominican Republic)" },
    { value: "+670", label: "+670 (East Timor)" },
    { value: "+593", label: "+593 (Ecuador)" },
    { value: "+20", label: "+20 (Egypt)" },
    { value: "+503", label: "+503 (El Salvador)" },
    { value: "+240", label: "+240 (Equatorial Guinea)" },
    { value: "+291", label: "+291 (Eritrea)" },
    { value: "+372", label: "+372 (Estonia)" },
    { value: "+251", label: "+251 (Ethiopia)" },
    { value: "+500", label: "+500 (Falkland Islands)" },
    { value: "+298", label: "+298 (Faroe Islands)" },
    { value: "+679", label: "+679 (Fiji)" },
    { value: "+358", label: "+358 (Finland)" },
    { value: "+33", label: "+33 (France)" },
    { value: "+689", label: "+689 (French Polynesia)" },
    { value: "+241", label: "+241 (Gabon)" },
    { value: "+220", label: "+220 (Gambia)" },
    { value: "+995", label: "+995 (Georgia)" },
    { value: "+49", label: "+49 (Germany)" },
    { value: "+233", label: "+233 (Ghana)" },
    { value: "+350", label: "+350 (Gibraltar)" },
    { value: "+30", label: "+30 (Greece)" },
    { value: "+299", label: "+299 (Greenland)" },
    { value: "+1-473", label: "+1-473 (Grenada)" },
    { value: "+1-671", label: "+1-671 (Guam)" },
    { value: "+502", label: "+502 (Guatemala)" },
    { value: "+44-1481", label: "+44-1481 (Guernsey)" },
    { value: "+224", label: "+224 (Guinea)" },
    { value: "+245", label: "+245 (Guinea-Bissau)" },
    { value: "+592", label: "+592 (Guyana)" },
    { value: "+509", label: "+509 (Haiti)" },
    { value: "+504", label: "+504 (Honduras)" },
    { value: "+852", label: "+852 (Hong Kong)" },
    { value: "+36", label: "+36 (Hungary)" },
    { value: "+354", label: "+354 (Iceland)" },
    { value: "+91", label: "+91 (India)" },
    { value: "+62", label: "+62 (Indonesia)" },
    { value: "+98", label: "+98 (Iran)" },
    { value: "+964", label: "+964 (Iraq)" },
    { value: "+353", label: "+353 (Ireland)" },
    { value: "+44-1624", label: "+44-1624 (Isle of Man)" },
    { value: "+972", label: "+972 (Israel)" },
    { value: "+39", label: "+39 (Italy)" },
    { value: "+225", label: "+225 (Ivory Coast)" },
    { value: "+1-876", label: "+1-876 (Jamaica)" },
    { value: "+81", label: "+81 (Japan)" },
    { value: "+44-1534", label: "+44-1534 (Jersey)" },
    { value: "+962", label: "+962 (Jordan)" },
    { value: "+7", label: "+7 (Kazakhstan)" },
    { value: "+254", label: "+254 (Kenya)" },
    { value: "+686", label: "+686 (Kiribati)" },
    { value: "+383", label: "+383 (Kosovo)" },
    { value: "+965", label: "+965 (Kuwait)" },
    { value: "+996", label: "+996 (Kyrgyzstan)" },
    { value: "+856", label: "+856 (Laos)" },
    { value: "+371", label: "+371 (Latvia)" },
    { value: "+961", label: "+961 (Lebanon)" },
    { value: "+266", label: "+266 (Lesotho)" },
    { value: "+231", label: "+231 (Liberia)" },
    { value: "+218", label: "+218 (Libya)" },
    { value: "+423", label: "+423 (Liechtenstein)" },
    { value: "+370", label: "+370 (Lithuania)" },
    { value: "+352", label: "+352 (Luxembourg)" },
    { value: "+853", label: "+853 (Macau)" },
    { value: "+389", label: "+389 (Macedonia)" },
    { value: "+261", label: "+261 (Madagascar)" },
    { value: "+265", label: "+265 (Malawi)" },
    { value: "+60", label: "+60 (Malaysia)" },
    { value: "+960", label: "+960 (Maldives)" },
    { value: "+223", label: "+223 (Mali)" },
    { value: "+356", label: "+356 (Malta)" },
    { value: "+692", label: "+692 (Marshall Islands)" },
    { value: "+222", label: "+222 (Mauritania)" },
    { value: "+230", label: "+230 (Mauritius)" },
    { value: "+262", label: "+262 (Mayotte)" },
    { value: "+52", label: "+52 (Mexico)" },
    { value: "+691", label: "+691 (Micronesia)" },
    { value: "+373", label: "+373 (Moldova)" },
    { value: "+377", label: "+377 (Monaco)" },
    { value: "+976", label: "+976 (Mongolia)" },
    { value: "+382", label: "+382 (Montenegro)" },
    { value: "+1-664", label: "+1-664 (Montserrat)" },
    { value: "+212", label: "+212 (Morocco)" },
    { value: "+258", label: "+258 (Mozambique)" },
    { value: "+95", label: "+95 (Myanmar)" },
    { value: "+264", label: "+264 (Namibia)" },
    { value: "+674", label: "+674 (Nauru)" },
    { value: "+977", label: "+977 (Nepal)" },
    { value: "+31", label: "+31 (Netherlands)" },
    { value: "+599", label: "+599 (Netherlands Antilles)" },
    { value: "+687", label: "+687 (New Caledonia)" },
    { value: "+64", label: "+64 (New Zealand)" },
    { value: "+505", label: "+505 (Nicaragua)" },
    { value: "+227", label: "+227 (Niger)" },
    { value: "+234", label: "+234 (Nigeria)" },
    { value: "+683", label: "+683 (Niue)" },
    { value: "+850", label: "+850 (North Korea)" },
    { value: "+1-670", label: "+1-670 (Northern Mariana Islands)" },
    { value: "+47", label: "+47 (Norway)" },
    { value: "+968", label: "+968 (Oman)" },
    { value: "+92", label: "+92 (Pakistan)" },
    { value: "+680", label: "+680 (Palau)" },
    { value: "+970", label: "+970 (Palestine)" },
    { value: "+507", label: "+507 (Panama)" },
    { value: "+675", label: "+675 (Papua New Guinea)" },
    { value: "+595", label: "+595 (Paraguay)" },
    { value: "+51", label: "+51 (Peru)" },
    { value: "+63", label: "+63 (Philippines)" },
    { value: "+64", label: "+64 (Pitcairn)" },
    { value: "+48", label: "+48 (Poland)" },
    { value: "+351", label: "+351 (Portugal)" },
    { value: "+1-787", label: "+1-787 (Puerto Rico)" },
    { value: "+974", label: "+974 (Qatar)" },
    { value: "+242", label: "+242 (Republic of the Congo)" },
    { value: "+262", label: "+262 (Reunion)" },
    { value: "+40", label: "+40 (Romania)" },
    { value: "+7", label: "+7 (Russia)" },
    { value: "+250", label: "+250 (Rwanda)" },
    { value: "+590", label: "+590 (Saint Barthelemy)" },
    { value: "+290", label: "+290 (Saint Helena)" },
    { value: "+1-869", label: "+1-869 (Saint Kitts and Nevis)" },
    { value: "+1-758", label: "+1-758 (Saint Lucia)" },
    { value: "+590", label: "+590 (Saint Martin)" },
    { value: "+508", label: "+508 (Saint Pierre and Miquelon)" },
    { value: "+1-784", label: "+1-784 (Saint Vincent and the Grenadines)" },
    { value: "+685", label: "+685 (Samoa)" },
    { value: "+378", label: "+378 (San Marino)" },
    { value: "+239", label: "+239 (Sao Tome and Principe)" },
    { value: "+966", label: "+966 (Saudi Arabia)" },
    { value: "+221", label: "+221 (Senegal)" },
    { value: "+381", label: "+381 (Serbia)" },
    { value: "+248", label: "+248 (Seychelles)" },
    { value: "+232", label: "+232 (Sierra Leone)" },
    { value: "+65", label: "+65 (Singapore)" },
    { value: "+1-721", label: "+1-721 (Sint Maarten)" },
    { value: "+421", label: "+421 (Slovakia)" },
    { value: "+386", label: "+386 (Slovenia)" },
    { value: "+677", label: "+677 (Solomon Islands)" },
    { value: "+252", label: "+252 (Somalia)" },
    { value: "+27", label: "+27 (South Africa)" },
    { value: "+82", label: "+82 (South Korea)" },
    { value: "+211", label: "+211 (South Sudan)" },
    { value: "+34", label: "+34 (Spain)" },
    { value: "+94", label: "+94 (Sri Lanka)" },
    { value: "+249", label: "+249 (Sudan)" },
    { value: "+597", label: "+597 (Suriname)" },
    { value: "+47", label: "+47 (Svalbard and Jan Mayen)" },
    { value: "+268", label: "+268 (Swaziland)" },
    { value: "+46", label: "+46 (Sweden)" },
    { value: "+41", label: "+41 (Switzerland)" },
    { value: "+963", label: "+963 (Syria)" },
    { value: "+886", label: "+886 (Taiwan)" },
    { value: "+992", label: "+992 (Tajikistan)" },
    { value: "+255", label: "+255 (Tanzania)" },
    { value: "+66", label: "+66 (Thailand)" },
    { value: "+228", label: "+228 (Togo)" },
    { value: "+690", label: "+690 (Tokelau)" },
    { value: "+676", label: "+676 (Tonga)" },
    { value: "+1-868", label: "+1-868 (Trinidad and Tobago)" },
    { value: "+216", label: "+216 (Tunisia)" },
    { value: "+90", label: "+90 (Turkey)" },
    { value: "+993", label: "+993 (Turkmenistan)" },
    { value: "+1-649", label: "+1-649 (Turks and Caicos Islands)" },
    { value: "+688", label: "+688 (Tuvalu)" },
    { value: "+1-340", label: "+1-340 (U.S. Virgin Islands)" },
    { value: "+256", label: "+256 (Uganda)" },
    { value: "+380", label: "+380 (Ukraine)" },
    { value: "+971", label: "+971 (United Arab Emirates)" },
    { value: "+44", label: "+44 (United Kingdom)" },
    { value: "+1", label: "+1 (United States)" },
    { value: "+598", label: "+598 (Uruguay)" },
    { value: "+998", label: "+998 (Uzbekistan)" },
    { value: "+678", label: "+678 (Vanuatu)" },
    { value: "+379", label: "+379 (Vatican)" },
    { value: "+58", label: "+58 (Venezuela)" },
    { value: "+84", label: "+84 (Vietnam)" },
    { value: "+681", label: "+681 (Wallis and Futuna)" },
    { value: "+212", label: "+212 (Western Sahara)" },
    { value: "+967", label: "+967 (Yemen)" },
    { value: "+260", label: "+260 (Zambia)" },
    { value: "+263", label: "+263 (Zimbabwe)" }
  ];


  return (
    <>
      {bookingForm && localStorage.getItem('isLoggedIn') && (
        <BookingForm
          visible={bookingForm}
          onClose={() => setBookingForm(false)}
          car={{ name, image: selectedCar, price }}
        />
      )}
      {bookingForm && !localStorage.getItem('isLoggedIn') && (
        <section className='justify-center top-0 bottom-0 right-0 left-0 backdrop-blur-[1px] backdrop-brightness-90 z-[1000] fixed justify-items-center'>
          <section
            className="w-full max-w-[500px] relative top-[90px] left-[-20px] justify-center justify-self-center mx-auto"
          >
            <button className='absolute top-1 right-1' onClick={() => setBookingForm(false)}><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#434343"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></button>
            <div className="bg-white rounded-[20px] shadow-xl p-6 overflow-hidden">
              <div className="flex mb-8">
                <button
                  className={`flex-1 py-4 bg-gray-100 text-gray-600 font-semibold ${!isSignup ? 'bg-cyan-400 text-white rounded-t-[10px]' : ''
                    }`}
                  style={{ backgroundColor: !isSignup ? '#155dfc' : '#f3f4f6', borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }}
                  onClick={() => setIsSignup(false)}
                  aria-label="Login tab"
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-4 bg-gray-100 text-gray-600 font-semibold ${isSignup ? 'bg-cyan-400 text-white rounded-t-[10px]' : ''
                    }`}
                  style={{ backgroundColor: isSignup ? '#155dfc' : '#f3f4f6', borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }}
                  onClick={() => setIsSignup(true)}
                  aria-label="Signup tab"
                >
                  Signup
                </button>
              </div>
              <div className="">
                {!isSignup ? (
                  <div ref={loginFormRef}>
                    <div className="flex flex-row gap-2 mb-6">
                      <label className="flex items-center gap-2 text-gray-600 text-base">
                        <input
                          type="radio"
                          value="email"
                          checked={loginMethod === 'email'}
                          onChange={() => setLoginMethod('email')}
                        />
                        Login via Email
                      </label>
                      <label className="flex items-center gap-2 text-gray-600 text-base">
                        <input
                          type="radio"
                          value="mobile"
                          checked={loginMethod === 'mobile'}
                          onChange={() => setLoginMethod('mobile')}
                        />
                        Login via Mobile
                      </label>
                    </div>
                    {loginMethod === 'email' ? (
                      <div className="mb-6">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <span className="text-red-500 text-xs mt-1">{errors.email}</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex gap-4 mb-6 sm:flex-row flex-col">
                        <select
                          name="countryCode"
                          className="sm:flex-[0_0_30%] sm:min-w-[100px] w-full p-3 border border-gray-300 rounded-lg bg-white text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                        >
                          <option value="">Country Code</option>
                          {countryCodes.map((country) => (
                            <option key={country.label} value={country.value}>
                              {country.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          name="number"
                          placeholder="Mobile Number"
                          className="flex-1 p-3 border border-gray-300 rounded-lg text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300"
                        />
                        {errors.countryCode && (
                          <span className="text-red-500 text-xs mt-1">{errors.countryCode}</span>
                        )}
                      </div>
                    )}
                    <div className="mb-6">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <span className="text-red-500 text-xs mt-1">{errors.password}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center mb-6 text-sm text-gray-600 sm:flex-row flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                      </div>
                      <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 transition-colors">
                        Forgot Password?
                      </Link>
                    </div>
                    <button
                      type="button"
                      className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold text-base hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      onClick={() => handleSubmit(false)}
                      style={{ backgroundColor: '#155dfc' }}
                      aria-label="Login"
                    >
                      Login
                    </button>
                    <hr className="my-6 border-gray-300" />
                    <p className="text-center text-gray-600 text-sm -translate-y-3 bg-white px-4 w-fit mx-auto">
                      Or Login with Social Profile
                    </p>
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg font-semibold text-base hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      aria-label="Continue with Google"
                    >
                      <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        G
                      </span>
                      Continue with Google
                    </button>
                  </div>
                ) : (
                  <div ref={signupFormRef}>
                    <div className="mb-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <span className="text-red-500 text-xs mt-1">{errors.email}</span>
                      )}
                    </div>
                    <div className="mb-6">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <span className="text-red-500 text-xs mt-1">{errors.password}</span>
                      )}
                    </div>
                    <div className="flex gap-4 mb-6 sm:flex-row flex-col">
                      <select
                        name="countryCode"
                        className="sm:flex-[0_0_30%] sm:min-w-[100px] w-full p-3 border border-gray-300 rounded-lg bg-white text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        <option value="">Country Code</option>
                        {countryCodes.map((country) => (
                          <option key={country.label} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        name="number"
                        placeholder="Mobile Number"
                        className="flex-1 p-3 border border-gray-300 rounded-lg text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300"
                      />
                      {errors.countryCode && (
                        <span className="text-red-500 text-xs mt-1">{errors.countryCode}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="w-full p-3 bg-cyan-600 text-white rounded-lg font-semibold text-base hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      style={{ backgroundColor: '#155dfc' }}
                      onClick={() => handleSubmit(true)}
                      aria-label="Signup"
                    >
                      Signup
                    </button>
                    <hr className="my-6 border-gray-300" />
                    <p className="text-center text-gray-600 text-sm -translate-y-3 bg-white px-4 w-fit mx-auto">
                      Or Signup with Social Profile
                    </p>
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg font-semibold text-base hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      aria-label="Continue with Google"
                    >
                      <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        G
                      </span>
                      Continue with Google
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>
      )}
      <div className={styles.carCard} style={{ marginBottom: '20px' }}>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <div className={`fixed inset-0 z-[2000] flex items-center justify-center transition-opacity duration-300 ${showInfo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closePopup}></div>
          <div className={`relative bg-white rounded-xl shadow-2xl p-6 max-w-md w-full transform transition-all duration-300 ${showInfo ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closePopup}>
              ×
            </button>
            {selectedExtra && extraContent[selectedExtra] && (
              <>
                <img
                  src={extraContent[selectedExtra].image}
                  alt={selectedExtra}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold mb-2 capitalize">{selectedExtra.replace(/([A-Z])/g, ' $1')}</h3>
                <p className="text-gray-600">{extraContent[selectedExtra].description}</p>
              </>
            )}
          </div>
        </div>
        {/* Left */}
        <div className={`${styles.left} max-md:w-full`}>
          <img
            src={selectedCar}
            alt="Car"
            width={250}
            height={200}
            className={styles.image}
          />
          <ul className={`float-left justify-between ${styles.slider} z-2 max-lg:h-[120px] max-lg:left-0 h-[60px] max-sm:left-[-12%] relative left-[-3%] top-[5%] mt-1 max-sm:gap-0 rounded-lg w-full`}>
            <Slider {...settings}>
              {images.map((img) => (
                <li
                  key={img.id}
                  className={`max-sm:p-0 mx-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out`}
                  onClick={() => handleImageClick(img.src)}
                >
                  <img
                    src={img.src}
                    className={`h-8 max-lg:h-[30px] max-sm:h-[40px] max-md:h-[60px] object-cover rounded-sm hover:scale-105 transition-transform duration-300 ${selectedCar === img.src ? 'border-none' : 'border-none'}`}
                    alt={img.alt}
                  />
                </li>
              ))}
            </Slider>
          </ul>
          <div className='justify-items-start justify-start'>
            <DetailSection logo={logo} />
          </div>
        </div>

        {/* Middle Flip Section */}
        <div className={`${styles.middle} relative max-lg:top-[-60px] max-lg:mb-5 max-md:mb-0 max-sm:mb-50 ${styles.middleFlipWrapper}`} style={{ marginTop: '-25px' }}>
          <div className={`${styles.middleFlipper} ${carDetail ? styles.flipped : ''}`}>
            {/* Front Side */}
            <div className={`${styles.middleContent} h-full ${styles.front}`}>
              <div className={`${styles.location}`}>
                <span className="px-4 text-white py-[5px] rounded-lg font-medium bg-[#ff0000] bg-opacity-50">
                  Sedan
                </span>
                <span className="px-4 text-white py-[5px] ml-2 rounded-lg font-medium bg-[#ffc107c4] bg-opacity-50">
                  Featured
                </span>
              </div>
              <div className={`${styles.titleRow} mt-2 translate-y-[0px]`} style={{ marginTop: '0px' }}>
                <h4 className='mb-0 text-white' style={{ marginTop: '5px' }}>{name}</h4>

              </div>
              <div className='text-[#ff6b6b]'>{availability} Cars Available for Booking.</div>
              <p className={`${styles.subtext} text-white`}>Specification</p>
              <div className={`${styles.features}`} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <span className={`${styles.featureItem} items-center content-center text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M304-172q-24.75 0-42.37-17.63Q244-207.25 244-232v-408q0-24.75 17.63-42.38Q279.25-700 304-700h88v-68q0-24.75 17.63-42.38Q427.25-828 452-828h56q24.75 0 42.38 17.62Q568-792.75 568-768v68h88q24.75 0 42.38 17.62Q716-664.75 716-640v408q0 24.75-17.62 42.37Q680.75-172 656-172v12q0 11-8.5 19.5T628-132q-11 0-19.5-8.5T600-160v-12H360v12q0 11-8.5 19.5T332-132q-11 0-19.5-8.5T304-160v-12Zm88-108h28v-312h-28v312Zm148 0h28v-312h-28v312ZM420-700h120v-68q0-14-9-23t-23-9h-56q-14 0-23 9t-9 23v68Z" /></svg>x {luggage}
                </span>
                <span className={`${styles.featureItem} items-center content-center text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M52-262v-26q0-35 38-58.5t97-23.5q8 0 18 1t22 3q-8 15-11.5 30.5T212-305v43H52Zm240 0v-39q0-21.84 13-39.92Q318-359 344-372t60-19.5q34-6.5 75.6-6.5 42.4 0 76.4 6.5 34 6.5 60 19.5t39 31.08q13 18.08 13 39.92v39H292Zm456 0v-42.7q0-17.08-3.5-32.19T734-366q13-2 22.5-3t17.5-1q59 0 96.5 23.5T908-288v26H748ZM186.73-407q-20.73 0-35.23-14.69Q137-436.38 137-457q0-20 14.69-34.5T187-506q20 0 35 14.5t15 34.8q0 19.7-14.45 34.7-14.45 15-35.82 15ZM774-407q-20 0-35-15t-15-34.7q0-20.3 15-34.8 15-14.5 35.19-14.5 20.81 0 35.31 14.5Q824-477 824-457q0 20.62-14.37 35.31Q795.25-407 774-407Zm-293.65-21Q448-428 425-450.75T402-506q0-33.15 22.75-55.58Q447.5-584 480-584q33.15 0 55.58 22.32Q558-539.35 558-506.35 558-474 535.68-451q-22.33 23-55.33 23Z" /></svg>x {seats}
                </span>
                <span className={`${styles.featureItem} items-center content-center text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="m416-132-14-112q-21-6-46.5-20T313-294l-103 44-64-112 89-67q-2-12-3.5-25t-1.5-25q0-11 1.5-23.5T235-531l-89-67 64-110 102 43q20-17 43.5-30.5T401-716l15-112h128l14 113q26 9 45.5 20.5T644-665l106-43 64 110-93 70q4 14 4.5 25.5t.5 22.5q0 10-1 21.5t-4 28.5l91 68-64 112-104-45q-21 18-42 30.5T558-245l-14 113H416Zm62-260q37 0 62.5-25.5T566-480q0-37-25.5-62.5T478-568q-37 0-62.5 25.5T390-480q0 37 25.5 62.5T478-392Z" /></svg> {transmission}
                </span>
                <span className={`${styles.featureItem} items-center content-center text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M466-106v-202L310-154l-20-20 176-176v-116H350L174-290l-20-20 154-156H106v-28h202L154-650l20-20 176 176h116v-116L290-786l20-20 156 154v-202h28v202l156-154 20 20-176 176v116h116l176-176 20 20-154 156h202v28H652l154 156-20 20-176-176H494v116l176 176-20 20-156-154v202h-28Z" /></svg> A/C
                </span>
              </div>
              <div className={`${styles.titleRow}`}>
                <span className={`relative text-white text-[14px]`}>Features</span>
              </div>
              <ul className={`${styles.features} ${styles.backFeatures} text-white relative left-[-1px]`}>
                <li className='flex items-center mb-2 content-center'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffff"><path d="M480-564.5q-27.5 0-45.75-18.5T416-629q0-27.5 18.49-45.75T480.53-693q27.14 0 45.55 18.37 18.42 18.37 18.42 45.75T526-583q-18.5 18.5-46 18.5Zm-244.5 130q-23.72 0-40.61-16.89T178-492v-273.5q0-23.72 16.89-40.61T235.5-823h490q23.72 0 40.61 16.89T783-765.5V-492q0 23.72-16.89 40.61T725.5-434.5h-490ZM262-460h437q0-24.5 17.18-41.75Q733.37-519 757.5-519v-219.5q-24.5 0-41.5-17.38-17-17.37-17-41.62H262q0 24.5-17.18 41.75-17.19 17.25-41.32 17.25V-519q24.5 0 41.5 17.37 17 17.38 17 41.63Zm-58.5 0v-337.5V-460ZM481-137l121.5-121.5-17.5-17-91 91v-171h-26.5v171l-91.5-91-17 17L481-137Z" /></svg><span className='ml-1 w-[65px]'>Deposit:</span> 1000 AED</li>
                <li className='flex items-center mb-2 content-center'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffff"><path d="M424.15-346.15q21.31 21.3 54.89 20.23 33.57-1.08 49.27-24.23l217.07-314.46-315.23 216.3q-23.53 15.7-25.42 48.27-1.88 32.58 19.42 53.89ZM480-780q57.08 0 106.96 14.96 49.89 14.96 96.35 45.27l-56.39 36.46q-34.15-18.15-70.8-27.42Q519.46-720 480-720q-133 0-226.5 93.5T160-400q0 42 11.5 83t32.5 77h552q23-38 33.5-79t10.5-85q0-36-8.88-72.88-8.89-36.89-27.43-70.04l36.46-56.39q29.62 48.54 44.43 97.12 14.8 48.58 15.42 100.96.61 54.31-12.23 102.65-12.85 48.35-38.69 94.58-7.93 13-22.31 20.5Q772.38-180 756-180H204q-16 0-30.19-7.69-14.19-7.7-22.89-21.85-22.92-40-36.92-87.23Q100-344 100-400q0-78.38 29.74-147.37 29.74-68.99 81.19-120.85 51.46-51.86 120.99-81.82Q401.46-780 480-780Zm4.31 295.69Z" /></svg><span className='ml-1 w-[65px]'>Mileage:</span> 4500 KM</li>
                <li className='flex items-center mb-2 content-center'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffff"><path d="M480-100.77q-129.77-35.39-214.88-152.77Q180-370.92 180-516v-230.15l300-112.31 300 112.31V-516q0 145.08-85.12 262.46Q609.77-136.16 480-100.77Zm0-63.23q104-33 172-132t68-220v-189l-240-89.62L240-705v189q0 121 68 220t172 132Zm0-315.62Z" /></svg><span className='ml-1 w-[65px]'>Insurance:</span> Comprehensive</li>
                <li className='flex items-center mb-2 content-center'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffff"><path d="M533.25-473q-27.25 0-45.75-18.5t-18.5-46q0-27.5 18.49-45.75t46.04-18.25q27.14 0 45.55 18.37 18.42 18.37 18.42 45.75t-18.17 45.88Q561.17-473 533.25-473ZM298-343q-23.72 0-40.61-16.89T240.5-400.5V-674q0-23.72 16.89-40.61T298-731.5h471q23.72 0 40.61 16.89T826.5-674v273.5q0 23.72-16.89 40.61T769-343H298Zm26.5-25.5h418q0-24.5 17.18-41.75Q776.87-427.5 801-427.5V-647q-24.5 0-41.5-17.38-17-17.37-17-41.62h-418q0 24.5-17.18 41.75Q290.13-647 266-647v219.5q24.5 0 41.5 17.37 17 17.38 17 41.63Zm385 132H191q-23.72 0-40.61-16.89T133.5-294v-320.5H159V-294q0 12 10 22t22 10h518.5v25.5ZM298-368.5h-32V-706h32q-13 0-22.5 9.5T266-674v273.5q0 13 9.5 22.5t22.5 9.5Z" /></svg><span className='ml-1 w-[65px]'>Payment:</span> Credit Card</li>
                <li className='flex items-center mb-2 content-center'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffff"><path d="m699.08-135.85-252-253.23q-21.16 9.16-43.01 14.12-21.86 4.96-46.38 4.96-95.83 0-162.91-67.08-67.09-67.09-67.09-162.92 0-31 7.89-59.27 7.88-28.27 22.42-53.81l143.69 142.93L387.54-656 245.39-798.92q25.53-14.54 53.45-22.81t58.85-8.27q95.84 0 162.92 67.08 67.08 67.09 67.08 162.92 0 25.31-4.77 47.15-4.77 21.85-14.31 42.24l253.24 252q10.46 10.59 10.46 25.6 0 15.01-10.38 25.39l-72.63 72.63q-10.38 10.37-25.07 9.99-14.69-.39-25.15-10.85Zm25.54-59.99 36.61-36.62-266.38-266.39q16.84-20.77 24.84-47.27 8-26.5 8-53.88 0-66.54-47.54-117.77Q432.61-769 359.84-768l86.7 86.69q10.84 10.85 10.84 25.31 0 14.46-10.84 25.31L327-511.15q-10.85 10.84-25.31 10.84-14.46 0-25.31-10.84l-86.69-86.7q.15 77 51.77 122.43Q293.08-430 357.69-430q26.26 0 52.52-7.81 26.25-7.8 48.02-24.42l266.39 266.39ZM472-486.46Z" /></svg><span className='ml-1 w-[65px]'>Engine:</span> 1.5 L</li>
                <li className='flex items-center mb-2 content-center'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffff"><path d="M479.23-100q-77.77 0-146.92-29.96-69.16-29.96-120.77-81.58-51.62-51.61-81.58-120.96T100-480q0-79.15 30.77-148.5t83.58-120.65q52.8-51.31 123.54-81.08Q408.62-860 488.77-860q75 0 142.15 25.58 67.16 25.58 117.96 70.81 50.81 45.23 80.96 107.5Q860-593.85 860-521.08q0 103.85-61.73 162.46Q736.54-300 640-300h-72.46q-17.08 0-27.31 11.15Q530-277.69 530-262.46q0 18.54 15 38.54T560-178q0 39.61-21.92 58.81Q516.15-100 479.23-100Zm.77-380Zm-220 30q21.38 0 35.69-14.31Q310-478.62 310-500q0-21.38-14.31-35.69Q281.38-550 260-550q-21.38 0-35.69 14.31Q210-521.38 210-500q0 21.38 14.31 35.69Q238.62-450 260-450Zm120-160q21.38 0 35.69-14.31Q430-638.62 430-660q0-21.38-14.31-35.69Q401.38-710 380-710q-21.38 0-35.69 14.31Q330-681.38 330-660q0 21.38 14.31 35.69Q358.62-610 380-610Zm200 0q21.38 0 35.69-14.31Q630-638.62 630-660q0-21.38-14.31-35.69Q601.38-710 580-710q-21.38 0-35.69 14.31Q530-681.38 530-660q0 21.38 14.31 35.69Q558.62-610 580-610Zm120 160q21.38 0 35.69-14.31Q750-478.62 750-500q0-21.38-14.31-35.69Q721.38-550 700-550q-21.38 0-35.69 14.31Q650-521.38 650-500q0 21.38 14.31 35.69Q678.62-450 700-450ZM479.23-160q9.77 0 15.27-4.81T500-178q0-14-15-31.46t-15-54.69q0-42.77 29-69.31T570-360h70q70.62 0 115.31-41.38Q800-442.77 800-521.08q0-121.38-93.08-200.15Q613.85-800 488.77-800q-137.15 0-232.96 93T160-480q0 133 93.5 226.5T479.23-160Z" /></svg><span className='ml-1 w-[65px]'>Colors:</span> <input type="color" name="" className='rounded-full w-4 h-4 translate-x-[4px]' id="" disabled /></li>
                <li className='flex items-center mb-2 content-center'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffff"><path d="M180-140v-607.69Q180-778 201-799q21-21 51.31-21h215.38Q498-820 519-799q21 21 21 51.31v260h38.46q29.83 0 51.07 21.24 21.24 21.24 21.24 51.06v181.54q0 19.31 13.42 32.73 13.42 13.43 32.73 13.43 19.31 0 32.73-13.43 13.43-13.42 13.43-32.73v-280.3q-9 5.38-19 7.46-10 2.07-21 2.07-36.83 0-62.27-25.43-25.43-25.43-25.43-62.26 0-29.69 16.93-52.88 16.92-23.19 44.77-31.12l-90.16-90.15L620.46-800l142.61 140.16q13.47 13.46 20.58 31.19 7.12 17.73 7.12 36.34v358.46q0 39.42-27.2 66.63Q736.38-140 697-140q-39.39 0-66.66-27.22-27.26-27.21-27.26-66.63v-193.84q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H540v300H180Zm60-410h240v-197.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-550Zm463.08-2.31q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5ZM240-200h240v-290H240v290Zm240 0H240h240Z" /></svg><span className='ml-1 w-[65px]'>Fuel:</span> Level to Level</li>
                <li className='flex items-center mb-2 content-center'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffff"><path d="M360-360v-400 560-160Zm-60 30h60v117.69q0 5.39 3.46 8.85t8.85 3.46h215.38q5.39 0 8.85-3.46t3.46-8.85v-535.38q0-5.39-3.46-8.85t-8.85-3.46H372.31q-5.39 0-8.85 3.46t-3.46 8.85V-390h-60v-357.69q0-29.83 21.24-51.07Q342.48-820 372.31-820h215.38q29.83 0 51.07 21.24Q660-777.52 660-747.69v535.38q0 29.83-21.24 51.07Q617.52-140 587.69-140H372.31q-29.83 0-51.07-21.24Q300-182.48 300-212.31V-330Zm180-234.62q14.69 0 25.04-10.34 10.34-10.35 10.34-25.04t-10.34-25.04q-10.35-10.34-25.04-10.34t-25.04 10.34q-10.34 10.35-10.34 25.04t10.34 25.04q10.35 10.34 25.04 10.34ZM789.99-610q-12.76 0-21.37-8.63Q760-627.25 760-640v-160q0-12.75 8.63-21.37 8.63-8.63 21.38-8.63 12.76 0 21.37 8.63Q820-812.75 820-800v160q0 12.75-8.63 21.37-8.63 8.63-21.38 8.63Zm-572.3 280q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37 8.62-8.62 21.37-8.62h267.7q12.74 0 21.37 8.63 8.62 8.63 8.62 21.38 0 12.76-8.62 21.37-8.63 8.62-21.37 8.62h-267.7Z" /></svg><span className='ml-1 w-[65px]'>Doors:</span> 4</li>
              </ul>
              <span
                className={`${styles.detailBtn} ${styles.detailBtnMore} text-white flex items-center content-center absolute translate-y-[-9px] right-[-5.5%]`}
                onClick={() => setCarDetail((prev) => !prev)}
              ><span className=''>More </span>
                <span className='text-[#0080F6]'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#0080F6"><path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z" /></svg>
                </span>
              </span>
            </div>

            {/* Back Side (Details) */}
            <div className={`${styles.middleContent} bg-transparent text-white ${styles.back}`}>
              <p className={`${styles.subtext} font-light text-white relative top-[2px] left-[-4px]`}>Rental Charges</p>
              <div className={`flex flex-col pb-2 md:w-[45%] relative`}>
                <div className='block mb-[2px] text-[12px] font-medium'><span>30 Days :</span><span className='float-right '><span className='theme-text-color pr-2'>3000.90</span>AED</span></div>
                <div className='block mb-[2px] text-[12px] font-medium'><span>15 Days :</span><span className='float-right '><span className='theme-text-color pr-2'>3000.90</span>AED</span></div>
                <div className='block mb-[2px] text-[12px] font-medium'><span>7 Days :</span><span className='float-right '><span className='theme-text-color pr-2'>3000.90</span>AED</span></div>
                <div className='block text-[12px] font-medium'><span>3 Days :</span><span className='float-right '><span className='theme-text-color pr-2'>3000.90</span>AED</span></div>
              </div>
              <p className={`${styles.subtext} font-light relative text-white left-[-4px]`}>Extra Charges</p>
              <ul className={`${styles.features} ${styles.backFeatures} text-white ${styles.switchFeatures} relative left-[-4px]`}>
                <li className='flex items-center text-[12px] mb-2 content-center'>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={insurance} onChange={() => setInsurance(prev => !prev)} />
                    <span className={styles.sliderBox}></span>
                  </label>
                  <span className='w-[100px]'>Full Insurance:</span>350 AED <span className='ml-[1px] cursor-pointer' onClick={() => handleInfoClick('insurance')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="12px" fill="#ffff"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span>
                </li>
                <li className='flex items-center text-[12px] mb-2 content-center'>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={gps} onChange={() => setGps(prev => !prev)} />
                    <span className={styles.sliderBox}></span>
                  </label>
                  <span className='w-[100px]'>GPS Navigation:</span>300 AED <span className='ml-[1px] cursor-pointer' onClick={() => handleInfoClick('gps')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="12px" fill="#ffff"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span>
                </li>
                <li className='flex items-center text-[12px] mb-2 content-center'>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={infantSeat} onChange={() => setInfantSeat(prev => !prev)} />
                    <span className={styles.sliderBox}></span>
                  </label>
                  <span className='w-[100px]'>Infant Seat:</span>300 AED <span className='ml-[1px] cursor-pointer' onClick={() => handleInfoClick('infantSeat')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="12px" fill="#ffff"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span>
                </li>
                <li className='flex items-center text-[12px] mb-2 content-center'>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={childBoosterSeat} onChange={() => setChildBoosterSeat(prev => !prev)} />
                    <span className={styles.sliderBox}></span>
                  </label>
                  <span className='w-[100px]'>Child Booster:</span>300 AED <span className='ml-[1px] cursor-pointer' onClick={() => handleInfoClick('childBoosterSeat')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="12px" fill="#ffff"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span>
                </li>
                <li className='flex items-center text-[12px] mb-2 content-center'>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={childSafetySeat} onChange={() => setChildSafetySeat(prev => !prev)} />
                    <span className={styles.sliderBox}></span>
                  </label>
                  <span className='w-[100px]'>Child Safety:</span>300 AED <span className='ml-[1px] cursor-pointer' onClick={() => handleInfoClick('childSafetySeat')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="12px" fill="#ffff"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span>
                </li>
                <li className='flex items-center text-[12px] mb-2 content-center'>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={additionalDriver} onChange={() => setAdditionalDriver(prev => !prev)} />
                    <span className={styles.sliderBox}></span>
                  </label>
                  <span className='w-[100px]'>Additional Driver:</span>0 AED<span className='ml-[1px] cursor-pointer' onClick={() => handleInfoClick('additionalDriver')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="12px" fill="#ffff"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span>
                </li>
                <li className='flex items-center text-[12px] mb-2 content-center'>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={deliveryCharges} onChange={() => setDeliveryCharges(prev => !prev)} />
                    <span className={styles.sliderBox}></span>
                  </label>
                  <span className='w-[100px]'>Delivery:</span>0 AED <span className='ml-[1px] cursor-pointer' onClick={() => handleInfoClick('deliveryCharges')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="12px" fill="#ffff"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span>
                </li>
                <li className='flex items-center text-[12px] mb-2 content-center'>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={pickupCharges} onChange={() => setPickupCharges(prev => !prev)} />
                    <span className={styles.sliderBox}></span>
                  </label>
                  <span className='w-[100px]'>Pickup:</span>0 AED <span className='ml-[1px] cursor-pointer' onClick={() => handleInfoClick('pickupCharges')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="12px" fill="#ffff"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span>
                </li>
              </ul>
              <div className='flex absolute right-0 text-[12px] mb-2 translate-y-[-14px] items-center content-center font-bold'>Total: {totalExtraCharges} AED <span className='ml-[4px] cursor-pointer' onClick={() => handleInfoClick('totalCharges')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="12px" fill="#ffff"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span></div>
              <span
                className={`${styles.detailBtn} ${styles.detailBtnBack} flex items-center content-center absolute bottom-[-20.4%] left-[-3.5%]`}
                onClick={() => setCarDetail((prev) => !prev)}
              >
                <span className='text-[#0080F6]'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#0080F6"><path d="M384-96 0-480l384-384 68 68-316 316 316 316-68 68Z" /></svg>
                </span>
                <span className='text-white'> Back</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className={`${styles.right} text-white items-center content-center`}>
          {/* <div className={`${styles.provider} md:mt-0 mt-[20px]`}>
          Rent for a Day <br />
        </div>
        <div className="text-gray-700 text-[16px]">AED 60</div>
        <div className="h-[1px] w-[65px] bg-gray-500 relative top-[-4.2%] max-lg:top-[-12px] z-1 max-lg:float-left float-right"></div>
        <div className={`${styles.price} mt-1 text-[#ffc107]`}>AED 50</div> */}
          <div className={`${styles.provider} text-white mt-4`}>
            Rent for 30 Days <br />
          </div>
          <div className="text-white text-[16px]">AED 1780</div>
          <div className={`h-[1px] w-[75px] bg-white relative top-[-4.2%] max-lg:top-[-12px] ${styles.crossLine} z-1 max-lg:float-left float-right`}></div>
          <div className={`${styles.price} mt-1 text-[#0080F6]`}>AED 1680</div>
          <InquiryButton />
          <br />
          <Link href={'/Booknow'}>
            <button className={`${styles.dealBtn} bg-[#0080F6] relative hover:bg-[#42C3F7]`}>Book Now</button>
          </Link>
          <div className={`flex items-center text-[11px] ${styles.subject} max-lg:float-right relative lg:left-[7px] max-xl:mt-3 max-lg:left-32 ml-1 mr-2`}><svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#ffc107"><path d="m313-230.5 44.5-190.09L210-548l194-17 76-179 76.5 179L750-548 602.48-420.59l44.96 190.09-167.22-101.11L313-230.5Z" /></svg>&nbsp;Subject to Availability</div>
        </div>
      </div>
    </>
  );
};

export default CarCard;