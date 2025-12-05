/**
 * Portfolio.jsx
 * ==============
 * Trang hiển thị các projects đã làm.
 */

import { useState, useEffect } from "react";
import { getProjects } from "../../services/projectService";
import ProjectCard from "../../components/project/ProjectCard";

function Portfolio() {
  // States
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects khi component mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);

        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();

    // Update document title
    document.title = "Portfolio | Coffee's Blog";

    return () => {
      document.title = "Coffee's Blog";
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="portfolio-page">
        <div className="loading">Loading projects...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="portfolio-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      {/* Header */}
      <header className="portfolio-page__header">
        <h1 className="portfolio-page__title">My Portfolio 🚀</h1>
        <p className="portfolio-page__subtitle">
          A collection of projects I've worked on, from personal experiments to
          professional work.
        </p>
      </header>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <section className="portfolio-page__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      ) : (
        <div className="portfolio-page__empty">
          <p>No projects yet. Check back soon!</p>
        </div>
      )}

      {/* Footer Note */}
      <footer className="portfolio-page__footer">
        <p>
          🔨 More projects coming soon! I'm always working on something new.
        </p>
      </footer>
    </div>
  );
}

export default Portfolio;
