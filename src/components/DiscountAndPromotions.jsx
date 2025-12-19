import MainCard from './layout/MainCard'

const discountsData = [
    {
        badge: "NEW",
        discount: "20% OFF",
        title: "👋 First Visit Discount",
        description: "On any service",
        code: "WELCOME20",
        category: "new-client"  // Added category
    },
    {
        badge: "HOT",
        discount: "15% OFF",
        title: "💇 Haircut Special",
        description: "Valid till Dec 31",
        code: "HAIR15",
        category: "flash"  // Added category
    },
    {
        badge: "COMBO",
        discount: "25% OFF",
        title: "🧖 Spa Package",
        description: "Massage + Facial",
        code: "SPA25",
        category: "seasonal"  // Added category
    },
    {
        badge: "WEEKEND",
        discount: "10% OFF",
        title: "🌞 Weekend Special",
        description: "Sat & Sun only",
        code: "WEEKEND10",
        category: "weekend"  // Added category
    },
    {
        badge: "BRIDAL",
        discount: "30% OFF",
        title: "👰 Bridal Package",
        description: "Full bridal makeup",
        code: "BRIDE30",
        category: "loyalty"  // Added category
    },
    {
        badge: "REFER",
        discount: "$10 OFF",
        title: "🤝 Refer a Friend",
        description: "Both get $10 off",
        code: "FRIEND10",
        category: "new-client"  // Added category
    }
]

// Color scheme configuration
const discountColorSchemes = {
    seasonal: {
        gradient: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50",
        badge: "bg-amber-100 text-amber-700",
        discount: "text-amber-800"
    },
    "new-client": {
        gradient: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300",
        badge: "bg-blue-100 text-blue-700",
        discount: "text-blue-800"
    },
    flash: {
        gradient: "bg-gradient-to-br from-red-50 to-pink-50 border-red-300",
        badge: "bg-red-100 text-red-700",
        discount: "text-red-800"
    },
    loyalty: {
        gradient: "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-300",
        badge: "bg-purple-100 text-purple-700",
        discount: "text-purple-800"
    },
    weekend: {
        gradient: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300",
        badge: "bg-green-100 text-green-700",
        discount: "text-green-800"
    },
    // Default fallback
    default: {
        gradient: "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300",
        badge: "bg-gray-100 text-gray-700",
        discount: "text-gray-800"
    }
};

export default function DiscountAndPromotions() {
    return (
        <MainCard title="🎉 Discounts & Offers" navigateTo="/services" scrollable={false}>
            <div className="flex flex-nowrap gap-3 overflow-x-auto whitespace-nowrap pb-2">
                {discountsData.map((discount, index) => {
                    // Get color scheme based on discount category, fallback to default
                    const colors = discountColorSchemes[discount.category] || discountColorSchemes.default;
                    
                    return (
                        <div
                            key={index}
                            className={`
                                flex flex-col gap-2
                                p-4 min-w-[180px] flex-shrink-0
                                rounded-xl border
                                ${colors.gradient}
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors.badge}`}>
                                    {discount.badge}
                                </span>
                                <span className={`text-2xl font-bold ${colors.discount}`}>
                                    {discount.discount}
                                </span>
                            </div>

                            <h3 className="text-sm font-semibold text-gray-800 mt-1">
                                {discount.title}
                            </h3>

                            <p className="text-xs text-gray-600 leading-relaxed">
                                {discount.description}
                            </p>

                            <span className="mt-auto pt-2 inline-block text-xs px-2 py-1.5 rounded-md bg-white/70 text-gray-700 font-mono border border-gray-200">
                                {discount.code}
                            </span>
                        </div>
                    );
                })}
            </div>
        </MainCard>
    )
}