"""
Coffee's Personal Blog - Backend API
=====================================
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from uuid import UUID

from app.config import settings
from app.services.post_repository import post_repository
from app.models import PostResponse, PostListResponse, PostCreate, PostUpdate


# Create FastAPI app
app = FastAPI(
    title="Coffee's Blog API",
    description="Backend API for Coffee's personal blog",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================
# Health Check Endpoints
# ============================================

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
    """Health check."""
    return {"status": "healthy"}


# ============================================
# Posts API Endpoints
# ============================================

@app.get("/api/posts", response_model=PostListResponse)
def get_posts(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    category: Optional[str] = None
):
    """
    Lấy danh sách published posts.
    
    - **page**: Số trang (mặc định 1)
    - **per_page**: Số posts mỗi trang (mặc định 10, tối đa 50)
    - **category**: Filter theo category slug (optional)
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


@app.get("/api/posts/{slug}")
def get_post_by_slug(slug: str):
    """
    Lấy một post theo slug.
    """
    post = post_repository.get_by_slug(slug)
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return post


@app.post("/api/posts", status_code=201)
def create_post(post_data: PostCreate):
    """
    Tạo post mới.
    """
    # TODO: Add authentication check here
    post = post_repository.create(post_data)
    
    if not post:
        raise HTTPException(status_code=400, detail="Failed to create post")
    
    return post


@app.put("/api/posts/{post_id}")
def update_post(post_id: UUID, post_data: PostUpdate):
    """
    Cập nhật post.
    """
    # TODO: Add authentication check here
    post = post_repository.update(post_id, post_data)
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return post


@app.delete("/api/posts/{post_id}", status_code=204)
def delete_post(post_id: UUID):
    """
    Xóa post.
    """
    # TODO: Add authentication check here
    success = post_repository.delete(post_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return None