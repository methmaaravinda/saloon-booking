import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5';
import MainCard from './layout/MainCard';
import SmoothTextCycle from './layout/SmoothTextEffect';
import TimeSlotSelection from './TimeSlotSelection';
import { AutoScroll } from './HyrachiServices';
import video_url from '../assets/videoplayback.mp4'
import facial_image from '../assets/facial-image.webp'
import { AutoscrollHorizontal } from './Animations/AutoscrollHorizontal';
export const servicesData = [
  {
    category: "Hair Services 💇‍♀️💇‍♂️",
    items: [
      "Haircut (men / women / kids)",
      "Hair styling (blow dry, curls, straightening)",
      "Hair wash & conditioning",
      "Hair coloring (full color, root touch-up)",
      "Highlights / balayage / ombré",
      "Hair spa & treatments",
      "Hair smoothening / rebonding / keratin",
      "Beard trim & shave (for men)",
    ],
  },
  {
    category: "Skin / Face Services ✨",
    items: [
      "Facials (basic, gold, herbal, anti-aging)",
      "Clean-up",
      "Bleaching",
      "Threading",
      "Waxing (face / body)",
      "Face massage",
      "De-tan treatment",
      "Acne or pigmentation treatments",
    ],
  },
  {
    category: "Nail Services 💅",
    items: [
      "Manicure",
      "Pedicure",
      "Gel polish",
      "Nail extensions",
      "Nail art",
      "Nail repair / removal",
    ],
  },
  {
    category: "Makeup Services 💄",
    items: [
      "Party makeup",
      "Bridal makeup",
      "Engagement makeup",
      "Photoshoot makeup",
      "HD / Airbrush makeup",
      "Hairstyle with makeup",
    ],
  },
  {
    category: "Body Care Services 🧖‍♀️",
    items: [
      "Body massage",
      "Body scrub",
      "Body polishing",
      "Body wrap",
      "Back polish",
    ],
  },
  {
    category: "Men's Grooming Services 🧔",
    items: [
      "Haircut & styling",
      "Beard grooming",
      "Shave",
      "Facial for men",
      "Head massage",
    ],
  },
  {
    category: "Bridal & Groom Packages 👰🤵",
    items: ["Bridal full package", "Pre-bridal packages", "Groom makeup & grooming", "Engagement packages"],
  },
  {
    category: "Kids Services 👶",
    items: ["Kids haircut", "Kids grooming packages"],
  },
];

