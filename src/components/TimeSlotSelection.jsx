import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoCloseCircle } from 'react-icons/io5';
import { BsCheckCircleFill } from 'react-icons/bs';
import TimeSlotSelector from './Timeslotselector';
import { AutoScroll } from './HyrachiServices';
import { VerticalAutoScroll } from './Verticalautoscroll';
import TimeSlotGrid from './TimeSlotGrid';

export default function TimeSlotSelection({ isOpen, onClose, selectedService, onFinalise }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);

  // Generate available slots for a date (1-hour intervals from 9 AM to 6 PM)
  const generateSlotsForDate = (date) => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      let displayHour = hour;
      let period = 'AM';
      
      if (hour === 12) {
        displayHour = 12;
        period = 'PM';
      } else if (hour > 12) {
        displayHour = hour - 12;
        period = 'PM';
      }
      
      const timeString = `${displayHour}:00 ${period}`;
      slots.push(timeString);
    }
    
    return slots;
  };

  // Update slots when date changes
  useEffect(() => {
    if (isOpen) {
      const slots = generateSlotsForDate(selectedDate);
      setAvailableSlots(slots);
      setSelectedSlot(null);
    }
  }, [selectedDate, isOpen]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const handleSlotSelect = (hourSlot, minute) => {
    const fullSlot = `${hourSlot} ${minute} min`;
    setSelectedSlot(fullSlot);
  };

  // Check if a specific time slot is selected
  const isSlotSelected = (hourSlot, minute) => {
    if (!selectedSlot) return false;
    return selectedSlot === `${hourSlot} ${minute} min`;
  };

  // Get available minutes for a specific hour (only bookable slots)
  // In real app, this would fetch from backend based on selectedDate and hourSlot
  const getAvailableMinutes = (hourSlot) => {
    // Sample logic: Generate random available minutes for demonstration
    // Replace with actual API call to get booked slots
    const allMinutes = ['10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
    
    // Sample: Some hours have more slots, some have fewer
    // This simulates real-world scenario where some times are more popular
    const hourMatch = hourSlot.match(/(\d+):(\d+)\s*(AM|PM)/);
    if (!hourMatch) return [];
    
    const hour = parseInt(hourMatch[1]);
    const period = hourMatch[3];
    
    // Morning hours (9-11 AM) have more availability
    if (period === 'AM' && hour >= 9 && hour <= 11) {
      return allMinutes; // All minutes available
    }
    // Afternoon hours (12-2 PM) have moderate availability
    if ((period === 'AM' && hour === 12) || (period === 'PM' && hour <= 2)) {
      return allMinutes.filter((_, idx) => idx % 2 === 0); // Every other minute
    }
    // Evening hours (3-5 PM) have limited availability
    if (period === 'PM' && hour >= 3 && hour <= 5) {
      return allMinutes.filter((_, idx) => idx % 3 === 0); // Every third minute
    }
    // Late afternoon (6 PM) has very limited availability
    if (period === 'PM' && hour === 6) {
      return ['15', '30', '45']; // Only a few slots
    }
    
    // Default: return some slots
    return allMinutes.filter((_, idx) => idx % 2 === 0);
  };

  const handleFinalise = () => {
    if (onFinalise) {
      onFinalise(selectedDate, selectedSlot);
    }
    onClose();
    navigate('/');
  };

  // Format date consistently across all devices
  const formatDate = (date) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatDateShort = (date) => {
    const options = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isBeforeToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isBeforeToday(newDate)) {
      setSelectedDate(newDate);
      setShowCalendar(false);
    }
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Month header
    const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-4 z-50">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiChevronLeft size={18} />
          </button>
          <h3 className="text-sm font-bold text-gray-800">{monthYear}</h3>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiChevronRight size={18} />
          </button>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {[...Array(startingDayOfWeek)].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Actual days */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isSelected = isSameDay(date, selectedDate);
            const isDisabled = isBeforeToday(date);

            return (
              <button
                key={day}
                onClick={() => handleDateSelect(day)}
                disabled={isDisabled}
                className={`
                  aspect-square rounded-lg text-xs font-medium transition-all
                  ${isSelected
                    ? 'bg-black text-white font-bold'
                    : isDisabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-50 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-black">👉 ⏰ Select Time Slot</h3>
              <p className="text-xs text-black mt-0.5">Choose your preferred time</p>
            </div>
            <button
              onClick={onClose}
              className="text-black transition-colors"
            >
              <IoCloseCircle size={25} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[calc(90vh-180px)] overflow-y-auto custom-scrollbar">
          
          {/* Custom Date Picker */}
          <div className="relative" ref={calendarRef}>
            <div className="flex items-center gap-2 mb-2">
              <FiCalendar className="text-gray-700" size={16} />
              <label className="text-sm font-semibold text-gray-800">
                Select Date
              </label>
            </div>
            
            {/* Custom date display button */}
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="
                w-full px-3 py-2.5
                rounded-xl
                border-2 border-gray-300
                bg-white
                text-sm font-medium text-gray-800
                hover:border-black
                focus:outline-none focus:border-black focus:ring-2 focus:ring-gray-200
                transition-all
                cursor-pointer
                flex items-center justify-between
              "
            >
              <span>{formatDateShort(selectedDate)}</span>
              <FiCalendar className="text-gray-500" size={16} />
            </button>

            <div className="mt-2 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-black"></div>
              <p className="text-xs text-gray-600 font-medium">
                {formatDate(selectedDate)}
              </p>
            </div>

            {/* Custom calendar dropdown */}
            {showCalendar && renderCalendar()}
          </div>

          {/* Available Slots */}
          <div className="p-1">
            <div className="flex items-center gap-2 mb-3">
              <FiClock className="text-gray-700" size={16} />
              <label className="text-sm font-semibold text-gray-800">
                Select Available Time
              </label>
              {selectedSlot && (
                <span className="ml-auto text-xs font-medium text-black flex items-center gap-1">
                  <BsCheckCircleFill size={12} />
                  Selected
                </span>
              )}
            </div>
            {/* <div className="h-36 px-4">
              <VerticalAutoScroll speed={15} pauseOnHover={true}>
                <div className="space-y-2 shadow-md">
                  {availableSlots.map((hourSlot, index) => {
                    const availableMinutes = getAvailableMinutes(hourSlot);
                    
                    // Skip hours with no available slots
                    if (availableMinutes.length === 0) return null;
                    
                    // Parse hour and period from hourSlot (e.g., "9:00 AM")
                    const hourMatch = hourSlot.match(/(\d+):(\d+)\s*(AM|PM)/);
                    if (!hourMatch) return null;
                    
                    const hour = hourMatch[1];
                    const period = hourMatch[3];
                    
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <p className="text-sm text-gray-600 font-medium whitespace-nowrap min-w-[20px]">
                          {hour} :
                        </p>
                        {availableMinutes.length > 0 ? (
                          <AutoScroll speed={10} pauseOnHover={true}>
                            <div className="flex items-center gap-2">
                              {availableMinutes.map((minute, idx) => {
                                const isSelected = isSlotSelected(hourSlot, minute);
                                
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => handleSlotSelect(hourSlot, minute)}
                                    className={`text-sm font-medium border-2 rounded-md p-1 transition-all flex-shrink-0 ${
                                      isSelected
                                        ? 'bg-black text-white border-black hover:bg-gray-800'
                                        : 'text-gray-400 bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 hover:text-black'
                                    }`}
                                  >
                                    {minute}
                                  </button>
                                );
                              })}
                            </div>
                          </AutoScroll>
                        ) : (
                          <p className="text-xs text-gray-400">No slots available</p>
                        )}
                        <p className="text-sm text-gray-600 font-medium whitespace-nowrap">
                          {period}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </VerticalAutoScroll>
            </div> */}
            <TimeSlotGrid 
              selectedSlot={selectedSlot}
              onSlotSelect={setSelectedSlot}
            />
          </div>

          {/* Selected Summary */}
          {selectedSlot && (
            <div className="bg-gray-50 rounded-xl p-3 border-2 border-black">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BsCheckCircleFill className="text-black" size={16} />
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Your Booking</p>
                    <p className="text-sm font-bold text-gray-800">
                      {formatDateShort(selectedDate)} • {selectedSlot}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleFinalise}
            disabled={!selectedSlot}
            className={`
              w-full py-3 rounded-xl font-semibold text-sm
              transition-all duration-200
              ${selectedSlot
                ? 'bg-black text-white hover:bg-gray-800 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {selectedSlot ? 'Confirm Booking' : 'Select a Time Slot'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}