/**
 * @file retryFetch.js
 * @description Production-grade fetch wrapper with exponential backoff, timeouts, and jitter.
 * Requires Node.js 18+ (for native fetch) or 'node-fetch' polyfill.
 */

const DEFAULT_RETRIES = 3;
const BASE_DELAY = 1000; // 1 second

/**
 * Sleep helper for backoff delays
 * @param {number} ms 
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Calculates exponential backoff with jitter to prevent thundering herd.
 * @param {number} attempt - Current attempt number
 * @returns {number} Delay in milliseconds
 */
const getBackoffDelay = (attempt) => {
  const exponentialDelay = BASE_DELAY * Math.pow(2, attempt - 1);
  const jitter = Math.random() * 200; // Add up to 200ms jitter
  return exponentialDelay + jitter;
};

/**
 * Robust fetch implementation for Node.js environment.
 * 
 * @param {string} endpoint - The URL to fetch
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @param {number} retries - Max number of retries (default: 3)
 * @param {number} timeoutMs - Request timeout per attempt (default: 8000ms)
 * @returns {Promise<any>} - Parsed JSON response or throws error
 */
export async function apiCallWithRetry(endpoint, options = {}, retries = DEFAULT_RETRIES, timeoutMs = 8000) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    let controller = null;
    let timeoutId = null;

    try {
      // 1. Setup AbortController for timeouts
      controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      // 2. Log attempt (structured logging would be better in real prod)
      if (process.env.NODE_ENV !== 'test') {
        console.log(`[API] ${options.method || 'GET'} ${endpoint} | Attempt ${attempt}/${retries}`);
      }

      // 3. Execute Request
      const response = await fetch(endpoint, {
        ...options,
        signal: controller.signal
      });

      // 4. Handle Rate Limiting (429)
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : getBackoffDelay(attempt);
        
        console.warn(`[API] Rate Limited (429). Waiting ${waitTime}ms...`);
        await sleep(waitTime);
        continue; // Retry
      }

      // 5. Handle Server Errors (500-599)
      if (response.status >= 500) {
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }

      // 6. Handle Client Errors (400-499) - Do NOT retry usually
      if (!response.ok) {
        // We throw immediately for client errors as retrying won't fix bad data
        const errorBody = await response.text();
        throw new Error(`Client Error: ${response.status} ${response.statusText} - ${errorBody}`);
      }

      // 7. Success
      clearTimeout(timeoutId);
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();

    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId);
      lastError = error;

      const isAbort = error.name === 'AbortError';
      const errorMessage = isAbort ? `Timeout after ${timeoutMs}ms` : error.message;

      console.error(`[API] Error on attempt ${attempt}: ${errorMessage}`);

      // If it's the last attempt, fail hard
      if (attempt === retries) {
        throw new Error(`API call failed after ${retries} attempts. Last error: ${errorMessage}`);
      }

      // Wait before next retry
      const delay = getBackoffDelay(attempt);
      await sleep(delay);
    }
  }
}
