import MainCard from './layout/MainCard'
import { FiUser, FiMail, FiMapPin } from 'react-icons/fi'

export default function ContactDetails() {
    return (
        <MainCard
            title="📞 Contact Details"
            navigateTo="/contact"
            containerPadding="px-4 py-2"
        >
            <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    <FiUser className="text-gray-500" size={14} />
                    Sarah Johnson
                </p>
                <p className="text-xs text-gray-600">Owner</p>
                <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                    <FiMail className="text-gray-500" size={12} />
                    sarah.johnson@salon.com
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                    <FiMapPin className="text-gray-500" size={12} />
                    123 Beauty Street, Suite 100
                </p>
                <p className="text-xs text-gray-600 ml-4">New York, NY 10001</p>
            </div>
        </MainCard>
    )
}