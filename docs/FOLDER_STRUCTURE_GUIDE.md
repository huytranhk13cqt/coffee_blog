# Folder Structure Guide

> Understanding where to put your code and why.

---

## The Big Picture

```
coffee_blog_pixel/
│
├── backend/          ← SERVER (Python/FastAPI)
│   └── app/            Handles: Database, API, Business Logic
│
├── frontend/         ← CLIENT (React/Vite)
│   └── src/            Handles: UI, User Interactions, Display
│
└── .claude/          ← CONFIGURATION
                        Handles: Development tools, guides
```

### Simple Analogy: Restaurant

| Folder | Restaurant Equivalent | What It Does |
|--------|----------------------|--------------|
| **backend/** | Kitchen | Prepares data, stores recipes (database), follows rules |
| **frontend/** | Dining Room | Shows menu to customers, takes orders, displays food |
| **database** | Pantry/Storage | Stores all ingredients (data) |

---

## Backend Structure (The Kitchen)

```
backend/
├── app/
│   ├── main.py              ← ENTRY POINT (The head chef)
│   ├── config.py            ← SETTINGS (Kitchen rules)
│   ├── database.py          ← DATABASE CONNECTION (Pantry key)
│   │
│   ├── models/              ← DATA SHAPES (Recipe cards)
│   │   ├── post.py
│   │   ├── category.py
│   │   └── tag.py
│   │
│   ├── routes/              ← API ENDPOINTS (Order tickets)
│   │   ├── auth.py
│   │   ├── posts.py
│   │   └── categories.py
│   │
│   ├── services/            ← BUSINESS LOGIC (Cooking instructions)
│   │   ├── post_repository.py
│   │   └── category_repository.py
│   │
│   ├── middleware/          ← REQUEST FILTERS (Security check)
│   │   └── auth.py
│   │
│   └── utils/               ← HELPER FUNCTIONS (Kitchen tools)
│       ├── slug.py
│       └── reading_time.py
│
├── tests/                   ← TESTS (Quality control)
├── pyproject.toml           ← DEPENDENCIES (Shopping list)
└── .env                     ← SECRETS (Safe combination)
```

### Backend Folders Explained

#### `main.py` - The Entry Point
```
What: The starting point of your backend application
Why: FastAPI needs ONE file to start from
Put here: App creation, CORS settings, router imports

Example:
  app = FastAPI()
  app.include_router(posts.router)
```

#### `config.py` - Settings
```
What: Environment variables and configuration
Why: Keep secrets separate, easy to change between dev/prod
Put here: Database URLs, API keys, feature flags

Example:
  SUPABASE_URL = os.getenv("SUPABASE_URL")
  DEBUG_MODE = os.getenv("DEBUG", False)
```

#### `database.py` - Database Connection
```
What: Code that connects to your database (Supabase)
Why: One place to manage database connection
Put here: Supabase client initialization, connection helpers

Example:
  supabase = create_client(url, key)
  def get_db(): return supabase
```

#### `models/` - Data Shapes (Pydantic)
```
What: Defines the STRUCTURE of your data
Why: Validates data, provides auto-documentation
Put here: Request/Response schemas, data validation rules

Example in models/post.py:
  class PostCreate(BaseModel):
      title: str
      content: str

  class PostResponse(BaseModel):
      id: str
      title: str
      created_at: datetime
```

**Key Insight:** Models are NOT database tables. They define:
- What data the API **accepts** (Create/Update models)
- What data the API **returns** (Response models)

#### `routes/` - API Endpoints
```
What: Defines URL paths and HTTP methods
Why: Organizes API by resource (posts, users, etc.)
Put here: @router.get(), @router.post() decorators

Example in routes/posts.py:
  @router.get("/posts")
  async def list_posts():
      ...

  @router.post("/posts")
  async def create_post():
      ...
```

**Naming Convention:**
- `posts.py` → handles `/api/posts/*`
- `auth.py` → handles `/api/auth/*`
- `categories.py` → handles `/api/categories/*`

#### `services/` - Business Logic
```
What: The actual work - database queries, calculations
Why: Keeps routes clean, reusable logic
Put here: Database operations, complex business rules

Example in services/post_repository.py:
  class PostRepository:
      def get_all(self, page, limit):
          # Database query here

      def create(self, data):
          # Insert into database
```

**Why separate from routes?**
- Routes: "What URL triggers what?"
- Services: "How do we actually do it?"

#### `middleware/` - Request Filters
```
What: Code that runs BEFORE your route handlers
Why: Authentication, logging, rate limiting
Put here: Auth verification, request logging

Example in middleware/auth.py:
  async def verify_token(token: str):
      # Check if user is logged in
      # Runs before protected routes
```

#### `utils/` - Helper Functions
```
What: Small, reusable utility functions
Why: Avoid repeating code
Put here: String formatting, date helpers, validators

Example in utils/slug.py:
  def generate_slug(title: str) -> str:
      return title.lower().replace(" ", "-")
```

---

## Frontend Structure (The Dining Room)

```
frontend/
├── src/
│   ├── main.jsx             ← ENTRY POINT (Front door)
│   ├── App.jsx              ← ROOT COMPONENT (Floor plan)
│   │
│   ├── components/          ← REUSABLE UI PIECES (Furniture)
│   │   ├── common/            Buttons, inputs, cards
│   │   ├── layout/            Header, footer, sidebar
│   │   ├── post/              Post-specific components
│   │   └── admin/             Admin-specific components
│   │
│   ├── pages/               ← FULL PAGES (Rooms)
│   │   ├── public/            Pages anyone can see
│   │   └── admin/             Pages only admin sees
│   │
│   ├── hooks/               ← CUSTOM REACT HOOKS (Behaviors)
│   │   ├── useAuth.js
│   │   └── useDebounce.js
│   │
│   ├── services/            ← API CALLS (Phone to kitchen)
│   │   ├── api.js
│   │   └── postService.js
│   │
│   ├── contexts/            ← GLOBAL STATE (Intercom system)
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── styles/              ← CSS FILES (Decorations)
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   └── utils/               ← HELPER FUNCTIONS (Tools)
│       └── formatDate.js
│
├── public/                  ← STATIC FILES (Permanent fixtures)
│   └── images/
│
├── index.html               ← HTML TEMPLATE
├── package.json             ← DEPENDENCIES
└── .env                     ← ENVIRONMENT VARIABLES
```

### Frontend Folders Explained

#### `main.jsx` - Entry Point
```
What: The very first JavaScript that runs
Why: React needs a starting point to render
Put here: ReactDOM.render(), global providers

Example:
  createRoot(document.getElementById('root')).render(
    <App />
  )
```

#### `App.jsx` - Root Component
```
What: The main component that holds everything
Why: Central place for routing and layout
Put here: Routes, global layout, providers

Example:
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    )
  }
```

#### `components/` - Reusable UI Pieces
```
What: Small, reusable UI elements
Why: Don't repeat yourself (DRY)
Put here: Anything used in multiple places

Structure:
  components/
  ├── common/      → Used everywhere (Button, Input, Card, Modal)
  ├── layout/      → Page structure (Header, Footer, Sidebar)
  ├── post/        → Post-related (PostCard, PostList, Comments)
  ├── editor/      → Editor-related (MarkdownEditor, Toolbar)
  └── admin/       → Admin-only (StatsCard, AdminNav)
```

**When to create a component:**
- Used in 2+ places? → Make it a component
- Complex piece of UI? → Make it a component
- Has its own logic? → Make it a component

#### `pages/` - Full Pages
```
What: Complete pages (one per URL route)
Why: Separates page-level logic from components
Put here: What you see at a specific URL

Structure:
  pages/
  ├── public/      → Anyone can access
  │   ├── Home.jsx           → /
  │   ├── PostDetail.jsx     → /posts/:slug
  │   ├── Search.jsx         → /search
  │   └── About.jsx          → /about
  │
  └── admin/       → Only logged-in admin
      ├── Dashboard.jsx      → /admin
      ├── PostEditor.jsx     → /admin/posts/new
      └── PostList.jsx       → /admin/posts
```

**Page vs Component:**
- **Page**: Has a URL, fetches its own data
- **Component**: No URL, receives data via props

#### `hooks/` - Custom React Hooks
```
What: Reusable stateful logic
Why: Share behavior between components
Put here: Any logic with useState/useEffect that's reused

Example in hooks/useDebounce.js:
  function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
      const timer = setTimeout(() => setDebounced(value), delay)
      return () => clearTimeout(timer)
    }, [value, delay])
    return debounced
  }

Usage:
  const debouncedSearch = useDebounce(searchTerm, 300)
```

**Common hooks you might create:**
- `useAuth()` - Get current user, login/logout
- `usePosts()` - Fetch and manage posts
- `useLocalStorage()` - Persist data locally

#### `services/` - API Communication
```
What: Functions that call your backend API
Why: Centralize all API calls in one place
Put here: fetch/axios calls, API error handling

Structure:
  services/
  ├── api.js           → Base configuration, error handling
  ├── postService.js   → Post-related API calls
  ├── authService.js   → Login, logout, register
  └── categoryService.js → Category API calls
```

**Example in services/postService.js:**
```javascript
import api from './api'

export const postService = {
  getAll: (page = 1) => api.get(`/api/posts?page=${page}`),
  getBySlug: (slug) => api.get(`/api/posts/${slug}`),
  create: (data) => api.post('/api/posts', data),
  update: (id, data) => api.put(`/api/posts/${id}`, data),
  delete: (id) => api.delete(`/api/posts/${id}`),
}
```

#### `contexts/` - Global State
```
What: State shared across many components
Why: Avoid "prop drilling" (passing props through many layers)
Put here: Auth state, theme, shopping cart, etc.

Example in contexts/AuthContext.jsx:
  const AuthContext = createContext()

  export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    )
  }
```

**When to use Context:**
- Data needed by many components
- Data that changes infrequently
- User authentication, theme, language

#### `styles/` - CSS Files
```
What: Styling for your application
Why: Keep styles organized
Put here: Global styles, CSS variables, component styles

Structure:
  styles/
  ├── globals.css      → Reset, base styles
  ├── variables.css    → CSS custom properties (colors, spacing)
  └── components/      → Component-specific styles (optional)
```

#### `utils/` - Helper Functions
```
What: Pure utility functions (no React)
Why: Reusable logic that doesn't involve UI
Put here: Date formatting, string manipulation, validators

Example in utils/formatDate.js:
  export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
```

---

## Decision Flowchart: "Where Should This Code Go?"

### Backend Decision Tree

```
START: I need to write backend code...
│
├─→ Is it about connecting to the database?
│   YES → database.py
│
├─→ Is it defining data structure/validation?
│   YES → models/<resource>.py
│
├─→ Is it a URL endpoint (@router.get, @router.post)?
│   YES → routes/<resource>.py
│
├─→ Is it database queries or business logic?
│   YES → services/<resource>_repository.py
│
├─→ Is it checking auth/permissions before routes?
│   YES → middleware/auth.py
│
├─→ Is it a small helper function?
│   YES → utils/<descriptive_name>.py
│
└─→ Is it configuration/settings?
    YES → config.py
```

### Frontend Decision Tree

```
START: I need to write frontend code...
│
├─→ Is it a full page with its own URL?
│   YES → pages/public/ or pages/admin/
│
├─→ Is it a reusable UI piece?
│   YES → components/<category>/
│   │
│   ├─→ Used everywhere? → components/common/
│   ├─→ Part of layout? → components/layout/
│   ├─→ Related to posts? → components/post/
│   └─→ Admin only? → components/admin/
│
├─→ Is it calling the backend API?
│   YES → services/<resource>Service.js
│
├─→ Is it reusable stateful logic (hooks)?
│   YES → hooks/use<Name>.js
│
├─→ Is it global state (auth, theme)?
│   YES → contexts/<Name>Context.jsx
│
├─→ Is it styling?
│   YES → styles/ or ComponentName.css
│
└─→ Is it a pure helper function?
    YES → utils/<name>.js
```

---

## Quick Reference Table

### Backend Files

| Folder | Contains | Example |
|--------|----------|---------|
| `main.py` | App setup, router imports | `app = FastAPI()` |
| `config.py` | Environment variables | `SUPABASE_URL = ...` |
| `database.py` | DB connection | `supabase = create_client()` |
| `models/` | Pydantic schemas | `class PostCreate(BaseModel)` |
| `routes/` | API endpoints | `@router.get("/posts")` |
| `services/` | Business logic | `def get_all_posts()` |
| `middleware/` | Request filters | `def verify_token()` |
| `utils/` | Helpers | `def generate_slug()` |

### Frontend Files

| Folder | Contains | Example |
|--------|----------|---------|
| `main.jsx` | React entry | `createRoot().render()` |
| `App.jsx` | Routes, layout | `<Routes>...</Routes>` |
| `pages/` | Full pages | `Home.jsx`, `PostDetail.jsx` |
| `components/` | UI pieces | `PostCard.jsx`, `Button.jsx` |
| `hooks/` | Custom hooks | `useAuth()`, `useDebounce()` |
| `services/` | API calls | `postService.getAll()` |
| `contexts/` | Global state | `AuthContext`, `ThemeContext` |
| `styles/` | CSS | `globals.css`, `variables.css` |
| `utils/` | Helpers | `formatDate()`, `slugify()` |

---

## Common Mistakes to Avoid

### ❌ Putting API calls in components
```jsx
// BAD - API call directly in component
function PostList() {
  useEffect(() => {
    fetch('/api/posts')  // ❌ Don't do this
      .then(res => res.json())
  }, [])
}

// GOOD - Use service layer
function PostList() {
  useEffect(() => {
    postService.getAll()  // ✅ Centralized
      .then(data => setPosts(data))
  }, [])
}
```

### ❌ Mixing business logic in routes
```python
# BAD - Database query in route
@router.get("/posts")
async def list_posts():
    result = supabase.table("posts").select("*").execute()  # ❌
    return result.data

# GOOD - Use service/repository
@router.get("/posts")
async def list_posts():
    return await post_repository.get_all()  # ✅
```

### ❌ Creating components that are too big
```jsx
// BAD - One giant component doing everything
function Dashboard() {
  // 500 lines of code... ❌
}

// GOOD - Split into smaller components
function Dashboard() {
  return (
    <div>
      <StatsCards />      {/* Separate component */}
      <RecentPosts />     {/* Separate component */}
      <QuickActions />    {/* Separate component */}
    </div>
  )
}
```

---

## Summary

### The Data Flow

```
User clicks button
       ↓
    Frontend
       ↓
   [Component]  →  calls  →  [Service]  →  calls  →  Backend API
       ↓                                                   ↓
   Updates UI                                         [Route]
       ↑                                                   ↓
   Receives                                          [Service]
       ↑                                                   ↓
   [Service]  ←  returns  ←  Backend API  ←  returns  ←  [Database]
```

### Remember

1. **Backend** = Handles data (storage, validation, business rules)
2. **Frontend** = Handles UI (display, user interactions)
3. **Each folder has ONE purpose** - don't mix responsibilities
4. **When in doubt** - use the decision flowchart above
