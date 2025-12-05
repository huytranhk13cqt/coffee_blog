/**
 * api.js
 * ======
 * Base configuration cho tất cả API calls.
 * Tập trung config ở một nơi để dễ quản lý.
 */

// Lấy API URL từ environment variable
// Trong development: http://localhost:8000
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Wrapper function cho fetch API.
 * Tự động thêm headers và handle errors.
 */
export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  // Default headers
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Merge options
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Check if response is ok (status 200-299)
    if (!response.ok) {
      // Try to get error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP Error: ${response.status}`);
    }

    // Handle 204 No Content (for DELETE requests)
    if (response.status === 204) {
      return null;
    }

    // Parse JSON response
    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export default API_BASE_URL;
