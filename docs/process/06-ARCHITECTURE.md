# System Architecture

> **Document Type**: Architecture Specification
> **Project**: Coffee's Personal Blog CMS
> **Version**: 1.0
> **Last Updated**: 16/12/2024

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         COFFEE BLOG ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐    │
│  │   Browser    │         │   Browser    │         │   Browser    │    │
│  │  (Visitor)   │         │   (Admin)    │         │  (Mobile)    │    │
│  └──────┬───────┘         └──────┬───────┘         └──────┬───────┘    │
│         │                        │                        │             │
│         └────────────────────────┼────────────────────────┘             │
│                                  │                                       │
│                                  ▼                                       │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                        FRONTEND (React + Vite)                     │  │
│  │  http://localhost:5173                                             │  │
│  │  ┌─────────────────────────────────────────────────────────────┐  │  │
│  │  │  Public Pages          │  Admin Pages          │  Shared    │  │  │
│  │  │  - Home                │  - Login              │  - Header  │  │  │
│  │  │  - PostDetail          │  - Dashboard          │  - Footer  │  │  │
│  │  │  - Category            │  - PostEditor         │  - Theme   │  │  │
│  │  │  - Search              │  - PostList           │            │  │  │
│  │  └─────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────┬───────────────────────────────────┘  │
│                                  │                                       │
│                                  │ REST API (JSON)                       │
│                                  │ Authorization: Bearer <token>         │
│                                  ▼                                       │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                        BACKEND (FastAPI)                           │  │
│  │  http://localhost:8000                                             │  │
│  │  ┌─────────────────────────────────────────────────────────────┐  │  │
│  │  │  Routes (main.py)                                            │  │  │
│  │  │  ├── /api/posts     (CRUD)                                   │  │  │
│  │  │  ├── /api/categories (CRUD)                                  │  │  │
│  │  │  ├── /api/tags      (CRUD)                                   │  │  │
│  │  │  ├── /api/projects  (CRUD)                                   │  │  │
│  │  │  └── /api/auth      (login)                                  │  │  │
│  │  │                                                               │  │  │
│  │  │  Middlewares                                                  │  │  │
│  │  │  └── auth.py (JWT verification)                              │  │  │
│  │  │                                                               │  │  │
│  │  │  Services (Repositories)                                      │  │  │
│  │  │  ├── post_repository.py                                      │  │  │
│  │  │  ├── category_repository.py                                  │  │  │
│  │  │  ├── tag_repository.py                                       │  │  │
│  │  │  └── project_repository.py                                   │  │  │
│  │  └─────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────┬───────────────────────────────────┘  │
│                                  │                                       │
│                                  │ Supabase Client (supabase-py)         │
│                                  ▼                                       │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                        SUPABASE                                    │  │
│  │  https://xxx.supabase.co                                           │  │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐  │  │
│  │  │    PostgreSQL    │  │  Supabase Auth   │  │    Storage      │  │  │
│  │  │                  │  │                  │  │                 │  │  │
│  │  │  - posts         │  │  - Users         │  │  - Images       │  │  │
│  │  │  - categories    │  │  - Sessions      │  │  - Files        │  │  │
│  │  │  - tags          │  │  - JWT tokens    │  │                 │  │  │
│  │  │  - post_tags     │  │                  │  │                 │  │  │
│  │  │  - projects      │  │                  │  │                 │  │  │
│  │  └──────────────────┘  └──────────────────┘  └─────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Request Flow

### 2.1 Public Request (No Auth)

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Browser  │ --> │ Frontend │ --> │ Backend  │ --> │ Supabase │
│          │     │ (React)  │     │ (FastAPI)│     │   (DB)   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘

Example: View blog post

1. User visits /post/my-first-post
2. React Router matches route to PostDetail component
3. PostDetail calls postService.getBySlug('my-first-post')
4. Axios sends GET /api/posts/my-first-post to backend
5. FastAPI route handler receives request
6. post_repository.get_by_slug() queries Supabase
7. Supabase returns post data
8. FastAPI returns JSON response
9. React renders post content
```

### 2.2 Protected Request (With Auth)

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Browser  │ --> │ Frontend │ --> │ Backend  │ --> │ Supabase │
│          │     │ (React)  │     │ (FastAPI)│     │   (DB)   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                      │                 │
                      │                 │ verify token
                      │                 ▼
                      │          ┌──────────┐
                      │          │  Auth    │
                      │          │ Middleware│
                      │          └──────────┘
                      │
                      │ store token
                      ▼
                ┌──────────┐
                │  Auth    │
                │ Context  │
                └──────────┘

Example: Create new post

1. Admin is logged in (token in AuthContext)
2. Admin fills post form and clicks "Save"
3. postService.create(postData) is called
4. Axios sends POST /api/posts with Authorization header
5. FastAPI receives request
6. auth.py middleware verifies JWT token with Supabase
7. If valid, request continues to route handler
8. If invalid, returns 401 Unauthorized
9. post_repository.create() inserts into Supabase
10. Success response returned to frontend
```

