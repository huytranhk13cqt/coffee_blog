/**
 * Home.jsx
 * ========
 * Trang chủ - hiển thị danh sách blog posts.
 */

import { useState, useEffect } from "react";
import { getPosts } from "../../services/postService";
import PostCard from "../../components/post/PostCard";

function Home() {
  // State để lưu posts
  const [posts, setPosts] = useState([]);

  // State để track loading
  const [loading, setLoading] = useState(true);

  // State để track error
  const [error, setError] = useState(null);

  // Fetch posts khi component mount
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPosts({ page: 1, perPage: 10 });
        setPosts(data.posts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []); // Empty dependency array = chỉ chạy 1 lần khi mount

  // Render loading state
  if (loading) {
    return (
      <div className="home">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="home">
        <div className="error">{error}</div>
      </div>
    );
  }

  // Render empty state
  if (posts.length === 0) {
    return (
      <div className="home">
        <h1>Welcome to my blog! 🚀</h1>
        <p>No posts yet. Check back soon!</p>
      </div>
    );
  }

  // Render posts
  return (
    <div className="home">
      <header className="home__header">
        <h1>Welcome to Coffee's Blog ☕</h1>
        <p>Thoughts on coding, life, and everything in between.</p>
      </header>

      <section className="home__posts">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}

export default Home;
