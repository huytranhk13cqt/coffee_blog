/**
 * galleryService.js
 * ==================
 * API calls cho Gallery.
 */

import { fetchAPI } from "./api";

/**
 * Lấy tất cả images từ posts.
 * @returns {Promise<Object>} { images, total }
 */
export async function getGalleryImages() {
  return fetchAPI("/api/gallery");
}
