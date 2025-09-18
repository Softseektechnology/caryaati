// components/BookingForm.tsx
'use client';
import React, { useState } from 'react';

type Props = {
  visible?: boolean; // optional, CarCard will control rendering
  onClose?: () => void;
  car?: { name?: string; image?: string; price?: string | number };
};

const COUNTRY_CODES = [
  { code: '+1', name: 'United States' },
  { code: '+7', name: 'Russia' },
  { code: '+20', name: 'Egypt' },
  { code: '+27', name: 'South Africa' },
  { code: '+30', name: 'Greece' },
  { code: '+31', name: 'Netherlands' },
  { code: '+32', name: 'Belgium' },
  { code: '+33', name: 'France' },
  { code: '+34', name: 'Spain' },
  { code: '+36', name: 'Hungary' },
  { code: '+39', name: 'Italy' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+49', name: 'Germany' },
  { code: '+61', name: 'Australia' },
  { code: '+62', name: 'Indonesia' },
  { code: '+63', name: 'Philippines' },
  { code: '+64', name: 'New Zealand' },
  { code: '+65', name: 'Singapore' },
  { code: '+66', name: 'Thailand' },
  { code: '+81', name: 'Japan' },
  { code: '+82', name: 'South Korea' },
  { code: '+84', name: 'Vietnam' },
  { code: '+86', name: 'China' },
  { code: '+91', name: 'India' },
  { code: '+92', name: 'Pakistan' },
  { code: '+93', name: 'Afghanistan' },
  { code: '+94', name: 'Sri Lanka' },
  { code: '+98', name: 'Iran' },
  { code: '+212', name: 'Morocco' },
  { code: '+216', name: 'Tunisia' },
  // ... agar chahen to aur add kar dein (ye sample list complete karne ke liye expand kar sakte hain)
];

const BookingForm: React.FC<Props> = ({ visible = true, onClose, car }) => {
  const [form, setForm] = useState({
    selectedCar: car?.name || 'Select Car',
    pickupLocation: '',
    destination: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    name: '',
    email: '',
    countryCode: '+93',
    mobile: '',
    request: '',
  });

  const handleChange = (k: keyof typeof form, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call API or lift state up. For now: console
    console.log('Booking form submit', form);
    // close form
    onClose?.();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex backdrop-brightness-95 backdrop-blur-[0.5px] content-center items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-opacity-40"
        onClick={() => onClose?.()}
      />
      <form
        onSubmit={handleSubmit}
        className="relative top-[5%] bg-white rounded-lg w-[92%] max-w-4xl p-6 grid grid-cols-2 gap-4"
        style={{ minHeight: '420px' }}
      >
        {/* LEFT: car select + pickup/destination + dates */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={car?.image || '/images/cars/car-placeholder.jpg'} alt="car" className="w-20 h-12 object-cover rounded" />
            <div>
              <div className="font-semibold">{car?.name || form.selectedCar}</div>
              <div className="text-sm text-gray-600">AED - {car?.price ?? '—'}</div>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Pick Up Location</label>
            <input value={form.pickupLocation} onChange={e => handleChange('pickupLocation', e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Stadium Point" />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Destination</label>
            <input value={form.destination} onChange={e => handleChange('destination', e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Stadium Point" />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="block text-sm font-medium mb-1">Pick Up Date</label>
              <input type="date" value={form.pickupDate} onChange={e => handleChange('pickupDate', e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pick Up Time</label>
              <input type="time" value={form.pickupTime} onChange={e => handleChange('pickupTime', e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="block text-sm font-medium mb-1">Return Date</label>
              <input type="date" value={form.returnDate} onChange={e => handleChange('returnDate', e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Return Time</label>
              <input type="time" value={form.returnTime} onChange={e => handleChange('returnTime', e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        </div>

        {/* RIGHT: contact details */}
        <div className="col-span-2 md:col-span-1">
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input value={form.name} onChange={e => handleChange('name', e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Your Name" />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Your Email</label>
            <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Your Email" />
          </div>

          <div className="flex gap-2 mb-3">
            <div style={{ minWidth: 160 }} className="w-[40%]">
              <label className="block text-sm font-medium mb-1">Country</label>
              <select value={form.countryCode} onChange={e => handleChange('countryCode', e.target.value)} className="w-full border rounded px-3 py-2">
                {COUNTRY_CODES.map(c => (
                  <option key={c.code} value={c.code}>{c.code} ({c.name})</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <input value={form.mobile} onChange={e => handleChange('mobile', e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Mobile Number" />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Do you have any request?</label>
            <textarea value={form.request} onChange={e => handleChange('request', e.target.value)} rows={4} className="w-full border rounded px-3 py-2" placeholder="Do you have any request?" />
          </div>

          <div className="flex items-center justify-end">
            <button type="button" onClick={() => onClose?.()} className="px-4 py-2 mx-3 rounded border">Cancel</button>
            <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
