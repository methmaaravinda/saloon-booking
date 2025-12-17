import { useState } from "react";
import { FiCalendar, FiClock, FiCheck } from 'react-icons/fi'

const Booking = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const availableSlots = [
    {
      date: "12 Aug (Monday)",
      slots: ["1:00 PM - 4:00 PM", "6:00 PM - 8:00 PM", "9:00 PM - 11:00 PM", "12:00 AM - 2:00 AM", "3:00 AM - 5:00 AM", "6:00 AM - 8:00 AM"],
    },
    {
      date: "13 Aug (Tuesday)",
      slots: ["10:00 AM - 12:00 PM", "3:00 PM - 5:00 PM"],
    },
    {
      date: "14 Aug (Wednesday)",
      slots: ["9:00 AM - 11:00 AM"],
    },
    {
      date: "15 Aug (Thursday)",
      slots: ["1:00 PM - 4:00 PM", "6:00 PM - 8:00 PM"],
    },
    {
      date: "16 Aug (Friday)",
      slots: ["1:00 PM - 4:00 PM", "6:00 PM - 8:00 PM"],
    },
    {
      date: "17 Aug (Saturday)",
      slots: ["1:00 PM - 4:00 PM", "6:00 PM - 8:00 PM"],
    },
    {
      date: "18 Aug (Sunday)",
      slots: ["10:00 AM - 1:00 PM", "2:00 PM - 5:00 PM"],
    },
    {
      date: "19 Aug (Monday)",
      slots: ["9:00 AM - 12:00 PM", "1:00 PM - 4:00 PM", "5:00 PM - 8:00 PM"],
    },
    {
      date: "20 Aug (Tuesday)",
      slots: ["10:00 AM - 1:00 PM", "2:00 PM - 5:00 PM", "6:00 PM - 9:00 PM"],
    },
    {
      date: "21 Aug (Wednesday)",
      slots: ["9:00 AM - 12:00 PM", "1:00 PM - 4:00 PM"],
    },
    {
      date: "22 Aug (Thursday)",
      slots: ["10:00 AM - 1:00 PM", "2:00 PM - 5:00 PM", "6:00 PM - 8:00 PM"],
    },
    {
      date: "23 Aug (Friday)",
      slots: ["9:00 AM - 12:00 PM", "1:00 PM - 4:00 PM"],
    },
    {
      date: "24 Aug (Saturday)",
      slots: ["10:00 AM - 1:00 PM", "2:00 PM - 5:00 PM", "6:00 PM - 9:00 PM"],
    },
    {
      date: "25 Aug (Sunday)",
      slots: ["11:00 AM - 2:00 PM", "3:00 PM - 6:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FiCalendar className="text-gray-600" />
          Available Slots (Next 2 Weeks)
        </h1>
        
        <div className="space-y-4">
          {availableSlots.map((day, index) => (
            <div key={index} className="bg-white border rounded-xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiCalendar className="text-gray-500" size={18} />
                {day.date}
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {day.slots.map((slot, idx) => {
                  const isSelected = selectedSlot === `${day.date}-${slot}`;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedSlot(`${day.date}-${slot}`)}
                      className={`px-4 py-2.5 rounded-lg text-sm border transition whitespace-nowrap flex items-center gap-2 ${
                        isSelected
                          ? "bg-black text-white border-black font-semibold"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                      }`}
                    >
                      <FiClock className={isSelected ? "text-white" : "text-gray-500"} size={14} />
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {selectedSlot && (
          <div className="mt-6 bg-white border rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FiCheck className="text-emerald-600" />
              Selected Slot
            </h3>
            <p className="text-gray-700 flex items-center gap-2">
              <FiCalendar className="text-gray-500" size={16} />
              {selectedSlot}
            </p>
            <button className="mt-4 w-full bg-black text-white py-3 px-6 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <FiCheck size={18} />
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
