'use client';
import React, { useState } from 'react';
import { CalendarIcon, ChevronDownIcon, MessageSquareIcon } from 'lucide-react';
import { CaryaatiContext } from '@/app/ContextApi/CaryaatiStore';

const BookingForm: React.FC = () => {
  const cars = [
    { name: 'Toyota RAV4 2023', price: 250, image: '/images/tesla.jpg' },
    { name: 'BMW X5', price: 300, image: '/images/bmw.jpg' },
    { name: 'Audi A4', price: 220, image: '/images/audi.jpg' }
  ];

  const [selectedCar, setSelectedCar] = useState(cars[0]);
  const [days, setDays] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [message, setMessage] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const { bookingForm, setBookingForm } = CaryaatiContext();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedCar, days, pickupDate, dropoffDate, message });
  };

  return (
    <div className='fixed z-[2000] top-0 right-0 bottom-0 left-0 items-center content-center backdrop-blur-[1px] backdrop-brightness-90'>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto border border-gray-200 overflow-hidden"
      >
        {/* Car Section with Image and Dropdown */}
        <div className="relative bg-[#0080F6] text-white p-4 flex items-center gap-4">
          <img
            src={selectedCar.image}
            alt={selectedCar.name}
            className="w-28 h-20 object-cover rounded-lg shadow-md"
          />
          <div className="flex flex-col w-full relative">
            <div
              className="flex items-center justify-between cursor-pointer font-semibold text-lg"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              {selectedCar.name} - AED {selectedCar.price}
              <ChevronDownIcon className={`ml-2 h-5 w-5 transition-transform ${openDropdown ? 'rotate-180' : ''}`} />
            </div>
            {openDropdown && (
              <div className="absolute top-full mt-1 w-full bg-white text-black border border-gray-200 rounded-lg shadow-lg z-10">
                {cars.map((car) => (
                  <div
                    key={car.name}
                    onClick={() => { setSelectedCar(car); setOpenDropdown(false); }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  >
                    <img src={car.image} alt={car.name} className="w-12 h-8 object-cover rounded" />
                    {car.name} - AED {car.price}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Days */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Days</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00aaff] focus:outline-none"
              placeholder="Enter number of days"
            />
          </div>

          {/* Pickup & Dropoff Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-[#0080F6]" />
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#00aaff] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dropoff Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-[#0080F6]" />
                <input
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#00aaff] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <div className="relative">
              <MessageSquareIcon className="absolute left-3 top-3 h-5 w-5 text-[#0080F6]" />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#00aaff] focus:outline-none"
                placeholder="Write your message here..."
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-100 hover:bg-gray-200 mx-3 text-black px-6 py-3 rounded-lg font-semibold shadow transition"
              style={{ borderRadius: '8px' }}
              onClick={() => setBookingForm(false)}
            >
              cancel
            </button>
            <button
              type="submit"
              className="bg-[#0080F6] hover:bg-[#00aaff] text-white px-6 py-3 rounded-lg font-semibold shadow hover:opacity-90 transition"
              style={{ borderRadius: '8px' }}
            >
              Book Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;