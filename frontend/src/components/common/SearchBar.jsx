/**
 * SearchBar.jsx
 * ==============
 * Search input component với debounce.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ placeholder = "Search posts...", className = "" }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form className={`search-bar ${className}`} onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        aria-label="Search posts"
      />
      <button type="submit" className="search-bar__button" aria-label="Search">
        🔍
      </button>
    </form>
  );
}

export default SearchBar;
