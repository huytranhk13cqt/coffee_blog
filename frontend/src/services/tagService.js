/**
 * tagService.js
 * ==============
 * API calls liên quan đến Tags.
 */

import { fetchAPI } from "./api";

/**
 * Lấy tất cả tags.
 * @returns {Promise<Array>} List of tags
 */
export async function getTags() {
  return fetchAPI("/api/tags");
}

/**
 * Lấy tag theo slug.
 * @param {string} slug - Tag slug
 * @returns {Promise<Object>} Tag data
 */
export async function getTagBySlug(slug) {
  return fetchAPI(`/api/tags/${slug}`);
}

/**
 * Lấy posts theo tag.
 * @param {string} slug - Tag slug
 * @param {Object} params - Query params
 * @returns {Promise<Object>} { tag, posts, total, page, per_page }
 */
export async function getPostsByTag(slug, { page = 1, perPage = 10 } = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  return fetchAPI(`/api/tags/${slug}/posts?${params.toString()}`);
}

/**
 * Lấy tags của một post.
 * @param {string} slug - Post slug
 * @returns {Promise<Array>} List of tags
 */
export async function getPostTags(slug) {
  return fetchAPI(`/api/posts/${slug}/tags`);
}
