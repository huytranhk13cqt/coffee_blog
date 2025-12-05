/**
 * About.jsx
 * =========
 * Trang giới thiệu bản thân.
 * Đây là static page - content được hardcode trong component.
 */

import { Link } from "react-router-dom";
import { useEffect } from "react";

function About() {
  // Update document title
  useEffect(() => {
    document.title = "About | Coffee's Blog";
    return () => {
      document.title = "Coffee's Blog";
    };
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <header className="about-page__hero">
        <div className="about-page__avatar">
          {/* Placeholder avatar - có thể thay bằng ảnh thật sau */}
          <span className="about-page__avatar-emoji">☕</span>
        </div>
        <h1 className="about-page__title">Hi, I'm Coffee! 👋</h1>
        <p className="about-page__subtitle">
          Master's Student in Predictive Analytics | Aspiring Data Engineer
        </p>
      </header>

      {/* Main Content */}
      <section className="about-page__content">
        <h2>About Me</h2>
        <p>
          I'm an international student currently pursuing my Master's degree in
          Predictive Analytics with a Data Science specialization at Curtin
          University in Western Australia.
        </p>
        <p>
          My goal is to become a professional Data Engineer by 2027. I'm
          passionate about building systems that handle data efficiently and
          creating tools that make people's lives easier.
        </p>

        <h2>Why "Coffee"?</h2>
        <p>
          The nickname comes from my university days in Vietnam, where I spent
          countless hours at The Coffee House cafés, coding and studying. Coffee
          became my constant companion, and the name stuck!
        </p>

        <h2>What I Do</h2>
        <ul className="about-page__list">
          <li>
            <strong>🎓 Studying</strong> - Data Science, Machine Learning, and
            Predictive Analytics
          </li>
          <li>
            <strong>💻 Building</strong> - Full-stack applications, IoT systems,
            and data pipelines
          </li>
          <li>
            <strong>✍️ Writing</strong> - Sharing what I learn through this blog
          </li>
          <li>
            <strong>📚 Learning</strong> - Always exploring new technologies and
            best practices
          </li>
        </ul>

        <h2>Tech Stack</h2>
        <div className="about-page__tech-stack">
          <span className="tech-badge">Python</span>
          <span className="tech-badge">JavaScript</span>
          <span className="tech-badge">React</span>
          <span className="tech-badge">FastAPI</span>
          <span className="tech-badge">PostgreSQL</span>
          <span className="tech-badge">MongoDB</span>
          <span className="tech-badge">Node.js</span>
          <span className="tech-badge">Docker</span>
        </div>

        <h2>Beyond Coding</h2>
        <p>When I'm not coding, you might find me:</p>
        <ul className="about-page__list">
          <li>📷 Taking photos</li>
          <li>🎮 Gaming</li>
          <li>🌱 Gardening</li>
          <li>📖 Reading about finance and statistics</li>
          <li>🏠 Designing home interiors in 3D</li>
        </ul>

        <h2>This Blog</h2>
        <p>
          I built this blog from scratch as a learning project and a place to
          document my journey. It's powered by React, FastAPI, and Supabase,
          with a pixel art aesthetic inspired by classic GBA games.
        </p>
        <p>
          Feel free to explore my posts about technology, life as an
          international student, and everything in between!
        </p>
      </section>

      {/* Call to Action */}
      <footer className="about-page__footer">
        <p>Want to see what I'm working on?</p>
        <div className="about-page__links">
          <Link to="/portfolio" className="btn btn--primary">
            View Portfolio
          </Link>
          <Link to="/" className="btn btn--secondary">
            Read Blog
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default About;
