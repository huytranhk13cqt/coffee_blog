/**
 * App.jsx
 * =======
 * Root component của application.
 */

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/common/ThemeToggle";
import Home from "./pages/public/Home";
import PostDetail from "./pages/public/PostDetail";
import Category from "./pages/public/Category";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Portfolio from "./pages/public/Portfolio";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app">
          {/* Header */}
          <header className="header">
            <div className="header__logo">
              <Link to="/">☕ Coffee's Blog</Link>
            </div>
            <div className="header__right">
              <nav className="header__nav">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/portfolio">Portfolio</Link>
              </nav>
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content */}
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:slug" element={<PostDetail />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="footer">
            <p>© 2024 Coffee's Blog. Built with React + FastAPI + Supabase</p>
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
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
