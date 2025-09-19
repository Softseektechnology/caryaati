"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import './CustomDateRangePicker.css';

interface CustomDateRangePickerProps {
  value: [Date | null, Date | null];
  onChange: (startDate: Date | null, endDate: Date | null) => void;
  isCarCard: boolean;
  isOpen: boolean; // REQUIRED: Controlled open state
  onOpenChange: (isOpen: boolean) => void; // REQUIRED: Handle open state changes
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  value,
  onChange,
  isCarCard,
  isOpen,
  onOpenChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(value[0]);
  const [endDate, setEndDate] = useState<Date | null>(value[1]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [carCard, setCarCard] = useState<boolean | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync internal state with props
  useEffect(() => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  }, [value]);

  // Handle click outside to close the calendar
  useEffect(() => {
    if (isCarCard) {
      setCarCard(true);
    } else {
      setCarCard(false);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCarCard, onOpenChange]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newDate < today) return;

    if (!startDate || (startDate && endDate)) {
      const newStartDate = new Date(newDate.setHours(0, 0, 0, 0));
      setStartDate(newStartDate);
      setEndDate(null);
      onChange(newStartDate, null);
    } else if (startDate && !endDate) {
      if (newDate < startDate) {
        const newStartDate = new Date(newDate.setHours(0, 0, 0, 0));
        setStartDate(newStartDate);
        setEndDate(null);
        onChange(newStartDate, null);
      } else {
        const newEndDate = new Date(newDate.setHours(23, 59, 59, 999));
        setEndDate(newEndDate);
        onChange(startDate, newEndDate);
        onOpenChange(false); // Close calendar after selecting end date
      }
    }
  };

  const handleMonthChange = (increment: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1));
  };

  const handleTimeChange = (field: 'start' | 'end', hours12: number, minutes: number, period: 'AM' | 'PM') => {
    const newDate = field === 'start' ? startDate : endDate;
    if (newDate) {
      let hours24 = hours12;
      if (period === 'PM' && hours12 !== 12) hours24 += 12;
      else if (period === 'AM' && hours12 === 12) hours24 = 0;
      newDate.setHours(hours24, minutes, 0, 0);
      if (field === 'start') {
        setStartDate(new Date(newDate));
        onChange(new Date(newDate), endDate);
      } else {
        setEndDate(new Date(newDate));
        onChange(startDate, new Date(newDate));
      }
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = date < today;
      const isSelectedStart = startDate && date.toDateString() === startDate.toDateString();
      const isSelectedEnd = endDate && date.toDateString() === endDate.toDateString();
      const isInRange = startDate && endDate && date > startDate && date < endDate;
      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelectedStart ? 'selected-start' : ''} ${isSelectedEnd ? 'selected-end' : ''} ${isInRange ? 'in-range' : ''} ${hoveredDate && date <= hoveredDate && date >= (startDate || date) && !isDisabled ? 'hovered-range' : ''} ${isDisabled ? 'disabled' : ''}`}
          onClick={() => !isDisabled && handleDateClick(day)}
          onMouseEnter={() => !isDisabled && setHoveredDate(date)}
          onMouseLeave={() => !isDisabled && setHoveredDate(null)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className={`custom-date-range-picker max-[340px]:w-[95vw]`} ref={wrapperRef}>
      {isOpen && (
        <div className={`calendar-container ${carCard ? 'z-1' : 'z-999'}`}>
          <div className="calendar-header">
            <button type="button" onClick={() => handleMonthChange(-1)}>&lt;</button>
            <span>{format(currentMonth, 'MMMM yyyy')}</span>
            <button type="button" onClick={() => handleMonthChange(1)}>&gt;</button>
          </div>
          <div className="calendar-days">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {renderCalendar()}
          </div>
          <div className="time-selection">
            <div className="time-section">
              <label className="time-label">Start Time</label>
              <div className="time-select-group">
                <select
                  className="time-select"
                  value={startDate ? (startDate.getHours() % 12 || 12) : 12}
                  onChange={(e) => handleTimeChange('start', parseInt(e.target.value), startDate ? startDate.getMinutes() : 0, startDate ? (startDate.getHours() >= 12 ? 'PM' : 'AM') : 'AM')}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                    <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</option>
                  ))}
                </select>
                <select
                  className="time-select"
                  value={startDate ? startDate.getMinutes() : 0}
                  onChange={(e) => handleTimeChange('start', startDate ? (startDate.getHours() % 12 || 12) : 12, parseInt(e.target.value), startDate ? (startDate.getHours() >= 12 ? 'PM' : 'AM') : 'AM')}
                >
                  {[0, 15, 30, 45].map(minute => (
                    <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
                  ))}
                </select>
                <select
                  className="time-select"
                  value={startDate ? (startDate.getHours() >= 12 ? 'PM' : 'AM') : 'AM'}
                  onChange={(e) => handleTimeChange('start', startDate ? (startDate.getHours() % 12 || 12) : 12, startDate ? startDate.getMinutes() : 0, e.target.value as 'AM' | 'PM')}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <div className="time-section">
              <label className="time-label">End Time</label>
              <div className="time-select-group">
                <select
                  className="time-select"
                  value={endDate ? (endDate.getHours() % 12 || 12) : 11}
                  onChange={(e) => handleTimeChange('end', parseInt(e.target.value), endDate ? endDate.getMinutes() : 59, endDate ? (endDate.getHours() >= 12 ? 'PM' : 'AM') : 'PM')}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                    <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</option>
                  ))}
                </select>
                <select
                  className="time-select"
                  value={endDate ? endDate.getMinutes() : 59}
                  onChange={(e) => handleTimeChange('end', endDate ? (endDate.getHours() % 12 || 12) : 11, parseInt(e.target.value), endDate ? (endDate.getHours() >= 12 ? 'PM' : 'AM') : 'PM')}
                >
                  {[0, 15, 30, 45].map(minute => (
                    <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
                  ))}
                </select>
                <select
                  className="time-select"
                  value={endDate ? (endDate.getHours() >= 12 ? 'PM' : 'AM') : 'PM'}
                  onChange={(e) => handleTimeChange('end', endDate ? (endDate.getHours() % 12 || 12) : 11, endDate ? endDate.getMinutes() : 59, e.target.value as 'AM' | 'PM')}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
          <button className="apply-button" onClick={() => { onChange(startDate, endDate); onOpenChange(false); }}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomDateRangePicker;