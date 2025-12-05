/**
 * PostDetail.jsx
 * ==============
 * Trang hiển thị nội dung đầy đủ của một blog post.
 */

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { getPostBySlug } from "../../services/postService";
import { useTheme } from "../../contexts/ThemeContext";

function PostDetail() {
  const { slug } = useParams();
  const { isDark } = useTheme();

  // States
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post khi component mount hoặc slug thay đổi
  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPostBySlug(slug);
        setPost(data);

        document.title = `${data.title} | Coffee's Blog`;
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError("Post not found or failed to load.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();

    return () => {
      document.title = "Coffee's Blog";
    };
  }, [slug]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="post-detail">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="post-detail">
        <div className="error">
          <h2>😕 Oops!</h2>
          <p>{error || "Post not found."}</p>
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Render post
  return (
    <article className="post-detail">
      {/* Back link */}
      <Link to="/" className="back-link">
        ← Back to all posts
      </Link>

      {/* Post Header */}
      <header className="post-detail__header">
        {/* Category */}
        {post.categories && (
          <Link
            to={`/category/${post.categories.slug}`}
            className="post-detail__category"
          >
            {post.categories.name}
          </Link>
        )}

        {/* Title */}
        <h1 className="post-detail__title">{post.title}</h1>

        {/* Meta */}
        <div className="post-detail__meta">
          <span className="post-detail__date">
            {formatDate(post.published_at || post.created_at)}
          </span>
          {post.reading_time_minutes && (
            <span className="post-detail__reading-time">
              · {post.reading_time_minutes} min read
            </span>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {post.cover_image_url && (
        <div className="post-detail__cover">
          <img src={post.cover_image_url} alt={post.title} />
        </div>
      )}

      {/* Post Content - Render Markdown */}
      <div className="post-detail__content">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              if (!inline && match) {
                return (
                  <SyntaxHighlighter
                    style={isDark ? oneDark : oneLight}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                );
              }

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Post Footer */}
      <footer className="post-detail__footer">
        <Link to="/" className="back-link">
          ← Back to all posts
        </Link>
      </footer>
    </article>
  );
}

export default PostDetail;
