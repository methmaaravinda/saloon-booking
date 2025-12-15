import { configureStore } from '@reduxjs/toolkit'
import bookingSlice from './slices/bookingSlice'
import serviceSlice from './slices/serviceSlice'
import uiSlice from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    booking: bookingSlice,
    service: serviceSlice,
    ui: uiSlice,
  },
})

export default store

