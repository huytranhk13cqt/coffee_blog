# UI Wireframes & User Flows

> **Document Type**: UI/UX Specification
> **Project**: Coffee's Personal Blog CMS
> **Version**: 1.0
> **Last Updated**: 16/12/2024

---

## 1. Overview

This document contains ASCII wireframes for all pages in the Coffee Blog CMS.
These are **functional wireframes** - design details (colors, fonts, pixel art) come later.

---

## 2. Site Map

```
COFFEE BLOG SITE MAP
════════════════════

PUBLIC SITE                          ADMIN SITE
───────────                          ──────────
/                                    /admin/login
├── /post/:slug                      │
├── /category/:slug                  └── /admin (protected)
├── /tag/:slug                           ├── /admin/posts
├── /search                              │   ├── /admin/posts/new
├── /portfolio                           │   └── /admin/posts/:id/edit
├── /gallery                             ├── /admin/categories
├── /about                               ├── /admin/tags
├── /contact                             └── /admin/settings (future)
├── /uses
└── /bookmarks
```

---

## 3. Public Pages Wireframes

### 3.1 Homepage (/)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  HEADER                                                      │   │
│  │  [Logo]  Home  Blog  Portfolio  About  Contact    [Theme]   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  HERO SECTION                                                │   │
│  │                                                              │   │
│  │  ☕ Welcome to Coffee's Blog                                 │   │
│  │  Tech articles, life stories, and creative projects         │   │
│  │                                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────┐  ┌────────────────────┐   │
│  │  RECENT POSTS                       │  │  SIDEBAR           │   │
│  │                                     │  │                    │   │
│  │  ┌─────────────────────────────┐   │  │  Categories        │   │
│  │  │ [Image]                      │   │  │  ├── Technology   │   │
│  │  │ Post Title                   │   │  │  ├── Life         │   │
│  │  │ Excerpt text here...         │   │  │  └── Projects     │   │
│  │  │ Dec 16, 2024 · 5 min read   │   │  │                    │   │
│  │  └─────────────────────────────┘   │  │  Popular Tags      │   │
│  │                                     │  │  [python] [react]  │   │
│  │  ┌─────────────────────────────┐   │  │  [fastapi] [css]   │   │
│  │  │ [Image]                      │   │  │                    │   │
│  │  │ Post Title                   │   │  │  About             │   │
│  │  │ Excerpt text here...         │   │  │  [Avatar]          │   │
│  │  │ Dec 15, 2024 · 3 min read   │   │  │  Hi, I'm Coffee... │   │
│  │  └─────────────────────────────┘   │  │                    │   │
│  │                                     │  │                    │   │
│  │  [Load More] or Pagination         │  │                    │   │
│  └────────────────────────────────────┘  └────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  FOOTER                                                      │   │
│  │  © 2024 Coffee's Blog · GitHub · LinkedIn · RSS             │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

**User Actions:**
- Click post card → Go to post detail
- Click category → Filter posts
- Click tag → Filter posts
- Toggle theme → Switch dark/light mode

---

