import api from './api'

// Mock data for now (since no backend)
const mockBookings = []
const mockServices = [
  {
    id: 1,
    name: 'Haircut',
    description: 'Professional haircut service',
    duration: 30,
    price: 25,
  },
  {
    id: 2,
    name: 'Hair Color',
    description: 'Full hair coloring service',
    duration: 120,
    price: 80,
  },
  {
    id: 3,
    name: 'Hair Styling',
    description: 'Professional hair styling',
    duration: 45,
    price: 35,
  },
  {
    id: 4,
    name: 'Manicure',
    description: 'Nail care and polish',
    duration: 60,
    price: 30,
  },
  {
    id: 5,
    name: 'Pedicure',
    description: 'Foot care and polish',
    duration: 60,
    price: 35,
  },
]

// Service functions
export const bookingService = {
  // Get all services (mock for now)
  getServices: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockServices })
      }, 500)
    })
  },

  // Get service by ID
  getServiceById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const service = mockServices.find((s) => s.id === parseInt(id))
        resolve({ data: service })
      }, 300)
    })
  },

  // Create booking (mock for now)
  createBooking: async (bookingData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking = {
          id: Date.now(),
          ...bookingData,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        }
        mockBookings.push(newBooking)
        resolve({ data: newBooking })
      }, 500)
    })
  },

  // Get user bookings (mock for now)
  getUserBookings: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockBookings })
      }, 300)
    })
  },
}

export default bookingService

