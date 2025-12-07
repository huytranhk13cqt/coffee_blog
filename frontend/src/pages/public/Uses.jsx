import { Wrench, Monitor, Code, Terminal, Cpu, Palette } from "lucide-react";
import "./Uses.css";

function Uses() {
  // Data - bạn có thể customize theo setup thật của mình
  const categories = [
    {
      title: "Hardware",
      icon: <Monitor size={24} />,
      items: [
        { name: "Laptop", description: "Dell XPS 15 / MacBook Pro M2" },
        { name: "Monitor", description: '27" 4K IPS Display' },
        { name: "Keyboard", description: "Mechanical keyboard 75%" },
        { name: "Mouse", description: "Logitech MX Master 3" },
      ],
    },
    {
      title: "Development",
      icon: <Code size={24} />,
      items: [
        { name: "Editor", description: "VS Code with One Dark Pro theme" },
        { name: "Terminal", description: "Windows Terminal / iTerm2" },
        { name: "Font", description: "JetBrains Mono, Fira Code" },
        { name: "Browser", description: "Chrome + Firefox Dev Edition" },
      ],
    },
    {
      title: "Tech Stack",
      icon: <Terminal size={24} />,
      items: [
        { name: "Frontend", description: "React, Vite, Tailwind CSS" },
        { name: "Backend", description: "FastAPI, Node.js, Express" },
        { name: "Database", description: "PostgreSQL, MongoDB, Supabase" },
        { name: "DevOps", description: "Docker, GitHub Actions" },
      ],
    },
    {
      title: "Productivity",
      icon: <Cpu size={24} />,
      items: [
        { name: "Notes", description: "Notion, Obsidian" },
        { name: "Design", description: "Figma, Canva" },
        { name: "Communication", description: "Discord, Slack" },
        { name: "AI Tools", description: "Claude, GitHub Copilot" },
      ],
    },
    {
      title: "Creative",
      icon: <Palette size={24} />,
      items: [
        { name: "3D Modeling", description: "Blender" },
        { name: "Photo Editing", description: "Lightroom, Photoshop" },
        { name: "Video", description: "DaVinci Resolve" },
        { name: "Audio", description: "Audacity" },
      ],
    },
  ];

  return (
    <div className="uses-page">
      <div className="uses-header">
        <Wrench size={40} className="uses-icon" />
        <h1>Uses</h1>
        <p className="uses-subtitle">
          Tools, software, and hardware I use for development and daily work.
        </p>
      </div>

      <div className="uses-content">
        {categories.map((category, index) => (
          <section key={index} className="uses-section">
            <div className="uses-section-header">
              {category.icon}
              <h2>{category.title}</h2>
            </div>
            <ul className="uses-list">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="uses-item">
                  <span className="uses-item-name">{item.name}</span>
                  <span className="uses-item-description">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="uses-footer">
        <p>
          This page is inspired by{" "}
          <a href="https://uses.tech" target="_blank" rel="noopener noreferrer">
            uses.tech
          </a>
          . Last updated: December 2024.
        </p>
      </div>
    </div>
  );
}

export default Uses;
