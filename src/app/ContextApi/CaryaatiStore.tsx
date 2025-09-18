// context/UserContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context's value
interface UserContextType {
  separateFilter: any; // Use a more specific type if known
  setSeparateFilter: (value: any) => void; // Use a more specific type if known
  bookingForm: any; // Use a more specific type if known
  SetBookingForm: (value: any) => void; // Use a more specific type if known
}

// Initialize the context with a default value.
// We use a non-null assertion '!' or provide a default object with empty functions.
export const UseCaryaatiContext = createContext<UserContextType | null>(null);

// Define props for the provider component
interface UserProviderProps {
  children: ReactNode;
}

export function CaryaatiProvider({ children }: UserProviderProps) {
  // Replace 'any' with the actual type of your filter state
  const [separateFilter, setSeparateFilter] = useState<any>(null);
  const [bookingForm, setBookingForm] = useState<any>(false);
  

  const value = {
    separateFilter,
    setSeparateFilter,
    bookingForm,
    setBookingForm,
  };

  return (
    <UseCaryaatiContext.Provider value={value}>
      {children}
    </UseCaryaatiContext.Provider>
  );
}

// Custom hook to use the context
export function CaryaatiContext() {
  const context = useContext(UseCaryaatiContext);
  if (context === null) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}