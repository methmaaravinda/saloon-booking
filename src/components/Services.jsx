import { useNavigate } from 'react-router-dom'
import MainCard from './layout/MainCard'
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
      category: "Men’s Grooming Services 🧔",
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
  
export default function Services() {
  const navigate = useNavigate();
  return (
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
                className="px-3 py-2 bg-gray-100 border rounded-lg text-xs text-gray-800 whitespace-nowrap hover:bg-gray-200 transition"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </MainCard>
  );
}