---

## 3. Frontend Architecture

### 3.1 Component Hierarchy

```
App.jsx
├── ThemeProvider
│   └── AuthProvider
│       └── BrowserRouter
│           ├── Routes
│           │   ├── / → Home.jsx
│           │   ├── /post/:slug → PostDetail.jsx
│           │   ├── /category/:slug → Category.jsx
│           │   ├── /tag/:slug → Tag.jsx
│           │   ├── /search → Search.jsx
│           │   ├── /portfolio → Portfolio.jsx
│           │   ├── /about → About.jsx
│           │   ├── /admin/login → Login.jsx
│           │   └── /admin/* → ProtectedRoute
│           │       ├── /admin → Dashboard.jsx
│           │       ├── /admin/posts → PostList.jsx
│           │       ├── /admin/posts/new → PostEditor.jsx
│           │       └── /admin/posts/:id/edit → PostEditor.jsx
│           └── Layout
│               ├── Header
│               ├── {children}
│               └── Footer
```

### 3.2 State Management

```
┌─────────────────────────────────────────────────────────────┐
│                    STATE ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Global State (Context API)                                  │
│  ├── ThemeContext                                            │
│  │   ├── isDark: boolean                                     │
│  │   └── toggleTheme: function                               │
│  │                                                           │
│  └── AuthContext                                             │
│      ├── user: object | null                                 │
│      ├── token: string | null                                │
│      ├── isAuthenticated: boolean                            │
│      ├── login: function                                     │
│      └── logout: function                                    │
│                                                              │
│  Local State (useState in components)                        │
│  ├── Loading states                                          │
│  ├── Form data                                               │
│  ├── UI toggles                                              │
│  └── Fetched data                                            │
│                                                              │
│  Server State (fetched from API)                             │
│  ├── Posts list                                              │
│  ├── Single post                                             │
│  ├── Categories                                              │
│  └── Tags                                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Service Layer Pattern

```javascript
// services/postService.js

const API_URL = import.meta.env.VITE_API_URL;

