/**
 * PostCard.jsx
 * ============
 * Component hiển thị preview của một post trong danh sách.
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPostTags } from "../../services/tagService";

function PostCard({ post }) {
  const [tags, setTags] = useState([]);

  // Fetch tags cho post
  useEffect(() => {
    async function fetchTags() {
      try {
        const data = await getPostTags(post.slug);
        setTags(data);
      } catch (err) {
        // Silently fail - tags are optional
        console.error("Failed to fetch tags:", err);
      }
    }

    fetchTags();
  }, [post.slug]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="post-card">
      {/* Cover Image */}
      {post.cover_image_url && (
        <div className="post-card__image">
          <Link to={`/post/${post.slug}`}>
            <img src={post.cover_image_url} alt={post.title} />
          </Link>
        </div>
      )}

      {/* Content */}
      <div className="post-card__content">
        {/* Category Badge */}
        {post.categories && (
          <Link
            to={`/category/${post.categories.slug}`}
            className="post-card__category"
          >
            {post.categories.name}
          </Link>
        )}

        {/* Title */}
        <h2 className="post-card__title">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="post-card__excerpt">
          {post.excerpt || "No excerpt available."}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="post-card__tags">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/tag/${tag.slug}`}
                className="post-card__tag"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Meta Info */}
        <div className="post-card__meta">
          <span className="post-card__date">
            {formatDate(post.published_at || post.created_at)}
          </span>
          {post.reading_time_minutes && (
            <span className="post-card__reading-time">
              · {post.reading_time_minutes} min read
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default PostCard;
