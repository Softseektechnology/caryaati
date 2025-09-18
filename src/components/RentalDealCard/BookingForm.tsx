// Updated BookingForm.tsx with improved design: added Tailwind utility classes for better layout, colors, shadows, and interactivity. Made it more eye-catching with gradients, icons, and hover effects. Added subtle animations for form elements (e.g., focus states) to enhance interactivity without overdoing it.

// components/BookingForm.tsx
'use client';
import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon, MailIcon, PhoneIcon, MessageSquareIcon } from 'lucide-react'; // Assuming lucide-react icons for eye-catching visuals

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
      className="fixed inset-0 z-[2000] flex backdrop-brightness-90 backdrop-blur-[1px] items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-opacity-40"
        onClick={() => onClose?.()}
      />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-2xl w-[95%] max-w-5xl px-4 py-4 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 border border-orange-200"
        style={{ maxHeight: '95vh' }}
      >
        {/* Header with Car Details - Made eye-catching with gradient background */}
        <div className="col-span-2 bg-orange-500 text-white p-4 rounded-t-xl flex items-center gap-4">
          <img src={car?.image || '/images/cars/car-placeholder.jpg'} alt="car" className="w-24 h-16 object-cover rounded-lg shadow-md" />
          <div>
            <div className="font-bold text-xl">{car?.name || form.selectedCar}</div>
            <div className="text-sm">AED - {car?.price ?? '—'}</div>
          </div>
        </div>

        {/* LEFT: Pickup/Destination + Dates - Added icons and focus animations */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pick Up Location</label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
              <input
                value={form.pickupLocation}
                onChange={e => handleChange('pickupLocation', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                placeholder="Stadium Point"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Destination</label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
              <input
                value={form.destination}
                onChange={e => handleChange('destination', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                placeholder="Stadium Point"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pick Up Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
                <input
                  type="date"
                  value={form.pickupDate}
                  onChange={e => handleChange('pickupDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pick Up Time</label>
              <div className="relative">
                <ClockIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
                <input
                  type="time"
                  value={form.pickupTime}
                  onChange={e => handleChange('pickupTime', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Return Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
                <input
                  type="date"
                  value={form.returnDate}
                  onChange={e => handleChange('returnDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Return Time</label>
              <div className="relative">
                <ClockIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
                <input
                  type="time"
                  value={form.returnTime}
                  onChange={e => handleChange('returnTime', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Contact Details - Added icons and focus animations */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
              <input
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                placeholder="Your Name"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Email</label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
              <input
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                placeholder="Your Email"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-[45%] relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
                <select
                  value={form.countryCode}
                  onChange={e => handleChange('countryCode', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300 appearance-none"
                >
                  {COUNTRY_CODES.map(c => (
                    <option key={c.code} value={c.code}>{c.code} ({c.name})</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
              <div className="relative items-center">
                <PhoneIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
                <input
                  value={form.mobile}
                  onChange={e => handleChange('mobile', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                  placeholder="Mobile Number"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Do you have any request?</label>
            <div className="relative items-center">
              <MessageSquareIcon className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
              <textarea
                value={form.request}
                onChange={e => handleChange('request', e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                placeholder="Do you have any request?"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons - Made more interactive with hover effects */}
        <div className="col-span-2 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => onClose?.()}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-300"
            style={{borderRadius: '8px'}}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-500 hover:shadow-lg transition-all duration-300"
            style={{borderRadius: '8px'}}
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;