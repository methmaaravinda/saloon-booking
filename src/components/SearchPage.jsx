import { FiX, FiScissors, FiHeart, FiStar, FiClock } from 'react-icons/fi'

// Categories hierarchy - we can expand this later
const categories = [
    { name: "Hair Services", icon: FiScissors, emoji: "💇‍♀️" },
    { name: "Skin / Face", icon: FiHeart, emoji: "✨" },
    { name: "Nail Services", icon: FiStar, emoji: "💅" },
    { name: "Makeup", icon: FiStar, emoji: "💄" },
    { name: "Body Care", icon: FiHeart, emoji: "🧖‍♀️" },
    { name: "Men's Grooming", icon: FiScissors, emoji: "🧔" },
]

// Example services for search
const allServices = [
    "Haircut", "Hair coloring", "Highlights", "Hair spa",
    "Manicure", "Pedicure", "Gel polish", "Nail art",
    "Facial", "Clean-up", "Bleaching", "Threading",
    "Massage", "Body scrub", "Body wrap",
    "Party makeup", "Bridal makeup",
]

export default function SearchPage({ query, onClose }) {
    const hasQuery = query.trim().length > 0
    
    const filteredServices = hasQuery
        ? allServices.filter(s => s.toLowerCase().includes(query.toLowerCase()))
        : []

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                <h2 className="text-lg font-semibold text-gray-900">
                    {hasQuery ? "Search Results" : "Browse Services"}
                </h2>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <FiX size={20} className="text-gray-600" />
                </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-4">
                {hasQuery ? (
                    // Show filtered search results
                    <div className="space-y-2">
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service, idx) => (
                                <button
                                    key={idx}
                                    className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all"
                                >
                                    <p className="text-sm font-medium text-gray-900">{service}</p>
                                </button>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No services found for "{query}"</p>
                            </div>
                        )}
                    </div>
                ) : (
                    // Show categories hierarchy
                    <div className="space-y-3">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Categories</p>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all"
                                >
                                    <span className="text-2xl">{cat.emoji}</span>
                                    <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                                </button>
                            ))}
                        </div>
                        
                        {/* Recent/Popular section - placeholder for later */}
                        <div className="mt-6">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">Popular</p>
                            <div className="flex flex-wrap gap-2">
                                {["Haircut", "Facial", "Manicure", "Massage"].map((item, idx) => (
                                    <button
                                        key={idx}
                                        className="px-3 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

