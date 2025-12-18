// // Reusable AutoScroll component
// function AutoScroll({ children, speed = 30, direction = 'left', pauseOnHover = true }) {
//   const scrollRef = useRef(null);
//   const animationRef = useRef(null);
//   const isPausedRef = useRef(false);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     // Clone the children for seamless loop
//     const content = scrollContainer.querySelector('.scroll-content');
//     const clone = content.cloneNode(true);
//     clone.classList.add('scroll-clone');
//     scrollContainer.appendChild(clone);

//     let scrollPosition = 0;
//     const contentWidth = content.offsetWidth;

//     const animate = () => {
//       if (!isPausedRef.current) {
//         if (direction === 'left') {
//           scrollPosition += speed / 60;
//           if (scrollPosition >= contentWidth) {
//             scrollPosition = 0;
//           }
//         } else {
//           scrollPosition -= speed / 60;
//           if (scrollPosition <= -contentWidth) {
//             scrollPosition = 0;
//           }
//         }
//         scrollContainer.scrollLeft = scrollPosition;
//       }
//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [speed, direction]);

//   const handleMouseEnter = () => {
//     if (pauseOnHover) {
//       isPausedRef.current = true;
//     }
//   };

//   const handleMouseLeave = () => {
//     if (pauseOnHover) {
//       isPausedRef.current = false;
//     }
//   };

//   return (
//     <div
//       ref={scrollRef}
//       className="overflow-hidden whitespace-nowrap"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//     >
//       <style>
//         {`
//           .scroll-content, .scroll-clone {
//             display: inline-block;
//           }
//           div::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//       </style>
//       <div className="scroll-content inline-block">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Your services component with auto-scroll
// export default function HyrachiServices() {
//   const services = [
//     { name: "Hair Services", emoji: "💇" },
//     { name: "Facial Services", emoji: "💆" },
//     { name: "Manicure Services", emoji: "💆‍♀️" },
//     { name: "Pedicure Services", emoji: "💅" },
//     { name: "Spa Services", emoji: "🧖" },
//     { name: "Massage Services", emoji: "💆‍♂️" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Original Component with Auto-Scroll */}
//         <div className="bg-white shadow-[8px_0_15px_rgba(0,0,0,0.15)] border-l border-gray-400 rounded-lg overflow-hidden">
//           <h1 className="inline-block text-sm font-semibold text-gray-900 px-2 pt-1 pb-2">
//             All Services (Auto-Scroll - Hover to Pause)
//           </h1>
//           <AutoScroll speed={30} pauseOnHover={true}>
//             <div className="flex gap-2 pl-3 pb-3">
//               {services.map((service, idx) => (
//                 <h2
//                   key={idx}
//                   className="text-xs font-medium text-gray-900 border border-gray-400 p-2 rounded-lg"
//                 >
//                   {service.emoji} {service.name}
//                 </h2>
//               ))}
//             </div>
//           </AutoScroll>
//         </div>

//         {/* Different Speed Examples */}
//         <div className="bg-white shadow-lg rounded-lg p-4">
//           <h1 className="text-sm font-semibold text-gray-900 mb-3">
//             Slow Speed (speed=15)
//           </h1>
//           <AutoScroll speed={15}>
//             <div className="flex gap-2">
//               {services.map((service, idx) => (
//                 <span
//                   key={idx}
//                   className="text-xs font-medium text-white bg-gray-500 px-3 py-2 rounded-full"
//                 >
//                   {service.emoji} {service.name}
//                 </span>
//               ))}
//             </div>
//           </AutoScroll>
//         </div>

//         <div className="bg-white shadow-lg rounded-lg p-4">
//           <h1 className="text-sm font-semibold text-gray-900 mb-3">
//             Fast Speed (speed=60)
//           </h1>
//           <AutoScroll speed={60}>
//             <div className="flex gap-2">
//               {services.map((service, idx) => (
//                 <span
//                   key={idx}
//                   className="text-xs font-medium text-white bg-purple-500 px-3 py-2 rounded-lg"
//                 >
//                   {service.emoji} {service.name}
//                 </span>
//               ))}
//             </div>
//           </AutoScroll>
//         </div>

