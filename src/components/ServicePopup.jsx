import { FiX, FiClock, FiDollarSign } from 'react-icons/fi'

export default function ServicePopup({ service, onClose }) {
  if (!service) return null

  return (
    <div
        className="fixed inset-0 z-50 flex items-start justify-center
                    px-4 pt-4 pb-8 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-2xl max-h-[80vh]
          rounded-3xl
          bg-white/70 backdrop-blur-xl
          shadow-[0_20px_50px_rgba(0,0,0,0.15)]
          flex flex-col
          animated-border
          animated-border-blue
          animated-border-fast
          pb-6
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/60">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{service.emoji}</span>
            <h2 className="text-xl font-semibold text-gray-900">
              {service.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:text-gray-900"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pt-2 pb-4 space-y-4">
          {service.subServices.map((subService, index) => (
            <div
              key={index}
              className="
                static-border
                static-border-blue
                rounded-2xl
                bg-white/60
                p-4
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    {subService.emoji && <span className="text-lg">{subService.emoji}</span>}
                    <span>{subService.name}</span>
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {subService.description}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <FiDollarSign size={15} />
                      <span className="font-semibold">
                        {subService.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-500">
                      <FiClock size={15} />
                      <span className="text-sm">
                        {subService.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="
                    px-4 py-2
                    rounded-lg
                    bg-[#381D6A] text-white
                    text-xs font-medium
                    hover:bg-gray-800
                    whitespace-nowrap
                  "
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {/* <div className="px-6 py-4 border-t border-gray-200/60">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl text-gray-700 hover:text-gray-900 font-medium"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  )
}
