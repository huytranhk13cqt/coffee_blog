# Feature List

> **Document Type**: Feature Specification
> **Project**: Coffee's Personal Blog CMS
> **Version**: 1.0
> **Last Updated**: 16/12/2024

---

## 1. Feature Overview by Phase

```
┌─────────────────────────────────────────────────────────────────┐
│                    FEATURE ROADMAP                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MVP ════════════════════════════════════════════════════════  │
│  │                                                              │
│  ├─ Public Site                                                 │
│  │   ├─ Homepage ✅                                             │
│  │   ├─ Post Detail ✅                                          │
│  │   ├─ Categories ✅                                           │
│  │   ├─ Tags ✅                                                 │
│  │   ├─ Search ✅                                               │
│  │   ├─ Portfolio ✅                                            │
│  │   └─ Dark Mode ✅                                            │
│  │                                                              │
│  └─ Admin System                                                │
│      ├─ Login ❌                                                │
│      ├─ Dashboard ❌                                            │
│      ├─ Post Editor ❌                                          │
│      ├─ Category Manager ❌                                     │
│      └─ Tag Manager ❌                                          │
│                                                                 │
│  Phase 2 ═══════════════════════════════════════════════════   │
│  │                                                              │
│  ├─ Design Polish                                               │
│  │   ├─ Pixel Art Sprites                                       │
│  │   ├─ Animations                                              │
│  │   └─ Loading States                                          │
│  │                                                              │
│  └─ Enhanced Editor                                             │
│      ├─ Image Upload                                            │
│      ├─ Live Preview                                            │
│      └─ Auto-save                                               │
│                                                                 │
│  Phase 3+ ══════════════════════════════════════════════════   │
│      ├─ Analytics                                               │
│      ├─ SEO Optimization                                        │
│      ├─ RSS Feed                                                │
│      └─ Performance                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. MVP Features - Detailed

### 2.1 Public Site Features (✅ DONE)

#### F-PUB-01: Homepage
```
Feature: Homepage
Status: ✅ Complete
Location: frontend/src/pages/public/Home.jsx

User Story:
  As a visitor, I want to see recent posts on the homepage.

Functionality:
  - Display list of published posts
  - Show title, excerpt, date, category for each post
  - Pagination (10 posts per page)
  - Click to view full post

API Used:
  GET /api/posts?page=1&per_page=10
```

#### F-PUB-02: Post Detail
```
Feature: Post Detail Page
Status: ✅ Complete
Location: frontend/src/pages/public/PostDetail.jsx

User Story:
  As a visitor, I want to read the full content of a post.

Functionality:
  - Display full post content (Markdown rendered)
  - Show post metadata (date, category, tags)
  - Table of Contents (auto-generated)
  - Code syntax highlighting
  - Comments (via Giscus)

API Used:
  GET /api/posts/{slug}
  GET /api/posts/{slug}/tags
```

#### F-PUB-03: Category Pages
```
Feature: Category Filtering
Status: ✅ Complete
Location: frontend/src/pages/public/Category.jsx

User Story:
  As a visitor, I want to browse posts by category.

Functionality:
  - List all categories
  - View posts in a specific category
  - Category name and description

API Used:
  GET /api/categories
  GET /api/posts?category={slug}
```

#### F-PUB-04: Tag Pages
```
Feature: Tag Filtering
Status: ✅ Complete
Location: frontend/src/pages/public/Tag.jsx

User Story:
  As a visitor, I want to browse posts by tag.

Functionality:
  - View all tags
  - View posts with a specific tag
  - Tag cloud display

API Used:
  GET /api/tags
  GET /api/tags/{slug}/posts
```

#### F-PUB-05: Search
```
Feature: Search
Status: ✅ Complete
Location: frontend/src/pages/public/Search.jsx

User Story:
  As a visitor, I want to search for posts.

Functionality:
  - Search input with debounce
  - Search in title, excerpt, content
  - Display matching results

API Used:
  GET /api/posts/search?q={query}
```

#### F-PUB-06: Portfolio
```
Feature: Portfolio Page
Status: ✅ Complete
Location: frontend/src/pages/public/Portfolio.jsx

User Story:
  As a visitor, I want to see the owner's projects.

Functionality:
  - Display project cards
  - Show tech stack, links
  - Sorted by sort_order

API Used:
  GET /api/projects
```

#### F-PUB-07: Dark Mode
```
Feature: Theme Toggle
Status: ✅ Complete
Location: frontend/src/contexts/ThemeContext.jsx

User Story:
  As a visitor, I want to switch between light and dark mode.

Functionality:
  - Toggle button in header
  - Persist preference in localStorage
  - Smooth transition animation
```

---

### 2.2 Admin Features (❌ NOT DONE - MVP Priority)

#### F-ADM-01: Login
```
Feature: Admin Login
Status: ❌ Not Implemented
Location: frontend/src/pages/admin/Login.jsx (to create)

User Story:
  As an admin, I want to login securely.

Functionality:
  - Email/password form
  - Submit to Supabase Auth
  - Store token in context
  - Redirect to dashboard

API Needed:
  POST /api/auth/login
  - Input: { email, password }
  - Output: { access_token, user }

Components Needed:
  - Login.jsx (page)
  - AuthContext.jsx (context)
  - authService.js (API calls)
  - ProtectedRoute.jsx (route guard)
