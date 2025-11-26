/**
 * @file fitnessApiClient.js
 * @description Typed client logic for the Fitness Booking System.
 * Uses dependency injection pattern for configuration.
 */

import { apiCallWithRetry } from '../utils/retryFetch.js';

export class FitnessApiClient {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
  }

  /**
   * Helper to construct headers
   */
  _getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'FitnessBookingAgent/1.0 (Node.js)'
    };
  }

  /**
   * Get schedule for a specific date
   * @param {string} date - YYYY-MM-DD
   */
  async getSchedule(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }

    return apiCallWithRetry(`${this.baseUrl}/schedule?date=${date}`, {
      method: 'GET',
      headers: this._getHeaders()
    });
  }

  /**
   * Check availability for multiple slots (to avoid race conditions)
   * @param {string[]} slotIds 
   */
  async checkAvailability(slotIds) {
    return apiCallWithRetry(`${this.baseUrl}/slots/availability`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ slotIds })
    });
  }

  /**
   * Create a new booking
   * @param {object} bookingData 
   * @param {string} bookingData.slotId
   * @param {string} bookingData.userId
   * @param {string} bookingData.notes
   */
  async createBooking(bookingData) {
    if (!bookingData.slotId || !bookingData.userId) {
      throw new Error("Missing required booking fields");
    }

    return apiCallWithRetry(`${this.baseUrl}/bookings`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(bookingData)
    });
  }
}
