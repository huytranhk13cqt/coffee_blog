# Requirements Specification

> **Document Type**: Requirements
> **Project**: Coffee's Personal Blog CMS
> **Version**: 1.0
> **Last Updated**: 16/12/2024

---

## 1. Overview

This document defines **functional** and **non-functional** requirements for the Coffee Blog CMS.

---

## 2. User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **Visitor** | Anonymous user browsing the blog | Read public content |
| **Admin (Owner)** | Blog owner (you) | Full CRUD on all content |

> Note: This is a **single-user** system. No user registration needed.

---

## 3. Functional Requirements

### 3.1 Visitor Requirements (Public Site)

#### FR-V01: View Homepage
| ID | FR-V01 |
|---|---|
| Description | Visitor can view homepage with list of recent posts |
| Input | None (visit homepage URL) |
| Output | List of posts with title, excerpt, date, category |
| Status | ✅ Implemented |

#### FR-V02: View Post Detail
| ID | FR-V02 |
|---|---|
| Description | Visitor can read full content of a post |
| Input | Post slug (URL) |
| Output | Full post with title, content, tags, date |
| Status | ✅ Implemented |

#### FR-V03: Filter by Category
| ID | FR-V03 |
|---|---|
| Description | Visitor can view posts filtered by category |
| Input | Category slug |
| Output | List of posts in that category |
| Status | ✅ Implemented |

#### FR-V04: Filter by Tag
| ID | FR-V04 |
|---|---|
| Description | Visitor can view posts filtered by tag |
| Input | Tag slug |
| Output | List of posts with that tag |
| Status | ✅ Implemented |

#### FR-V05: Search Posts
| ID | FR-V05 |
|---|---|
| Description | Visitor can search posts by keyword |
| Input | Search query string |
| Output | List of matching posts |
| Status | ✅ Implemented |

#### FR-V06: View Portfolio
| ID | FR-V06 |
|---|---|
| Description | Visitor can view portfolio projects |
| Input | None (visit portfolio page) |
| Output | List of projects with details |
| Status | ✅ Implemented |

#### FR-V07: Toggle Theme
| ID | FR-V07 |
|---|---|
| Description | Visitor can switch between light and dark mode |
| Input | Toggle button click |
| Output | Theme changes, preference saved |
| Status | ✅ Implemented |

---

### 3.2 Admin Requirements (Content Management)

#### FR-A01: Admin Login
| ID | FR-A01 |
|---|---|
| Description | Admin can login with email and password |
| Input | Email, password |
| Output | Access token, redirect to dashboard |
| Status | ❌ Not Implemented |
| Priority | **HIGH - MVP** |

#### FR-A02: View Dashboard
| ID | FR-A02 |
|---|---|
| Description | Admin can view dashboard with stats and recent posts |
| Input | None (authenticated access) |
| Output | Post count, draft count, recent posts list |
| Status | ❌ Not Implemented |
| Priority | **HIGH - MVP** |

#### FR-A03: Create Post
| ID | FR-A03 |
|---|---|
| Description | Admin can create a new blog post |
| Input | Title, content, excerpt, category, tags, status |
| Output | New post created, redirect to post list |
| Validation | Title required, slug auto-generated |
| Status | ❌ Not Implemented |
| Priority | **HIGH - MVP** |

#### FR-A04: Edit Post
| ID | FR-A04 |
|---|---|
| Description | Admin can edit an existing post |
| Input | Post ID, updated fields |
| Output | Post updated, success message |
| Status | ❌ Not Implemented |
| Priority | **HIGH - MVP** |

#### FR-A05: Delete Post
| ID | FR-A05 |
|---|---|
| Description | Admin can delete a post |
| Input | Post ID, confirmation |
| Output | Post deleted, redirect to list |
| Status | ❌ Not Implemented |
| Priority | **HIGH - MVP** |

#### FR-A06: Manage Categories
| ID | FR-A06 |
|---|---|
| Description | Admin can create, edit, delete categories |
| Input | Category name, slug, description |
| Output | Category created/updated/deleted |
| Status | ⚠️ Backend done, Frontend not done |
| Priority | **MEDIUM - MVP** |

#### FR-A07: Manage Tags
| ID | FR-A07 |
|---|---|
| Description | Admin can create, edit, delete tags |
| Input | Tag name, slug |
| Output | Tag created/updated/deleted |
| Status | ❌ Not Implemented |
| Priority | **MEDIUM - MVP** |

#### FR-A08: Publish/Unpublish Post
| ID | FR-A08 |
|---|---|
| Description | Admin can change post status between draft and published |
| Input | Post ID, new status |
| Output | Status updated |
| Status | ❌ Not Implemented |
| Priority | **HIGH - MVP** |

---

### 3.3 Future Requirements (Post-MVP)

