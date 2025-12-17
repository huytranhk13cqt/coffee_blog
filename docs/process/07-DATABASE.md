# Database Schema Documentation

> **Database**: Supabase (PostgreSQL)
> **Last Updated**: 16/12/2024
> **Status**: Extracted from existing code

---

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    COFFEE BLOG DATABASE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐         ┌──────────────┐                    │
│   │  categories  │         │    tags      │                    │
│   └──────┬───────┘         └──────┬───────┘                    │
│          │ 1                      │ M                          │
│          │                        │                            │
│          │ M                      │                            │
│   ┌──────▼───────┐         ┌──────▼───────┐                    │
│   │    posts     │─────────│  post_tags   │                    │
│   └──────────────┘    M    └──────────────┘                    │
│                                                                 │
│   ┌──────────────┐                                             │
│   │   projects   │  (independent - portfolio)                  │
│   └──────────────┘                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Entity Relationship Diagram

```
categories (1) ──────< (M) posts
posts      (M) >─────< (M) tags   [via post_tags junction table]
projects   (independent)
```

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Category → Posts | One-to-Many | One category has many posts |
| Post → Category | Many-to-One | One post belongs to one category |
| Post ↔ Tags | Many-to-Many | Posts can have multiple tags, tags can be on multiple posts |

---

## Tables

### 1. categories

Stores blog post categories.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `name` | VARCHAR(100) | NOT NULL | Category name |
| `slug` | VARCHAR(100) | NOT NULL, UNIQUE | URL-friendly identifier |
| `description` | TEXT | NULLABLE | Category description |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Creation timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE on `slug`

**Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Technology",
  "slug": "technology",
  "description": "Posts about tech topics",
  "created_at": "2024-12-16T10:00:00Z"
}
```

---

### 2. tags

Stores tags for posts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `name` | VARCHAR(50) | NOT NULL | Tag name |
| `slug` | VARCHAR(50) | NOT NULL, UNIQUE | URL-friendly identifier |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE on `slug`

**Example:**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Python",
  "slug": "python"
}
```

---

### 3. posts

Stores blog posts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `title` | VARCHAR(255) | NOT NULL | Post title |
| `slug` | VARCHAR(255) | NOT NULL, UNIQUE | URL-friendly identifier |
| `content` | TEXT | NULLABLE | Markdown content |
| `excerpt` | TEXT | NULLABLE | Short summary |
| `cover_image_url` | TEXT | NULLABLE | Cover image URL |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'draft' | 'draft' or 'published' |
| `category_id` | UUID | FOREIGN KEY → categories(id) | Category reference |
| `reading_time_minutes` | INTEGER | NULLABLE | Estimated reading time |
| `is_pinned` | BOOLEAN | DEFAULT FALSE | Pin post to top |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NULLABLE | Last update timestamp |
| `published_at` | TIMESTAMP | NULLABLE | Publication timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE on `slug`
- INDEX on `category_id`
- INDEX on `status`
- INDEX on `published_at`

**Foreign Keys:**
- `category_id` → `categories(id)` ON DELETE SET NULL

