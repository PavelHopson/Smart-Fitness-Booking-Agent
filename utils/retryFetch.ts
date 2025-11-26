/**
 * Utility function to handle API calls with retry logic, timeouts, and exponential backoff.
 * Essential for unstable networks or rate-limited APIs.
 */

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function apiCallWithRetry(endpoint: string, options: RequestInit = {}, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      // Adaptive timeout: increases with each attempt (e.g. 3s, 4s, 5s) to allow slow networks to catch up
      const timeout = setTimeout(() => controller.abort(), 2000 + (1000 * attempt));

      console.log(`[API] Attempt ${attempt}/${retries} requesting: ${endpoint}`);

      const response = await fetch(endpoint, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeout);

      // Handle Rate Limiting (429) specifically
      if (response.status === 429) {
        console.warn(`[API] Rate limit hit. Retrying in ${500 * attempt}ms...`);
        await sleep(500 * attempt);
        continue;
      }

      // Handle Server Errors (5xx) - usually worth retrying
      if (response.status >= 500 && response.status < 600) {
        throw new Error(`Server Error HTTP ${response.status}`);
      }

      if (!response.ok) throw new Error(`HTTP Error ${response.status} - ${response.statusText}`);

      // Try parsing JSON, fallback to text if needed
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }
      return await response.text();

    } catch (error: any) {
      if (error.name === 'AbortError') {
         console.error(`[API] Attempt ${attempt} timed out.`);
      } else {
         console.error(`[API] Attempt ${attempt} failed:`, error.message);
      }

      if (attempt === retries) {
          console.error('[API] All retries failed.');
          throw error;
      }
      
      // Exponential backoff with jitter could be added here, but simple linear backoff is fine for now
      await sleep(400 * attempt);
    }
  }
}