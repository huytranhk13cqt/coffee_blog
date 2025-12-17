---
name: fastapi-backend-patterns
description: FastAPI backend patterns and conventions for Coffee Blog API. Use when creating API endpoints, writing Pydantic models, handling authentication, building services, or working with the backend.
---

# FastAPI Backend Patterns for Coffee Blog

## Project Structure

```
backend/app/
├── main.py           # App entry, router registration
├── config.py         # Environment variables
├── database.py       # Supabase client setup
├── models/           # Pydantic request/response schemas
├── routes/           # API endpoint handlers
├── services/         # Business logic layer
├── middleware/       # Auth, CORS, logging
└── utils/            # Helper functions
```

## Endpoint Patterns

### Standard CRUD Endpoints
```
GET    /api/posts              # List all
GET    /api/posts/{id}         # Get one
POST   /api/posts              # Create (auth required)
PUT    /api/posts/{id}         # Update (auth required)
DELETE /api/posts/{id}         # Delete (auth required)
```

### Route Template
```python
from fastapi import APIRouter, HTTPException, Depends
from app.models.post import PostCreate, PostResponse
from app.services.post_service import PostService

router = APIRouter(prefix="/api/posts", tags=["posts"])

@router.get("/", response_model=list[PostResponse])
async def list_posts(
    page: int = 1,
    limit: int = 10,
    service: PostService = Depends()
):
    """Get all published posts with pagination."""
    return await service.get_all(page=page, limit=limit)

@router.get("/{post_id}", response_model=PostResponse)
async def get_post(post_id: str, service: PostService = Depends()):
    """Get a single post by ID."""
    post = await service.get_by_id(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/", response_model=PostResponse, status_code=201)
async def create_post(
    data: PostCreate,
    service: PostService = Depends(),
    user: User = Depends(get_current_user)
):
    """Create a new post. Requires authentication."""
    return await service.create(data, user_id=user.id)
```

## Pydantic Models

### Schema Template
```python
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# Request schema (what client sends)
class PostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    content: str
    excerpt: Optional[str] = None
    category_id: Optional[str] = None
    tags: list[str] = []
    status: str = "draft"

# Response schema (what API returns)
class PostResponse(BaseModel):
    id: str
    title: str
    slug: str
    content: str
    excerpt: Optional[str]
    cover_image_url: Optional[str]
    status: str
    created_at: datetime
    updated_at: Optional[datetime]
    published_at: Optional[datetime]

    class Config:
        from_attributes = True

# Update schema (partial updates)
class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    status: Optional[str] = None
```

## Service Layer

### Service Template
```python
from app.database import get_supabase
from app.models.post import PostCreate, PostUpdate

class PostService:
    def __init__(self):
        self.supabase = get_supabase()
        self.table = "posts"

    async def get_all(self, page: int = 1, limit: int = 10):
        offset = (page - 1) * limit
        response = self.supabase.table(self.table)\
            .select("*")\
            .eq("status", "published")\
            .order("published_at", desc=True)\
            .range(offset, offset + limit - 1)\
            .execute()
        return response.data

    async def get_by_id(self, post_id: str):
        response = self.supabase.table(self.table)\
            .select("*")\
            .eq("id", post_id)\
            .single()\
            .execute()
        return response.data

    async def create(self, data: PostCreate, user_id: str):
        post_data = data.model_dump()
        post_data["slug"] = self._generate_slug(data.title)
        response = self.supabase.table(self.table)\
            .insert(post_data)\
            .execute()
        return response.data[0]

    def _generate_slug(self, title: str) -> str:
        import re
        slug = title.lower()
        slug = re.sub(r'[^a-z0-9]+', '-', slug)
        return slug.strip('-')
```

## Response Format

### Standard Response
```python
from pydantic import BaseModel
from typing import Any, Optional

class APIResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    message: Optional[str] = None
    error: Optional[str] = None

# Usage in route
@router.get("/posts")
async def list_posts():
    posts = await service.get_all()
    return APIResponse(success=True, data=posts)
```

## Authentication

### Protected Route
```python
from app.middleware.auth import get_current_user

@router.post("/posts")
async def create_post(
    data: PostCreate,
    user: User = Depends(get_current_user)  # Requires auth
):
    # user is available here
    return await service.create(data, user.id)
```

### Auth Middleware
```python
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

security = HTTPBearer()

async def get_current_user(token: str = Depends(security)):
    try:
        # Verify JWT with Supabase
        user = supabase.auth.get_user(token.credentials)
        return user
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
```

## Error Handling

```python
from fastapi import HTTPException

# Not found
raise HTTPException(status_code=404, detail="Resource not found")

# Bad request
raise HTTPException(status_code=400, detail="Invalid input")

# Unauthorized
raise HTTPException(status_code=401, detail="Not authenticated")

# Forbidden
raise HTTPException(status_code=403, detail="Not authorized")
```

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Routes | plural_noun.py | `posts.py` |
| Services | singular_service.py | `post_service.py` |
| Models | singular.py | `post.py` |
| Utils | descriptive.py | `slug_generator.py` |

## Common Utilities

### Slug Generator
```python
# utils/slug.py
import re
from datetime import datetime

def generate_slug(title: str) -> str:
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    return slug.strip('-')

def generate_unique_slug(title: str) -> str:
    base_slug = generate_slug(title)
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    return f"{base_slug}-{timestamp}"
```

### Reading Time
```python
# utils/reading_time.py
def calculate_reading_time(content: str, wpm: int = 200) -> int:
    word_count = len(content.split())
    return max(1, round(word_count / wpm))
```
