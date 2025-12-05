/**
 * Contact.jsx
 * ===========
 * Trang liên hệ với social links.
 * Không cần form phức tạp - chỉ hiển thị cách liên hệ.
 */

import { useEffect } from "react";

function Contact() {
  // Update document title
  useEffect(() => {
    document.title = "Contact | Coffee's Blog";
    return () => {
      document.title = "Coffee's Blog";
    };
  }, []);

  // Social links - có thể update với links thật sau
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: "🐙",
      description: "Check out my code and projects",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: "💼",
      description: "Connect with me professionally",
    },
    {
      name: "Email",
      url: "mailto:your.email@example.com",
      icon: "📧",
      description: "Send me an email",
    },
  ];

  return (
    <div className="contact-page">
      {/* Header */}
      <header className="contact-page__header">
        <h1 className="contact-page__title">Get in Touch 👋</h1>
        <p className="contact-page__subtitle">
          I'm always happy to connect with fellow developers, students, or
          anyone interested in data and technology!
        </p>
      </header>

      {/* Social Links */}
      <section className="contact-page__links">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <span className="contact-card__icon">{link.icon}</span>
            <div className="contact-card__info">
              <h3 className="contact-card__name">{link.name}</h3>
              <p className="contact-card__description">{link.description}</p>
            </div>
            <span className="contact-card__arrow">→</span>
          </a>
        ))}
      </section>

      {/* Additional Info */}
      <section className="contact-page__info">
        <h2>A Few Things to Note</h2>
        <ul>
          <li>
            <strong>Response time:</strong> I usually respond within 1-2 days
          </li>
          <li>
            <strong>Collaboration:</strong> Open to interesting projects and
            opportunities
          </li>
          <li>
            <strong>Questions:</strong> Feel free to ask about my blog posts or
            projects
          </li>
        </ul>
      </section>

      {/* Location */}
      <section className="contact-page__location">
        <p>📍 Based in Perth, Western Australia</p>
        <p className="contact-page__timezone">Timezone: AWST (UTC+8)</p>
      </section>
    </div>
  );
}

export default Contact;
