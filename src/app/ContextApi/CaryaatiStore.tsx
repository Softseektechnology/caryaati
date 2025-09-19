'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a car for type safety
interface Car {
  name: string;
  year: number;
  category: string;
  image: string;
  specs: {
    luggage: number;
    transmission: string;
    ac: boolean;
    passengers: number;
  };
  deposit: number;
  rent: number;
}

// Define the shape of the context's value
interface UserContextType {
  separateFilter: any; // Replace with specific type if known
  setSeparateFilter: (value: any) => void;
  bookingForm: any; // Replace with specific type if known
  setBookingForm: (value: any) => void;
  selectedCars: Car[]; // CHANGED: Store array of selected cars
  setSelectedCars: (cars: Car[]) => void; // CHANGED: Setter for selected cars
}

export const UseCaryaatiContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function CaryaatiProvider({ children }: UserProviderProps) {
  const [separateFilter, setSeparateFilter] = useState<any>(null);
  const [bookingForm, setBookingForm] = useState<any>(false);
  const [selectedCars, setSelectedCars] = useState<Car[]>([]); // CHANGED: Initialize as empty array

  const value = {
    separateFilter,
    setSeparateFilter,
    bookingForm,
    setBookingForm,
    selectedCars,
    setSelectedCars,
  };

  return (
    <UseCaryaatiContext.Provider value={value}>
      {children}
    </UseCaryaatiContext.Provider>
  );
}

export function CaryaatiContext() {
  const context = useContext(UseCaryaatiContext);
  if (context === null) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