// Service details data (you can expand this with real data)
const serviceDetails = {
  "Haircut (men / women / kids)": {
    description: "Professional haircut service tailored to your style. Includes consultation, wash, cut, and blow dry.",
    videoUrl: video_url,
    thumbnailUrl: facial_image,
    duration: "30-45 minutes",
    price: "₹300 - ₹800",
    includes: ["Style consultation", "Hair wash", "Precision cutting", "Blow dry styling", "Finishing products"],
  },
  "Hair styling (blow dry, curls, straightening)": {
    description: "Expert hair styling for any occasion. Choose from blow dry, curls, or straightening.",
    videoUrl: "/videos/hair-styling-demo.mp4", // Path to your local video file
    duration: "45-60 minutes",
    price: "₹500 - ₹1,500",
    includes: ["Heat protection", "Professional styling", "Premium products", "Long-lasting finish"],
  },
  "Hair wash & conditioning": {
    description: "Relaxing hair wash with deep conditioning treatment for soft, manageable hair.",
    videoUrl: "/videos/hair-wash-demo.mp4", // Path to your local video file
    duration: "20-30 minutes",
    price: "₹200 - ₹500",
    includes: ["Scalp massage", "Premium shampoo", "Deep conditioning", "Towel dry"],
  },
  "Hair coloring (full color, root touch-up)": {
    description: "Complete hair coloring service with premium products. Includes consultation and styling.",
    videoUrl: "/videos/hair-coloring-demo.mp4", // Path to your local video file
    duration: "2-3 hours",
    price: "₹2,500 - ₹5,000",
    includes: ["Color consultation", "Scalp protection", "Premium color products", "Hair wash & conditioning", "Blow dry styling"],
  },
  "Highlights / balayage / ombré": {
    description: "Advanced hair coloring techniques for dimensional, natural-looking color.",
    videoUrl: "/videos/highlights-demo.mp4", // Path to your local video file
    duration: "3-4 hours",
    price: "₹3,500 - ₹8,000",
    includes: ["Expert consultation", "Customized coloring", "Toning treatment", "Deep conditioning", "Professional styling"],
  },
  "Hair spa & treatments": {
    description: "Luxurious hair spa treatment to nourish and revitalize your hair.",
    videoUrl: "/videos/hair-spa-demo.mp4", // Path to your local video file
    duration: "60-90 minutes",
    price: "₹1,500 - ₹3,500",
    includes: ["Hair analysis", "Steam treatment", "Massage therapy", "Deep nourishment mask", "Blow dry"],
  },
  "Hair smoothening / rebonding / keratin": {
    description: "Professional hair straightening treatment for smooth, frizz-free hair.",
    videoUrl: "/videos/smoothening-demo.mp4", // Path to your local video file
    duration: "3-5 hours",
    price: "₹4,000 - ₹12,000",
    includes: ["Hair assessment", "Treatment application", "Heat styling", "Aftercare products", "Styling tips"],
  },
  "Beard trim & shave (for men)": {
    description: "Expert beard grooming and shaving service for a clean, polished look.",
    videoUrl: "/videos/beard-trim-demo.mp4", // Path to your local video file
    duration: "20-30 minutes",
    price: "₹200 - ₹500",
    includes: ["Beard shaping", "Hot towel treatment", "Precision trimming/shaving", "Aftershave care"],
  },
  // Add more service details as needed - using defaults for others
};

// Default service details for services not in the map
const defaultServiceDetails = {
  description: "Professional service delivered by our experienced team. Contact us for personalized consultation.",
  duration: "Varies",
  price: "Contact for pricing",
  includes: ["Expert consultation", "Professional service", "Quality products", "Aftercare advice"],
};

