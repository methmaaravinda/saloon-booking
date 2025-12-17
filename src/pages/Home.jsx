import { OtherAvailableSlots, MyBookings } from '../components/BookingCards'
import BookingCards from '../components/BookingCards'
import Services from '../components/Services'
import MainCard from '../components/layout/MainCard'
import { FiUser, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import ContactDetails from '../components/ContactDetails'
import WorkingHours from '../components/WorkingHours'

const Home = () => {
  return (
    // Fill the available height provided by App's main area
    <div className="h-full flex flex-col">
      <Services />
      <BookingCards />
      <MyBookings />
      <OtherAvailableSlots />
      <ContactDetails />
      <WorkingHours />
    </div>
  )
}

export default Home

