import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  services: [],
  selectedService: null,
  loading: false,
  error: null,
}

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload
    },
    setSelectedService: (state, action) => {
      state.selectedService = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  setServices,
  setSelectedService,
  setLoading,
  setError,
} = serviceSlice.actions

export default serviceSlice.reducer

