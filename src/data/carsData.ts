export interface Car {
  name: string;
  image: string;
  providerImage: string;
  charges: { [key: string]: number };
  features: { icon: string; label: string }[];
  hasIssue?: boolean;
  carType: string;
  isLuxury?: boolean;
  location?: string;
  availability?: string[];
  year: number; // Added for the two-line car name section
  option?: string; // Added for the badge (e.g., "Full option")
}

export const cars: Car[] = [
  // Sedan (4 cars)
  {
    name: "Toyota Camry",
    image: "/images/main-category/sedan.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 200, "7 days": 1200, "30 days": 4000 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Sedan",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2022, // Extracted from the old name "Toyota Camry 2022"
    option: "Full option", // Added as per the badge requirement
  },
  {
    name: "Honda Accord",
    image: "/images/main-category/sedan.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 220, "7 days": 1300, "30 days": 4500 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Sedan",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2021, // Extracted from the old name "Honda Accord 2021"
    option: "Full option",
  },
  {
    name: "Nissan Altima",
    image: "/images/main-category/sedan.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 190, "7 days": 1150, "30 days": 3800 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Sedan",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2023, // Extracted from the old name "Nissan Altima 2023"
    option: "Full option",
  },
  {
    name: "Hyundai Sonata",
    image: "/images/main-category/sedan.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 210, "7 days": 1250, "30 days": 4200 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Sedan",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2022, // Extracted from the old name "Hyundai Sonata 2022"
    option: "Full option",
  },

  // Hatchback (4 cars)
  {
    name: "Nissan Micra",
    image: "/images/main-category/hatchback.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 150, "7 days": 900, "30 days": 3000 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Hatchback",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2020, // Extracted from the old name "Nissan Micra 2020"
    option: "Full option",
  },
  {
    name: "Honda Fit",
    image: "/images/main-category/hatchback.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 160, "7 days": 950, "30 days": 3200 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Hatchback",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2021, // Extracted from the old name "Honda Fit 2021"
    option: "Full option",
  },
  {
    name: "Toyota Yaris",
    image: "/images/main-category/hatchback.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 140, "7 days": 850, "30 days": 3000 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Hatchback",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2022, // Extracted from the old name "Toyota Yaris 2022"
    option: "Full option",
  },
  {
    name: "Kia Rio",
    image: "/images/main-category/hatchback.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 155, "7 days": 920, "30 days": 3100 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Hatchback",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2023, // Extracted from the old name "Kia Rio 2023"
    option: "Full option",
  },

  // SUV (4 cars)
  {
    name: "Ford Explorer",
    image: "/images/main-category/suv.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 300, "7 days": 1800, "30 days": 6000 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "SUV",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2021, // Extracted from the old name "Ford Explorer 2021"
    option: "Full option",
  },
  {
    name: "Toyota RAV4",
    image: "/images/main-category/suv.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 280, "7 days": 1700, "30 days": 5000 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "SUV",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2022, // Extracted from the old name "Toyota RAV4 2022"
    option: "Full option",
  },
  {
    name: "Honda CR-V",
    image: "/images/main-category/suv.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 290, "7 days": 1750, "30 days": 5000 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "SUV",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2023, // Extracted from the old name "Honda CR-V 2023"
    option: "Full option",
  },
  {
    name: "Jeep Grand Cherokee",
    image: "/images/main-category/suv.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 310, "7 days": 1850, "30 days": 6000 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "SUV",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2021, // Extracted from the old name "Jeep Grand Cherokee 2021"
    option: "Full option",
  },

  // Off-road (4 cars)
  {
    name: "Jeep Wrangler",
    image: "/images/main-category/off-road.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 400, "7 days": 2400, "30 days": 8400 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Off-road",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2023, // Extracted from the old name "Jeep Wrangler 2023"
    option: "Full option",
  },
  {
    name: "Toyota Land Cruiser",
    image: "/images/main-category/off-road.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 450, "7 days": 2700, "30 days": 9600 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Off-road",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2022, // Extracted from the old name "Toyota Land Cruiser 2022"
    option: "Full option",
  },
  {
    name: "Ford Bronco",
    image: "/images/main-category/off-road.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 420, "7 days": 2500, "30 days": 8400 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Off-road",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2023, // Extracted from the old name "Ford Bronco 2023"
    option: "Full option",
  },
  {
    name: "Land Rover Defender",
    image: "/images/main-category/off-road.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 430, "7 days": 2600, "30 days": 9600 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Off-road",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2021, // Extracted from the old name "Land Rover Defender 2021"
    option: "Full option",
  },

  // Sports (4 cars)
  {
    name: "Porsche 911",
    image: "/images/main-category/sports.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 800, "7 days": 4800, "30 days": 16800 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Sports",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2022, // Extracted from the old name "Porsche 911 2022"
    option: "Full option",
  },
  {
    name: "Chevrolet Corvette",
    image: "/images/main-category/sports.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 850, "7 days": 5100, "30 days": 18000 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Sports",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2023, // Extracted from the old name "Chevrolet Corvette 2023"
    option: "Full option",
  },
  {
    name: "Lamborghini Huracan",
    image: "/images/main-category/sports.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 900, "7 days": 5400, "30 days": 19200 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "4" },
    ],
    carType: "Sports",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2021, // Extracted from the old name "Lamborghini Huracan 2021"
    option: "Full option",
  },
  {
    name: "Ferrari 488",
    image: "/images/main-category/sports.avif",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 880, "7 days": 5200, "30 days": 19200 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "x4" },
    ],
    carType: "Sports",
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2022, // Extracted from the old name "Ferrari 488 2022"
    option: "Full option",
  },

  // Luxury (4 cars)
  {
    name: "Rolls-Royce Phantom",
    image: "/images/main-category/luxury.png",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 1500, "7 days": 9000, "30 days": 32400 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "x4" },
    ],
    carType: "Luxury",
    isLuxury: true,
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2023, // Extracted from the old name "Rolls-Royce Phantom 2023"
    option: "Full option",
  },
  {
    name: "Bentley Continental",
    image: "/images/main-category/luxury.png",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 1400, "7 days": 8400, "30 days": 30240 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "x4" },
    ],
    carType: "Luxury",
    isLuxury: true,
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2022, // Extracted from the old name "Bentley Continental 2022"
    option: "Full option",
  },
  {
    name: "Mercedes S-Class",
    image: "/images/main-category/luxury.png",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 1300, "7 days": 7800, "30 days": 28000 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "x4" },
    ],
    carType: "Luxury",
    isLuxury: true,
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2021, // Extracted from the old name "Mercedes S-Class 2021"
    option: "Full option",
  },
  {
    name: "BMW 7 Series",
    image: "/images/main-category/luxury.png",
    providerImage: "/images/company-logos/pcrlogo.jpg",
    charges: { "1 day": 1350, "7 days": 8100, "30 days": 29100 },
    features: [
      { icon: "Suitcase", label: "x3" },
      { icon: "Gear", label: "Automatic" },
      { icon: "Snow", label: "A/C" },
      { icon: "People", label: "x4" },
    ],
    carType: "Luxury",
    isLuxury: true,
    location: "Al Barsha, Dubai",
    availability: ["DXB Airport T1", "DXB, SHJ, AUH"],
    year: 2023, // Extracted from the old name "BMW 7 Series 2023"
    option: "Full option",
  },
];