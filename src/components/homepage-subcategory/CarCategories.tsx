// src/data/carsData.ts
export interface Car {
    name: string;
    image: string;
    providerImage: string;
    charges: { [key: string]: number };
    features: { icon: string; label: string }[];
    hasIssue?: boolean;
    carType: string;
    isLuxury?: boolean;
  }
  
  export const cars: Car[] = [
    // Sedan
    {
      name: 'Toyota Camry 2022',
      image: './images/sedan/sedan1.jpg', // Toyota Camry
      providerImage: 'https://via.placeholder.com/50x50.png?text=Provider1', // Placeholder logo
      charges: { '1 day': 200, '7 days': 1200 },
      features: [
        { icon: 'fa-car', label: 'Automatic' },
        { icon: 'fa-users', label: '5 Seats' },
      ],
      carType: 'Sedan',
    },
    // Hatchback
    {
      name: 'Nissan Micra 2020',
      image: 'https://images.unsplash.com/photo-1593941707882-a5c6e2e63743?w=800&auto=format&fit=crop&q=60', // Nissan Micra
      providerImage: 'https://via.placeholder.com/50x50.png?text=Al+Emad', // Placeholder logo
      charges: { '1 day': 150, '7 days': 900 },
      features: [
        { icon: 'fa-car', label: 'Manual Transmission' },
        { icon: 'fa-users', label: '4 Seats' },
      ],
      carType: 'Hatchback',
    },
    // SUV
    {
      name: 'Ford Explorer 2021',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60', // Ford Explorer
      providerImage: 'https://via.placeholder.com/50x50.png?text=Provider2', // Placeholder logo
      charges: { '1 day': 300, '7 days': 1800 },
      features: [
        { icon: 'fa-car', label: 'Automatic' },
        { icon: 'fa-users', label: '7 Seats' },
      ],
      carType: 'SUV',
    },
    // Off-road
    {
      name: 'Jeep Wrangler 2023',
      image: 'https://images.unsplash.com/photo-1584200186925-87fa8f93be9b?w=800&auto=format&fit=crop&q=60', // Jeep Wrangler
      providerImage: 'https://via.placeholder.com/50x50.png?text=Provider3', // Placeholder logo
      charges: { '1 day': 400, '7 days': 2400 },
      features: [
        { icon: 'fa-car', label: '4WD' },
        { icon: 'fa-users', label: '5 Seats' },
      ],
      carType: 'Off-road',
    },
    // Sports
    {
      name: 'Porsche 911 2022',
      image: 'https://images.unsplash.com/photo-1583121275468-899d14c2b8c9?w=800&auto=format&fit=crop&q=60', // Porsche 911
      providerImage: 'https://via.placeholder.com/50x50.png?text=Provider4', // Placeholder logo
      charges: { '1 day': 800, '7 days': 4800 },
      features: [
        { icon: 'fa-car', label: 'Automatic' },
        { icon: 'fa-users', label: '2 Seats' },
      ],
      carType: 'Sports',
    },
    // Luxury
    {
      name: 'Rolls-Royce Phantom 2023',
      image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=800&auto=format&fit=crop&q=60', // Rolls-Royce Phantom
      providerImage: 'https://via.placeholder.com/50x50.png?text=Provider5', // Placeholder logo
      charges: { '1 day': 1500, '7 days': 9000 },
      features: [
        { icon: 'fa-car', label: 'Automatic Transmission' },
        { icon: 'fa-users', label: '5 Seats' },
      ],
      carType: 'Luxury',
      isLuxury: true,
    },
  ];