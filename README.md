# Coffee's Personal Blog

A personal blog platform built from scratch, combining technical writing with life experiences. Features a custom CMS with Markdown editor, portfolio showcase, and a unique pixel art aesthetic.

> **Version:** 1.0.0-planning  
> **Status:** Planning Phase  
> **Last Updated:** December 2024

---

## Table of Contents

- [Overview](#overview)
- [Motivation](#motivation)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project is a full-stack personal blog application designed to serve as both a technical blog for sharing coding knowledge and a personal space for documenting life experiences. Unlike using existing platforms like Medium or WordPress, this blog is built entirely from scratch to provide complete customization control and serve as a learning project for full-stack development.

The blog features a custom Content Management System (CMS) with a split-view Markdown editor, drag-and-drop image uploads, and an admin dashboard for content management. The public-facing site includes a mixed-stream homepage, portfolio section, auto-generated gallery, and various static pages.

The visual design follows a minimalist approach combined with pixel art elements inspired by classic GBA-era games like Pokémon, using neutral and soft color tones throughout.

---

## Motivation

This project serves multiple purposes. First, it provides a platform for sharing knowledge about data engineering, software development, IoT projects, and other technical topics through detailed blog posts. Second, it acts as a personal documentation space to record life experiences, thoughts, and journeys as an international student. Third, building a blog from scratch offers hands-on experience with full-stack development, including frontend frameworks, backend APIs, database design, authentication, file storage, and deployment. Finally, the portfolio section showcases completed projects and demonstrates technical capabilities to potential employers or collaborators.

---

## Tech Stack

### Frontend

The frontend uses **React** with **Vite** as the build tool. React was chosen for its component-based architecture and large ecosystem, while Vite provides extremely fast hot module replacement during development and optimized production builds. The application follows a Client-Side Rendering (CSR) approach rather than Server-Side Rendering (SSR), prioritizing fast interactions and smooth user experience over SEO optimization.

For styling, the project uses either **Tailwind CSS** for utility-first styling or **vanilla CSS with CSS Modules** for complete control over the pixel art aesthetic. The final decision will be made during the implementation phase based on what works best for achieving the desired visual style.

Additional frontend libraries include **React Router** for client-side routing, **react-markdown** for rendering Markdown content, **react-syntax-highlighter** for code block syntax highlighting, and **Axios** or native Fetch API for HTTP requests.

### Backend

The backend is built with **FastAPI**, a modern Python web framework known for its high performance, automatic API documentation, and excellent developer experience. FastAPI's built-in support for Pydantic models provides robust data validation and serialization.

The backend follows a layered architecture with clear separation between routes (API endpoints), services (business logic), and repositories (data access). This structure makes the codebase maintainable and testable.

### Database & Storage

**Supabase** serves as the backend-as-a-service platform, providing PostgreSQL database for structured data storage, S3-compatible object storage for media files (images, audio, video), built-in authentication with JWT tokens, and real-time subscriptions (available for future features).

PostgreSQL was chosen over MongoDB despite previous experience with the latter because it better suits the relational nature of blog data (posts, categories, tags, users) and provides powerful features like full-text search for the search functionality.

### DevOps & Deployment

The application is containerized using **Docker** and **Docker Compose** for consistent development and production environments. Deployment targets a personal **VPS** (Virtual Private Server) with **Nginx** as a reverse proxy handling SSL termination and static file serving.

**GitHub Actions** provides CI/CD automation, automatically building and deploying the application when changes are pushed to the main branch.

For analytics, **Umami** is self-hosted alongside the blog to provide privacy-focused, lightweight visitor analytics without third-party tracking.

---

## Features

Features are organized by priority level, from essential functionality to creative enhancements.

### Core Features (Must Have)

These features are essential for the blog to function as intended.

**Authentication System** provides secure login for the single admin user using Supabase Auth with JWT tokens. Protected routes ensure only authenticated users can access the admin dashboard.

**Admin Dashboard** serves as the central hub for content management, displaying overview statistics (total posts, drafts, published count), recent posts list, and quick navigation to all management functions.

**Markdown Editor with Split View** is the heart of the CMS. The left panel provides a textarea for writing Markdown with a basic toolbar (bold, italic, headings, links, code blocks), while the right panel shows real-time rendered preview. Syntax highlighting for code blocks supports multiple programming languages.

**Drag-and-Drop Image Upload** allows images to be dragged directly into the editor. Files are automatically uploaded to Supabase Storage, and the Markdown image syntax is inserted at the cursor position.

**Post Management** includes full CRUD operations (Create, Read, Update, Delete) for blog posts. Each post has metadata including title, auto-generated slug (editable), excerpt (auto-generated from first 100 words if not provided), cover image, category, tags, and publication status (Draft or Published).

**Public Homepage** displays published posts in a mixed-stream chronological layout with pagination. Each post card shows the title, excerpt, cover image, publication date, and category.

**Post Detail Page** renders the full Markdown content with proper typography, syntax-highlighted code blocks, and responsive images. A Table of Contents is auto-generated from headings for longer posts.

### Essential Features (Should Have)

These features significantly enhance the user experience.

**Category System** organizes posts into categories with dedicated category pages showing filtered posts. Categories are manageable from the admin dashboard.

**Tag System** provides flexible post labeling with many-to-many relationships. Tag pages display all posts with a specific tag.

**Search Functionality** uses PostgreSQL full-text search to find posts by title and content. The search results page shows matching posts with highlighted terms.

**Portfolio Section** showcases projects in a grid layout. Each project card displays a thumbnail, title, short description, tech stack tags, and links to live demo and GitHub repository. Projects are manageable from the admin dashboard.

**Gallery Page** automatically aggregates all images from published posts and displays them in a masonry or grid layout. Clicking an image opens a lightbox for full-size viewing.

**Static Pages** include About Me (personal introduction), Contact (social links and contact information), Uses (tools, hardware, and software setup), and Bookmarks (curated collection of useful resources).

**Dark/Light Mode** provides a theme toggle respecting system preferences by default. User preference is persisted in localStorage. All components and pages support both themes.

**Responsive Design** ensures the entire site works well on mobile devices, tablets, and desktops through mobile-first CSS approach.

### Important Enhancements (Nice to Have)

These features improve quality of life but are not critical for launch.

**Comment System** integrates Giscus, which uses GitHub Discussions for comments. This provides a free, ad-free comment system that supports Markdown and dark mode.

**Self-Hosted Analytics** uses Umami to track page views and popular content without compromising visitor privacy.

**Reading Time Estimation** calculates and displays estimated reading time based on word count (approximately 200-250 words per minute).

**Related Posts** displays 3-5 related posts at the bottom of each post detail page, determined by shared category or tags.

**Copy Link Button** allows easy sharing by copying the post URL to clipboard with a toast notification confirmation.

**Pinned Posts** can be featured at the top of the homepage regardless of publication date.

**Archive Page** displays all posts grouped by year and month for easy browsing of historical content.

### Creative Features (Future Enhancements)

These features add personality and uniqueness to the blog.

**Pixel Art Aesthetic** incorporates pixel art elements including custom cursor, category icons, decorative borders, and loading animations inspired by GBA-era games.

**Keyboard Shortcuts** in the editor support common operations like Ctrl+S for save, Ctrl+B for bold, and Ctrl+K for inserting links.

**Auto-Save Drafts** periodically saves draft content (every 30 seconds) to prevent accidental loss.

**Post Series** groups related posts into ordered series with previous/next navigation within the series.

**Now Page** provides a dynamic page showing current focus, inspired by nownownow.com.

**RSS Feed** allows readers to subscribe to new posts through their preferred RSS reader.

**Easter Eggs** include hidden features like the Konami code triggering special animations or secret pages.

---

## Architecture

The application follows a three-tier architecture with clear separation of concerns.

```
┌───────────────────────────────────────────────────────────────┐
│                       CLIENT BROWSER                          │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    React + Vite                         |  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────────────────┐  │  │
│  │  │   Pages   │ │Components │ │       Services        │  │  │
│  │  │           │ │           │ │  (API calls, utils)   │  │  │
│  │  └───────────┘ └───────────┘ └───────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                           NGINX                               │
│              (Reverse Proxy + SSL + Static Files)             │
└───────────────────────────────────────────────────────────────┘
                              │
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                            FastAPI                            │
│                                                               │
│  ┌───────────┐    ┌───────────┐    ┌───────────────────────┐  │
│  │  Routes   │    │ Services  │    │     Repositories      │  │
│  │ (API      │───▶│ (Business │───▶│     (Data Access)     │  │
│  │ Endpoints)│    │  Logic)   │    │                       │  │
│  └───────────┘    └───────────┘    └───────────────────────┘  │
│                                               │               │
└───────────────────────────────────────────────│───────────────┘
                                                │
                                                ▼
┌───────────────────────────────────────────────────────────────┐
│                           SUPABASE                            │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐ |
│  │   PostgreSQL    │  │     Storage     │  │     Auth       │ │
│  │   (Database)    │  │  (Media Files)  │  │     (JWT)      │ |
│  └─────────────────┘  └─────────────────┘  └────────────────┘ │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Design Patterns Used

**Repository Pattern** abstracts database operations behind a clean interface. Each entity (Post, Category, Project) has its own repository class handling all database queries. This separation allows changing the database implementation without affecting business logic.

**Service Layer Pattern** encapsulates business logic in service classes. Routes delegate to services, which coordinate between repositories and handle complex operations like slug generation or image processing.

**Dependency Injection** is used throughout the FastAPI backend. Dependencies like database connections and current user are injected into route handlers, making the code testable and modular.

---

## Database Schema

The database consists of several interconnected tables designed to support all blog functionality.

```
┌─────────────────────────────────────────────────────────────────┐
│                           users                                 │
├─────────────────────────────────────────────────────────────────┤
│ id              UUID PRIMARY KEY DEFAULT gen_random_uuid()      │
│ email           VARCHAR NOT NULL UNIQUE                         │
│ password_hash   VARCHAR NOT NULL                                │
│ created_at      TIMESTAMP DEFAULT now()                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         categories                              │
├─────────────────────────────────────────────────────────────────┤
│ id              UUID PRIMARY KEY DEFAULT gen_random_uuid()      │
│ name            VARCHAR NOT NULL                                │
│ slug            VARCHAR NOT NULL UNIQUE                         │
│ description     TEXT                                            │
│ created_at      TIMESTAMP DEFAULT now()                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                           posts                                 │
├─────────────────────────────────────────────────────────────────┤
│ id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()│
│ title                 VARCHAR NOT NULL                          │
│ slug                  VARCHAR NOT NULL UNIQUE                   │
│ content               TEXT                                      │
│ excerpt               TEXT                                      │
│ cover_image_url       VARCHAR                                   │
│ status                VARCHAR DEFAULT 'draft'                   │
│ category_id           UUID REFERENCES categories(id)            │
│ reading_time_minutes  INTEGER                                   │
│ is_pinned             BOOLEAN DEFAULT false                     │
│ created_at            TIMESTAMP DEFAULT now()                   │
│ updated_at            TIMESTAMP                                 │
│ published_at          TIMESTAMP                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                           tags                                  │
├─────────────────────────────────────────────────────────────────┤
│ id              UUID PRIMARY KEY DEFAULT gen_random_uuid()      │
│ name            VARCHAR NOT NULL                                │
│ slug            VARCHAR NOT NULL UNIQUE                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        post_tags                                │
├─────────────────────────────────────────────────────────────────┤
│ post_id         UUID REFERENCES posts(id) ON DELETE CASCADE     │
│ tag_id          UUID REFERENCES tags(id) ON DELETE CASCADE      │
│ PRIMARY KEY (post_id, tag_id)                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         projects                                │
├─────────────────────────────────────────────────────────────────┤
│ id              UUID PRIMARY KEY DEFAULT gen_random_uuid()      │
│ title           VARCHAR NOT NULL                                │
│ description     TEXT                                            │
│ thumbnail_url   VARCHAR                                         │
│ tech_stack      TEXT[]                                          │
│ demo_url        VARCHAR                                         │
│ github_url      VARCHAR                                         │
│ sort_order      INTEGER DEFAULT 0                               │
│ created_at      TIMESTAMP DEFAULT now()                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          media                                  │
├─────────────────────────────────────────────────────────────────┤
│ id              UUID PRIMARY KEY DEFAULT gen_random_uuid()      │
│ filename        VARCHAR NOT NULL                                │
│ url             VARCHAR NOT NULL                                │
│ file_type       VARCHAR                                         │
│ file_size       INTEGER                                         │
│ post_id         UUID REFERENCES posts(id) ON DELETE SET NULL    │
│ uploaded_at     TIMESTAMP DEFAULT now()                         │
└─────────────────────────────────────────────────────────────────┘
```

### Relationships

Posts belong to one Category (many-to-one relationship). Posts can have multiple Tags, and Tags can belong to multiple Posts (many-to-many relationship through post_tags junction table). Media files can optionally be associated with a Post for tracking purposes, but remain in storage even if the post is deleted.

---

## Project Structure

The project is organized as a monorepo with separate directories for frontend and backend.

```
coffee-blog/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI application entry point
│   │   ├── config.py               # Environment configuration
│   │   ├── database.py             # Supabase client initialization
│   │   │
│   │   ├── models/                 # Pydantic models for validation
│   │   │   ├── __init__.py
│   │   │   ├── post.py
│   │   │   ├── category.py
│   │   │   ├── tag.py
│   │   │   ├── project.py
│   │   │   ├── media.py
│   │   │   └── user.py
│   │   │
│   │   ├── routes/                 # API endpoint definitions
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── posts.py
│   │   │   ├── categories.py
│   │   │   ├── tags.py
│   │   │   ├── projects.py
│   │   │   └── media.py
│   │   │
│   │   ├── services/               # Business logic layer
│   │   │   ├── __init__.py
│   │   │   ├── post_repository.py
│   │   │   ├── category_repository.py
│   │   │   ├── tag_repository.py
│   │   │   ├── project_repository.py
│   │   │   └── media_service.py
│   │   │
│   │   ├── middleware/             # Custom middleware
│   │   │   ├── __init__.py
│   │   │   └── auth.py
│   │   │
│   │   └── utils/                  # Helper functions
│   │       ├── __init__.py
│   │       ├── slug.py
│   │       └── reading_time.py
│   │
│   ├── tests/                      # Backend tests
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── common/             # Shared components (Button, Input, etc.)
│   │   │   ├── layout/             # Layout components (Header, Footer, etc.)
│   │   │   ├── post/               # Post-related components
│   │   │   ├── editor/             # Markdown editor components
│   │   │   └── admin/              # Admin-specific components
│   │   │
│   │   ├── pages/                  # Page components
│   │   │   ├── public/             # Public pages (Home, Post, Gallery, etc.)
│   │   │   └── admin/              # Admin pages (Dashboard, PostEditor, etc.)
│   │   │
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── usePosts.js
│   │   │   └── useTheme.js
│   │   │
│   │   ├── services/               # API communication layer
│   │   │   ├── api.js              # Axios/Fetch configuration
│   │   │   ├── authService.js
│   │   │   ├── postService.js
│   │   │   └── mediaService.js
│   │   │
│   │   ├── contexts/               # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── styles/                 # CSS files
│   │   │   ├── globals.css
│   │   │   ├── variables.css       # CSS custom properties
│   │   │   └── components/         # Component-specific styles
│   │   │
│   │   ├── utils/                  # Utility functions
│   │   │   ├── formatDate.js
│   │   │   └── slugify.js
│   │   │
│   │   ├── App.jsx                 # Root component with routing
│   │   └── main.jsx                # Application entry point
│   │
│   ├── public/                     # Static assets
│   │   └── pixel-assets/           # Pixel art images and icons
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml              # Local development setup
├── docker-compose.prod.yml         # Production setup
├── nginx/
│   └── nginx.conf                  # Nginx configuration
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD pipeline
│
├── docs/                           # Additional documentation
│   ├── API.md                      # API documentation
│   ├── DEPLOYMENT.md               # Deployment guide
│   └── CONTRIBUTING.md             # Contribution guidelines
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started

> **Note:** This section will be updated with detailed instructions once development begins.

### Prerequisites

The following tools are required to run this project locally. Node.js version 18 or higher and npm are needed for the frontend. Python version 3.10 or higher is required for the backend. Docker and Docker Compose are optional but recommended for consistent development environments. A Supabase account is needed for database and storage services. Git is required for version control.

### Environment Variables

Both frontend and backend require environment variables. Example files (.env.example) are provided in each directory.

Backend environment variables include SUPABASE_URL for the Supabase project URL, SUPABASE_KEY for the Supabase service role key, and JWT_SECRET for the JWT signing secret.

Frontend environment variables include VITE_API_URL for the backend API URL and VITE_SUPABASE_URL for the Supabase project URL.

### Installation

Detailed installation steps will be added as development progresses. The general process involves cloning the repository, setting up environment variables, installing dependencies for both frontend and backend, initializing the database schema in Supabase, and running the development servers.

### Running Locally

Instructions for running the application locally using Docker Compose and without Docker will be provided.

---

## Deployment

The application is designed for deployment on a personal VPS with Docker containers.

### Production Architecture

In production, Nginx serves as the entry point, handling SSL termination, serving static frontend files, and proxying API requests to the FastAPI backend. The backend container runs the FastAPI application using Uvicorn. Supabase cloud handles database and storage, eliminating the need to manage PostgreSQL locally. Umami runs in a separate container for analytics.

### Deployment Process

The CI/CD pipeline uses GitHub Actions to automate deployment. When code is pushed to the main branch, the workflow runs tests (once tests are implemented), builds Docker images, pushes images to a container registry, connects to the VPS via SSH, pulls the latest images, and restarts the containers with zero downtime.

Detailed deployment documentation will be created in docs/DEPLOYMENT.md.

---

## Roadmap

Development follows a 100-day plan divided into six phases.

**Phase 1 (Days 1-15)** focuses on foundation work including project planning, environment setup, database schema creation, and basic FastAPI backend with Posts CRUD.

**Phase 2 (Days 16-35)** builds the core CMS with authentication, admin dashboard, Markdown editor with split view, and image upload functionality.

**Phase 3 (Days 36-55)** develops the public site including homepage, post detail pages, category and tag filtering, and search functionality.

**Phase 4 (Days 56-75)** adds extended features including portfolio section, gallery page, static pages, and dark/light mode.

**Phase 5 (Days 76-90)** handles polish and deployment including Giscus comments integration, Umami analytics, Docker setup, VPS deployment, and CI/CD configuration.

**Phase 6 (Days 91-100)** adds creative features including pixel art aesthetic, final polish, documentation, and official launch.

### Future Considerations

After the initial 100-day development period, potential future enhancements include RSS feed generation, email newsletter integration, multilingual support (i18n), advanced search with filters, post scheduling, and mobile application using React Native.

---

## Contributing

This is a personal project, but suggestions and feedback are welcome. If you notice bugs, have feature suggestions, or want to discuss implementation approaches, feel free to open an issue on GitHub.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

This project is inspired by various personal blogs and technical writing platforms. Special thanks to the open-source communities behind React, FastAPI, Supabase, and all the libraries that make this project possible.

---

## Contact

**Author:** Coffee  
**Email:** [To be added]  
**GitHub:** [To be added]  
**LinkedIn:** [To be added]

---

_This README represents version 1.0.0-planning of the project documentation. It will be updated as development progresses and features are implemented._
