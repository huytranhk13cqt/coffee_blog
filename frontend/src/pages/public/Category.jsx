/**
 * Category.jsx
 * ============
 * Trang hiển thị posts filtered theo category.
 */

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPosts } from "../../services/postService";
import { getCategoryBySlug } from "../../services/categoryService";
import PostCard from "../../components/post/PostCard";

function Category() {
  // Lấy category slug từ URL
  const { slug } = useParams();

  // States
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch category và posts
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch category info và posts cùng lúc
        const [categoryData, postsData] = await Promise.all([
          getCategoryBySlug(slug),
          getPosts({ category: slug, perPage: 20 }),
        ]);

        setCategory(categoryData);
        setPosts(postsData.posts);

        // Update document title
        document.title = `${categoryData.name} | Coffee's Blog`;
      } catch (err) {
        console.error("Failed to fetch category:", err);
        setError("Category not found or failed to load.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Cleanup
    return () => {
      document.title = "Coffee's Blog";
    };
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="category-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error || !category) {
    return (
      <div className="category-page">
        <div className="error">
          <h2>😕 Oops!</h2>
          <p>{error || "Category not found."}</p>
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Render category page
  return (
    <div className="category-page">
      {/* Back link */}
      <Link to="/" className="back-link">
        ← Back to all posts
      </Link>

      {/* Category Header */}
      <header className="category-page__header">
        <span className="category-page__badge">{category.name}</span>
        <h1 className="category-page__title">Posts in "{category.name}"</h1>
        {category.description && (
          <p className="category-page__description">{category.description}</p>
        )}
        <p className="category-page__count">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </p>
      </header>

      {/* Posts List */}
      {posts.length > 0 ? (
        <section className="category-page__posts">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      ) : (
        <div className="category-page__empty">
          <p>No posts in this category yet.</p>
          <Link to="/">Browse all posts</Link>
        </div>
      )}
    </div>
  );
}

export default Category;
