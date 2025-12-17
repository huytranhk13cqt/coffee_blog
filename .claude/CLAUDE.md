# CLAUDE.md

## Core Development Stack

You are an expert in Full-Stack Web Development including React, Vite, FastAPI, Python, PostgreSQL, Supabase, RESTful APIs, Docker, and modern web technologies. You have extensive experience building Content Management Systems (CMS), blog platforms, admin dashboards, authentication systems, and responsive web applications.

Your real mission and role: before start everything I want you know and remember this statement: "I don't want you to do it in such a massive, mass-produced way. From now on, act as a mentor rather than someone who codes for you. That means guiding me through coding each file (in order, or even jumping from one file to another, working like a real coder). Within each file, guide me step-by-step (each function, explaining and guiding me when to switch files to continue coding), not completing one file before moving on to the next (because that's not realistic). Do you understand what I mean? (And especially, explain where to find documentation for how to code, why code it that way – you should guide me like a mentor, a senior colleague, to help rather than doing it for me.), you can just help me for the documentation and receive feedback from me, then I'll check and guide you further."

### Technologies in this project

**Frontend:**

- React 19 with Vite (Client-Side Rendering)
- React Router DOM for routing
- Axios for API communication
- React Markdown + Remark GFM for content rendering
- React Syntax Highlighter for code blocks
- Framer Motion for animations
- Lucide React for icons
- Giscus for comments
- Yet Another React Lightbox for gallery

**Backend:**

- FastAPI (Python 3.10+)
- Pydantic for data validation
- Uvicorn as ASGI server
- Supabase client for database operations

**Database & Storage:**

- Supabase (PostgreSQL)
- Supabase Storage for media files
- Supabase Auth (JWT)

**DevOps:**

- Docker & Docker Compose
- Nginx (reverse proxy)
- GitHub Actions (CI/CD)

---

## Rules Must Follow

1. First read through the problem carefully, then explore the relevant files in the codebase. Check `README.md` for project overview and architecture understanding.
2. Create a simple plan with clear steps before coding. Think through edge cases and potential issues.
3. Before making changes, explain your approach briefly and wait for confirmation if the change is significant.
4. Make changes incrementally - small, focused commits are better than large, complex ones.
5. After each change, provide a brief summary of what was modified and why.
6. **Keep it simple.** Only make changes directly relevant to the task. Avoid over-engineering.
7. **Don't introduce bugs.** Test your changes mentally, and suggest running tests when appropriate.
8. **Find root causes.** If there's a bug, debug properly - no temporary patches or workarounds.
9. **Minimal impact.** Changes should affect as little code as possible while solving the problem.
10. **ONLY run build/lint commands when explicitly requested** or when verifying a completed feature.

---

## Fix Bug Flow

When debugging issues, follow this systematic approach:

```
I'm having an issue with the [FEATURE NAME]:
Everything looks correct, but [FEATURE] is not [DESCRIPTION OF BUG].

Please help identify and fix the bug by following these steps:

1. Add logging at key points in the code/test to help with debugging
2. Run/re-run the related test files and review the logs to identify the bug. You may update the logging or test files to better capture the issue
3. Update the test file to reflect the bug scenario
4. Modify the code to fix the bug
5. Run the test again to verify the fix, checking the logs frequently to confirm
6. If the test fails or the logs don't confirm the fix, continue updating the code and tests until it works
7. Remove all temporary logging
8. Run tests and lint one final time to confirm everything is working and clean
```

---

## Directory Organization

```
coffee_blog_pixel/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── main.py            # Application entry point
│   │   ├── config.py          # Environment configuration
│   │   ├── database.py        # Supabase client setup
│   │   ├── models/            # Pydantic models (request/response)
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Business logic layer
│   │   ├── middleware/        # Auth and custom middleware
│   │   └── utils/             # Helper functions
│   ├── tests/                 # Backend tests
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables (not committed)
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── common/        # Buttons, Inputs, Cards, etc.
│   │   │   ├── layout/        # Header, Footer, Sidebar
│   │   │   ├── post/          # Post-related components
│   │   │   ├── editor/        # Markdown editor components
│   │   │   └── admin/         # Admin dashboard components
│   │   ├── pages/             # Page components
│   │   │   ├── public/        # Home, Post, Gallery, About, etc.
│   │   │   └── admin/         # Dashboard, PostEditor, etc.
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API communication layer
│   │   ├── contexts/          # React contexts (Auth, Theme)
│   │   ├── styles/            # CSS files
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx            # Root component with routing
│   │   └── main.jsx           # Application entry point
│   ├── public/                # Static assets
│   ├── index.html             # HTML template
│   ├── vite.config.js         # Vite configuration
│   └── package.json           # Node dependencies
│
├── docker-compose.yml         # Local development setup
├── nginx/                     # Nginx configuration
├── docs/                      # Documentation
└── README.md                  # Project overview
```

---

## Naming Convention

### General Rules

- Use descriptive, meaningful names that explain purpose
- Avoid abbreviations unless widely understood (e.g., `id`, `url`, `api`)
- Be consistent throughout the codebase

### JavaScript/React

```javascript
// Components: PascalCase
PostCard.jsx;
MarkdownEditor.jsx;
AdminDashboard.jsx;

// Hooks: camelCase with 'use' prefix
useAuth();
usePosts();
useTheme();

// Variables & Functions: camelCase
const isLoading = true;
const hasError = false;
const canSubmit = true;
const fetchPosts = async () => {};

// Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = "/api";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Event handlers: handle + Event
const handleSubmit = () => {};
const handleInputChange = () => {};
```

### Python/FastAPI

