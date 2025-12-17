import { useState } from "react";
import { FiChevronRight, FiCalendar, FiClock, FiDollarSign } from "react-icons/fi";
import { MdArrowCircleRight, MdArrowCircleLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import MainCard from './layout/MainCard';
function BookingCards() {
    const availableSlots = [
        { day: "Saturday", time: "2:15 PM" },
        { day: "Sunday", time: "10:00 AM" },
        { day: "Monday", time: "3:30 PM" },
        { day: "Tuesday", time: "11:45 AM" },
        { day: "Wednesday", time: "4:00 PM" },
        { day: "Thursday", time: "1:20 PM" },
        { day: "Friday", time: "5:30 PM" },
        { day: "Saturday", time: "9:00 AM" },
        { day: "Sunday", time: "12:30 PM" },
        { day: "Monday", time: "6:00 PM" },
    ];
    
    // Limit to 10 slots (indices 0-9)
    const slotsToShow = availableSlots.slice(0, 10);
    
    const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isForward, setIsForward] = useState(true);
    
    const handleSlotChange = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            if (isForward) {
                if (currentSlotIndex === 9) {
                    // At position 10 (index 9), change direction to backward
                    setCurrentSlotIndex(8);
                    setIsForward(false);
                } else {
                    setCurrentSlotIndex((prev) => prev + 1);
                }
            } else {
                if (currentSlotIndex === 0) {
                    // At position 1 (index 0), change direction to forward
                    setCurrentSlotIndex(1);
                    setIsForward(true);
                } else {
                    setCurrentSlotIndex((prev) => prev - 1);
                }
            }
            setIsTransitioning(false);
        }, 200);
    };
    
    const currentSlot = slotsToShow[currentSlotIndex];
    const showRightArrow = isForward || currentSlotIndex === 0;
    
    return (
            <div className="container mx-auto px-4 py-2">
            <div className="relative bg-white shadow-sm rounded-xl p-4 border-gray-500 shadow-md animated-border animated-border-thick animated-border-blue">

                {/* Slot navigation icon - changes direction at positions 1 and 10 */}
                <button
                    onClick={handleSlotChange}
                    className="absolute top-3 right-3 text-gray-400 hover:text-black transition-colors"
                >
                    {showRightArrow ? (
                        <MdArrowCircleRight size={25} className="text-black"/>
                    ) : (
                        <MdArrowCircleLeft size={25} className="text-black"/>
                    )}
                </button>

                <p className="text-xs text-gray-500 font-bold mb-1">
                    📅 Next Available Slot
                </p>

                <p className={`text-lg font-semibold text-gray-900 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    {currentSlot.day} · {currentSlot.time}
                </p>

                <button className="mt-3 w-full bg-black text-white py-3 px-6 rounded-lg text-sm font-semibold  border border-white/20">
                    Book now
                </button>
            </div>
        </div>
    );
}

export default BookingCards;


export function OtherAvailableSlots() {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();
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
    ];
    return (
        <MainCard title="📅 Other Available Slots (Next 2 Weeks)" navigateTo="/booking" scrollable={true}>
          {availableSlots.map((day, index) => (
            <div key={index}>
                <p className="text-sm font-semibold text-gray-900 mb-2">
                    {day.date}
                </p>

                <div className="flex flex-nowrap gap-2 overflow-x-auto">
                    {day.slots.map((slot, idx) => {
                        const isSelected = selectedSlot === `${day.date}-${slot}`;

                        return (
                            <button
                                key={idx}
                                onClick={() =>
                                    setSelectedSlot(`${day.date}-${slot}`)
                                }
                                className={`px-3 py-2 rounded-lg text-xs border transition whitespace-nowrap flex-shrink-0 ${isSelected? "bg-black text-white border-black" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                            >
                                {slot}
                            </button>
                        );
                    })}
                </div>
            </div>
          ))}
        </MainCard>
    )
}

