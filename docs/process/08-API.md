# API Documentation

> **Document Type**: API Specification
> **Project**: Coffee's Personal Blog CMS
> **Base URL**: `http://localhost:8000`
> **Version**: 1.0
> **Last Updated**: 16/12/2024

---

## 1. API Overview

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://api.your-domain.com` (future)

### Response Format

All endpoints return JSON in this format:

```json
// Success
{
  "data": { ... },
  "message": "Optional success message"
}

// Error
{
  "detail": "Error message"
}
```

### Authentication

Protected endpoints require JWT token in header:

```
Authorization: Bearer <access_token>
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 204 | No Content - Deleted successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Something went wrong |

---

## 2. Endpoints Summary

### Public Endpoints (No Auth)

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/` | Root - API info | ✅ |
| GET | `/health` | Health check | ✅ |
| GET | `/api/posts` | List posts | ✅ |
| GET | `/api/posts/search` | Search posts | ✅ |
| GET | `/api/posts/{slug}` | Get post by slug | ✅ |
| GET | `/api/posts/{slug}/tags` | Get post's tags | ✅ |
| GET | `/api/categories` | List categories | ✅ |
| GET | `/api/categories/{slug}` | Get category | ✅ |
| GET | `/api/tags` | List tags | ✅ |
| GET | `/api/tags/{slug}` | Get tag | ✅ |
| GET | `/api/tags/{slug}/posts` | Get tag's posts | ✅ |
| GET | `/api/projects` | List projects | ✅ |
| GET | `/api/gallery` | Get gallery images | ✅ |

### Protected Endpoints (Auth Required)

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/api/auth/login` | Login | ❌ |
| GET | `/api/auth/me` | Get current user | ❌ |
| POST | `/api/posts` | Create post | ✅ |
| PUT | `/api/posts/{id}` | Update post | ✅ |
| DELETE | `/api/posts/{id}` | Delete post | ✅ |
| POST | `/api/categories` | Create category | ✅ |
| PUT | `/api/categories/{id}` | Update category | ✅ |
| DELETE | `/api/categories/{id}` | Delete category | ✅ |
| POST | `/api/tags` | Create tag | ❌ |
| PUT | `/api/tags/{id}` | Update tag | ❌ |
| DELETE | `/api/tags/{id}` | Delete tag | ❌ |
| POST | `/api/projects` | Create project | ❌ |
| PUT | `/api/projects/{id}` | Update project | ❌ |
| DELETE | `/api/projects/{id}` | Delete project | ❌ |

---

## 3. Authentication Endpoints

### POST /api/auth/login

**Status**: ❌ Not Implemented

Login with email and password.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "admin@example.com"
  }
}
```

**Error (401):**
```json
{
  "detail": "Invalid email or password"
}
```

---

### GET /api/auth/me

**Status**: ❌ Not Implemented

Get current authenticated user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "admin@example.com",
  "created_at": "2024-12-16T10:00:00Z"
}
```

---

## 4. Posts Endpoints

### GET /api/posts

**Status**: ✅ Implemented

List published posts with pagination.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | int | 1 | Page number |
| per_page | int | 10 | Posts per page (max 50) |
| category | string | null | Filter by category slug |

**Request:**
```
GET /api/posts?page=1&per_page=10&category=technology
```

**Response (200):**
```json
{
  "posts": [
    {
      "id": "uuid",
      "title": "My First Post",
      "slug": "my-first-post",
      "excerpt": "Short summary...",
      "cover_image_url": "https://...",
      "status": "published",
      "category_id": "uuid",
      "categories": {
        "name": "Technology",
        "slug": "technology"
      },
      "reading_time_minutes": 5,
      "is_pinned": false,
      "created_at": "2024-12-16T10:00:00Z",
      "published_at": "2024-12-16T12:00:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "per_page": 10
}
```

---

### GET /api/posts/search

**Status**: ✅ Implemented

Search posts by keyword.

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| q | string | Yes | Search query |
| page | int | No | Page number |
| per_page | int | No | Results per page |

**Request:**
```
GET /api/posts/search?q=python&page=1
```

**Response (200):**
```json
{
  "query": "python",
  "posts": [...],
  "total": 5,
  "page": 1,
  "per_page": 10
}
```

---

### GET /api/posts/{slug}

**Status**: ✅ Implemented

Get single post by slug.

**Request:**
```
GET /api/posts/my-first-post
```

**Response (200):**
```json
{
  "id": "uuid",
  "title": "My First Post",
  "slug": "my-first-post",
  "content": "# Full markdown content...",
  "excerpt": "Short summary...",
  "cover_image_url": "https://...",
  "status": "published",
  "category_id": "uuid",
  "categories": {
    "name": "Technology",
    "slug": "technology"
  },
  "reading_time_minutes": 5,
  "is_pinned": false,
  "created_at": "2024-12-16T10:00:00Z",
  "updated_at": "2024-12-16T14:00:00Z",
  "published_at": "2024-12-16T12:00:00Z"
}
```

**Error (404):**
```json
{
  "detail": "Post not found"
}
```

---

### POST /api/posts

**Status**: ✅ Implemented (Protected)

Create new post.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Post Title",
  "slug": "new-post-title",  // Optional, auto-generated
  "content": "# Markdown content...",
  "excerpt": "Short summary",
  "cover_image_url": "https://...",
  "category_id": "uuid",
  "tags": ["python", "tutorial"],
  "status": "draft"  // or "published"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "title": "New Post Title",
  "slug": "new-post-title",
  ...
}
```

---

### PUT /api/posts/{id}

**Status**: ✅ Implemented (Protected)

Update existing post.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body (partial update allowed):**
```json
{
  "title": "Updated Title",
  "status": "published"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Updated Title",
  ...
}
```

---

### DELETE /api/posts/{id}

**Status**: ✅ Implemented (Protected)

Delete post.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (204):**
```
No content
```

---

## 5. Categories Endpoints

### GET /api/categories

**Status**: ✅ Implemented

List all categories.

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Technology",
    "slug": "technology",
    "description": "Tech articles",
    "created_at": "2024-12-16T10:00:00Z"
  }
]
```

---

### GET /api/categories/{slug}

**Status**: ✅ Implemented

Get category by slug.

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Technology",
  "slug": "technology",
  "description": "Tech articles",
  "created_at": "2024-12-16T10:00:00Z"
}
```

