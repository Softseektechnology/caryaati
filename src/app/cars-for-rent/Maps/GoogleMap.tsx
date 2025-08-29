'use client';

import { useState, useEffect } from 'react';
import { GoogleMap as ReactGoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Rename the import
import { Alert } from 'react-bootstrap';

interface Car {
  name: string;
  location: { lat: number; lng: number };
}

interface GoogleMapProps {
  cars: Car[];
  center: { lat: number; lng: number };
  mapError: string | null;
  setMapError: (error: string | null) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function CustomGoogleMap({ cars, center, mapError, setMapError }: GoogleMapProps) {
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setMapError('Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local.');
    }
  }, []);

  return (
    <div className="mapContainer">
      {mapError ? (
        <Alert variant="danger">{mapError}</Alert>
      ) : (
        <LoadScript
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          onError={(error) => {
            console.error('LoadScript error:', error);
            setMapError('Failed to load Google Maps. Please check the JavaScript console for details.');
          }}
        >
          <ReactGoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
            {cars.map((car, index) => (
              <Marker
                key={index}
                position={car.location}
                label={car.name}
                onClick={() => alert(`Selected: ${car.name}`)}
              />
            ))}
          </ReactGoogleMap>
        </LoadScript>
      )}
    </div>
  );
}