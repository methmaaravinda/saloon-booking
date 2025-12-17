import { servicesData } from '../components/Services';

const Services = () => {
  // Example pricing data - you can replace this with real data from your API/store
  const servicePrices = {
    "Haircut (men / women / kids)": 25,
    "Hair styling (blow dry, curls, straightening)": 35,
    "Hair wash & conditioning": 15,
    "Hair coloring (full color, root touch-up)": 80,
    "Highlights / balayage / ombré": 120,
    "Hair spa & treatments": 50,
    "Hair smoothening / rebonding / keratin": 150,
    "Beard trim & shave (for men)": 20,
    "Facials (basic, gold, herbal, anti-aging)": 60,
    "Clean-up": 30,
    "Bleaching": 40,
    "Threading": 15,
    "Waxing (face / body)": 45,
    "Face massage": 25,
    "De-tan treatment": 55,
    "Acne or pigmentation treatments": 70,
    "Manicure": 25,
    "Pedicure": 30,
    "Gel polish": 35,
    "Nail extensions": 60,
    "Nail art": 45,
    "Nail repair / removal": 20,
    "Party makeup": 80,
    "Bridal makeup": 200,
    "Engagement makeup": 150,
    "Photoshoot makeup": 120,
    "HD / Airbrush makeup": 100,
    "Hairstyle with makeup": 90,
    "Body massage": 70,
    "Body scrub": 50,
    "Body polishing": 60,
    "Body wrap": 55,
    "Back polish": 40,
    "Haircut & styling": 30,
    "Beard grooming": 25,
    "Shave": 15,
    "Facial for men": 50,
    "Head massage": 35,
    "Bridal full package": 500,
    "Pre-bridal packages": 300,
    "Groom makeup & grooming": 150,
    "Engagement packages": 250,
    "Kids haircut": 20,
    "Kids grooming packages": 50,
  };

  const getPrice = (serviceName) => {
    return servicePrices[serviceName] || "Contact for pricing";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">💇‍♀️ Our Services & Pricing</h1>
        
        <div className="space-y-6">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white border rounded-xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {service.category}
              </h2>
              
              <div className="space-y-3 max-h-[200px] overflow-y-auto">
                {service.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-sm text-gray-800 flex-1">{item}</span>
                    <span className="text-sm font-semibold text-gray-900 ml-4">
                      {typeof getPrice(item) === 'number' 
                        ? `$${getPrice(item)}` 
                        : getPrice(item)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;