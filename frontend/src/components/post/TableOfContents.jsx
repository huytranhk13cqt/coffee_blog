/**
 * TableOfContents.jsx
 * ====================
 * Auto-generate Table of Contents từ markdown headings.
 * Hiển thị sidebar với links đến các sections.
 */

import { useState, useEffect } from "react";
import "./TableOfContents.css";

/**
 * Extract headings từ markdown content.
 * @param {string} markdown - Raw markdown content
 * @returns {Array} Array of heading objects
 */
function extractHeadings(markdown) {
  if (!markdown) return [];

  const headings = [];
  const lines = markdown.split("\n");

  lines.forEach((line, index) => {
    // Match markdown headings: # H1, ## H2, ### H3
    const match = line.match(/^(#{1,3})\s+(.+)$/);

    if (match) {
      const level = match[1].length; // 1, 2, or 3
      const text = match[2].trim();

      // Generate ID từ text (để scroll đến)
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/-+/g, "-") // Remove multiple -
        .trim();

      headings.push({
        level,
        text,
        id,
        index,
      });
    }
  });

  return headings;
}

function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  // Extract headings khi content thay đổi
  useEffect(() => {
    const extracted = extractHeadings(content);
    setHeadings(extracted);
  }, [content]);

  // Track active heading khi scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px", // Trigger khi heading gần top
        threshold: 0,
      }
    );

    // Observe tất cả headings trong document
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Click handler - smooth scroll đến heading
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset cho fixed header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  // Không hiển thị nếu ít hơn 2 headings
  if (headings.length < 2) {
    return null;
  }

  return (
    <nav className="toc">
      <h3 className="toc__title">📑 Contents</h3>
      <ul className="toc__list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc__item toc__item--level-${heading.level} ${
              activeId === heading.id ? "toc__item--active" : ""
            }`}
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className="toc__link"
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
