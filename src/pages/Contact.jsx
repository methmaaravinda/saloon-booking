import { FiUser, FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook } from 'react-icons/fi'

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">📞 Contact Details</h1>
        
        <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiUser className="text-gray-600" />
              Owner Information
            </h2>
            <p className="text-sm text-gray-700 font-medium">👤 Sarah Johnson</p>
            <p className="text-xs text-gray-500 mt-1">Owner & Founder</p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiMail className="text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm text-gray-900">sarah.johnson@salon.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="text-sm text-gray-900">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiMapPin className="text-gray-600" />
              Address
            </h2>
            <div className="flex items-start gap-3">
              <FiMapPin className="text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">123 Beauty Street, Suite 100</p>
                <p className="text-sm text-gray-700">New York, NY 10001</p>
                <p className="text-sm text-gray-700">United States</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Social Media</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FiInstagram className="text-gray-600" />
                <p className="text-sm text-gray-700">Instagram: @beautysalon</p>
              </div>
              <div className="flex items-center gap-2">
                <FiFacebook className="text-gray-600" />
                <p className="text-sm text-gray-700">Facebook: Beauty Salon NYC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

