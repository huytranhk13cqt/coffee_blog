---
name: supabase-database-queries
description: Supabase database operations and queries for Coffee Blog. Use when working with PostgreSQL database, writing queries, managing data, handling authentication, or using Supabase storage.
---

# Supabase Database Operations for Coffee Blog

## Database Schema

### Posts Table

```sql
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR NOT NULL,
    slug VARCHAR NOT NULL UNIQUE,
    content TEXT,
    excerpt TEXT,
    cover_image_url VARCHAR,
    status VARCHAR DEFAULT 'draft',
    category_id UUID REFERENCES categories(id),
    reading_time_minutes INTEGER,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP,
    published_at TIMESTAMP
);
```

### Categories Table

```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    slug VARCHAR NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT now()
);
```

### Tags & Post_Tags Tables

```sql
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    slug VARCHAR NOT NULL UNIQUE
);

CREATE TABLE post_tags (
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);
```

## Python Client Setup

```python
# database.py
from supabase import create_client
from app.config import settings

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def get_supabase():
    return supabase
```

## Common Query Patterns

### Select All (with pagination)

```python
# Get paginated posts
response = supabase.table("posts")\
    .select("*")\
    .eq("status", "published")\
    .order("published_at", desc=True)\
    .range(0, 9)\
    .execute()

posts = response.data
```

### Select One

```python
# Get single post by ID
response = supabase.table("posts")\
    .select("*")\
    .eq("id", post_id)\
    .single()\
    .execute()

post = response.data

# Get by slug
response = supabase.table("posts")\
    .select("*")\
    .eq("slug", slug)\
    .single()\
    .execute()
```

### Select with Join

```python
# Posts with category
response = supabase.table("posts")\
    .select("*, categories(*)")\
    .eq("status", "published")\
    .execute()

# Posts with tags (many-to-many)
response = supabase.table("posts")\
    .select("*, post_tags(tags(*))")\
    .eq("id", post_id)\
    .execute()
```

### Insert

```python
# Create new post
new_post = {
    "title": "My Post",
    "slug": "my-post",
    "content": "Post content here",
    "status": "draft"
}

response = supabase.table("posts")\
    .insert(new_post)\
    .execute()

created_post = response.data[0]
```

### Update

```python
# Update post
updates = {
    "title": "Updated Title",
    "updated_at": "now()"
}

response = supabase.table("posts")\
    .update(updates)\
    .eq("id", post_id)\
    .execute()
```

### Delete

```python
# Delete post
response = supabase.table("posts")\
    .delete()\
    .eq("id", post_id)\
    .execute()
```

## Filtering Queries

```python
# Equal
.eq("status", "published")

# Not equal
.neq("status", "draft")

# Greater than
.gt("created_at", "2024-01-01")

# Less than
.lt("reading_time_minutes", 10)

# In list
.in_("category_id", ["uuid1", "uuid2"])

# Like (pattern matching)
.like("title", "%Python%")

# ilike (case insensitive)
.ilike("title", "%python%")

# Is null
.is_("published_at", "null")

# Is not null
.not_.is_("published_at", "null")
```

## Ordering & Pagination

```python
# Order by
.order("created_at", desc=True)
.order("title", desc=False)

# Pagination with range (0-indexed)
.range(0, 9)     # First 10 items
.range(10, 19)   # Next 10 items

# Limit
.limit(5)
```

## Full Text Search

```python
# Search in title and content
response = supabase.table("posts")\
    .select("*")\
    .or_(f"title.ilike.%{query}%,content.ilike.%{query}%")\
    .eq("status", "published")\
    .execute()
```

## File Storage

### Upload Image

```python
# Upload to storage bucket
file_path = f"posts/{post_id}/{filename}"
response = supabase.storage.from_("images").upload(
    file_path,
    file_content,
    {"content-type": content_type}
)

# Get public URL
url = supabase.storage.from_("images").get_public_url(file_path)
```

### Delete File

```python
response = supabase.storage.from_("images").remove([file_path])
```

## Authentication

### Verify Token

```python
# Get user from JWT token
user = supabase.auth.get_user(token)

# Check if authenticated
if user:
    user_id = user.user.id
    email = user.user.email
```

## Error Handling

```python
from postgrest.exceptions import APIError

try:
    response = supabase.table("posts").select("*").execute()
    return response.data
except APIError as e:
    print(f"Database error: {e.message}")
    raise
```

## Common Queries for Blog

### Get Homepage Posts

```python
def get_homepage_posts(page=1, limit=10):
    offset = (page - 1) * limit
    response = supabase.table("posts")\
        .select("id, title, slug, excerpt, cover_image_url, published_at, categories(name, slug)")\
        .eq("status", "published")\
        .order("is_pinned", desc=True)\
        .order("published_at", desc=True)\
        .range(offset, offset + limit - 1)\
        .execute()
    return response.data
```

### Get Posts by Category

```python
def get_posts_by_category(category_slug, page=1, limit=10):
    # First get category ID
    cat = supabase.table("categories")\
        .select("id")\
        .eq("slug", category_slug)\
        .single()\
        .execute()

    if not cat.data:
        return []

    offset = (page - 1) * limit
    response = supabase.table("posts")\
        .select("*")\
        .eq("category_id", cat.data["id"])\
        .eq("status", "published")\
        .order("published_at", desc=True)\
        .range(offset, offset + limit - 1)\
        .execute()
    return response.data
```

### Get Related Posts

```python
def get_related_posts(post_id, category_id, limit=5):
    response = supabase.table("posts")\
        .select("id, title, slug, excerpt")\
        .eq("category_id", category_id)\
        .neq("id", post_id)\
        .eq("status", "published")\
        .limit(limit)\
        .execute()
    return response.data
```
