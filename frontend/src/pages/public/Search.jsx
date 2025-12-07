/**
 * Search.jsx
 * ===========
 * Trang hiển thị kết quả tìm kiếm.
 */

import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchPosts } from "../../services/postService";
import PostCard from "../../components/post/PostCard";
import SearchBar from "../../components/common/SearchBar";
import useDebounce from "../../hooks/useDebounce";

function Search() {
  // Lấy query từ URL: /search?q=python
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";

  // States
  const [query, setQuery] = useState(queryFromUrl);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Debounce query - chờ 300ms sau khi user ngừng gõ
  const debouncedQuery = useDebounce(query, 300);

  // Sync query từ URL
  useEffect(() => {
    if (queryFromUrl) {
      setQuery(queryFromUrl);
    }
  }, [queryFromUrl]);

  // Search khi debounced query thay đổi
  useEffect(() => {
    async function performSearch() {
      if (!debouncedQuery.trim()) {
        setPosts([]);
        setTotal(0);
        setSearched(false);
        return;
      }

      try {
        setLoading(true);
        setSearched(true);

        const data = await searchPosts(debouncedQuery, { perPage: 20 });

        setPosts(data.posts);
        setTotal(data.total);

        // Update document title
        document.title = `Search: ${debouncedQuery} | Coffee's Blog`;
      } catch (err) {
        console.error("Search failed:", err);
        setPosts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }

    performSearch();

    return () => {
      document.title = "Coffee's Blog";
    };
  }, [debouncedQuery]);

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-page">
      {/* Search Header */}
      <header className="search-page__header">
        <h1 className="search-page__title">Search Posts 🔍</h1>

        {/* Inline Search Form */}
        <div className="search-page__form">
          <input
            type="text"
            className="search-page__input"
            placeholder="Type to search..."
            value={query}
            onChange={handleInputChange}
            autoFocus
          />
        </div>

        {/* Search Info */}
        {searched && !loading && (
          <p className="search-page__info">
            {total > 0 ? (
              <>
                Found <strong>{total}</strong> {total === 1 ? "post" : "posts"}{" "}
                for "<strong>{debouncedQuery}</strong>"
              </>
            ) : (
              <>
                No posts found for "<strong>{debouncedQuery}</strong>"
              </>
            )}
          </p>
        )}
      </header>

      {/* Loading State */}
      {loading && <div className="search-page__loading">Searching...</div>}

      {/* Results */}
      {!loading && posts.length > 0 && (
        <section className="search-page__results">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      )}

      {/* No Results */}
      {!loading && searched && posts.length === 0 && (
        <div className="search-page__empty">
          <p>😕 No posts found.</p>
          <p>Try different keywords or browse by category.</p>
          <Link to="/" className="btn btn--primary">
            Browse All Posts
          </Link>
        </div>
      )}

      {/* Initial State (before search) */}
      {!loading && !searched && (
        <div className="search-page__initial">
          <p>Start typing to search posts...</p>
        </div>
      )}
    </div>
  );
}

export default Search;
