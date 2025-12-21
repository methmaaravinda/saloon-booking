import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5';
import MainCard from './layout/MainCard';
import SmoothTextCycle from './layout/SmoothTextEffect';
import TimeSlotSelection from './TimeSlotSelection';
import { AutoScroll } from './HyrachiServices';
import video_url from '../assets/videoplayback.mp4'
import facial_image from '../assets/facial-image.webp'
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

  const handleServiceClick = (serviceName, category) => {
    setSelectedService({
      name: serviceName,
      category: category,
    });
  };

  return (
    <>
      <MainCard title="💇‍♀️ Our Services" navigateTo="/services" scrollable={true}>
        {servicesData.map((service, index) => (
          <div key={index} className="flex flex-col">
            <p className="font-semibold text-xs text-black mb-2">
              {service.category}
            </p>
            <AutoScroll speed={10} pauseOnHover={true}>
              <div className="flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap pb-1">
                {service.items.map((item, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleServiceClick(item, service.category)}
                    className="px-3 py-2 bg-gray-100 border rounded-lg text-xs text-gray-800 whitespace-nowrap hover:bg-gray-200 transition cursor-pointer mx-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </AutoScroll>
          </div>
        ))}
      </MainCard>

      <ServicePopup
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        service={selectedService || { name: '', category: '' }}
      />
    </>
  );
}