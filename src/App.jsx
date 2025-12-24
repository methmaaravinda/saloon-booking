import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import Contact from './pages/Contact'
import LocationHours from './pages/LocationHours'
import { HeaderWithAvatar } from './components/layout/Header'
import SearchableFooter from './components/layout/Footer'
import SearchPage from './components/SearchPage'
import VideoPopup from './components/VideoPopup'

function App() {
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchFocus = () => {
    setSearchActive(true)
  }

  const handleSearchClose = () => {
    setSearchActive(false)
    setSearchQuery("")
  }

  const searchFooter = (
    <SearchableFooter 
      onFocus={handleSearchFocus}
      query={searchQuery}
      onQueryChange={setSearchQuery}
      isSearchActive={searchActive}
      onClose={handleSearchClose}
    />
  )

  return (
    <Router>
      {/* Full-height app layout */}
      <div className="h-full flex flex-col">
        {searchActive ? (
          // Search mode: Search bar at TOP, then SearchPage below
          <>
            {searchFooter}
            <main className="flex-1">
              <SearchPage query={searchQuery} onClose={handleSearchClose} />
            </main>
          </>
        ) : (
          // Normal mode: Header + Routes + Search bar at BOTTOM
          <>
            <HeaderWithAvatar />
            <main className="flex-1 overflow-hidden overflow-y-auto">
              {/* Video Popup - Shows on every page visit within the app */}
              <VideoPopup />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/location-hours" element={<LocationHours />} />
              </Routes>
            </main>
            {searchFooter}
          </>
        )}
      </div>
    </Router>
  )
}

export default App
