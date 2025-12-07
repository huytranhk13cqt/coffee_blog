/**
 * PostDetail.jsx
 * ===============
 * Trang hiển thị nội dung đầy đủ của một bài post.
 * Bao gồm Table of Contents cho bài dài.
 */

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { useTheme } from "../../contexts/ThemeContext";
import { getPostBySlug } from "../../services/postService";
import { getPostTags } from "../../services/tagService";
import TableOfContents from "../../components/post/TableOfContents";
import Comments from "../../components/post/Comments";
import CopyLinkButton from "../../components/common/CopyLinkButton";

function PostDetail() {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPostBySlug(slug);
        setPost(data);

        // Fetch tags
        const tagsData = await getPostTags(slug);
        setTags(tagsData);

        document.title = `${data.title} | Coffee's Blog`;
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();

    // Cleanup
    return () => {
      document.title = "Coffee's Blog";
    };
  }, [slug]);

  // Custom heading renderer - thêm ID cho scroll
  const HeadingRenderer = ({ level, children }) => {
    const text = children?.toString() || "";
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    const Tag = `h${level}`;
    return <Tag id={id}>{children}</Tag>;
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

  return (
    <article className="post-detail">
      {/* Post Header */}
      <header className="post-detail__header">
        <h1 className="post-detail__title">{post.title}</h1>

        <div className="post-detail__meta">
          <time className="post-detail__date">
            {new Date(post.published_at || post.created_at).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </time>

          {post.categories && (
            <Link
              to={`/category/${post.categories.slug}`}
              className="post-detail__category"
            >
              {post.categories.name}
            </Link>
          )}

          <div className="post-actions">
            <CopyLinkButton url={window.location.href} />
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="post-detail__tags">
            {tags.map((tag) => (
              <Link key={tag.id} to={`/tag/${tag.slug}`} className="tag-badge">
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {post.cover_image_url && (
        <figure className="post-detail__cover">
          <img src={post.cover_image_url} alt={post.title} />
        </figure>
      )}

      {/* Table of Contents - Hiển thị ở đầu bài */}
      <TableOfContents content={post.content} />

      {/* Post Content */}
      <div className="post-detail__content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom headings với ID
            h1: ({ children }) => (
              <HeadingRenderer level={1}>{children}</HeadingRenderer>
            ),
            h2: ({ children }) => (
              <HeadingRenderer level={2}>{children}</HeadingRenderer>
            ),
            h3: ({ children }) => (
              <HeadingRenderer level={3}>{children}</HeadingRenderer>
            ),

            // Code blocks
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={isDark ? oneDark : oneLight}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
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

      {/* Comments Section */}
      <section className="post-detail__comments">
        <Comments />
      </section>

      {/* Back Link */}
      <footer className="post-detail__footer">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </footer>
    </article>
  );
}

export default PostDetail;
