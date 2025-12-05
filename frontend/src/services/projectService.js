/**
 * projectService.js
 * ==================
 * API calls liên quan đến Projects (Portfolio).
 */

import { fetchAPI } from "./api";

/**
 * Lấy tất cả projects.
 * @returns {Promise<Array>} List of projects
 */
export async function getProjects() {
  return fetchAPI("/api/projects");
}
