import { Link } from 'react-router-dom'
import avatarHeader from '../../assets/avatar_header.png'
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
    <header className="sticky top-0 z-50 bg-black backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            to="/"
            className="text-lg font-bold tracking-wider text-white"
          >
            Salon Neesha
          </Link>
          
          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Status Badge */}
            <Status status="open" />
            
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full p-[2px] bg-white">
              <img
                src={avatarHeader}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}