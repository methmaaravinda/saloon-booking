import MainCard from './layout/MainCard'
import { FiMapPin, FiClock } from 'react-icons/fi'
export default function WorkingHours() {
    return (
        <MainCard
            title="📍 Location & Working Hours"
            navigateTo="/location-hours"
            containerPadding="px-4 py-2"
        >
            <div className="space-y-2">
                <div>
                    <p className="text-xs font-semibold text-gray-900 mb-1 flex items-center gap-1">
                        <FiMapPin className="text-gray-500" size={12} />
                        Address
                    </p>
                    <p className="text-xs text-gray-600">123 Beauty Street, Suite 100</p>
                    <p className="text-xs text-gray-600">New York, NY 10001</p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-900 mb-1 flex items-center gap-1">
                        <FiClock className="text-gray-500" size={12} />
                        Working Hours
                    </p>
                    <p className="text-xs text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-xs text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
                </div>
            </div>
        </MainCard>
    )
}