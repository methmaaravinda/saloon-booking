import React, { useState, useEffect, useRef } from 'react';

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
  
  // Tooltip state
  const [tooltip, setTooltip] = useState(null);
  const tooltipTimeoutRef = useRef(null);
  
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

  // Format time for tooltip display: "9:40 A.M"
  const formatTimeForTooltip = (hour, minute) => {
    const hourNum = parseInt(hour.split(' ')[0]);
    const period = hour.split(' ')[1];
    const formattedHour = hourNum === 9 ? '9' : hourNum.toString();
    const formattedMinute = minute.toString().padStart(2, '0');
    const formattedPeriod = period === 'AM' ? 'A.M' : 'P.M';
    return `${formattedHour}:${formattedMinute} ${formattedPeriod}`;
  };

  // Handle slot selection (not booking - user is selecting a time slot)
  const handleSlotClick = (hour, minute, event) => {
    const slotKey = `${hour}-${minute}`;
    
    // Don't allow selection of already booked slots
    if (bookedSlots.has(slotKey)) {
      return;
    }
    
    // Format the selected slot for parent component
    // Convert "09 AM" format and minute to "9:40 AM" format
    const hourNum = parseInt(hour.split(' ')[0]);
    const period = hour.split(' ')[1];
    const formattedHour = hourNum === 9 ? '9' : hourNum.toString();
    const formattedMinute = minute.toString().padStart(2, '0');
    const formattedSlot = `${formattedHour}:${formattedMinute} ${period}`;
    
    // Get the clicked cell's position for tooltip
    const cellElement = event.currentTarget;
    const cellRect = cellElement.getBoundingClientRect();
    const scrollContainer = cellElement.closest('.overflow-auto');
    const scrollRect = scrollContainer.getBoundingClientRect();
    
    // Use viewport coordinates for fixed positioning
    const viewportLeft = cellRect.left;
    const viewportTop = cellRect.top;
    
    // Determine if we're in the top row (need to show tooltip below instead of above)
    const isTopRow = (cellRect.top - scrollRect.top) < 30; // If cell is near top of scroll container
    
    // Estimate tooltip width (approximately 60px for "9:40 A.M")
    const tooltipWidth = 60;
    
    // Check if tooltip would overflow on the right side
    const wouldOverflowRight = (cellRect.right + tooltipWidth) > scrollRect.right;
    // If it would overflow, position it from the right edge of the cell instead
    const adjustedLeft = wouldOverflowRight 
      ? cellRect.right - tooltipWidth 
      : cellRect.left;
    
    const tooltipTime = formatTimeForTooltip(hour, minute);
    
    // Clear previous timeout
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    
    // Show tooltip with positioning info
    setTooltip({
      time: tooltipTime,
      left: adjustedLeft,
      top: viewportTop,
      hourIndex: hours.indexOf(hour),
      minuteIndex: minutes.indexOf(minute),
      isTopRow: isTopRow,
      cellHeight: cellRect.height,
      alignRight: wouldOverflowRight
    });
    
    // Hide tooltip after 1 second with smooth fade
    tooltipTimeoutRef.current = setTimeout(() => {
      setTooltip(prev => prev ? { ...prev, visible: false } : null);
      setTimeout(() => setTooltip(null), 300); // Wait for fade animation
    }, 1000);
    
    // Call parent callback with the selected slot
    if (onSlotSelect) {
      onSlotSelect(formattedSlot);
    }
  };
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  // Check if slot is booked (by others)
  const isBooked = (hour, minute) => {
    return bookedSlots.has(`${hour}-${minute}`);
  };

  // Check if slot is selected by user
  const isSelected = (hour, minute) => {
    if (!selectedSlot) return false;
    
    // Parse the selectedSlot format: "9:40 AM"
    const hourNum = parseInt(hour.split(' ')[0]);
    const period = hour.split(' ')[1];
    const formattedHour = hourNum === 9 ? '9' : hourNum.toString();
    const formattedMinute = minute.toString().padStart(2, '0');
    const expectedFormat = `${formattedHour}:${formattedMinute} ${period}`;
    
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
                    const showTooltip = tooltip && 
                      tooltip.hourIndex === hourIndex && 
                      tooltip.minuteIndex === minuteIndex;
                    
                    return (
                      <td
                        key={minuteIndex}
                        onClick={(e) => handleSlotClick(hour, minute, e)}
                        className={`
                          p-1 rounded-lg shadow-sm text-center transition-all duration-200 relative
                          ${slotBooked
                            ? 'bg-purple-100 border border-purple-300 cursor-not-allowed'
                            : slotSelected
                            ? 'bg-blue-400 border border-blue-500 cursor-pointer'
                            : 'bg-white border border-gray-200 hover:bg-blue-50 hover:shadow-md hover:border-blue-400 hover:scale-105 cursor-pointer'
                          }
                        `}
                      >
                        {/* Tooltip - positioned at top-left of cell (or top-right if near edge) */}
                        {showTooltip && (
                          <div
                            className={`
                              fixed z-[100]
                              bg-black text-white text-xs font-medium
                              px-2 py-1 rounded-md whitespace-nowrap
                              pointer-events-none
                              shadow-lg
                              transition-opacity duration-300
                              ${tooltip.visible === false ? 'opacity-0' : 'opacity-100'}
                            `}
                            style={{
                              left: `${tooltip.left}px`,
                              top: tooltip.isTopRow 
                                ? `${tooltip.top + tooltip.cellHeight + 4}px` 
                                : `${tooltip.top - 4}px`,
                              transform: tooltip.isTopRow ? 'none' : 'translateY(-100%)'
                            }}
                          >
                            {tooltip.time}
                            {/* Tooltip arrow - pointing up if below cell, down if above cell */}
                            <div 
                              className={`absolute w-0 h-0 ${
                                tooltip.alignRight ? 'right-2' : 'left-2'
                              } ${
                                tooltip.isTopRow 
                                  ? 'bottom-full border-l-4 border-r-4 border-b-4 border-transparent border-b-black' 
                                  : 'top-full border-l-4 border-r-4 border-t-4 border-transparent border-t-black'
                              }`}
                            ></div>
                          </div>
                        )}
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