export function MyBookings() {
    const navigate = useNavigate();
    const bookings = [
      {
        id: 1,
        name: "Haircut with John Doe",
        date: "2025-08-20",
        time: "14:30",
        services: ["Haircut", "Beard Trim"],
        status: "pending", // pending | cancelled | expired | completed
        amount: 45,
      },
      {
        id: 2,
        name: "Color & Style with Anna",
        date: "2025-08-10",
        time: "11:00",
        services: ["Hair Coloring", "Blow Dry"],
        status: "completed",
        amount: 95,
      },
      {
        id: 3,
        name: "Facial Treatment",
        date: "2025-08-05",
        time: "16:00",
        services: ["Deep Cleansing Facial"],
        status: "expired",
        amount: 60,
      },
      {
        id: 4,
        name: "Massage Session",
        date: "2025-08-03",
        time: "18:00",
        services: ["Full Body Massage"],
        status: "cancelled",
        amount: 80,
      },
    ];
  
    const getStatusStyles = (status) => {
      switch (status) {
        case "pending":
          return "bg-amber-50 text-amber-800 border-amber-200";
        case "cancelled":
          return "bg-rose-50 text-rose-800 border-rose-200";
        case "expired":
          return "bg-gray-100 text-gray-600 border-gray-200";
        case "completed":
          return "bg-emerald-50 text-emerald-800 border-emerald-200";
        default:
          return "bg-gray-100 text-gray-600 border-gray-200";
      }
    };
  
    const getTimeRemainingLabel = (date, time) => {
      // Only for pending bookings
      const target = new Date(`${date}T${time}:00`);
      const now = new Date();
      const diffMs = target.getTime() - now.getTime();
  
      if (diffMs <= 0) return "Starts soon";
  
      const totalMinutes = Math.round(diffMs / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
  
      if (hours <= 0) return `${mins} min remaining`;
      return `${hours}h ${mins}m remaining`;
    };
  
    return (
      // <div className="container mx-auto px-4 py-2">
      //   <div className="bg-white border rounded-xl p-4 shadow-sm relative">
      //     <button
      //       onClick={() => navigate('/my-bookings')}
      //       className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
      //     >
      //       <FiChevronRight size={20} />
      //     </button>
      //     <p className="text-xs text-gray-500 font-bold mb-3 pr-8">
      //       📅 My Bookings
      //     </p>
  
      //     <div className="space-y-3 h-[200px] overflow-y-auto">
      //       {bookings.map((booking) => (
      //         <div
      //           key={booking.id}
      //           className="border border-gray-200 rounded-lg p-3 flex items-start justify-between gap-3"
      //         >
      //           {/* Left: main info */}
      //           <div>
      //             <p className="text-sm font-semibold text-gray-900">
      //               {booking.name}
      //             </p>
      //             <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
      //               <FiCalendar className="text-gray-400" size={10} />
      //               {booking.date} · {booking.time}
      //             </p>
  
      //             <p className="text-xs text-gray-600 mt-2">
      //               Services:{" "}
      //               <span className="font-medium">
      //                 {booking.services.join(", ")}
      //               </span>
      //             </p>
  
      //             {booking.status === "pending" && (
      //               <p className="text-xs text-amber-700 mt-1 flex items-center gap-1">
      //                 <FiClock className="text-amber-600" size={10} />
      //                 {getTimeRemainingLabel(booking.date, booking.time)}
      //               </p>
      //             )}
      //           </div>
  
      //           {/* Right: status + charges */}
      //           <div className="text-right space-y-1 min-w-[90px]">
      //             <span
      //               className={
      //                 "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border capitalize " +
      //                 getStatusStyles(booking.status)
      //               }
      //             >
      //               {booking.status}
      //             </span>
  
      //             <p className="text-sm font-semibold text-gray-900 flex items-center justify-end gap-1">
      //               <FiDollarSign className="text-gray-600" size={12} />
      //               {booking.amount}
      //             </p>
  
      //             {booking.status === "pending" && (
      //               <p className="text-[10px] text-gray-500">
      //                 Estimated charges
      //               </p>
      //             )}
      //           </div>
      //         </div>
      //       ))}
      //     </div>
      //   </div>
      // </div>
      <MainCard title="📅 My Bookings" navigateTo="/my-bookings" scrollable={true}>
        {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 rounded-lg p-3 flex items-start justify-between gap-3"
              >
                {/* Left: main info */}
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {booking.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <FiCalendar className="text-gray-400" size={10} />
                    {booking.date} · {booking.time}
                  </p>
  
                  <p className="text-xs text-gray-600 mt-2">
                    Services:{" "}
                    <span className="font-medium">
                      {booking.services.join(", ")}
                    </span>
                  </p>
  
                  {booking.status === "pending" && (
                    <p className="text-xs text-amber-700 mt-1 flex items-center gap-1">
                      <FiClock className="text-amber-600" size={10} />
                      {getTimeRemainingLabel(booking.date, booking.time)}
                    </p>
                  )}
                </div>
  
                {/* Right: status + charges */}
                <div className="text-right space-y-1 min-w-[90px]">
                  <span
                    className={
                      "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border capitalize " +
                      getStatusStyles(booking.status)
                    }
                  >
                    {booking.status}
                  </span>
  
                  <p className="text-sm font-semibold text-gray-900 flex items-center justify-end gap-1">
                    <FiDollarSign className="text-gray-600" size={12} />
                    {booking.amount}
                  </p>
  
                  {booking.status === "pending" && (
                    <p className="text-[10px] text-gray-500">
                      Estimated charges
                    </p>
                  )}
                </div>
              </div>
            ))}
      </MainCard>
    );
  }