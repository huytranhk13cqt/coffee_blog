/**
 * App.jsx
 * =======
 * Root component của application.
 */

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/public/Home";
import PostDetail from "./pages/public/PostDetail";
import Category from "./pages/public/Category";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header__logo">
            <Link to="/">☕ Coffee's Blog</Link>
          </div>
          <nav className="header__nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/gallery">Gallery</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>© 2024 Coffee's Blog. Built with React + FastAPI + Supabase</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">← Go back home</Link>
    </div>
  );
}

export default App;
