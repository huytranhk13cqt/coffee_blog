"""
Coffee's Personal Blog - Backend API
=====================================
"""

import re
from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from uuid import UUID

from app.config import settings
from app.database import supabase
from app.services.post_repository import post_repository
from app.services.category_repository import category_repository
from app.services.tag_repository import tag_repository
from app.services.project_repository import project_repository

from app.models import (
    PostResponse,
    PostListResponse,
    PostCreate,
    PostUpdate,
    CategoryResponse,
    CategoryCreate,
    CategoryUpdate,
    TagCreate,
    TagResponse,
    TagUpdate,
    ProjectResponse,
    ProjectCreate,
    ProjectUpdate,
)

from app.middlewares.auth import get_current_user


# =============================================================================
# App Configuration
# =============================================================================

app = FastAPI(
    title="Coffee's Blog API",
    description="Backend API for Coffee's personal blog",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================
# Health Check Endpoints
# =============================================================================

@app.get("/")
def read_root():
    """Root endpoint."""
    return {
        "message": "Welcome to Coffee's Blog API",
        "status": "running",
        "version": "0.1.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


# =============================================================================
# Categories API Endpoints
# =============================================================================

# ----- READ (Public) -----

@app.get("/api/categories", response_model=List[CategoryResponse])
def get_categories():
    """Get all categories."""
    categories = category_repository.get_all()
    return categories


@app.get("/api/categories/{slug}", response_model=CategoryResponse)
def get_category_by_slug(slug: str):
    """Get a single category by slug."""
    category = category_repository.get_by_slug(slug)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


# ----- WRITE (Protected) -----

@app.post("/api/categories", status_code=201, response_model=CategoryResponse)
def create_category(category_data: CategoryCreate, current_user=Depends(get_current_user)):
    """Create a new category. Requires authentication."""
    category = category_repository.create(category_data)
    if not category:
        raise HTTPException(status_code=400, detail="Failed to create category")
    return category


@app.put("/api/categories/{category_id}", response_model=CategoryResponse)
def update_category(category_id: UUID, category_data: CategoryUpdate, current_user=Depends(get_current_user)):
    """Update an existing category. Requires authentication."""
    category = category_repository.update(category_id, category_data)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@app.delete("/api/categories/{category_id}", status_code=204)
def delete_category(category_id: UUID, current_user=Depends(get_current_user)):
    """Delete a category. Requires authentication."""
    success = category_repository.delete(category_id)
    if not success:
        raise HTTPException(status_code=404, detail="Category not found")
    return None


# =============================================================================
# Posts API Endpoints
# =============================================================================

# ----- READ (Public) -----

@app.get("/api/posts", response_model=PostListResponse)
def get_posts(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    category: Optional[str] = None
):
    """
    Get paginated list of published posts.

    - **page**: Page number (default: 1)
    - **per_page**: Posts per page (default: 10, max: 50)
    - **category**: Filter by category slug (optional)
    """
    posts, total = post_repository.get_all_published(
        page=page,
        per_page=per_page,
        category_slug=category
    )
    return PostListResponse(
        posts=posts,
        total=total,
        page=page,
        per_page=per_page
    )


@app.get("/api/posts/search")
def search_posts(
    q: str = Query(..., min_length=1, description="Search query"),
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50)
):
    """
    Search posts by keyword.
    Searches in title, excerpt, and content.
    """
    posts, total = post_repository.search(
        query=q,
        page=page,
        per_page=per_page
    )
    return {
        "query": q,
        "posts": posts,
        "total": total,
        "page": page,
        "per_page": per_page
    }


@app.get("/api/posts/{slug}", response_model=PostResponse)
def get_post_by_slug(slug: str):
    """Get a single post by slug."""
    post = post_repository.get_by_slug(slug)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@app.get("/api/posts/{slug}/tags")
def get_post_tags(slug: str):
    """Get all tags for a specific post."""
    post = post_repository.get_by_slug(slug)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    tags = tag_repository.get_tags_for_post(post["id"])
    return tags


# ----- WRITE (Protected) -----

@app.post("/api/posts", status_code=201, response_model=PostResponse)
def create_post(post_data: PostCreate, current_user=Depends(get_current_user)):
    """Create a new post. Requires authentication."""
    post = post_repository.create(post_data)
    if not post:
        raise HTTPException(status_code=400, detail="Failed to create post")
    return post


@app.put("/api/posts/{post_id}", response_model=PostResponse)
def update_post(post_id: UUID, post_data: PostUpdate, current_user=Depends(get_current_user)):
    """Update an existing post. Requires authentication."""
    post = post_repository.update(post_id, post_data)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@app.delete("/api/posts/{post_id}", status_code=204)
def delete_post(post_id: UUID, current_user=Depends(get_current_user)):
    """Delete a post. Requires authentication."""
    success = post_repository.delete(post_id)
    if not success:
        raise HTTPException(status_code=404, detail="Post not found")
    return None


# =============================================================================
# Tags API Endpoints
# =============================================================================

# ----- READ (Public) -----

@app.get("/api/tags", response_model=List[TagResponse])
def get_tags():
    """Get all tags."""
    tags = tag_repository.get_all()
    return tags


@app.get("/api/tags/{slug}", response_model=TagResponse)
def get_tag_by_slug(slug: str):
    """Get a single tag by slug."""
    tag = tag_repository.get_by_slug(slug)
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return tag


@app.get("/api/tags/{slug}/posts")
def get_posts_by_tag(
    slug: str,
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50)
):
    """Get all posts with a specific tag."""
    tag = tag_repository.get_by_slug(slug)
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")

    posts, total = tag_repository.get_posts_by_tag(
        tag_slug=slug,
        page=page,
        per_page=per_page
    )
    return {
        "tag": tag,
        "posts": posts,
        "total": total,
        "page": page,
        "per_page": per_page
    }

