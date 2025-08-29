'use client';

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface FiltersProps {
  filters: { priceRange: number; carType: string };
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onApplyFilters: (e: React.FormEvent) => void;
}

export default function Filters({ filters, onFilterChange, onApplyFilters }: FiltersProps) {
  return (
    <div className="p-3 border rounded">
      <h4>Filters</h4>
      <Form onSubmit={onApplyFilters}>
        <Form.Group className="mb-3">
          <Form.Label>Price Range (Monthly, AED)</Form.Label>
          <Form.Control
            type="range"
            name="priceRange"
            min="0"
            max="5000"
            value={filters.priceRange}
            onChange={onFilterChange}
          />
          <Form.Text>Up to {filters.priceRange} AED</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Car Type</Form.Label>
          <Form.Select name="carType" value={filters.carType} onChange={onFilterChange}>
            <option>Any</option>
            <option value="hatchback">Hatchback</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="luxury">Luxury</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Apply Filters
        </Button>
      </Form>
    </div>
  );
}