export const postService = {
  // Get all posts
  getAll: async (page = 1, perPage = 10) => {
    const response = await axios.get(`${API_URL}/posts`, {
      params: { page, per_page: perPage }
    });
    return response.data;
  },

  // Get single post
  getBySlug: async (slug) => {
    const response = await axios.get(`${API_URL}/posts/${slug}`);
    return response.data;
  },

  // Create post (requires auth)
  create: async (postData, token) => {
    const response = await axios.post(`${API_URL}/posts`, postData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // ... update, delete
};
```

---

## 4. Backend Architecture

### 4.1 Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND LAYERS                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    ROUTES (main.py)                     │ │
│  │  - Receive HTTP requests                                │ │
│  │  - Validate input (Pydantic)                            │ │
│  │  - Call services                                        │ │
│  │  - Return HTTP responses                                │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  MIDDLEWARES                            │ │
│  │  - Authentication (verify JWT)                          │ │
│  │  - CORS handling                                        │ │
│  │  - Error handling                                       │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              SERVICES (Repositories)                    │ │
│  │  - Business logic                                       │ │
│  │  - Data transformation                                  │ │
│  │  - Database operations via Supabase client              │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                 MODELS (Pydantic)                       │ │
│  │  - Request validation                                   │ │
│  │  - Response serialization                               │ │
│  │  - Data type definitions                                │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │               DATABASE (Supabase Client)                │ │
│  │  - Connection management                                │ │
│  │  - Query execution                                      │ │
│  │  - Auth integration                                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Repository Pattern

```python
# Pattern used in this project

class PostRepository:
    """Repository for Post entity - handles all database operations."""

    TABLE_NAME = "posts"

    def get_all_published(self, page, per_page, category_slug=None):
        """Get published posts with pagination."""
        query = supabase.table(self.TABLE_NAME).select("*")
        query = query.eq("status", "published")
        # ... filtering, pagination
        return query.execute()

    def get_by_slug(self, slug):
        """Get single post by slug."""
        return supabase.table(self.TABLE_NAME).select("*").eq("slug", slug).single().execute()

    def create(self, data: PostCreate):
        """Create new post."""
        return supabase.table(self.TABLE_NAME).insert(data.model_dump()).execute()

    def update(self, post_id, data: PostUpdate):
        """Update existing post."""
        return supabase.table(self.TABLE_NAME).update(data.model_dump()).eq("id", post_id).execute()

    def delete(self, post_id):
        """Delete post."""
        return supabase.table(self.TABLE_NAME).delete().eq("id", post_id).execute()

# Singleton instance
post_repository = PostRepository()
```

---

## 5. Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  AUTHENTICATION FLOW                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  LOGIN FLOW:                                                 │
│  ═══════════                                                 │
│                                                              │
│  1. User enters email/password on Login page                 │
│     │                                                        │
│     ▼                                                        │
│  2. Frontend sends POST /api/auth/login                      │
│     │                                                        │
│     ▼                                                        │
│  3. Backend calls supabase.auth.sign_in_with_password()      │
│     │                                                        │
│     ▼                                                        │
│  4. Supabase verifies credentials, returns JWT               │
│     │                                                        │
│     ▼                                                        │
│  5. Backend returns { access_token, user } to frontend       │
│     │                                                        │
│     ▼                                                        │
│  6. Frontend stores token in AuthContext                     │
│     │                                                        │
│     ▼                                                        │
│  7. User redirected to /admin/dashboard                      │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│  PROTECTED REQUEST FLOW:                                     │
│  ═══════════════════════                                     │
│                                                              │
│  1. User tries to create post                                │
│     │                                                        │
│     ▼                                                        │
│  2. Frontend includes Authorization: Bearer <token>          │
│     │                                                        │
│     ▼                                                        │
│  3. Backend middleware extracts token                        │
│     │                                                        │
│     ▼                                                        │
│  4. Middleware calls supabase.auth.get_user(token)           │
│     │                                                        │
│     ├── Valid token → Continue to route handler              │
│     │                                                        │
│     └── Invalid token → Return 401 Unauthorized              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Data Flow Examples

### 6.1 Creating a Post

```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│  User   │  │ Editor  │  │ Service │  │ Backend │  │Supabase │
│         │  │  Page   │  │  Layer  │  │         │  │         │
└────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘
     │            │            │            │            │
     │ Fill form  │            │            │            │
     │ ─────────> │            │            │            │
     │            │            │            │            │
     │ Click save │            │            │            │
     │ ─────────> │            │            │            │
     │            │            │            │            │
     │            │ postService│            │            │
     │            │ .create()  │            │            │
     │            │ ─────────> │            │            │
     │            │            │            │            │
     │            │            │ POST /api/ │            │
     │            │            │   posts    │            │
     │            │            │ ─────────> │            │
     │            │            │            │            │
     │            │            │            │ INSERT     │
     │            │            │            │ ─────────> │
     │            │            │            │            │
     │            │            │            │ <───────── │
     │            │            │            │   OK       │
     │            │            │            │            │
     │            │            │ <───────── │            │
     │            │            │   201      │            │
     │            │            │            │            │
     │            │ <───────── │            │            │
     │            │  Post obj  │            │            │
     │            │            │            │            │
     │ <───────── │            │            │            │
     │  Redirect  │            │            │            │
     │  to list   │            │            │            │
```

---

## 7. Folder Structure Summary

```
coffee_blog_pixel/
│
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # API calls
│   │   ├── contexts/            # React contexts
│   │   ├── styles/              # CSS files
│   │   └── utils/               # Helpers
│   └── ...
│
├── backend/                     # FastAPI application
│   ├── app/
│   │   ├── main.py              # Entry point + routes
│   │   ├── config.py            # Configuration
│   │   ├── database.py          # Supabase client
│   │   ├── models/              # Pydantic schemas
│   │   ├── services/            # Repositories
│   │   ├── middlewares/         # Auth, etc.
│   │   └── utils/               # Helpers
│   └── ...
│
├── docs/                        # Documentation
│   ├── process/                 # This folder
│   ├── design/                  # Design system
│   └── architecture/            # Technical docs
│
└── .claude/                     # Claude AI config
    └── skills/                  # AI skills
```

---

## 8. Security Considerations

| Area | Implementation |
|------|----------------|
| **Authentication** | JWT via Supabase Auth |
| **Authorization** | Middleware checks on protected routes |
| **Data Validation** | Pydantic models validate all input |
| **CORS** | Configured to allow only frontend origin |
| **SQL Injection** | Supabase client uses parameterized queries |
| **XSS** | React auto-escapes, markdown sanitized |

---

## 9. Scalability Notes

### Current Design (MVP)
- Single server deployment
- Supabase handles database scaling
- Suitable for personal blog traffic

### Future Considerations (Phase 4+)
- CDN for static assets
- Image optimization
- Caching layer (Redis)
- Load balancing (if needed)

---

*This document explains how the system is structured. For implementation details, see the code and other docs.*