@app.post("/api/tags", status_code=201, response_model=TagResponse)
def create_tag(tag_data: TagCreate, current_user=Depends(get_current_user)):
    """Create a new tag. Requires authentication."""
    tag = tag_repository.create(tag_data)
    if not tag:
        raise HTTPException(status_code=400, detail="Failed to create tag")
    return tag

@app.put("/api/tags/{tag_id}", response_model=TagResponse)
def update_tag(tag_id: UUID, tag_data: TagUpdate, current_user=Depends(get_current_user)):
    """Update an existing tag. Requires authentication."""
    tag = tag_repository.update(tag_id, tag_data)
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return tag

@app.delete("/api/tags/{tag_id}", status_code=204)
def delete_tag(tag_id: UUID, current_user=Depends(get_current_user)):
    """Delete a tag. Requires authentication."""
    success = tag_repository.delete(tag_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tag not found")
    return None

# =============================================================================
# Projects API Endpoints (Portfolio)
# =============================================================================

# ----- READ (Public) -----

@app.get("/api/projects", response_model=List[ProjectResponse])
def get_projects():
    """Get all projects for portfolio."""
    projects = project_repository.get_all()
    return projects

@app.get("/api/projects/{project_id}", response_model=ProjectResponse)
def get_project_by_id(project_id: UUID):            
    """Get a single project by ID."""
    project = project_repository.get_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.post("/api/projects", status_code=201, response_model=ProjectResponse)
def create_project(project_data: ProjectCreate, current_user=Depends(get_current_user)):
    """Create a new project. Requires authentication."""
    project = project_repository.create(project_data)
    if not project:
        raise HTTPException(status_code=400, detail="Failed to create project")
    return project

@app.put("/api/projects/{project_id}", response_model=ProjectResponse)
def update_project(project_id: UUID, project_data: ProjectUpdate, current_user=Depends(get_current_user)):
    """Update an existing project. Requires authentication."""
    project = project_repository.update(project_id, project_data)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.delete("/api/projects/{project_id}", status_code=204)
def delete_project(project_id: UUID, current_user=Depends(get_current_user)):
    """Delete a project. Requires authentication."""
    success = project_repository.delete(project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return None

# =============================================================================
# Gallery API Endpoints
# =============================================================================

# ----- READ (Public) -----

@app.get("/api/gallery")
def get_gallery_images():
    """
    Get all images from published posts.
    Extracts from cover_image_url and content (markdown images).
    """
    response = supabase.table("posts").select("*").eq("status", "published").execute()
    posts = response.data

    images = []

    for post in posts:
        # 1. Cover image
        if post.get("cover_image_url"):
            images.append({
                "url": post["cover_image_url"],
                "alt": post["title"],
                "post_title": post["title"],
                "post_slug": post["slug"],
                "type": "cover"
            })

        # 2. Images in content (markdown format: ![alt](url))
        content = post.get("content", "")
        if content:
            pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
            matches = re.findall(pattern, content)

            for alt, url in matches:
                images.append({
                    "url": url,
                    "alt": alt or post["title"],
                    "post_title": post["title"],
                    "post_slug": post["slug"],
                    "type": "content"
                })

    return {
        "images": images,
        "total": len(images)
    }
