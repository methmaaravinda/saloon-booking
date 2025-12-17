import { FiMapPin, FiClock, FiNavigation } from 'react-icons/fi'

const LocationHours = () => {
  const workingHours = [
    { day: "Monday", hours: "9:00 AM - 7:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 7:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 7:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 7:00 PM" },
    { day: "Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 7:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 5:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">📍 Location & Working Hours</h1>
        
        <div className="space-y-4">
          {/* Location Card */}
          <div className="bg-white border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiMapPin className="text-gray-600" />
              Location
            </h2>
            <div className="space-y-2 flex items-start gap-3">
              <FiMapPin className="text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">123 Beauty Street, Suite 100</p>
                <p className="text-sm text-gray-700">New York, NY 10001</p>
                <p className="text-sm text-gray-700">United States</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                <FiNavigation className="text-gray-600" />
                Directions
              </p>
              <p className="text-sm text-gray-700">
                Located in the heart of Manhattan, easily accessible by subway (Lines 1, 2, 3) 
                and bus routes. Street parking available nearby.
              </p>
            </div>
          </div>

          {/* Working Hours Card */}
          <div className="bg-white border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiClock className="text-gray-600" />
              Working Hours
            </h2>
            <div className="space-y-3">
              {workingHours.map((schedule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <FiClock className="text-gray-400 text-xs" />
                    {schedule.day}
                  </span>
                  <span className="text-sm text-gray-700">{schedule.hours}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-medium text-amber-900">
                💡 Note: We recommend booking in advance, especially on weekends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationHours;

