import React, { useState } from 'react';

// Generate hours from 9 AM to 5 PM
const generateHours = () => {
  return [
    '09 AM', '10 AM', '11 AM', '12 PM', '01 PM', '02 PM', '03 PM', '04 PM', '05 PM',
  ];
};

// Generate 5-minute intervals (0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55)
const generateMinutes = () => {
  return Array.from({ length: 6 }, (_, i) => i * 10);
};

const TimeSlotGrid = ({ selectedSlot, onSlotSelect, bookedSlots: externalBookedSlots }) => {
  const hours = generateHours();
  const minutes = generateMinutes();
  
  // Store booked slots as Set for efficient lookup
  // Format: "09 AM-0", "09 AM-5", etc.
  const [bookedSlots] = useState(() => {
    // Use external booked slots if provided, otherwise initialize with some random booked slots for demo
    if (externalBookedSlots && externalBookedSlots.size > 0) {
      return externalBookedSlots;
    }
    const initialBooked = new Set();
    hours.forEach(hour => {
      minutes.forEach(minute => {
        if (Math.random() < 0.3) { // 30% chance of being booked
          initialBooked.add(`${hour}-${minute}`);
        }
      });
    });
    return initialBooked;
  });

  // Handle slot selection (not booking - user is selecting a time slot)
  const handleSlotClick = (hour, minute) => {
    const slotKey = `${hour}-${minute}`;
    
    // Don't allow selection of already booked slots
    if (bookedSlots.has(slotKey)) {
      return;
    }
    
    // Format the selected slot for parent component
    // Convert "09 AM" format to "9:00 AM" and minute like "15 min"
    const hourNum = parseInt(hour.split(' ')[0]);
    const period = hour.split(' ')[1];
    const formattedHour = hourNum === 9 ? '9' : hourNum.toString();
    const formattedSlot = `${formattedHour}:00 ${period} ${minute.toString().padStart(2, '0')} min`;
    
    // Call parent callback with the selected slot
    if (onSlotSelect) {
      onSlotSelect(formattedSlot);
    }
  };

  // Check if slot is booked (by others)
  const isBooked = (hour, minute) => {
    return bookedSlots.has(`${hour}-${minute}`);
  };

  // Check if slot is selected by user
  const isSelected = (hour, minute) => {
    if (!selectedSlot) return false;
    
    // Parse the selectedSlot format: "9:00 AM 15 min"
    const hourNum = parseInt(hour.split(' ')[0]);
    const period = hour.split(' ')[1];
    const formattedHour = hourNum === 9 ? '9' : hourNum.toString();
    const expectedFormat = `${formattedHour}:00 ${period} ${minute.toString().padStart(2, '0')} min`;
    
    return selectedSlot === expectedFormat;
  };

  return (
    <div className="w-full">
        {/* Scrollable Table Container */}
        <div 
          className="overflow-auto h-36"
          style={{ 
            //scrollbarWidth: 'thin',
            //scrollbarColor: '#888 #f1f1f1'
          }}
        >
          <table className="border-separate border-spacing-1 w-full">
            <thead className="sticky top-0 z-20">
              <tr>
                <th className="bg-white text-xs font-semibold text-gray-700 sticky left-0 z-30">
                  
                </th>
                {minutes.map(minute => (
                  <th 
                    key={minute}
                    className="bg-white text-xs font-medium text-gray-600 p-1"
                  >
                    {minute.toString().padStart(2, '0')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, hourIndex) => (
                <tr key={hourIndex}>
                  {/* Hour Cell (sticky) */}
                  <td className="bg-white p-1 text-xs font-semibold text-gray-700 sticky left-0 z-10 whitespace-nowrap">
                    {hour}
                  </td>
                  
                  {/* Minute Cells */}
                  {minutes.map((minute, minuteIndex) => {
                    const slotBooked = isBooked(hour, minute);
                    const slotSelected = isSelected(hour, minute);
                    
                    return (
                      <td
                        key={minuteIndex}
                        onClick={() => handleSlotClick(hour, minute)}
                        className={`
                          p-1 rounded-lg shadow-sm text-center transition-all duration-200
                          ${slotBooked
                            ? 'bg-purple-100 border border-purple-300 cursor-not-allowed'
                            : slotSelected
                            ? 'bg-green-500 border-2 border-green-600 cursor-pointer'
                            : 'bg-white border border-gray-200 hover:bg-blue-50 hover:shadow-md hover:border-blue-400 hover:scale-105 cursor-pointer'
                          }
                        `}
                      >
                        {slotBooked && (
                          <svg 
                            className="w-2 h-2 mx-auto text-purple-700" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {slotSelected && !slotBooked && (
                          <svg 
                            className="w-3 h-3 mx-auto text-white" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        /* Webkit browsers (Chrome, Safari, Edge) */
        

        
        /* Ensure sticky header fully covers scrolling content */
        thead th {
        
        }
      `}</style>
    </div>
  );
};

export default TimeSlotGrid;