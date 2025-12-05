/**
 * PostCard.jsx
 * ============
 * Component hiển thị preview của một post trong danh sách.
 */

import { Link } from "react-router-dom";

function PostCard({ post }) {
  // Format date để hiển thị đẹp hơn
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
      {/* Cover Image (nếu có) */}
      {post.cover_image_url && (
        <div className="post-card__image">
          <img src={post.cover_image_url} alt={post.title} />
        </div>
      )}

      {/* Content */}
      <div className="post-card__content">
        {/* Category Badge */}
        {post.categories && (
          <span className="post-card__category">{post.categories.name}</span>
        )}

        {/* Title */}
        <h2 className="post-card__title">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="post-card__excerpt">
          {post.excerpt || "No excerpt available."}
        </p>

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