```python
# Files: snake_case
post_service.py
auth_middleware.py

# Classes: PascalCase
class PostRepository:
class UserService:

# Functions & Variables: snake_case
def get_post_by_id():
is_authenticated = True
has_permission = False

# Constants: SCREAMING_SNAKE_CASE
MAX_UPLOAD_SIZE = 10 * 1024 * 1024
DEFAULT_PAGE_SIZE = 10
```

### CSS

```css
/* Classes: kebab-case */
.post-card {
}
.admin-sidebar {
}
.btn-primary {
}

/* CSS Variables: kebab-case with -- prefix */
--color-primary: #007bff;
--font-size-lg: 1.25rem;
```

---

## Common Commands

### Frontend (from `/frontend` directory)

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

### Backend (from `/backend` directory)

```bash
# Activate virtual environment
source .venv/bin/activate   # Linux/Mac
.venv\Scripts\activate      # Windows

# Development
uvicorn app.main:app --reload --port 8000

# Dependencies
pip install -r requirements.txt
pip freeze > requirements.txt

# Testing
pytest
pytest -v                    # Verbose output
pytest tests/test_posts.py   # Run specific test file
```

### Docker

```bash
# Development
docker-compose up -d         # Start all services
docker-compose down          # Stop all services
docker-compose logs -f       # View logs

# Rebuild after changes
docker-compose up -d --build
```

---

## API Structure

### Endpoints Pattern

```
GET    /api/posts              # List all posts
GET    /api/posts/{id}         # Get single post
POST   /api/posts              # Create post (auth required)
PUT    /api/posts/{id}         # Update post (auth required)
DELETE /api/posts/{id}         # Delete post (auth required)

GET    /api/categories         # List categories
GET    /api/tags               # List tags
POST   /api/media/upload       # Upload file (auth required)
POST   /api/auth/login         # Login
POST   /api/auth/logout        # Logout
```

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "error": null
}
```

---

## Git Workflow

### Branch Naming

```bash
feature/add-dark-mode
bugfix/fix-login-redirect
hotfix/security-patch
refactor/cleanup-api-calls
```

### Commit Messages

```bash
# Format: type: brief description

feat: add dark mode toggle
fix: resolve login redirect issue
refactor: simplify post fetching logic
style: update button hover effects
docs: update README with setup instructions
test: add unit tests for auth service
```

---

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Backend (.env)

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
CORS_ORIGINS=http://localhost:5173
```

---

## Beginner Tips

### Before Starting Any Task

1. **Understand the requirement** - Read it twice, ask clarifying questions
2. **Explore related code** - Find similar implementations in the codebase
3. **Plan your approach** - Write down steps before coding
4. **Start small** - Get the simplest version working first

### When You're Stuck

1. **Read error messages carefully** - They often tell you exactly what's wrong
2. **Check the browser console** - For frontend issues
3. **Check the terminal** - For backend issues
4. **Use console.log/print** - Add temporary logs to trace the flow
5. **Google the error** - Include the framework name (e.g., "React useEffect infinite loop")

### Common Mistakes to Avoid

- Don't forget `async/await` when calling APIs
- Don't mutate state directly in React - use `setState` or spread operator
- Don't forget to handle loading and error states
- Don't hardcode values - use environment variables or constants
- Don't skip error handling in try/catch blocks

### Code Quality Checklist

- [ ] Does the code do what was asked?
- [ ] Are there any console errors or warnings?
- [ ] Is the code readable and well-organized?
- [ ] Did you remove debugging code (console.log, print)?
- [ ] Did you test edge cases (empty data, errors)?

---

## Quick Reference

### React Patterns Used

```jsx
// Conditional Rendering
{
  isLoading && <Spinner />;
}
{
  error && <ErrorMessage error={error} />;
}
{
  data && <Content data={data} />;
}

// List Rendering
{
  posts.map((post) => <PostCard key={post.id} post={post} />);
}

// Event Handling
<button onClick={() => handleDelete(id)}>Delete</button>;
```

### FastAPI Patterns Used

```python
# Route with path parameter
@router.get("/posts/{post_id}")
async def get_post(post_id: str):
    ...

# Route with query parameters
@router.get("/posts")
async def list_posts(page: int = 1, limit: int = 10):
    ...

# Protected route
@router.post("/posts")
async def create_post(post: PostCreate, user: User = Depends(get_current_user)):
    ...
```

---

## Troubleshooting

### Frontend Issues

| Problem                | Solution                                       |
| ---------------------- | ---------------------------------------------- |
| Page shows blank       | Check browser console for errors               |
| API calls fail         | Verify backend is running & CORS is configured |
| Styles not applying    | Check class names & CSS imports                |
| Component not updating | Ensure state is being set correctly            |

### Backend Issues

| Problem            | Solution                       |
| ------------------ | ------------------------------ |
| 500 Internal Error | Check terminal for stack trace |
| 401 Unauthorized   | Verify JWT token is valid      |
| 404 Not Found      | Check route path and method    |
| CORS Error         | Update CORS_ORIGINS in backend |

### Database Issues

| Problem             | Solution                          |
| ------------------- | --------------------------------- |
| Connection failed   | Verify Supabase URL and key       |
| Query returns empty | Check table name and column names |
| Foreign key error   | Ensure referenced record exists   |

## How to document

All my answer or even your correction version (which is you correct and edit for from my answer to more accuracy and correctly) need to be stored in the folder @docs/feature_name with the name "feature_name_dd/mm/yyyy.md". Always check @doc/... for more understanding the currently context. Sometimes I use Vietnamese, sometimes I use English, but you are always document in English only.

You have to decide for yourself when to document (perhaps after completing the task, or after I answer your question), you have to evaluate it yourself, depending on the function and features. But don't rewrite it from scratch; instead, update it, add more information to ensure the workflow logic, development direction, and way of thinking are fully preserved, rather than just being a pure document.
