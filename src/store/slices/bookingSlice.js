import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentBooking: null,
  bookings: [],
  selectedDate: null,
  selectedTime: null,
  selectedService: null,
  selectedStaff: null,
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
    setSelectedTime: (state, action) => {
      state.selectedTime = action.payload
    },
    setSelectedService: (state, action) => {
      state.selectedService = action.payload
    },
    setSelectedStaff: (state, action) => {
      state.selectedStaff = action.payload
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload)
    },
    clearBookingForm: (state) => {
      state.selectedDate = null
      state.selectedTime = null
      state.selectedService = null
      state.selectedStaff = null
      state.currentBooking = null
    },
  },
})

export const {
  setSelectedDate,
  setSelectedTime,
  setSelectedService,
  setSelectedStaff,
  setCurrentBooking,
  addBooking,
  clearBookingForm,
} = bookingSlice.actions

export default bookingSlice.reducer

