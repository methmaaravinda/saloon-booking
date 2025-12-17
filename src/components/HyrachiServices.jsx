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
            <div>
                <h1 className="inline-block text-sm font-semibold text-gray-900 px-2 pt-1 pb-2">
                    All Services
                </h1>
                <AutoScroll speed={10} pauseOnHover={true}>
                    <div className="flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap pl-3">
                        <h2 className="text-xs font-medium text-gray-900 border border-gray-400 p-2 rounded-lg">
                            💇 Hair Services
                        </h2>
                        <h2 className="text-xs font-medium text-gray-900 border border-gray-400 p-2 rounded-lg">
                            💆 Facial Services
                        </h2>
                        <h2 className="text-xs font-medium text-gray-900 border border-gray-400 p-2 rounded-lg">
                            💆‍♀️ Manicure Services
                        </h2>
                        <h2 className="text-xs font-medium text-gray-900 border border-gray-400 p-2 rounded-lg">
                            💆‍♀️ Pedicure Services
                        </h2>
                    </div>
                </AutoScroll>
            </div>
            <div>
                <h1 className="inline-block text-sm font-semibold text-gray-900 px-2 pt-1 pb-2">
                    Next Available Slots
                </h1>
                <AutoScroll speed={15} pauseOnHover={true}>
                    <div className="flex flex-nowrap gap-3 overflow-x-auto whitespace-nowrap pl-3">
                        {/* Slot 1 - Today */}
                        <button className="flex flex-col bg-white border border-gray-400 p-3 rounded-xl min-w-[120px] hover:bg-gray-50 hover:border-gray-500 transition-all">
                            <span className="text-xs font-bold text-gray-600">Today</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">10:30 AM</span>
                        </button>
                        {/* Slot 2 - Today */}
                        <button className="flex flex-col bg-white border border-gray-400 p-3 rounded-xl min-w-[120px] hover:bg-gray-50 hover:border-gray-500 transition-all">
                            <span className="text-xs font-bold text-gray-600">Today</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">2:00 A.M</span>
                        </button>
                        {/* Slot 3 - Today */}
                        <button className="flex flex-col bg-white border border-gray-400 p-3 rounded-xl min-w-[120px] hover:bg-gray-50 hover:border-gray-500 transition-all">
                            <span className="text-xs font-bold text-gray-600">Today</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">4:30 A.M</span>
                        </button>
                        {/* Slot 4 - Tomorrow */}
                        <button className="flex flex-col bg-white border border-gray-400 p-3 rounded-xl min-w-[120px] hover:bg-gray-50 hover:border-gray-500 transition-all">
                            <span className="text-xs font-bold text-gray-600">Tomorrow</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">9:00 AM</span>
                        </button>
                        {/* Slot 5 - Tomorrow */}
                        <button className="flex flex-col bg-white border border-gray-400 p-3 rounded-xl min-w-[120px] hover:bg-gray-50 hover:border-gray-500 transition-all">
                            <span className="text-xs font-bold text-gray-600">Tomorrow</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">11:30 AM</span>
                        </button>
                        {/* Slot 6 - Tomorrow */}
                        <button className="flex flex-col bg-white border border-gray-400 p-3 rounded-xl min-w-[120px] hover:bg-gray-50 hover:border-gray-500 transition-all">
                            <span className="text-xs font-bold text-gray-600">Tomorrow</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">3:00 PM</span>
                        </button>
                        {/* Slot 7 - Thu */}
                        <button className="flex flex-col bg-white border border-gray-300 p-3 rounded-xl min-w-[120px] hover:bg-gray-50 hover:border-gray-400 transition-all">
                            <span className="text-xs font-bold text-gray-600">Thu, Dec 19</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">10:00 AM</span>
                        </button>
                        {/* Slot 8 - Fri */}
                        <button className="flex flex-col bg-white border border-gray-300 p-3 rounded-xl min-w-[120px] hover:bg-gray-50 hover:border-gray-400 transition-all">
                            <span className="text-xs font-bold text-gray-600">Fri, Dec 20</span>
                            <span className="text-lg font-bold text-gray-900 mt-1">1:00 PM</span>
                        </button>
                    </div>
                </AutoScroll>
            </div>
            {/* My Bookings Section */}
            <div>
                <h1 className="inline-block text-sm font-semibold text-gray-900 px-2 pt-1 pb-2">
                    My Bookings
                </h1>
                <AutoScroll speed={12} pauseOnHover={true}>
                    <div className="flex flex-nowrap gap-3 overflow-x-auto whitespace-nowrap pl-3 pb-3">
                        {/* Upcoming Booking 1 */}
                        <div className="flex flex-col bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-400 p-3 rounded-xl min-w-[160px]">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-emerald-600">Upcoming</span>
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">💇 Haircut</span>
                            <span className="text-xs text-gray-600 mt-1">Today, 3:00 PM</span>
                            <span className="text-xs text-gray-500 mt-1">with Sarah J.</span>
                        </div>
                        {/* Upcoming Booking 2 */}
                        <div className="flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 p-3 rounded-xl min-w-[160px]">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-600">Confirmed</span>
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">💆 Facial</span>
                            <span className="text-xs text-gray-600 mt-1">Tomorrow, 11:00 AM</span>
                            <span className="text-xs text-gray-500 mt-1">with Emily R.</span>
                        </div>
                        {/* Upcoming Booking 3 */}
                        <div className="flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 p-3 rounded-xl min-w-[160px]">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-purple-600">Confirmed</span>
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 mt-2">💅 Manicure</span>
                            <span className="text-xs text-gray-600 mt-1">Sat, Dec 21</span>
                            <span className="text-xs text-gray-500 mt-1">with Lisa M.</span>
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
        </div>
    )
}
