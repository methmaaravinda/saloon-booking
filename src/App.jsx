import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import Contact from './pages/Contact'
import LocationHours from './pages/LocationHours'
import { HeaderWithAvatar } from './components/layout/Header'
import SearchableFooter from './components/layout/Footer'

function App() {
  return (
    <Router>
      {/* Full-height app layout: header at top, routes in middle, search footer at bottom */}
      <div className="h-full flex flex-col overflow-hidden">
        <HeaderWithAvatar />

        {/* Scrollable main content area between header and footer */}
        <main className="flex-1 overflow-hidden overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/location-hours" element={<LocationHours />} />
          </Routes>
        </main>

        {/* Sticky footer with search bar */}
        <SearchableFooter />
      </div>
    </Router>
  )
}

export default App
