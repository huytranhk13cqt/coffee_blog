import { Bookmark, ExternalLink, Star } from "lucide-react";
import "./Bookmarks.css";

function Bookmarks() {
  // Data - bạn customize theo resources yêu thích của mình
  const bookmarkCategories = [
    {
      title: "⭐ Favorites",
      bookmarks: [
        {
          name: "Claude AI",
          url: "https://claude.ai",
          description: "AI assistant by Anthropic",
        },
        {
          name: "GitHub",
          url: "https://github.com",
          description: "Code hosting platform",
        },
      ],
    },
    {
      title: "📚 Learning",
      bookmarks: [
        {
          name: "freeCodeCamp",
          url: "https://freecodecamp.org",
          description: "Free coding courses",
        },
        {
          name: "MDN Web Docs",
          url: "https://developer.mozilla.org",
          description: "Web development documentation",
        },
        {
          name: "Python Docs",
          url: "https://docs.python.org",
          description: "Official Python documentation",
        },
      ],
    },
    {
      title: "🛠️ Tools",
      bookmarks: [
        {
          name: "Excalidraw",
          url: "https://excalidraw.com",
          description: "Virtual whiteboard for sketching",
        },
        {
          name: "Notion",
          url: "https://notion.so",
          description: "All-in-one workspace",
        },
        {
          name: "Figma",
          url: "https://figma.com",
          description: "UI design tool",
        },
      ],
    },
    {
      title: "📖 Blogs I Read",
      bookmarks: [
        {
          name: "Overreacted",
          url: "https://overreacted.io",
          description: "Dan Abramov's blog on React",
        },
        {
          name: "Josh W Comeau",
          url: "https://joshwcomeau.com",
          description: "Creative CSS and React tutorials",
        },
        {
          name: "Tailwind Blog",
          url: "https://tailwindcss.com/blog",
          description: "Tailwind CSS updates",
        },
      ],
    },
    {
      title: "🎨 Design Resources",
      bookmarks: [
        {
          name: "Unsplash",
          url: "https://unsplash.com",
          description: "Free high-quality photos",
        },
        {
          name: "Heroicons",
          url: "https://heroicons.com",
          description: "Beautiful hand-crafted SVG icons",
        },
        {
          name: "Coolors",
          url: "https://coolors.co",
          description: "Color palette generator",
        },
      ],
    },
  ];

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-header">
        <Bookmark size={40} className="bookmarks-icon" />
        <h1>Bookmarks</h1>
        <p className="bookmarks-subtitle">
          A collection of useful resources, tools, and websites I find valuable.
        </p>
      </div>

      <div className="bookmarks-content">
        {bookmarkCategories.map((category, index) => (
          <section key={index} className="bookmarks-section">
            <h2 className="bookmarks-section-title">{category.title}</h2>
            <div className="bookmarks-grid">
              {category.bookmarks.map((bookmark, bIndex) => (
                <a
                  key={bIndex}
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bookmark-card"
                >
                  <div className="bookmark-card-header">
                    <span className="bookmark-name">{bookmark.name}</span>
                    <ExternalLink size={14} className="bookmark-external" />
                  </div>
                  <p className="bookmark-description">{bookmark.description}</p>
                  <span className="bookmark-url">
                    {new URL(bookmark.url).hostname}
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="bookmarks-footer">
        <p>
          Found a broken link? Let me know via the{" "}
          <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  );
}

export default Bookmarks;
