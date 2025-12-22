import React, { useState } from 'react';
import './TimeSlotSelector.css';

const TimeSlotSelector = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  // Available time slots configuration
  const availableSlots = [
    { start: '08:00', end: '12:00' },  // Morning: 8 AM - 12 PM
    { start: '13:00', end: '17:00' }   // Afternoon: 1 PM - 5 PM
  ];

  const MIN_DURATION = 30; // minutes

  // Helper functions
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  const formatTime12Hour = (time24) => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  const isTimeInSlot = (timeMinutes) => {
    return availableSlots.some(slot => {
      const startMin = timeToMinutes(slot.start);
      const endMin = timeToMinutes(slot.end);
      return timeMinutes >= startMin && timeMinutes < endMin;
    });
  };

  const getRemainingMinutes = (timeMinutes) => {
    for (let slot of availableSlots) {
      const startMin = timeToMinutes(slot.start);
      const endMin = timeToMinutes(slot.end);
      if (timeMinutes >= startMin && timeMinutes < endMin) {
        return endMin - timeMinutes;
      }
    }
    return 0;
  };

  const hasAnyAvailableTime = (hour) => {
    for (let minute = 0; minute < 60; minute += 5) {
      const timeMinutes = hour * 60 + minute;
      if (isTimeInSlot(timeMinutes)) {
        return true;
      }
    }
    return false;
  };

  const handleTimeSelect = (timeData) => {
    setSelectedTime(timeData);
  };

  const handleConfirm = () => {
    if (selectedTime) {
      alert(`✅ Appointment Confirmed!\n\nTime: ${selectedTime.display}\nDuration Available: ${selectedTime.remaining} minutes`);
    }
  };

  // Generate hours from 8 AM to 5 PM
  const generateHours = () => {
    const hours = [];
    for (let hour = 8; hour <= 17; hour++) {
      if (hasAnyAvailableTime(hour)) {
        hours.push(hour);
      }
    }
    return hours;
  };

  // Generate minute dots for a specific hour
  const generateMinutes = (hour) => {
    const minutes = [];
    for (let minute = 0; minute < 60; minute += 5) {
      const timeMinutes = hour * 60 + minute;
      const timeStr = minutesToTime(timeMinutes);
      const inSlot = isTimeInSlot(timeMinutes);
      const remaining = getRemainingMinutes(timeMinutes);
      const hasEnoughTime = remaining >= MIN_DURATION;

      minutes.push({
        minute,
        timeStr,
        display: formatTime12Hour(timeStr),
        inSlot,
        remaining,
        hasEnoughTime,
        isAvailable: inSlot && hasEnoughTime,
        isUnavailable: inSlot && !hasEnoughTime
      });
    }
    return minutes;
  };

  const hours = generateHours();

  return (
    <div className="time-slot-selector">

      <div className="timeline-wrapper">
        <div className="timeline-container">
          {hours.length > 0 ? (
            hours.map((hour) => {
              const displayHour = hour > 12 ? hour - 12 : hour;
              const period = hour >= 12 ? 'PM' : 'AM';
              const minutes = generateMinutes(hour);

              return (
                <div key={hour} className="hour-row">
                  <div className="hour-header">
                    <div className="hour-label">
                      {displayHour}:00 {period}
                    </div>
                  </div>

                  <div className="minute-scroll-container">
                    <div className="minute-track">
                      {minutes.map((minuteData, index) => (
                        <React.Fragment key={minuteData.minute}>
                          <div
                            className={`minute-dot ${
                              minuteData.isAvailable ? 'available' : ''
                            } ${minuteData.isUnavailable ? 'unavailable' : ''} ${
                              selectedTime?.timeStr === minuteData.timeStr
                                ? 'selected'
                                : ''
                            }`}
                            onClick={() =>
                              minuteData.isAvailable &&
                              handleTimeSelect({
                                timeStr: minuteData.timeStr,
                                display: minuteData.display,
                                remaining: minuteData.remaining
                              })
                            }
                          >
                            <div className="minute-label">
                              :{String(minuteData.minute).padStart(2, '0')}
                            </div>
                          </div>
                          {index < minutes.length - 1 && (
                            <div className="minute-line"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-message">No available time slots</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;