| ID | Description | Phase |
|---|---|---|
| FR-F01 | Upload and manage images | Phase 2 |
| FR-F02 | Preview post before publishing | Phase 2 |
| FR-F03 | Auto-save drafts | Phase 2 |
| FR-F04 | View analytics/stats | Phase 3 |
| FR-F05 | Schedule posts for future | Phase 3 |
| FR-F06 | Manage portfolio projects | Phase 2 |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-P01 | Homepage load time | < 3 seconds |
| NFR-P02 | Post detail load time | < 2 seconds |
| NFR-P03 | API response time | < 500ms |
| NFR-P04 | Support concurrent users | 100 users |

### 4.2 Usability

| ID | Requirement | Description |
|---|---|---|
| NFR-U01 | Mobile responsive | Works on all screen sizes |
| NFR-U02 | Keyboard navigation | Accessible via keyboard |
| NFR-U03 | Dark mode support | Complete dark theme |
| NFR-U04 | Intuitive admin UI | No training needed |

### 4.3 Security

| ID | Requirement | Description |
|---|---|---|
| NFR-S01 | Authentication | JWT-based auth via Supabase |
| NFR-S02 | Protected routes | Admin routes require auth |
| NFR-S03 | Input validation | All inputs validated |
| NFR-S04 | XSS prevention | Sanitize user input |
| NFR-S05 | HTTPS | SSL certificate in production |

### 4.4 Reliability

| ID | Requirement | Target |
|---|---|---|
| NFR-R01 | Uptime | 99% availability |
| NFR-R02 | Data backup | Supabase automatic backups |
| NFR-R03 | Error handling | Graceful error messages |

### 4.5 Maintainability

| ID | Requirement | Description |
|---|---|---|
| NFR-M01 | Code documentation | Comments and README |
| NFR-M02 | Consistent naming | Follow conventions in CLAUDE.md |
| NFR-M03 | Modular code | Reusable components |

---

## 5. User Stories (MVP)

### As a Visitor

```
US-V01: As a visitor, I want to see recent blog posts on the homepage
        so that I can discover new content.
        [✅ DONE]

US-V02: As a visitor, I want to read a full blog post
        so that I can learn from the content.
        [✅ DONE]

US-V03: As a visitor, I want to search for posts
        so that I can find specific topics.
        [✅ DONE]

US-V04: As a visitor, I want to filter posts by category
        so that I can browse related content.
        [✅ DONE]

US-V05: As a visitor, I want to switch to dark mode
        so that I can read comfortably at night.
        [✅ DONE]
```

### As an Admin

```
US-A01: As an admin, I want to login securely
        so that only I can manage content.
        [❌ NOT DONE - MVP Priority]

US-A02: As an admin, I want to create new posts with markdown
        so that I can publish articles.
        [❌ NOT DONE - MVP Priority]

US-A03: As an admin, I want to edit existing posts
        so that I can fix mistakes or update content.
        [❌ NOT DONE - MVP Priority]

US-A04: As an admin, I want to save posts as drafts
        so that I can work on them before publishing.
        [❌ NOT DONE - MVP Priority]

US-A05: As an admin, I want to organize posts with categories and tags
        so that visitors can find related content.
        [⚠️ PARTIAL - Backend done]
```

---

## 6. Acceptance Criteria

### MVP Complete When:

```
[ ] Admin can login from /admin/login
[ ] Admin can see dashboard at /admin
[ ] Admin can create a new post
[ ] Admin can edit an existing post
[ ] Admin can delete a post
[ ] Admin can publish/unpublish posts
[ ] All existing public features still work
[ ] No authentication = redirect to login
```

### Definition of Done (for each feature):

```
[ ] Code written and working
[ ] Tested manually in browser
[ ] No console errors
[ ] Responsive on mobile
[ ] Handles errors gracefully
[ ] Committed to git
```

---

## 7. Constraints

| Type | Constraint |
|------|------------|
| **Budget** | $0 (free tier only: Supabase, Vercel) |
| **Timeline** | No hard deadline, but MVP within 1 month |
| **Team** | Solo developer (you) |
| **Technology** | Must use React + FastAPI + Supabase |

---

## 8. Assumptions

| Assumption | Impact if Wrong |
|------------|-----------------|
| Single admin user only | Would need user management |
| Supabase free tier sufficient | Would need to pay or migrate |
| No need for real-time features | Would need WebSockets |
| Markdown content is enough | Would need rich text editor |

---

## 9. Dependencies

| Dependency | Type | Risk |
|------------|------|------|
| Supabase | External service | Low (reliable) |
| GitHub | Code hosting | Low |
| npm packages | Libraries | Medium (updates) |

---

*This document tracks what the system must do. Update status as features are completed.*
