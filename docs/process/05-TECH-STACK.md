# Technology Stack

> **Document Type**: Technical Specification
> **Project**: Coffee's Personal Blog CMS
> **Version**: 1.0
> **Last Updated**: 16/12/2024

---

## 1. Stack Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      FRONTEND                            │   │
│  │  React 19 + Vite + React Router                         │   │
│  │  CSS Variables + Custom Styling                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           │ HTTP/REST                           │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      BACKEND                             │   │
│  │  FastAPI + Pydantic + Uvicorn                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           │ Supabase Client                     │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      DATABASE                            │   │
│  │  Supabase (PostgreSQL) + Auth + Storage                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Stack

### 2.1 Core Framework

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| **React** | 19.x | UI library | [react.dev](https://react.dev) |
| **Vite** | 6.x | Build tool & dev server | [vite.dev](https://vite.dev) |
| **React Router DOM** | 7.x | Client-side routing | [reactrouter.com](https://reactrouter.com) |

### 2.2 UI Libraries

| Library | Purpose | Documentation |
|---------|---------|---------------|
| **Lucide React** | Icons | [lucide.dev](https://lucide.dev) |
| **Framer Motion** | Animations | [framer.com/motion](https://www.framer.com/motion) |

### 2.3 Content Libraries

| Library | Purpose | Documentation |
|---------|---------|---------------|
| **React Markdown** | Render markdown | [github.com/remarkjs/react-markdown](https://github.com/remarkjs/react-markdown) |
| **Remark GFM** | GitHub Flavored Markdown | [github.com/remarkjs/remark-gfm](https://github.com/remarkjs/remark-gfm) |
| **React Syntax Highlighter** | Code highlighting | [github.com/react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) |

### 2.4 Other Frontend Libraries

| Library | Purpose |
|---------|---------|
| **Axios** | HTTP client |
| **Giscus** | GitHub-based comments |
| **Yet Another React Lightbox** | Image gallery |

### 2.5 Frontend File Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Buttons, inputs, cards
│   │   ├── layout/         # Header, footer, sidebar
│   │   ├── post/           # Post-related components
│   │   └── admin/          # Admin components (to create)
│   ├── pages/              # Page components
│   │   ├── public/         # Public pages
│   │   └── admin/          # Admin pages (to create)
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API communication
│   ├── contexts/           # React contexts (Auth, Theme)
│   ├── styles/             # CSS files
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

---

## 3. Backend Stack

### 3.1 Core Framework

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| **Python** | 3.10+ | Programming language | [python.org](https://python.org) |
| **FastAPI** | 0.100+ | Web framework | [fastapi.tiangolo.com](https://fastapi.tiangolo.com) |
| **Pydantic** | 2.x | Data validation | [docs.pydantic.dev](https://docs.pydantic.dev) |
| **Uvicorn** | 0.20+ | ASGI server | [uvicorn.org](https://www.uvicorn.org) |

### 3.2 Database Client

| Library | Purpose | Documentation |
|---------|---------|---------------|
| **supabase-py** | Supabase client | [github.com/supabase/supabase-py](https://github.com/supabase-community/supabase-py) |
| **python-dotenv** | Environment variables | [pypi.org/project/python-dotenv](https://pypi.org/project/python-dotenv/) |

### 3.3 Backend File Structure

```
backend/
├── app/
│   ├── main.py             # FastAPI app + routes
│   ├── config.py           # Environment configuration
│   ├── database.py         # Supabase client
│   ├── models/             # Pydantic models
│   │   ├── post.py
│   │   ├── category.py
│   │   ├── tag.py
│   │   └── project.py
│   ├── routes/             # API route modules (to organize)
│   ├── services/           # Repository classes
│   │   ├── post_repository.py
│   │   ├── category_repository.py
│   │   ├── tag_repository.py
│   │   └── project_repository.py
│   ├── middlewares/        # Auth middleware
│   │   └── auth.py
│   └── utils/              # Helper functions
├── tests/                  # Test files
├── requirements.txt        # Python dependencies
└── .env                    # Environment variables (not committed)
```

---

## 4. Database Stack

### 4.1 Supabase

| Service | Purpose | Documentation |
|---------|---------|---------------|
| **PostgreSQL** | Relational database | [supabase.com/docs/guides/database](https://supabase.com/docs/guides/database) |
| **Supabase Auth** | Authentication | [supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth) |
| **Supabase Storage** | File storage | [supabase.com/docs/guides/storage](https://supabase.com/docs/guides/storage) |

### 4.2 Why Supabase?

| Benefit | Description |
|---------|-------------|
| **Free tier** | Generous limits for personal projects |
| **PostgreSQL** | Full SQL power, not NoSQL |
| **Built-in Auth** | JWT authentication ready to use |
| **Storage** | Easy file uploads |
| **Dashboard** | Visual database management |
| **Real-time** | Optional WebSocket features |

---

## 5. DevOps Stack (Phase 4)

### 5.1 Planned Technologies

| Technology | Purpose | Status |
|------------|---------|--------|
| **Docker** | Containerization | Not started |
| **Docker Compose** | Local multi-container | Not started |
| **GitHub Actions** | CI/CD | Not started |
| **Vercel** | Frontend hosting | Planned |
| **Railway/Render** | Backend hosting | Planned |

---

## 6. Development Tools

### 6.1 Required Tools

| Tool | Purpose | Installation |
|------|---------|--------------|
| **Node.js** | JavaScript runtime | [nodejs.org](https://nodejs.org) |
| **Python 3.10+** | Python runtime | [python.org](https://python.org) |
| **Git** | Version control | [git-scm.com](https://git-scm.com) |
| **VS Code** | Code editor | [code.visualstudio.com](https://code.visualstudio.com) |

### 6.2 VS Code Extensions (Recommended)

| Extension | Purpose |
|-----------|---------|
| **ESLint** | JavaScript linting |
| **Prettier** | Code formatting |
| **Python** | Python support |
| **Pylance** | Python IntelliSense |
| **Thunder Client** | API testing |

---

## 7. Environment Setup

### 7.1 Frontend Environment Variables

```env
# frontend/.env
VITE_API_URL=http://localhost:8000/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 7.2 Backend Environment Variables

```env
# backend/.env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
CORS_ORIGINS=http://localhost:5173
ENVIRONMENT=development
```

---

## 8. Quick Reference Commands

### Frontend

```bash
# Install dependencies
cd frontend && npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend

```bash
# Create virtual environment
cd backend && python -m venv .venv

# Activate virtual environment
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn app.main:app --reload --port 8000
```

### Both (using Makefile)

```bash
make dev-frontend    # Start frontend
make dev-backend     # Start backend
make lint            # Run linters
```

---

## 9. Technology Decision Rationale

### Why React?

| Pro | Con |
|-----|-----|
| Industry standard | Learning curve for beginners |
| Huge ecosystem | Many ways to do things |
| Great documentation | Can be verbose |
| Good for portfolio | Requires build step |

### Why FastAPI?

| Pro | Con |
|-----|-----|
| Modern Python | Newer framework |
| Auto API docs | Smaller community than Django |
| Type hints | Async can be confusing |
| Fast performance | |

### Why Supabase over Firebase?

| Factor | Supabase | Firebase |
|--------|----------|----------|
| Database | PostgreSQL (SQL) | Firestore (NoSQL) |
| Pricing | More generous free tier | Can get expensive |
| Learning | SQL skills transferable | Proprietary queries |
| Open Source | Yes | No |

---

## 10. Learning Resources

### React
- [React Official Tutorial](https://react.dev/learn)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

### FastAPI
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [FastAPI Full Stack Template](https://github.com/tiangolo/full-stack-fastapi-template)

### Supabase
- [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)
- [Supabase + Python](https://supabase.com/docs/reference/python/introduction)

### General
- [Full Stack Open](https://fullstackopen.com/en/) (free course)
- [The Odin Project](https://www.theodinproject.com/)

---

*This document explains what technologies are used and why. Refer to official documentation for detailed usage.*
