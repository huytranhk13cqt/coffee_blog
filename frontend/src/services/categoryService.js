/**
 * categoryService.js
 * ==================
 * API calls liên quan đến Categories.
 */

import { fetchAPI } from "./api";

/**
 * Lấy tất cả categories.
 * @returns {Promise<Array>} List of categories
 */
export async function getCategories() {
  return fetchAPI("/api/categories");
}

/**
 * Lấy một category theo slug.
 * @param {string} slug - Category slug
 * @returns {Promise<Object>} Category data
 */
export async function getCategoryBySlug(slug) {
  return fetchAPI(`/api/categories/${slug}`);
}
