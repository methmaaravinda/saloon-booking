/**
 * Parse duration string to minutes
 * Handles formats like "30 min", "90 min", "2 hours", "1 hour 30 min"
 */
export const parseDurationToMinutes = (durationString) => {
  if (!durationString) return 0;
  
  const duration = durationString.toLowerCase().trim();
  let totalMinutes = 0;
  
  // Extract hours
  const hourMatch = duration.match(/(\d+)\s*h(?:our)?s?/);
  if (hourMatch) {
    totalMinutes += parseInt(hourMatch[1]) * 60;
  }
  
  // Extract minutes
  const minMatch = duration.match(/(\d+)\s*m(?:in)?(?:ute)?s?/);
  if (minMatch) {
    totalMinutes += parseInt(minMatch[1]);
  }
  
  // If no units found, try to parse as just a number (assume minutes)
  if (totalMinutes === 0 && /^\d+$/.test(duration)) {
    totalMinutes = parseInt(duration);
  }
  
  return totalMinutes;
};

/**
 * Format minutes to human-readable duration
 * e.g., 90 -> "1 hour 30 minutes", 45 -> "45 minutes"
 */
export const formatDuration = (minutes) => {
  if (!minutes || minutes === 0) return "0 minutes";
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
  } else if (mins === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  } else {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
  }
};

/**
 * Parse price string to number
 * Handles formats like "$25", "$45.50", "25", "45.50"
 */
export const parsePriceToNumber = (priceString) => {
  if (!priceString) return 0;
  
  // Remove currency symbols and extract number
  const cleaned = priceString.replace(/[$,\s]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Format number to price string
 * e.g., 25 -> "$25.00", 45.5 -> "$45.50"
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) return "$0.00";
  return `$${price.toFixed(2)}`;
};

/**
 * Calculate total duration from array of selected services
 */
export const calculateTotalDuration = (selectedServices) => {
  if (!selectedServices || selectedServices.length === 0) return 0;
  
  return selectedServices.reduce((total, item) => {
    const duration = parseDurationToMinutes(item.subService.duration);
    return total + duration;
  }, 0);
};

/**
 * Calculate total price from array of selected services
 */
export const calculateTotalPrice = (selectedServices) => {
  if (!selectedServices || selectedServices.length === 0) return 0;
  
  return selectedServices.reduce((total, item) => {
    const price = parsePriceToNumber(item.subService.price);
    return total + price;
  }, 0);
};

/**
 * Parse time slot string to duration in minutes
 * Handles formats like "1:00 PM - 4:00 PM"
 */
export const parseSlotDuration = (slotString) => {
  if (!slotString) return 0;
  
  // Extract start and end times
  const parts = slotString.split('-').map(s => s.trim());
  if (parts.length !== 2) return 0;
  
  const startTime = parseTimeToMinutes(parts[0]);
  const endTime = parseTimeToMinutes(parts[1]);
  
  if (startTime === -1 || endTime === -1) return 0;
  
  // Handle overnight slots (e.g., 11 PM - 2 AM)
  let duration = endTime - startTime;
  if (duration < 0) {
    duration += 24 * 60; // Add 24 hours for overnight
  }
  
  return duration;
};

/**
 * Parse time string to minutes since midnight
 * Handles formats like "1:00 PM", "13:00", "9:00 AM"
 */
const parseTimeToMinutes = (timeString) => {
  if (!timeString) return -1;
  
  const time = timeString.trim();
  let hours = 0;
  let minutes = 0;
  
  // Handle 12-hour format (e.g., "1:00 PM")
  const ampmMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (ampmMatch) {
    hours = parseInt(ampmMatch[1]);
    minutes = parseInt(ampmMatch[2]);
    const ampm = ampmMatch[3].toUpperCase();
    
    if (ampm === 'PM' && hours !== 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }
  } else {
    // Handle 24-hour format (e.g., "13:00")
    const timeMatch = time.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      hours = parseInt(timeMatch[1]);
      minutes = parseInt(timeMatch[2]);
    } else {
      return -1;
    }
  }
  
  return hours * 60 + minutes;
};

/**
 * Check if service duration fits in slot
 * Returns: 'fit' | 'tight' | 'exceed'
 */
export const checkSlotFit = (slotDuration, serviceDuration) => {
  if (serviceDuration === 0) return 'fit';
  
  if (serviceDuration > slotDuration) {
    return 'exceed';
  } else if (serviceDuration === slotDuration) {
    return 'tight';
  } else {
    return 'fit';
  }
};

