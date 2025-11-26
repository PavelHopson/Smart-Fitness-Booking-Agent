/**
 * @file demo.js
 * @description Executable script to demonstrate the backend client capabilities.
 * Run with: node server/demo.js
 */

import { FitnessApiClient } from './api/fitnessApiClient.js';

// Configuration (Simulation)
const config = {
  baseUrl: process.env.API_BASE_URL || 'https://api.mock-fitness.com/v1',
  apiKey: process.env.API_KEY || 'demo-secret-key'
};

const client = new FitnessApiClient(config);

async function runDemo() {
  console.log("🚀 Starting Fitness API Client Demo...\n");

  try {
    // 1. Get Schedule
    console.log("📅 1. Fetching Schedule...");
    // Note: Since the URL is a mock, this will likely fail or hit the retry logic 
    // unless mocked via a service like MSW or nock in tests.
    // For this demo file, we expect it to attempt retries and log them.
    try {
        const schedule = await client.getSchedule('2025-10-25');
        console.log("✅ Schedule received:", schedule);
    } catch (e) {
        console.log("⚠️ Expected demo error (Mock URL):", e.message);
    }
    
    console.log("\n-----------------------------------\n");

    // 2. Attempt Booking
    console.log("🎫 2. Attempting Booking...");
    try {
        const booking = await client.createBooking({
            slotId: 'slot-123',
            userId: 'user-456'
        });
        console.log("✅ Booking confirmed:", booking);
    } catch (e) {
        console.log("⚠️ Expected demo error (Mock URL):", e.message);
    }

  } catch (error) {
    console.error("❌ Fatal Demo Error:", error);
  }

  console.log("\n🏁 Demo sequence completed.");
}

runDemo();