//         {/* Right Direction */}
//         <div className="bg-white shadow-lg rounded-lg p-4">
//           <h1 className="text-sm font-semibold text-gray-900 mb-3">
//             Scrolling Right (direction="right")
//           </h1>
//           <AutoScroll speed={30} direction="right">
//             <div className="flex gap-2">
//               {services.map((service, idx) => (
//                 <span
//                   key={idx}
//                   className="text-xs font-medium text-white bg-green-500 px-3 py-2 rounded-lg"
//                 >
//                   {service.emoji} {service.name}
//                 </span>
//               ))}
//             </div>
//           </AutoScroll>
//         </div>

//         {/* Always Scrolling (no pause on hover) */}
//         <div className="bg-white shadow-lg rounded-lg p-4">
//           <h1 className="text-sm font-semibold text-gray-900 mb-3">
//             No Pause on Hover (pauseOnHover=false)
//           </h1>
//           <AutoScroll speed={40} pauseOnHover={false}>
//             <div className="flex gap-2">
//               {services.map((service, idx) => (
//                 <span
//                   key={idx}
//                   className="text-xs font-medium text-white bg-red-500 px-3 py-2 rounded-lg"
//                 >
//                   {service.emoji} {service.name}
//                 </span>
//               ))}
//             </div>
//           </AutoScroll>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from 'react';

