import React, { useState, useEffect } from 'react';

/**
 * SmoothTextCycle - A reusable component that smoothly transitions between text items
 * 
 * @param {Array} items - Array of strings to cycle through
 * @param {number} interval - Time in milliseconds between transitions (default: 3000)
 * @param {string} version - Animation version: 'fade', 'fast', 'slide', 'scale' (default: 'fade')
 * @param {string} className - Additional CSS classes for the container
 * @param {boolean} showCheckmark - Whether to show the checkmark icon (default: true)
 */
const SmoothTextCycle = ({ 
  items = [], 
  interval = 3000, 
  version = 'fade',
  className = '',
  showCheckmark = true,
  simple = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (items.length === 0) return;

    const cycleInterval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // Wait for fade out, then change text and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setIsVisible(true);
      }, 500);
      
    }, interval);

    return () => clearInterval(cycleInterval);
  }, [items.length, interval]);

  // Return null if no items
  if (items.length === 0) return null;

  // Determine transition classes based on version
  const getTransitionClasses = () => {
    const baseClasses = 'w-full transition-all duration-500';
    
    switch(version) {
      case 'fade':
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      
      case 'fast':
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      
      case 'slide':
        return `${baseClasses} ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4'
        }`;
      
      case 'scale':
        return `${baseClasses} ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`;
      
      default:
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
    }
  };

  const containerClasses = simple 
    ? `relative ${className.includes('h-') ? '' : 'h-auto'} flex items-center ${version === 'slide' ? 'overflow-hidden' : ''} ${className}`
    : `relative h-20 flex items-center ${version === 'slide' ? 'overflow-hidden' : ''} ${className}`;
  
  const contentClasses = simple
    ? "flex items-center gap-2"
    : "flex items-start gap-2 bg-white rounded-lg p-3 shadow-md";
  
  const textClasses = simple
    ? "text-xs text-gray-600"
    : "text-sm text-gray-700 font-medium";
  
  const checkmarkClasses = simple
    ? "text-green-500 text-sm flex-shrink-0"
    : "text-green-500 text-sm mt-0.5 flex-shrink-0";

  return (
    <div className={containerClasses}>
      <div className={getTransitionClasses()}>
        <div className={contentClasses}>
          {showCheckmark && (
            <span className={checkmarkClasses}>✓</span>
          )}
          <span className={textClasses}>
            {items[currentIndex]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmoothTextCycle;


// ===== DEMO COMPONENT (Remove this in production) =====
// export const SmoothTextCycleDemo = () => {
//   const [selectedVersion, setSelectedVersion] = useState('fade');
  
//   const items = [
//     "Professional tour guide",
//     "Round-trip transportation",
//     "Entrance fees to all attractions",
//     "Complimentary lunch and refreshments",
//     "Travel insurance coverage",
//     "Photography service",
//     "Souvenir gift pack",
//     "24/7 customer support"
//   ];

//   const versions = [
//     { value: 'fade', label: 'Fade In/Out', color: 'purple', description: 'Clean fade transition' },
//     { value: 'fast', label: 'Fast Fade', color: 'blue', description: 'Faster paced (2s)' },
//     { value: 'slide', label: 'Slide + Fade', color: 'green', description: 'Slide up animation' },
//     { value: 'scale', label: 'Scale + Fade', color: 'orange', description: 'Zoom in effect' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
//           SmoothTextCycle Component
//         </h1>
//         <p className="text-center text-gray-600 mb-8">
//           A reusable component with multiple animation versions
//         </p>

//         {/* Version Selector */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
//           <h2 className="text-lg font-bold text-gray-800 mb-4">Select Animation Version:</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {versions.map((ver) => (
//               <button
//                 key={ver.value}
//                 onClick={() => setSelectedVersion(ver.value)}
//                 className={`p-4 rounded-xl border-2 transition-all ${
//                   selectedVersion === ver.value
//                     ? `border-${ver.color}-500 bg-${ver.color}-50 shadow-md`
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//               >
//                 <div className="font-semibold text-sm mb-1">{ver.label}</div>
//                 <div className="text-xs text-gray-500">{ver.description}</div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Live Preview */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Live Preview</h2>
//           <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
//             <p className="text-sm font-semibold text-gray-900 mb-3">What's Included:</p>
//             <SmoothTextCycle 
//               items={items} 
//               interval={selectedVersion === 'fast' ? 2000 : 3000}
//               version={selectedVersion}
//             />
//           </div>
//         </div>

//         {/* Usage Code */}
//         <div className="bg-gray-900 rounded-2xl shadow-xl p-6">
//           <h2 className="text-xl font-bold text-white mb-4">Usage Example</h2>
//           <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
//             <pre className="text-sm text-green-400"><code>{`import SmoothTextCycle from './SmoothTextCycle';

// const MyComponent = () => {
//   const items = [
//     "Professional tour guide",
//     "Round-trip transportation",
//     "Entrance fees to all attractions"
//   ];

//   return (
//     <div className="mb-6">
//       <p className="text-sm font-semibold mb-2">
//         What's Included:
//       </p>
//       <SmoothTextCycle 
//         items={items}
//         interval={3000}
//         version="${selectedVersion}"
//         showCheckmark={true}
//       />
//     </div>
//   );
// };`}</code></pre>
//           </div>

//           {/* Props Documentation */}
//           <div className="mt-6 text-white">
//             <h3 className="font-bold text-lg mb-3">Props:</h3>
//             <div className="space-y-3 text-sm">
//               <div className="bg-gray-800 rounded p-3">
//                 <code className="text-purple-400">items</code>
//                 <span className="text-gray-400"> (Array) - Required</span>
//                 <p className="text-gray-300 mt-1">Array of strings to cycle through</p>
//               </div>
//               <div className="bg-gray-800 rounded p-3">
//                 <code className="text-purple-400">interval</code>
//                 <span className="text-gray-400"> (Number) - Default: 3000</span>
//                 <p className="text-gray-300 mt-1">Time in milliseconds between transitions</p>
//               </div>
//               <div className="bg-gray-800 rounded p-3">
//                 <code className="text-purple-400">version</code>
//                 <span className="text-gray-400"> (String) - Default: 'fade'</span>
//                 <p className="text-gray-300 mt-1">Animation version: 'fade', 'fast', 'slide', 'scale'</p>
//               </div>
//               <div className="bg-gray-800 rounded p-3">
//                 <code className="text-purple-400">className</code>
//                 <span className="text-gray-400"> (String) - Optional</span>
//                 <p className="text-gray-300 mt-1">Additional CSS classes for the container</p>
//               </div>
//               <div className="bg-gray-800 rounded p-3">
//                 <code className="text-purple-400">showCheckmark</code>
//                 <span className="text-gray-400"> (Boolean) - Default: true</span>
//                 <p className="text-gray-300 mt-1">Whether to show the checkmark icon</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };