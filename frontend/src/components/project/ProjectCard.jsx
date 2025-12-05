/**
 * ProjectCard.jsx
 * ================
 * Component hiển thị một project trong portfolio grid.
 */

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      {/* Thumbnail */}
      <div className="project-card__thumbnail">
        {project.thumbnail_url ? (
          <img src={project.thumbnail_url} alt={project.title} />
        ) : (
          <div className="project-card__thumbnail-placeholder">
            <span>🚀</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="project-card__content">
        {/* Title */}
        <h3 className="project-card__title">{project.title}</h3>

        {/* Description */}
        <p className="project-card__description">
          {project.description || "No description available."}
        </p>

        {/* Tech Stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="project-card__tech-stack">
            {project.tech_stack.map((tech) => (
              <span key={tech} className="project-card__tech-badge">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="project-card__links">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link project-card__link--demo"
            >
              🔗 Live Demo
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link project-card__link--github"
            >
              🐙 GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