// Reusable AutoScroll component - supports both auto-scroll AND manual scroll
function AutoScroll({ children, speed = 30, direction = 'left', pauseOnHover = true }) {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const isPausedRef = useRef(false);
  const isUserScrollingRef = useRef(false);
  const userScrollTimeoutRef = useRef(null);
  const isAutoScrollingRef = useRef(false); // Track if we're auto-scrolling

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Clone the children for seamless loop
    const content = scrollContainer.querySelector('.scroll-content');
    const clone = content.cloneNode(true);
    clone.classList.add('scroll-clone');
    scrollContainer.appendChild(clone);

    let scrollPosition = 0;
    const contentWidth = content.offsetWidth;

    const animate = () => {
      if (!isPausedRef.current && !isUserScrollingRef.current) {
        if (direction === 'left') {
          scrollPosition += speed / 60;
          if (scrollPosition >= contentWidth) {
            scrollPosition = 0;
          }
        } else {
          scrollPosition -= speed / 60;
          if (scrollPosition <= -contentWidth) {
            scrollPosition = 0;
          }
        }
        isAutoScrollingRef.current = true; // Mark as auto-scroll
        scrollContainer.scrollLeft = scrollPosition;
        // Reset flag after a tiny delay
        requestAnimationFrame(() => {
          isAutoScrollingRef.current = false;
        });
      } else {
        // Sync scrollPosition with current scroll when paused/user scrolling
        scrollPosition = scrollContainer.scrollLeft;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
    };
  }, [speed, direction]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      isPausedRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      isPausedRef.current = false;
    }
  };

  // Handle touch/manual scroll
  const handleTouchStart = () => {
    isUserScrollingRef.current = true;
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    // Resume auto-scroll after 2 seconds of no touch
    userScrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 2000);
  };

  const handleWheel = () => {
    // User is scrolling with mouse wheel - pause auto-scroll
    isUserScrollingRef.current = true;
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }
    userScrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 2000);
  };

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto whitespace-nowrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
    >
      <style>
        {`
          .scroll-content, .scroll-clone {
            display: inline-block;
          }
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="scroll-content inline-block">
        {children}
      </div>
    </div>
  );
}

export default function HyrachiServices() {
    const categories = [
        {
            name: "Haircut",
            emoji: "💇",
        },
        {
            name: "Facial",
            emoji: "💆",
        },
    ]
    return (
        <div className="flex flex-col border-l border-gray-400 gap-4">
            {/* All Services - Purple/Indigo Theme */}
            <div>
                <h1 className="inline-block text-sm font-semibold text-gray-900 px-2 pt-1 pb-2">
                    ✂️ All Services
                </h1>
                <AutoScroll speed={10} pauseOnHover={true}>
                    <div className="flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap pl-3">
                        <h2 className="text-xs font-medium text-indigo-700 border-2 border-indigo-300 p-2 rounded-lg shadow-sm">
                            💇 Hair Services
                        </h2>
                        <h2 className="text-xs font-medium text-indigo-700 border-2 border-indigo-300 p-2 rounded-lg shadow-sm">
                            💆 Facial Services
                        </h2>
                        <h2 className="text-xs font-medium text-indigo-700 border-2 border-indigo-300 p-2 rounded-lg shadow-sm">
                            💆‍♀️ Manicure Services
                        </h2>
                        <h2 className="text-xs font-medium text-indigo-700 border-2 border-indigo-300 p-2 rounded-lg shadow-sm">
                            💆‍♀️ Pedicure Services
                        </h2>
                    </div>
                </AutoScroll>
            </div>

            {/* Next Available Slots - Keep Original Green/Blue */}
            <div>
                <h1 className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 px-2 pt-1 pb-2">
                    ⏰ Next Available Slots
                </h1>
                <AutoScroll speed={15} pauseOnHover={true}>
                    <div className="flex flex-nowrap gap-3 overflow-x-auto whitespace-nowrap pl-3">
                        {/* Slot 1 - Today */}
                        <button className="flex flex-col items-start bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-300 p-3.5 rounded-xl min-w-[130px] shadow-md active:scale-95 transition-all">
                            <div className="flex items-center gap-1.5 w-full">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Today</span>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 mt-2">10:30</span>
                            <span className="text-xs font-medium text-emerald-600 mt-0.5">AM</span>
                        </button>
                        {/* Slot 2 - Today */}
                        <button className="flex flex-col items-start bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-300 p-3.5 rounded-xl min-w-[130px] shadow-md active:scale-95 transition-all">
                            <div className="flex items-center gap-1.5 w-full">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Today</span>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 mt-2">2:00</span>
                            <span className="text-xs font-medium text-emerald-600 mt-0.5">PM</span>
                        </button>
                        {/* Slot 3 - Today */}
                        <button className="flex flex-col items-start bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-300 p-3.5 rounded-xl min-w-[130px] shadow-md active:scale-95 transition-all">
                            <div className="flex items-center gap-1.5 w-full">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Today</span>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 mt-2">4:30</span>
                            <span className="text-xs font-medium text-emerald-600 mt-0.5">PM</span>
                        </button>
                        {/* Slot 4 - Tomorrow */}
                        <button className="flex flex-col items-start bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-300 p-3.5 rounded-xl min-w-[130px] shadow-md active:scale-95 transition-all">
                            <div className="flex items-center gap-1.5 w-full">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Tomorrow</span>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 mt-2">9:00</span>
                            <span className="text-xs font-medium text-blue-600 mt-0.5">AM</span>
                        </button>
                        {/* Slot 5 - Tomorrow */}
                        <button className="flex flex-col items-start bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-300 p-3.5 rounded-xl min-w-[130px] shadow-md active:scale-95 transition-all">
                            <div className="flex items-center gap-1.5 w-full">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Tomorrow</span>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 mt-2">11:30</span>
                            <span className="text-xs font-medium text-blue-600 mt-0.5">AM</span>
                        </button>
                        {/* Slot 6 - Tomorrow */}
                        <button className="flex flex-col items-start bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-300 p-3.5 rounded-xl min-w-[130px] shadow-md active:scale-95 transition-all">
                            <div className="flex items-center gap-1.5 w-full">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Tomorrow</span>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 mt-2">3:00</span>
                            <span className="text-xs font-medium text-blue-600 mt-0.5">PM</span>
                        </button>
                        {/* Slot 7 - Thu */}
                        <button className="flex flex-col items-start bg-gradient-to-br from-gray-50 to-gray-100/50 border-2 border-gray-300 p-3.5 rounded-xl min-w-[130px] shadow-md active:scale-95 transition-all">
                            <div className="flex items-center gap-1.5 w-full">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Thu, Dec 19</span>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 mt-2">10:00</span>
                            <span className="text-xs font-medium text-gray-500 mt-0.5">AM</span>
                        </button>
                        {/* Slot 8 - Fri */}
                        <button className="flex flex-col items-start bg-gradient-to-br from-gray-50 to-gray-100/50 border-2 border-gray-300 p-3.5 rounded-xl min-w-[130px] shadow-md active:scale-95 transition-all">
                            <div className="flex items-center gap-1.5 w-full">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Fri, Dec 20</span>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 mt-2">1:00</span>
                            <span className="text-xs font-medium text-gray-500 mt-0.5">PM</span>
                        </button>
                    </div>
                </AutoScroll>
            </div>

            {/* My Bookings - Teal/Cyan Theme */}
            <div>
                <h1 className="inline-block text-sm font-semibold text-gray-900 px-2 pt-1 pb-2">
                    📅 My Bookings
                </h1>
                <AutoScroll speed={12} pauseOnHover={true}>
                    <div className="flex flex-nowrap gap-3 overflow-x-auto whitespace-nowrap pl-3 pb-3">
                        {/* Upcoming Booking 1 */}
                        <div className="flex flex-col bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-400 p-3 rounded-xl min-w-[160px] shadow-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-teal-700 bg-teal-200 px-2 py-0.5 rounded-md">Upcoming</span>
                                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">💇 Haircut</span>
                            <span className="text-xs text-gray-700 mt-1 font-medium">Today, 3:00 PM</span>
                            <span className="text-xs text-teal-600 mt-1">with Sarah J.</span>
                        </div>
                        {/* Upcoming Booking 2 */}
                        <div className="flex flex-col bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-400 p-3 rounded-xl min-w-[160px] shadow-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-cyan-700 bg-cyan-200 px-2 py-0.5 rounded-md">Confirmed</span>
                                <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">💆 Facial</span>
                            <span className="text-xs text-gray-700 mt-1 font-medium">Tomorrow, 11:00 AM</span>
                            <span className="text-xs text-cyan-600 mt-1">with Emily R.</span>
                        </div>
                        {/* Upcoming Booking 3 */}
                        <div className="flex flex-col bg-gradient-to-br from-sky-50 to-sky-100 border-2 border-sky-400 p-3 rounded-xl min-w-[160px] shadow-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-sky-700 bg-sky-200 px-2 py-0.5 rounded-md">Confirmed</span>
                                <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">💅 Manicure</span>
                            <span className="text-xs text-gray-700 mt-1 font-medium">Sat, Dec 21</span>
                            <span className="text-xs text-sky-600 mt-1">with Lisa M.</span>
                        </div>
                        {/* Past Booking 1 */}
                        <div className="flex flex-col bg-gray-100 border border-gray-300 p-3 rounded-xl min-w-[160px] opacity-70">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500">Completed</span>
                                <span className="text-xs text-gray-400">✓</span>
                            </div>
                            <span className="text-sm font-bold text-gray-700 mt-2">💇 Haircut</span>
                            <span className="text-xs text-gray-500 mt-1">Dec 10, 2:00 PM</span>
                            <span className="text-xs text-gray-400 mt-1">with Sarah J.</span>
                        </div>
                        {/* Past Booking 2 */}
                        <div className="flex flex-col bg-gray-100 border border-gray-300 p-3 rounded-xl min-w-[160px] opacity-70">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500">Completed</span>
                                <span className="text-xs text-gray-400">✓</span>
                            </div>
                            <span className="text-sm font-bold text-gray-700 mt-2">🧖 Spa</span>
                            <span className="text-xs text-gray-500 mt-1">Dec 5, 10:00 AM</span>
                            <span className="text-xs text-gray-400 mt-1">with Maria K.</span>
                        </div>
                    </div>
                </AutoScroll>
            </div>

            {/* Discounts Section - Vibrant/Warm Theme */}
            <div>
                <h1 className="inline-block text-sm font-semibold text-gray-900 px-2 pt-1 pb-2">
                    🎉 Discounts & Offers
                </h1>
                <AutoScroll speed={12} pauseOnHover={true}>
                    <div className="flex flex-nowrap gap-3 overflow-x-auto whitespace-nowrap pl-3 pb-3">
                        {/* Discount 1 - New Customer */}
                        <div className="flex flex-col bg-gradient-to-br from-rose-100 to-rose-200 border-2 border-rose-400 p-3 rounded-xl min-w-[180px] shadow-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-rose-700 bg-rose-300 px-2 py-0.5 rounded-full">NEW</span>
                                <span className="text-lg font-black text-rose-600">20% OFF</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">First Visit Discount</span>
                            <span className="text-xs text-gray-700 mt-1">On any service</span>
                            <span className="text-xs text-rose-700 mt-2 font-medium bg-rose-300/50 px-2 py-0.5 rounded">Code: WELCOME20</span>
                        </div>
                        {/* Discount 2 - Haircut */}
                        <div className="flex flex-col bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-400 p-3 rounded-xl min-w-[180px] shadow-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-amber-700 bg-amber-300 px-2 py-0.5 rounded-full">HOT</span>
                                <span className="text-lg font-black text-amber-600">15% OFF</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">💇 Haircut Special</span>
                            <span className="text-xs text-gray-700 mt-1">Valid till Dec 31</span>
                            <span className="text-xs text-amber-700 mt-2 font-medium bg-amber-300/50 px-2 py-0.5 rounded">Code: HAIR15</span>
                        </div>
                        {/* Discount 3 - Spa Package */}
                        <div className="flex flex-col bg-gradient-to-br from-emerald-100 to-emerald-200 border-2 border-emerald-400 p-3 rounded-xl min-w-[180px] shadow-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-300 px-2 py-0.5 rounded-full">COMBO</span>
                                <span className="text-lg font-black text-emerald-600">25% OFF</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">🧖 Spa Package</span>
                            <span className="text-xs text-gray-700 mt-1">Massage + Facial</span>
                            <span className="text-xs text-emerald-700 mt-2 font-medium bg-emerald-300/50 px-2 py-0.5 rounded">Code: SPA25</span>
                        </div>
                        {/* Discount 4 - Weekend */}
                        <div className="flex flex-col bg-gradient-to-br from-violet-100 to-violet-200 border-2 border-violet-400 p-3 rounded-xl min-w-[180px] shadow-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-violet-700 bg-violet-300 px-2 py-0.5 rounded-full">WEEKEND</span>
                                <span className="text-lg font-black text-violet-600">10% OFF</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">Weekend Special</span>
                            <span className="text-xs text-gray-700 mt-1">Sat & Sun only</span>
                            <span className="text-xs text-violet-700 mt-2 font-medium bg-violet-300/50 px-2 py-0.5 rounded">Code: WEEKEND10</span>
                        </div>
                        {/* Discount 5 - Bridal */}
                        <div className="flex flex-col bg-gradient-to-br from-fuchsia-100 to-fuchsia-200 border-2 border-fuchsia-400 p-3 rounded-xl min-w-[180px] shadow-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-fuchsia-700 bg-fuchsia-300 px-2 py-0.5 rounded-full">BRIDAL</span>
                                <span className="text-lg font-black text-fuchsia-600">30% OFF</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">👰 Bridal Package</span>
                            <span className="text-xs text-gray-700 mt-1">Full bridal makeup</span>
                            <span className="text-xs text-fuchsia-700 mt-2 font-medium bg-fuchsia-300/50 px-2 py-0.5 rounded">Code: BRIDE30</span>
                        </div>
                        {/* Discount 6 - Refer */}
                        <div className="flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-400 p-3 rounded-xl min-w-[180px] shadow-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-700 bg-blue-300 px-2 py-0.5 rounded-full">REFER</span>
                                <span className="text-lg font-black text-blue-600">$10 OFF</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">Refer a Friend</span>
                            <span className="text-xs text-gray-700 mt-1">Both get $10 off</span>
                            <span className="text-xs text-blue-700 mt-2 font-medium bg-blue-300/50 px-2 py-0.5 rounded">Code: FRIEND10</span>
                        </div>
                    </div>
                </AutoScroll>
            </div>
        </div>
    )
}
