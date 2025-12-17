export default function Popup({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white text-black p-6 rounded-lg shadow-xl min-w-[300px] max-w-[90%]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
  
          <button
            onClick={onClose}
            className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-black/80 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  