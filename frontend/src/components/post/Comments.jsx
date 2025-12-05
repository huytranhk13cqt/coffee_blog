/**
 * Comments.jsx
 * =============
 * Giscus comments component for blog posts.
 *
 * Giscus uses GitHub Discussions as the backend,
 * so readers need a GitHub account to comment.
 */

import Giscus from "@giscus/react";
import { useTheme } from "../../contexts/ThemeContext";

function Comments() {
  const { isDark } = useTheme();

  return (
    <div className="comments">
      <h2 className="comments__title">Comments</h2>
      <p className="comments__subtitle">
        Share your thoughts! Sign in with GitHub to comment.
      </p>

      <div className="comments__container">
        <Giscus
          id="comments"
          repo="huytranhk13cqt/coffee_blog"
          repoId="R_kgDOQglMjQ"
          category="Announcements"
          categoryId="DIC_kwDOQglMjc4Czco8"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={isDark ? "dark" : "light"}
          lang="en"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Comments;
