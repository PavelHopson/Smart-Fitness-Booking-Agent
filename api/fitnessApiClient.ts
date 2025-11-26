import { apiCallWithRetry } from "../utils/retryFetch";

// In a real app, these come from process.env
// const API_BASE_URL = process.env.API_BASE_URL;
// const API_KEY = process.env.FITNESS_API_KEY;

// Mocking for the demo if env is missing
const API_BASE_URL = "https://api.fitness-club.example.com/v1";
const API_KEY = "demo-key-123";

interface ScheduleParams {
  date: string;
}

interface BookingPayload {
  slotId: string;
  clientName: string;
  clientEmail?: string;
}

/**
 * Fetches the training schedule for a given date.
 */
export async function getSchedule(date: string) {
  return apiCallWithRetry(`${API_BASE_URL}/schedule?date=${date}`, {
    method: 'GET',
    headers: { 
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
    }
  });
}

/**
 * Checks availability for specific slots (Batch operation).
 */
export async function checkSlotsAvailability(slotIds: string[]) {
    return apiCallWithRetry(`${API_BASE_URL}/slots/availability`, {
      method: 'POST',
      headers: { 
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ slotIds })
    });
  }

/**
 * Books a specific training slot.
 */
export async function bookTraining(payload: BookingPayload) {
    return apiCallWithRetry(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
}

/**
 * Cancels a booking.
 */
export async function cancelBooking(bookingId: string) {
    return apiCallWithRetry(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { 
            "Authorization": `Bearer ${API_KEY}`
        }
    });
}