import { format, addDays, isToday, isTomorrow, isPast, startOfDay } from 'date-fns'

/**
 * Format date for display
 */
export const formatDate = (date, formatStr = 'PPP') => {
  if (!date) return ''
  return format(new Date(date), formatStr)
}

/**
 * Format time for display
 */
export const formatTime = (time) => {
  if (!time) return ''
  // Assuming time is in HH:mm format
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

/**
 * Get available dates (next 30 days)
 */
export const getAvailableDates = () => {
  const dates = []
  const today = new Date()
  
  for (let i = 0; i < 30; i++) {
    dates.push(addDays(today, i))
  }
  
  return dates
}

/**
 * Check if date is available for booking
 */
export const isDateAvailable = (date) => {
  if (!date) return false
  const dateObj = new Date(date)
  return !isPast(startOfDay(dateObj))
}

/**
 * Get relative date label
 */
export const getRelativeDateLabel = (date) => {
  if (!date) return ''
  const dateObj = new Date(date)
  
  if (isToday(dateObj)) return 'Today'
  if (isTomorrow(dateObj)) return 'Tomorrow'
  return formatDate(dateObj, 'EEEE, MMM d')
}

/**
 * Generate time slots
 */
export const generateTimeSlots = (startHour = 9, endHour = 18, intervalMinutes = 30) => {
  const slots = []
  const start = startHour * 60 // Convert to minutes
  const end = endHour * 60
  const interval = intervalMinutes
  
  for (let minutes = start; minutes < end; minutes += interval) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    const timeString = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
    slots.push(timeString)
  }
  
  return slots
}