// Service Popup Component
function ServicePopup({ isOpen, onClose, service }) {
  const [showVideo, setShowVideo] = useState(false);
  const [showTimeSlotSelection, setShowTimeSlotSelection] = useState(false);
  const [hideServicePopup, setHideServicePopup] = useState(false);
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleBookNow = () => {
    // Hide ServicePopup and show TimeSlotSelection
    setHideServicePopup(true);
    setShowTimeSlotSelection(true);
  };

  const handleCloseTimeSlot = () => {
    // Close TimeSlotSelection and show ServicePopup again
    setShowTimeSlotSelection(false);
    setHideServicePopup(false);
  };

  const handleFinaliseBooking = (date, slot) => {
    console.log('Booking finalised:', { service, date, slot });
    // Close both modals - navigation happens in TimeSlotSelection
    setShowTimeSlotSelection(false);
    setHideServicePopup(false);
    onClose(); // Close ServicePopup
  };

  const details = serviceDetails[service.name] || {
    ...defaultServiceDetails,
    description: `${service.name} - ${defaultServiceDetails.description}`,
  };

  return (
    <>
      {/* ServicePopup - Hidden when TimeSlotSelection is open */}
      {!hideServicePopup && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto static-border static-border-blue"
            onClick={(e) => e.stopPropagation()}
          >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoCloseCircle size={24} color='black' />
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-4">{service.category}</p>

        {/* Video Section - Local Video Player */}
        {details.videoUrl && (
          <div className="mb-4">
            {!showVideo ? (
              <div
                className="relative group cursor-pointer rounded-xl overflow-hidden aspect-video flex items-center justify-center"
                onClick={() => setShowVideo(true)}
              >
                {/* Custom Thumbnail Image */}
                {details.thumbnailUrl ? (
                  <img
                    src={details.thumbnailUrl}
                    alt={`${service.name} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-lg">
                    <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
                {/* <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                  ▶️ Watch Demo
                </div> */}
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden aspect-video bg-black">
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  controlsList="nodownload"
                >
                  <source src={details.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg transition z-10"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-sm text-gray-700 mb-4">{details.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">⏱️ Duration:</span>
            <span className="text-sm font-semibold text-gray-900">{details.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">💰 Price:</span>
            <span className="text-sm font-semibold text-gray-900">{details.price}</span>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900">What's Included:</p>
          <SmoothTextCycle 
            items={details.includes}
            interval={4000}
            version="slide"
            className="min-h-[20px]"
            showCheckmark={true}
            simple={true}
          />
        </div>
        
        <div className="flex justify-center gap-2 text-xs items-center">
          <button 
            onClick={handleBookNow}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Book Now
          </button>
          <span className="text-gray-600 font-bold">or</span>
          <button 
            onClick={() => navigate('/services')}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Book More
          </button>
        </div>
          </div>
        </div>
      )}

      {/* Time Slot Selection Modal */}
      <TimeSlotSelection
        isOpen={showTimeSlotSelection}
        onClose={handleCloseTimeSlot}
        selectedService={service}
        onFinalise={handleFinaliseBooking}
      />
    </>
  );
}

export default function Services() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  // Animation type selector - change this to switch animations
  // Options: 'fade', 'letters', 'wave', 'dots', 'glow', 'blur', 'typing', 'slide', 'rotate', 'color', 'bounce', 'withDots'
  const [loaderAnimation, setLoaderAnimation] = useState('fade');

  const handleServiceClick = (serviceName, category) => {
    setSelectedService({
      name: serviceName,
      category: category,
    });
    
    setIsLoading(true);
    setShowPopup(false);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowPopup(true);
    }, 1000);
  };

  const handleClosePopup = () => {
    setSelectedService(null);
    setIsLoading(false);
    setShowPopup(false);
  };

  // Render the appropriate loader based on animation type
  const renderLoader = () => {
    const baseStyle = {
      fontFamily: "'Dancing Script', cursive",
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    switch(loaderAnimation) {
      case 'fade':
        return (
          <h2 className="skylla-fade text-4xl font-extrabold text-gray-900" style={baseStyle}>
            Skylla
          </h2>
        );
      
      case 'letters':
        return (
          <h2 className="skylla-letters text-4xl font-bold text-gray-900" style={baseStyle}>
            <span>S</span><span>k</span><span>y</span><span>l</span><span>l</span><span>a</span>
          </h2>
        );
      
      case 'wave':
        return (
          <h2 className="skylla-wave text-4xl font-bold text-gray-900" style={baseStyle}>
            <span>S</span><span>k</span><span>y</span><span>l</span><span>l</span><span>a</span>
          </h2>
        );
      
      case 'dots':
        return (
          <h2 className="skylla-dots text-4xl font-bold text-gray-900" style={baseStyle}>
            Skylla
          </h2>
        );
      
      case 'glow':
        return (
          <h2 className="skylla-glow text-4xl font-bold text-gray-900" style={baseStyle}>
            Skylla
          </h2>
        );
      
      case 'blur':
        return (
          <h2 className="skylla-blur text-4xl font-bold text-gray-900" style={baseStyle}>
            Skylla
          </h2>
        );
      
      case 'typing':
        return (
          <h2 className="skylla-typing text-4xl font-bold text-gray-900" style={baseStyle}>
            Skylla
          </h2>
        );
      
      case 'slide':
        return (
          <h2 className="skylla-slide text-4xl font-bold text-gray-900" style={baseStyle}>
            Skylla
          </h2>
        );
      
      case 'rotate':
        return (
          <h2 className="skylla-rotate text-4xl font-bold text-gray-900" style={baseStyle}>
            <span>S</span><span>k</span><span>y</span><span>l</span><span>l</span><span>a</span>
          </h2>
        );
      
      case 'color':
        return (
          <h2 className="skylla-color text-4xl font-bold" style={baseStyle}>
            Skylla
          </h2>
        );
      
      case 'bounce':
        return (
          <h2 className="skylla-bounce text-4xl font-bold text-gray-900" style={baseStyle}>
            Skylla
          </h2>
        );
      
      case 'withDots':
        return (
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-bold text-gray-900" style={baseStyle}>
              Skylla
            </h2>
            <div className="skylla-with-dots flex gap-1">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        );
      
      default:
        return (
          <h2 className="text-4xl font-bold text-gray-900" style={baseStyle}>
            Skylla
          </h2>
        );
    }
  };

  return (
    <>
      {/* Google Font Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap');
          
          /* Animation 1: Fade In/Out */
          .skylla-fade {
            animation: fadeInOut 2s ease-in-out infinite;
          }
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }

          /* Animation 2: Letter by Letter */
          .skylla-letters span {
            display: inline-block;
            animation: letterPop 1.4s ease-in-out infinite;
          }
          .skylla-letters span:nth-child(1) { animation-delay: 0s; }
          .skylla-letters span:nth-child(2) { animation-delay: 0.1s; }
          .skylla-letters span:nth-child(3) { animation-delay: 0.2s; }
          .skylla-letters span:nth-child(4) { animation-delay: 0.3s; }
          .skylla-letters span:nth-child(5) { animation-delay: 0.4s; }
          .skylla-letters span:nth-child(6) { animation-delay: 0.5s; }
          @keyframes letterPop {
            0%, 100% { 
              transform: scale(1);
              opacity: 0.4;
            }
            50% { 
              transform: scale(1.3);
              opacity: 1;
            }
          }

          /* Animation 3: Wave Effect */
          .skylla-wave span {
            display: inline-block;
            animation: wave 1.5s ease-in-out infinite;
          }
          .skylla-wave span:nth-child(1) { animation-delay: 0s; }
          .skylla-wave span:nth-child(2) { animation-delay: 0.1s; }
          .skylla-wave span:nth-child(3) { animation-delay: 0.2s; }
          .skylla-wave span:nth-child(4) { animation-delay: 0.3s; }
          .skylla-wave span:nth-child(5) { animation-delay: 0.4s; }
          .skylla-wave span:nth-child(6) { animation-delay: 0.5s; }
          @keyframes wave {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          /* Animation 4: Dots Loading */
          .skylla-dots::after {
            content: '';
            animation: dots 1.5s steps(4) infinite;
          }
          @keyframes dots {
            0%, 20% { content: ''; }
            40% { content: '.'; }
            60% { content: '..'; }
            80%, 100% { content: '...'; }
          }

          /* Animation 5: Glow Pulse */
          .skylla-glow {
            animation: glow 2s ease-in-out infinite;
          }
          @keyframes glow {
            0%, 100% { 
              text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            50% { 
              text-shadow: 0 0 20px rgba(45, 55, 72, 0.6),
                           0 0 30px rgba(45, 55, 72, 0.4);
            }
          }

          /* Animation 6: Blur Focus */
          .skylla-blur {
            animation: blurFocus 2s ease-in-out infinite;
          }
          @keyframes blurFocus {
            0%, 100% { 
              filter: blur(3px);
              opacity: 0.6;
            }
            50% { 
              filter: blur(0px);
              opacity: 1;
            }
          }

          /* Animation 7: Typing Effect */
          .skylla-typing {
            overflow: hidden;
            border-right: 3px solid #2d3748;
            white-space: nowrap;
            animation: typing 2s steps(6) infinite, blink 0.75s step-end infinite;
            width: 6ch;
            display: inline-block;
          }
          @keyframes typing {
            0%, 90%, 100% { width: 0; }
            30%, 60% { width: 6ch; }
          }
          @keyframes blink {
            50% { border-color: transparent; }
          }

          /* Animation 8: Slide In/Out */
          .skylla-slide {
            animation: slideInOut 2s ease-in-out infinite;
          }
          @keyframes slideInOut {
            0%, 100% { 
              transform: translateX(-100%);
              opacity: 0;
            }
            50% { 
              transform: translateX(0);
              opacity: 1;
            }
          }

          /* Animation 9: Rotate Letters */
          .skylla-rotate span {
            display: inline-block;
            animation: rotateLetters 2s ease-in-out infinite;
          }
          .skylla-rotate span:nth-child(1) { animation-delay: 0s; }
          .skylla-rotate span:nth-child(2) { animation-delay: 0.1s; }
          .skylla-rotate span:nth-child(3) { animation-delay: 0.2s; }
          .skylla-rotate span:nth-child(4) { animation-delay: 0.3s; }
          .skylla-rotate span:nth-child(5) { animation-delay: 0.4s; }
          .skylla-rotate span:nth-child(6) { animation-delay: 0.5s; }
          @keyframes rotateLetters {
            0%, 100% { 
              transform: rotateY(0deg);
              opacity: 1;
            }
            50% { 
              transform: rotateY(360deg);
              opacity: 0.3;
            }
          }

          /* Animation 10: Color Shift */
          .skylla-color {
            animation: colorShift 3s linear infinite;
          }
          @keyframes colorShift {
            0% { color: #2d3748; }
            25% { color: #4a5568; }
            50% { color: #718096; }
            75% { color: #4a5568; }
            100% { color: #2d3748; }
          }

          /* Animation 11: Bounce */
          .skylla-bounce {
            animation: bounce 1.5s ease-in-out infinite;
          }
          @keyframes bounce {
            0%, 100% { 
              transform: translateY(0) scale(1);
            }
            50% { 
              transform: translateY(-30px) scale(1.1);
            }
          }

          /* Animation 12: With Dots */
          .skylla-with-dots span {
            width: 8px;
            height: 8px;
            background: #2d3748;
            border-radius: 50%;
            display: inline-block;
            animation: dotPulse 1.4s ease-in-out infinite;
          }
          .skylla-with-dots span:nth-child(1) { animation-delay: 0s; }
          .skylla-with-dots span:nth-child(2) { animation-delay: 0.2s; }
          .skylla-with-dots span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes dotPulse {
            0%, 100% { 
              transform: scale(1);
              opacity: 0.5;
            }
            50% { 
              transform: scale(1.5);
              opacity: 1;
            }
          }
        `}
      </style>

      {/* Blur overlay and Skylla loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="text-center">
            {renderLoader()}
          </div>
        </div>
      )}

      {/* Services component with conditional blur */}
      <div className={`relative ${isLoading || showPopup ? 'blur-sm' : ''} transition-all duration-300`}>
        <MainCard title="💇‍♀️ Our Services" navigateTo="/services" scrollable={true}>
          {servicesData.map((service, index) => (
            <div key={index} className="flex flex-col">
              <p className="font-semibold text-xs text-black mb-2">
                {service.category}
              </p>
              <AutoscrollHorizontal 
                speed={0.07} 
                className="flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap pb-1"
                isAutoScrollProp={true}
              >
                {service.items.map((item, idx) => (
                  <span key={idx} onClick={() => handleServiceClick(item, service.category)} className="px-3 py-2 bg-gray-100 border rounded-lg text-xs text-gray-800 whitespace-nowrap hover:bg-gray-200 transition cursor-pointer mx-1">{item}</span>
                ))}
              </AutoscrollHorizontal>
            </div>
          ))}
        </MainCard>

        {/* Optional: Animation Selector (for testing - remove in production) */}
        {/* <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50">
          <p className="text-xs font-semibold mb-2">Loader Animation:</p>
          <select 
            value={loaderAnimation} 
            onChange={(e) => setLoaderAnimation(e.target.value)}
            className="text-xs border rounded px-2 py-1"
          >
            <option value="fade">Fade</option>
            <option value="letters">Letters</option>
            <option value="wave">Wave</option>
            <option value="dots">Dots</option>
            <option value="glow">Glow</option>
            <option value="blur">Blur</option>
            <option value="typing">Typing</option>
            <option value="slide">Slide</option>
            <option value="rotate">Rotate</option>
            <option value="color">Color</option>
            <option value="bounce">Bounce</option>
            <option value="withDots">With Dots</option>
          </select>
        </div> */}
      </div>

      <ServicePopup
        isOpen={showPopup}
        onClose={handleClosePopup}
        service={selectedService || { name: '', category: '' }}
      />
    </>
  );
}