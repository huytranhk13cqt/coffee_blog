/**
 * App.jsx
 * =======
 * Root component của application.
 * Chứa routing configuration và global providers.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages - sẽ tạo sau
// import Home from './pages/public/Home'
// import PostDetail from './pages/public/PostDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Temporary content - sẽ thay bằng routes sau */}
        <header style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
          <h1>☕ Coffee's Blog</h1>
          <nav>
            <a href="/" style={{ marginRight: "15px" }}>
              Home
            </a>
            <a href="/about" style={{ marginRight: "15px" }}>
              About
            </a>
            <a href="/portfolio" style={{ marginRight: "15px" }}>
              Portfolio
            </a>
            <a href="/gallery">Gallery</a>
          </nav>
        </header>

        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer
          style={{
            padding: "20px",
            borderTop: "1px solid #eee",
            marginTop: "40px",
          }}
        >
          <p>© 2025 Coffee's Blog. Built with React + FastAPI + Supabase</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

// Temporary components - sẽ move sang files riêng sau
function HomePage() {
  return (
    <div>
      <h2>Welcome to my blog! 🚀</h2>
      <p>
        This is a personal blog about coding, life, and everything in between.
      </p>
      <p
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <strong>Status:</strong> Frontend is running! 🎉
        <br />
        <strong>Next step:</strong> Connect to backend API
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">← Go back home</a>
    </div>
  );
}

export default App;