```

#### F-ADM-02: Dashboard
```
Feature: Admin Dashboard
Status: ❌ Not Implemented
Location: frontend/src/pages/admin/Dashboard.jsx (to create)

User Story:
  As an admin, I want to see an overview of my blog.

Functionality:
  - Total posts count
  - Published vs Draft count
  - Recent posts list (quick edit links)
  - Quick actions (new post button)

Components Needed:
  - Dashboard.jsx (page)
  - AdminLayout.jsx (wrapper)
  - StatsCard.jsx (reusable)
  - RecentPostsList.jsx (component)
```

#### F-ADM-03: Post Editor
```
Feature: Post Editor (Create/Edit)
Status: ❌ Not Implemented
Location: frontend/src/pages/admin/PostEditor.jsx (to create)

User Story:
  As an admin, I want to create and edit posts.

Functionality:
  - Title input
  - Slug input (auto-generate from title)
  - Markdown content editor
  - Category dropdown
  - Tags multi-select
  - Status toggle (draft/published)
  - Save button
  - Preview button (optional for MVP)

Components Needed:
  - PostEditor.jsx (page)
  - MarkdownEditor.jsx (component)
  - CategorySelect.jsx (component)
  - TagSelect.jsx (component)

API Used:
  POST /api/posts (create)
  PUT /api/posts/{id} (update)
  GET /api/posts/{slug} (load for edit)
  GET /api/categories (dropdown options)
  GET /api/tags (dropdown options)
```

#### F-ADM-04: Post List (Admin)
```
Feature: Admin Post List
Status: ❌ Not Implemented
Location: frontend/src/pages/admin/PostList.jsx (to create)

User Story:
  As an admin, I want to see all my posts and manage them.

Functionality:
  - Table of all posts (including drafts)
  - Show status (draft/published)
  - Edit button → PostEditor
  - Delete button (with confirmation)
  - Filter by status

Components Needed:
  - PostList.jsx (page)
  - PostTable.jsx (component)
  - ConfirmDialog.jsx (component)

API Used:
  GET /api/posts (all, not just published)
  DELETE /api/posts/{id}
```

#### F-ADM-05: Category Manager
```
Feature: Category Manager
Status: ⚠️ Backend done, Frontend not done
Location: frontend/src/pages/admin/Categories.jsx (to create)

User Story:
  As an admin, I want to manage categories.

Functionality:
  - List all categories
  - Create new category
  - Edit category
  - Delete category (if no posts)

API Used:
  GET /api/categories
  POST /api/categories
  PUT /api/categories/{id}
  DELETE /api/categories/{id}
```

#### F-ADM-06: Tag Manager
```
Feature: Tag Manager
Status: ❌ Backend partial, Frontend not done
Location: frontend/src/pages/admin/Tags.jsx (to create)

User Story:
  As an admin, I want to manage tags.

Functionality:
  - List all tags
  - Create new tag
  - Edit tag
  - Delete tag

API Needed:
  GET /api/tags ✅
  POST /api/tags ❌
  PUT /api/tags/{id} ❌
  DELETE /api/tags/{id} ❌
```

---

## 3. Phase 2 Features (Post-MVP)

### F-P2-01: Image Upload
```
Feature: Image Upload
Priority: High (Phase 2)

Functionality:
  - Upload images from admin
  - Store in Supabase Storage
  - Insert into markdown
  - Image gallery view
```

### F-P2-02: Pixel Art Design
```
Feature: Full Pixel Art Implementation
Priority: High (Phase 2)

Functionality:
  - Custom pixel sprites
  - Icon set (16x16)
  - Loading animations
  - Hover effects
  - Theme toggle animation
```

### F-P2-03: Enhanced Editor
```
Feature: Rich Markdown Editor
Priority: Medium (Phase 2)

Functionality:
  - Toolbar (bold, italic, headers)
  - Live preview split view
  - Auto-save to localStorage
  - Image drag-and-drop
```

---

## 4. Phase 3+ Features (Future)

| Feature | Description | Priority |
|---------|-------------|----------|
| Analytics | Page views, popular posts | Medium |
| SEO | Meta tags, sitemap, OG images | High |
| RSS Feed | Subscribe to blog | Low |
| Series | Group related posts | Low |
| Related Posts | Suggest similar content | Medium |
| Reading Progress | Progress bar while reading | Low |
| Share Buttons | Social media sharing | Low |

---

## 5. Feature Development Checklist

For each feature, complete these steps:

```
[ ] 1. Requirements clear (what does it do?)
[ ] 2. API endpoints ready (backend)
[ ] 3. UI design decided (wireframe/mockup)
[ ] 4. Components identified (what to build)
[ ] 5. Code written (implementation)
[ ] 6. Tested manually (works in browser)
[ ] 7. Responsive check (mobile works)
[ ] 8. Error handling (edge cases)
[ ] 9. Committed to git
[ ] 10. Documentation updated
```

---

## 6. Current Sprint: MVP Admin System

### This Week's Focus

```
Priority 1: Backend completion
├── [ ] Tags CRUD endpoints
├── [ ] Projects CRUD endpoints
└── [ ] Auth login endpoint

Priority 2: Frontend admin pages
├── [ ] Login page
├── [ ] Dashboard page
├── [ ] Post list page
└── [ ] Post editor page

Priority 3: Integration
├── [ ] Connect login to backend
├── [ ] Connect editor to backend
└── [ ] Test full CRUD flow
```

---

*Update this document as features are completed or requirements change.*
