import { Link } from 'react-router-dom'
import avatarHeader from '../../assets/avatar_header.png'
import main_logo from '../../assets/main_logo.png'
import Status from '../Status'
const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Salon App
          </Link>
          <nav className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </Link>
            <Link
              to="/booking"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Book Now
            </Link>
            <Link
              to="/my-bookings"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              My Bookings
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

export function HeaderWithAvatar() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800 shadow-2xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:wght@400;700&display=swap');
        @keyframes pinkGlow {
          0%, 100% { 
            color: #ec4899;
            text-shadow: 0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.5);
          }
          50% { 
            color: #f472b6;
            text-shadow: 0 0 20px rgba(244, 114, 182, 1), 0 0 30px rgba(244, 114, 182, 0.7);
          }
        }
        .pink-glow {
          animation: pinkGlow 2s ease-in-out infinite;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Salon Neesha
          </span>
          <span className="text-xs text-gray-500 -mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Powered by <span className="font-bold pink-glow">Skylla</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={main_logo}
            alt="Profile"
            className="w-8 h-8 rounded-full ring-2 ring-pink-500 ring-offset-2 ring-offset-black hover:ring-pink-400 transition-all hover:scale-110"
          />
        </div>
      </div>
    </header>
  );
}
