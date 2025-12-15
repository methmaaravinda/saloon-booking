import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  modal: {
    isOpen: false,
    type: null, // 'booking', 'confirmation', etc.
    data: null,
  },
  sidebar: {
    isOpen: false,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    openModal: (state, action) => {
      state.modal.isOpen = true
      state.modal.type = action.payload.type
      state.modal.data = action.payload.data || null
    },
    closeModal: (state) => {
      state.modal.isOpen = false
      state.modal.type = null
      state.modal.data = null
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebar.isOpen = action.payload
    },
  },
})

export const {
  setLoading,
  openModal,
  closeModal,
  toggleSidebar,
  setSidebarOpen,
} = uiSlice.actions

export default uiSlice.reducer

