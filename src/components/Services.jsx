import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5';
import MainCard from './layout/MainCard';

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
    duration: "30-45 minutes",
    price: "₹300 - ₹800",
    includes: ["Style consultation", "Hair wash", "Precision cutting", "Blow dry styling", "Finishing products"],
  },
  "Hair styling (blow dry, curls, straightening)": {
    description: "Expert hair styling for any occasion. Choose from blow dry, curls, or straightening.",
    duration: "45-60 minutes",
    price: "₹500 - ₹1,500",
    includes: ["Heat protection", "Professional styling", "Premium products", "Long-lasting finish"],
  },
  "Hair wash & conditioning": {
    description: "Relaxing hair wash with deep conditioning treatment for soft, manageable hair.",
    duration: "20-30 minutes",
    price: "₹200 - ₹500",
    includes: ["Scalp massage", "Premium shampoo", "Deep conditioning", "Towel dry"],
  },
  "Hair coloring (full color, root touch-up)": {
    description: "Complete hair coloring service with premium products. Includes consultation and styling.",
    duration: "2-3 hours",
    price: "₹2,500 - ₹5,000",
    includes: ["Color consultation", "Scalp protection", "Premium color products", "Hair wash & conditioning", "Blow dry styling"],
  },
  "Highlights / balayage / ombré": {
    description: "Advanced hair coloring techniques for dimensional, natural-looking color.",
    duration: "3-4 hours",
    price: "₹3,500 - ₹8,000",
    includes: ["Expert consultation", "Customized coloring", "Toning treatment", "Deep conditioning", "Professional styling"],
  },
  "Hair spa & treatments": {
    description: "Luxurious hair spa treatment to nourish and revitalize your hair.",
    duration: "60-90 minutes",
    price: "₹1,500 - ₹3,500",
    includes: ["Hair analysis", "Steam treatment", "Massage therapy", "Deep nourishment mask", "Blow dry"],
  },
  "Hair smoothening / rebonding / keratin": {
    description: "Professional hair straightening treatment for smooth, frizz-free hair.",
    duration: "3-5 hours",
    price: "₹4,000 - ₹12,000",
    includes: ["Hair assessment", "Treatment application", "Heat styling", "Aftercare products", "Styling tips"],
  },
  "Beard trim & shave (for men)": {
    description: "Expert beard grooming and shaving service for a clean, polished look.",
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
  if (!isOpen) return null;
  
  const details = serviceDetails[service.name] || {
    ...defaultServiceDetails,
    description: `${service.name} - ${defaultServiceDetails.description}`,
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl static-border static-border-blue" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoCloseCircle size={24} color='black'/>
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mb-4">{service.category}</p>
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
        
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-2">What's Included:</p>
          <ul className="space-y-1">
            {details.includes.map((item, idx) => (
              <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
          Book Now
        </button>
      </div>
    </div>
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
            <div className="flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap pb-1">
              {service.items.map((item, idx) => (
                <span
                  key={idx}
                  onClick={() => handleServiceClick(item, service.category)}
                  className="px-3 py-2 bg-gray-100 border rounded-lg text-xs text-gray-800 whitespace-nowrap hover:bg-gray-200 transition cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
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