**Example:**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "title": "Getting Started with FastAPI",
  "slug": "getting-started-with-fastapi",
  "content": "# Introduction\n\nFastAPI is...",
  "excerpt": "Learn how to build APIs with FastAPI",
  "cover_image_url": "https://example.com/image.jpg",
  "status": "published",
  "category_id": "550e8400-e29b-41d4-a716-446655440000",
  "reading_time_minutes": 5,
  "is_pinned": false,
  "created_at": "2024-12-16T10:00:00Z",
  "updated_at": "2024-12-16T12:00:00Z",
  "published_at": "2024-12-16T12:00:00Z"
}
```

---

### 4. post_tags (Junction Table)

Many-to-Many relationship between posts and tags.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `post_id` | UUID | NOT NULL, FOREIGN KEY → posts(id) | Post reference |
| `tag_id` | UUID | NOT NULL, FOREIGN KEY → tags(id) | Tag reference |

**Indexes:**
- PRIMARY KEY on `(post_id, tag_id)` - Composite key
- INDEX on `post_id`
- INDEX on `tag_id`

**Foreign Keys:**
- `post_id` → `posts(id)` ON DELETE CASCADE
- `tag_id` → `tags(id)` ON DELETE CASCADE

**Example:**
```json
{
  "post_id": "770e8400-e29b-41d4-a716-446655440002",
  "tag_id": "660e8400-e29b-41d4-a716-446655440001"
}
```

---

### 5. projects

Stores portfolio projects (independent entity).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `title` | VARCHAR(255) | NOT NULL | Project title |
| `description` | TEXT | NULLABLE | Project description |
| `thumbnail_url` | TEXT | NULLABLE | Thumbnail image URL |
| `tech_stack` | TEXT[] | NULLABLE | Array of technologies |
| `demo_url` | TEXT | NULLABLE | Live demo URL |
| `github_url` | TEXT | NULLABLE | GitHub repository URL |
| `sort_order` | INTEGER | DEFAULT 0 | Display order |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Creation timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `sort_order`

**Example:**
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440003",
  "title": "Coffee Blog CMS",
  "description": "A personal blog built with FastAPI and React",
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "tech_stack": ["FastAPI", "React", "PostgreSQL", "Supabase"],
  "demo_url": "https://coffee-blog.com",
  "github_url": "https://github.com/coffee/blog",
  "sort_order": 1,
  "created_at": "2024-12-16T10:00:00Z"
}
```

---

## SQL Schema (Reference)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE
);

-- Posts table
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT,
    excerpt TEXT,
    cover_image_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    reading_time_minutes INTEGER,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT status_check CHECK (status IN ('draft', 'published'))
);

-- Post-Tags junction table
CREATE TABLE post_tags (
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    tech_stack TEXT[],
    demo_url TEXT,
    github_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_post_tags_post ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag ON post_tags(tag_id);
CREATE INDEX idx_projects_sort ON projects(sort_order);
```

---

## Constraints Summary

### Business Rules

| Rule | Table | Implementation |
|------|-------|----------------|
| Unique category slug | categories | UNIQUE constraint on `slug` |
| Unique tag slug | tags | UNIQUE constraint on `slug` |
| Unique post slug | posts | UNIQUE constraint on `slug` |
| Valid post status | posts | CHECK constraint: 'draft' or 'published' |
| Category optional | posts | `category_id` can be NULL |
| Cascade delete tags | post_tags | ON DELETE CASCADE |

### Data Validation (Application Level)

| Field | Validation |
|-------|------------|
| `category.name` | 1-100 characters |
| `tag.name` | 1-50 characters |
| `post.title` | 1-255 characters |
| `project.title` | 1-255 characters |

---

## Queries Cheat Sheet

### Get all published posts with category
```sql
SELECT p.*, c.name as category_name, c.slug as category_slug
FROM posts p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.status = 'published'
ORDER BY p.published_at DESC;
```

### Get all tags for a post
```sql
SELECT t.*
FROM tags t
INNER JOIN post_tags pt ON t.id = pt.tag_id
WHERE pt.post_id = 'post-uuid-here';
```

### Get all posts with a specific tag
```sql
SELECT p.*
FROM posts p
INNER JOIN post_tags pt ON p.id = pt.post_id
INNER JOIN tags t ON pt.tag_id = t.id
WHERE t.slug = 'python'
AND p.status = 'published';
```

---

## Missing Tables (Future)

| Table | Purpose | Priority |
|-------|---------|----------|
| `users` | User authentication (currently via Supabase Auth) | Low |
| `comments` | Blog comments (currently via Giscus) | Low |
| `media` | Media file management | Medium |
| `bookmarks` | User bookmarks | Low |

---

## Supabase Specific

### Row Level Security (RLS)

```sql
-- Public read access for published posts
CREATE POLICY "Public can view published posts"
ON posts FOR SELECT
USING (status = 'published');

-- Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated users can manage posts"
ON posts FOR ALL
USING (auth.role() = 'authenticated');
```

### Checking Your Schema in Supabase

1. Go to Supabase Dashboard
2. Navigate to **Database** → **Tables**
3. Click on each table to see columns and constraints
4. Or use **SQL Editor** to run: `\d tablename`

---

*Document created: 16/12/2024*
*Source: Extracted from backend/app/models/ and backend/app/services/*
