/**
 * postService.js
 * ===============
 * Tất cả API calls liên quan đến Posts.
 * Frontend components sẽ gọi các functions này thay vì gọi fetch trực tiếp.
 */

import { fetchAPI } from "./api";

/**
 * Lấy danh sách published posts.
 *
 * @param {Object} params - Query parameters
 * @param {number} params.page - Số trang (mặc định 1)
 * @param {number} params.perPage - Số posts mỗi trang (mặc định 10)
 * @param {string} params.category - Filter theo category slug (optional)
 * @returns {Promise<{posts: Array, total: number, page: number, per_page: number}>}
 */
export async function getPosts({
  page = 1,
  perPage = 10,
  category = null,
} = {}) {
  // Build query string
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (category) {
    params.append("category", category);
  }

  return fetchAPI(`/api/posts?${params.toString()}`);
}

/**
 * Lấy một post theo slug.
 *
 * @param {string} slug - URL-friendly identifier của post
 * @returns {Promise<Object>} Post data
 */
export async function getPostBySlug(slug) {
  return fetchAPI(`/api/posts/${slug}`);
}

/**
 * Tạo post mới (cần authentication - sẽ implement sau).
 */
export async function createPost(postData) {
  return fetchAPI("/api/posts", {
    method: "POST",
    body: JSON.stringify(postData),
  });
}

/**
 * Cập nhật post (cần authentication - sẽ implement sau).
 */
export async function updatePost(postId, postData) {
  return fetchAPI(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(postData),
  });
}

/**
 * Xóa post (cần authentication - sẽ implement sau).
 */
export async function deletePost(postId) {
  return fetchAPI(`/api/posts/${postId}`, {
    method: "DELETE",
  });
}