### 3.2 Post Detail (/post/:slug)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [HEADER - same as homepage]                                        │
│                                                                     │
│  ┌────────────────────────────────────┐  ┌────────────────────┐   │
│  │  POST CONTENT                       │  │  TABLE OF CONTENTS│   │
│  │                                     │  │                    │   │
│  │  [Cover Image - Full Width]         │  │  • Introduction    │   │
│  │                                     │  │  • Getting Started │   │
│  │  Category: Technology               │  │  • Code Examples   │   │
│  │                                     │  │  • Conclusion      │   │
│  │  # Post Title                       │  │                    │   │
│  │                                     │  │  (scrolls with     │   │
│  │  Dec 16, 2024 · 5 min read         │  │   page, sticky)    │   │
│  │  [python] [tutorial] [beginner]     │  │                    │   │
│  │                                     │  └────────────────────┘   │
│  │  ─────────────────────────────────  │                           │
│  │                                     │                           │
│  │  ## Introduction                    │                           │
│  │                                     │                           │
│  │  Lorem ipsum dolor sit amet...      │                           │
│  │                                     │                           │
│  │  ## Getting Started                 │                           │
│  │                                     │                           │
│  │  ```python                          │                           │
│  │  def hello():                       │                           │
│  │      print("Hello World")           │                           │
│  │  ```                                │                           │
│  │                                     │                           │
│  │  ## Conclusion                      │                           │
│  │                                     │                           │
│  │  ─────────────────────────────────  │                           │
│  │                                     │                           │
│  │  COMMENTS (Giscus)                  │                           │
│  │  ┌─────────────────────────────┐   │                           │
│  │  │ Sign in with GitHub to      │   │                           │
│  │  │ leave a comment...          │   │                           │
│  │  └─────────────────────────────┘   │                           │
│  │                                     │                           │
│  └────────────────────────────────────┘                           │
│                                                                     │
│  [FOOTER]                                                           │
└─────────────────────────────────────────────────────────────────────┘
```

**User Actions:**
- Click TOC item → Scroll to section
- Click tag → Go to tag page
- Click category → Go to category page
- Leave comment via Giscus

---

### 3.3 Search Page (/search)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [HEADER]                                                           │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  SEARCH                                                      │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────┐  [Search] │   │
│  │  │ Search posts...                               │           │   │
│  │  └──────────────────────────────────────────────┘           │   │
│  │                                                              │   │
│  │  Showing 5 results for "python"                              │   │
│  │                                                              │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ Post Title About Python                              │    │   │
│  │  │ ...matching text with **python** highlighted...      │    │   │
│  │  │ Dec 16, 2024                                         │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ Another Python Post                                  │    │   │
│  │  │ ...more text with **python** highlighted...          │    │   │
│  │  │ Dec 15, 2024                                         │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [FOOTER]                                                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 3.4 Portfolio Page (/portfolio)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [HEADER]                                                           │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  PORTFOLIO                                                   │   │
│  │  Projects I've built and contributed to                      │   │
│  │                                                              │   │
│  │  ┌───────────────────┐  ┌───────────────────┐               │   │
│  │  │ [Thumbnail]        │  │ [Thumbnail]        │               │   │
│  │  │                    │  │                    │               │   │
│  │  │ Project Name       │  │ Project Name       │               │   │
│  │  │ Description...     │  │ Description...     │               │   │
│  │  │                    │  │                    │               │   │
│  │  │ React · FastAPI    │  │ Python · Docker    │               │   │
│  │  │                    │  │                    │               │   │
│  │  │ [Demo] [GitHub]    │  │ [Demo] [GitHub]    │               │   │
│  │  └───────────────────┘  └───────────────────┘               │   │
│  │                                                              │   │
│  │  ┌───────────────────┐  ┌───────────────────┐               │   │
│  │  │ [Thumbnail]        │  │ [Thumbnail]        │               │   │
│  │  │ ...                │  │ ...                │               │   │
│  │  └───────────────────┘  └───────────────────┘               │   │
│  │                                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [FOOTER]                                                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Admin Pages Wireframes

### 4.1 Login Page (/admin/login)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                                                                     │
│                                                                     │
│           ┌─────────────────────────────────────────┐              │
│           │                                         │              │
│           │           ☕ Coffee's Blog              │              │
│           │              Admin Login                │              │
│           │                                         │              │
│           │  ┌───────────────────────────────────┐ │              │
│           │  │ Email                              │ │              │
│           │  └───────────────────────────────────┘ │              │
│           │                                         │              │
│           │  ┌───────────────────────────────────┐ │              │
│           │  │ Password                           │ │              │
│           │  └───────────────────────────────────┘ │              │
│           │                                         │              │
│           │  ┌───────────────────────────────────┐ │              │
│           │  │            LOGIN                   │ │              │
│           │  └───────────────────────────────────┘ │              │
│           │                                         │              │
│           │  ⚠️ Error message appears here         │              │
│           │                                         │              │
│           └─────────────────────────────────────────┘              │
│                                                                     │
│                                                                     │
│                      [Back to Blog]                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**User Actions:**
- Enter credentials → Click Login
- On success → Redirect to /admin
- On error → Show error message

---

### 4.2 Admin Dashboard (/admin)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ADMIN HEADER                                                │   │
│  │  ☕ Admin    [View Blog]                      [User] [Logout]│   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌───────────┐  ┌───────────────────────────────────────────────┐  │
│  │ SIDEBAR   │  │  DASHBOARD                                     │  │
│  │           │  │                                                 │  │
│  │ Dashboard │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐       │  │
│  │ Posts     │  │  │ Total    │ │Published │ │ Drafts   │       │  │
│  │ Categories│  │  │ Posts    │ │          │ │          │       │  │
│  │ Tags      │  │  │   25     │ │   20     │ │    5     │       │  │
│  │           │  │  └──────────┘ └──────────┘ └──────────┘       │  │
│  │           │  │                                                 │  │
│  │           │  │  RECENT POSTS                                   │  │
│  │           │  │  ┌─────────────────────────────────────────┐   │  │
│  │           │  │  │ Title          Status    Date    Actions│   │  │
│  │           │  │  ├─────────────────────────────────────────┤   │  │
│  │           │  │  │ My Post        Published Dec 16  [Edit] │   │  │
│  │           │  │  │ Draft Post     Draft     Dec 15  [Edit] │   │  │
│  │           │  │  │ Another Post   Published Dec 14  [Edit] │   │  │
│  │           │  │  └─────────────────────────────────────────┘   │  │
│  │           │  │                                                 │  │
│  │           │  │  [+ New Post]                                   │  │
│  │           │  │                                                 │  │
│  └───────────┘  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**User Actions:**
- Click sidebar item → Navigate to section
- Click "Edit" → Go to post editor
- Click "+ New Post" → Go to create post

---

### 4.3 Post List (/admin/posts)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [ADMIN HEADER]                                                     │
│                                                                     │
│  ┌───────────┐  ┌───────────────────────────────────────────────┐  │
│  │ SIDEBAR   │  │  POSTS                            [+ New Post] │  │
│  │           │  │                                                 │  │
│  │ Dashboard │  │  Filter: [All ▼]  Search: [____________]       │  │
│  │ Posts  ←  │  │                                                 │  │
│  │ Categories│  │  ┌───────────────────────────────────────────┐ │  │
│  │ Tags      │  │  │ □ Title          Category  Status   Date  │ │  │
│  │           │  │  ├───────────────────────────────────────────┤ │  │
│  │           │  │  │ □ My First Post  Tech      ● Pub    Dec 16│ │  │
│  │           │  │  │ □ Draft Post     Life      ○ Draft  Dec 15│ │  │
│  │           │  │  │ □ Another Post   Tech      ● Pub    Dec 14│ │  │
│  │           │  │  │ □ Old Post       Projects  ● Pub    Dec 10│ │  │
│  │           │  │  └───────────────────────────────────────────┘ │  │
│  │           │  │                                                 │  │
│  │           │  │  ← Prev  Page 1 of 3  Next →                   │  │
│  │           │  │                                                 │  │
│  │           │  │  With selected: [Delete]                        │  │
│  │           │  │                                                 │  │
│  └───────────┘  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**User Actions:**
- Click row → Edit post
- Select checkbox → Bulk actions
- Click "Delete" → Confirm dialog
- Click "+ New Post" → Create page

---

### 4.4 Post Editor (/admin/posts/new or /admin/posts/:id/edit)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [ADMIN HEADER]                                                     │
│                                                                     │
│  ┌───────────┐  ┌───────────────────────────────────────────────┐  │
│  │ SIDEBAR   │  │  CREATE POST                    [Save Draft]   │  │
│  │           │  │                                 [Publish]      │  │
│  │           │  │                                                 │  │
│  │           │  │  Title                                          │  │
│  │           │  │  ┌───────────────────────────────────────────┐ │  │
│  │           │  │  │ Enter post title...                        │ │  │
│  │           │  │  └───────────────────────────────────────────┘ │  │
│  │           │  │                                                 │  │
│  │           │  │  Slug: my-post-title (auto-generated)          │  │
│  │           │  │                                                 │  │
│  │           │  │  Category          Tags                         │  │
│  │           │  │  ┌────────────┐   ┌────────────────────────┐   │  │
│  │           │  │  │ Tech    ▼  │   │ python, react, ...     │   │  │
│  │           │  │  └────────────┘   └────────────────────────┘   │  │
│  │           │  │                                                 │  │
│  │           │  │  Content (Markdown)                             │  │
│  │           │  │  ┌───────────────────────────────────────────┐ │  │
│  │           │  │  │ [B] [I] [H1] [H2] [Link] [Image] [Code]   │ │  │
│  │           │  │  ├───────────────────────────────────────────┤ │  │
│  │           │  │  │                                           │ │  │
│  │           │  │  │ # My Post Title                           │ │  │
│  │           │  │  │                                           │ │  │
│  │           │  │  │ Introduction text here...                 │ │  │
│  │           │  │  │                                           │ │  │
│  │           │  │  │ ## Section 1                              │ │  │
│  │           │  │  │                                           │ │  │
│  │           │  │  │ More content...                           │ │  │
│  │           │  │  │                                           │ │  │
│  │           │  │  └───────────────────────────────────────────┘ │  │
│  │           │  │                                                 │  │
│  │           │  │  Excerpt (optional)                             │  │
│  │           │  │  ┌───────────────────────────────────────────┐ │  │
│  │           │  │  │ Short summary for preview...              │ │  │
│  │           │  │  └───────────────────────────────────────────┘ │  │
│  │           │  │                                                 │  │
│  └───────────┘  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**User Actions:**
- Type title → Slug auto-generates
- Select category from dropdown
- Add tags (comma-separated or chips)
- Write markdown content
- Click "Save Draft" → Save as draft
- Click "Publish" → Publish immediately

---

### 4.5 Category Manager (/admin/categories)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [ADMIN HEADER]                                                     │
│                                                                     │
│  ┌───────────┐  ┌───────────────────────────────────────────────┐  │
│  │ SIDEBAR   │  │  CATEGORIES                                    │  │
│  │           │  │                                                 │  │
│  │ Dashboard │  │  ┌─────────────────────────────────────────┐   │  │
│  │ Posts     │  │  │ ADD NEW CATEGORY                         │   │  │
│  │ Categories│  │  │                                          │   │  │
│  │ Tags      │  │  │ Name: [________________]                 │   │  │
│  │           │  │  │ Slug: [________________]                 │   │  │
│  │           │  │  │ Desc: [________________]                 │   │  │
│  │           │  │  │                                          │   │  │
│  │           │  │  │ [Add Category]                           │   │  │
│  │           │  │  └─────────────────────────────────────────┘   │  │
│  │           │  │                                                 │  │
│  │           │  │  EXISTING CATEGORIES                            │  │
│  │           │  │  ┌─────────────────────────────────────────┐   │  │
│  │           │  │  │ Name          Slug        Posts  Actions│   │  │
│  │           │  │  ├─────────────────────────────────────────┤   │  │
│  │           │  │  │ Technology    technology    15   [E][D] │   │  │
│  │           │  │  │ Life          life           8   [E][D] │   │  │
│  │           │  │  │ Projects      projects       2   [E][D] │   │  │
│  │           │  │  └─────────────────────────────────────────┘   │  │
│  │           │  │                                                 │  │
│  └───────────┘  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. User Flows

### 5.1 Visitor: Read a Post

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  Visit  │ ──> │ See     │ ──> │ Click   │ ──> │ Read    │
│Homepage │     │ Posts   │     │ Post    │     │ Content │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

### 5.2 Admin: Create a Post

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  Login  │ ──> │Dashboard│ ──> │New Post │ ──> │ Fill    │ ──> │ Publish │
│  Page   │     │         │     │ Button  │     │ Form    │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
```

