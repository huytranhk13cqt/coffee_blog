/**
 * TagBadge.jsx
 * =============
 * Clickable tag badge component.
 */

import { Link } from "react-router-dom";

function TagBadge({ tag, size = "normal" }) {
  return (
    <Link to={`/tag/${tag.slug}`} className={`tag-badge tag-badge--${size}`}>
      #{tag.name}
    </Link>
  );
}

export default TagBadge;
