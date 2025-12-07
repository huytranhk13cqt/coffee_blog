/**
 * Tag.jsx
 * ========
 * Trang hiển thị posts filtered theo tag.
 */

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostsByTag } from "../../services/tagService";
import PostCard from "../../components/post/PostCard";

function Tag() {
  const { slug } = useParams();

  // States
  const [tag, setTag] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tag và posts
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPostsByTag(slug, { perPage: 20 });

        setTag(data.tag);
        setPosts(data.posts);

        // Update document title
        document.title = `#${data.tag.name} | Coffee's Blog`;
      } catch (err) {
        console.error("Failed to fetch tag:", err);
        setError("Tag not found or failed to load.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      document.title = "Coffee's Blog";
    };
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="tag-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error || !tag) {
    return (
      <div className="tag-page">
        <div className="error">
          <h2>😕 Oops!</h2>
          <p>{error || "Tag not found."}</p>
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tag-page">
      {/* Back link */}
      <Link to="/" className="back-link">
        ← Back to all posts
      </Link>

      {/* Tag Header */}
      <header className="tag-page__header">
        <span className="tag-page__badge">#{tag.name}</span>
        <h1 className="tag-page__title">Posts tagged "{tag.name}"</h1>
        <p className="tag-page__count">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </p>
      </header>

      {/* Posts List */}
      {posts.length > 0 ? (
        <section className="tag-page__posts">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      ) : (
        <div className="tag-page__empty">
          <p>No posts with this tag yet.</p>
          <Link to="/">Browse all posts</Link>
        </div>
      )}
    </div>
  );
}

export default Tag;