### 5.3 Admin: Edit Existing Post

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│Dashboard│ ──> │ Post    │ ──> │ Click   │ ──> │ Edit    │ ──> │  Save   │
│         │     │ List    │     │ Edit    │     │ Content │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
```

---

## 6. Mobile Wireframes

### 6.1 Mobile Homepage

```
┌─────────────────────┐
│ ☕ [Menu]    [Theme]│
├─────────────────────┤
│                     │
│  Welcome to         │
│  Coffee's Blog      │
│                     │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ [Image]         │ │
│ │ Post Title      │ │
│ │ Excerpt...      │ │
│ │ Dec 16 · 5 min  │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ [Image]         │ │
│ │ Post Title      │ │
│ │ Excerpt...      │ │
│ └─────────────────┘ │
│                     │
├─────────────────────┤
│ [Home][Search][Menu]│
└─────────────────────┘
```

### 6.2 Mobile Menu (Overlay)

```
┌─────────────────────┐
│            [Close X]│
├─────────────────────┤
│                     │
│  Home               │
│  ─────────────────  │
│  Blog               │
│  ─────────────────  │
│  Categories         │
│    ├── Technology   │
│    ├── Life         │
│    └── Projects     │
│  ─────────────────  │
│  Portfolio          │
│  ─────────────────  │
│  About              │
│  ─────────────────  │
│  Contact            │
│                     │
│  ─────────────────  │
│  [Dark/Light Mode]  │
│                     │
└─────────────────────┘
```

---

## 7. Component Inventory

### Shared Components (Public + Admin)

| Component | Location | Used In |
|-----------|----------|---------|
| Header | components/layout/Header.jsx | All public pages |
| Footer | components/layout/Footer.jsx | All public pages |
| PostCard | components/post/PostCard.jsx | Homepage, Category, Tag, Search |
| Tag | components/common/Tag.jsx | Post cards, Post detail |
| Button | components/common/Button.jsx | Everywhere |
| Input | components/common/Input.jsx | Search, Forms |
| ThemeToggle | components/common/ThemeToggle.jsx | Header |

### Admin-Only Components

| Component | Location | Used In |
|-----------|----------|---------|
| AdminLayout | components/admin/AdminLayout.jsx | All admin pages |
| AdminSidebar | components/admin/AdminSidebar.jsx | AdminLayout |
| AdminHeader | components/admin/AdminHeader.jsx | AdminLayout |
| StatsCard | components/admin/StatsCard.jsx | Dashboard |
| PostTable | components/admin/PostTable.jsx | Post List |
| MarkdownEditor | components/editor/MarkdownEditor.jsx | Post Editor |
| CategorySelect | components/editor/CategorySelect.jsx | Post Editor |
| TagInput | components/editor/TagInput.jsx | Post Editor |

---

## 8. Responsive Breakpoints

```
BREAKPOINTS:
─────────────────────────────────────────────────

Mobile Portrait    : 0 - 639px    (1 column)
Mobile Landscape   : 640 - 767px  (1 column)
Tablet Portrait    : 768 - 1023px (2 columns)
Desktop            : 1024px+      (3 columns + sidebar)

LAYOUT CHANGES:
─────────────────────────────────────────────────

< 768px:
  - Single column layout
  - Hamburger menu
  - Bottom navigation (mobile)
  - Sidebar hidden (toggle)
  - Full-width cards

768px - 1023px:
  - Two column post grid
  - Top navigation
  - Sidebar in drawer

> 1024px:
  - Three column post grid
  - Full navigation
  - Visible sidebar
```

---

*These wireframes define the structure. Detailed visual design (colors, fonts, pixel art) will be applied in Phase 2.*