---

### POST /api/categories

**Status**: ✅ Implemented (Protected)

Create new category.

**Request Body:**
```json
{
  "name": "New Category",
  "slug": "new-category",  // Optional
  "description": "Category description"
}
```

---

### PUT /api/categories/{id}

**Status**: ✅ Implemented (Protected)

Update category.

---

### DELETE /api/categories/{id}

**Status**: ✅ Implemented (Protected)

Delete category.

---

## 6. Tags Endpoints

### GET /api/tags

**Status**: ✅ Implemented

List all tags.

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Python",
    "slug": "python"
  }
]
```

---

### GET /api/tags/{slug}

**Status**: ✅ Implemented

Get tag by slug.

---

### GET /api/tags/{slug}/posts

**Status**: ✅ Implemented

Get posts with specific tag.

**Query Parameters:**
| Param | Type | Default |
|-------|------|---------|
| page | int | 1 |
| per_page | int | 10 |

**Response (200):**
```json
{
  "tag": {
    "id": "uuid",
    "name": "Python",
    "slug": "python"
  },
  "posts": [...],
  "total": 10,
  "page": 1,
  "per_page": 10
}
```

---

### POST /api/tags

**Status**: ❌ Not Implemented (Protected)

Create new tag.

**Request Body:**
```json
{
  "name": "New Tag",
  "slug": "new-tag"  // Optional
}
```

---

### PUT /api/tags/{id}

**Status**: ❌ Not Implemented (Protected)

Update tag.

---

### DELETE /api/tags/{id}

**Status**: ❌ Not Implemented (Protected)

Delete tag.

---

## 7. Projects Endpoints

### GET /api/projects

**Status**: ✅ Implemented

List all portfolio projects.

**Response (200):**
```json
[
  {
    "id": "uuid",
    "title": "Coffee Blog CMS",
    "description": "Personal blog project",
    "thumbnail_url": "https://...",
    "tech_stack": ["React", "FastAPI", "PostgreSQL"],
    "demo_url": "https://...",
    "github_url": "https://...",
    "sort_order": 1,
    "created_at": "2024-12-16T10:00:00Z"
  }
]
```

---

### POST /api/projects

**Status**: ❌ Not Implemented (Protected)

Create new project.

---

### PUT /api/projects/{id}

**Status**: ❌ Not Implemented (Protected)

Update project.

---

### DELETE /api/projects/{id}

**Status**: ❌ Not Implemented (Protected)

Delete project.

---

## 8. Gallery Endpoint

### GET /api/gallery

**Status**: ✅ Implemented

Get all images from published posts.

**Response (200):**
```json
{
  "images": [
    {
      "url": "https://...",
      "alt": "Image description",
      "post_title": "Post Title",
      "post_slug": "post-slug",
      "type": "cover"  // or "content"
    }
  ],
  "total": 15
}
```

---

## 9. Error Responses

### 400 Bad Request

```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "detail": "Invalid / Expired token"
}
```

### 404 Not Found

```json
{
  "detail": "Post not found"
}
```

### 500 Server Error

```json
{
  "detail": "Internal server error"
}
```

---

## 10. API Testing

### Using Swagger UI

1. Start backend: `uvicorn app.main:app --reload`
2. Open: `http://localhost:8000/docs`
3. Click "Try it out" on any endpoint
4. For protected endpoints, click "Authorize" and enter token

### Using curl

```bash
# Get posts
curl http://localhost:8000/api/posts

# Search posts
curl "http://localhost:8000/api/posts/search?q=python"

# Create post (with auth)
curl -X POST http://localhost:8000/api/posts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "New Post", "content": "Content here"}'
```

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Set method and URL
4. Add headers if needed
5. Send request

---

## 11. Pydantic Models Reference

### PostCreate

```python
class PostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    slug: Optional[str] = Field(None, max_length=255)
    content: Optional[str] = None
    excerpt: Optional[str] = None
    cover_image_url: Optional[str] = None
    category_id: Optional[UUID] = None
    tags: Optional[List[str]] = []
    status: str = Field(default="draft", pattern="^(draft|published)$")
```

### PostUpdate

```python
class PostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    slug: Optional[str] = Field(None, max_length=255)
    content: Optional[str] = None
    excerpt: Optional[str] = None
    cover_image_url: Optional[str] = None
    category_id: Optional[UUID] = None
    tags: Optional[List[str]] = None
    status: Optional[str] = Field(None, pattern="^(draft|published)$")
    is_pinned: Optional[bool] = None
```

### CategoryCreate / CategoryUpdate

```python
class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    slug: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = None

class CategoryUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    slug: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = None
```

### TagCreate

```python
class TagCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    slug: Optional[str] = Field(None, max_length=50)
```

---

*This document describes the API contract. Update status as endpoints are implemented.*
