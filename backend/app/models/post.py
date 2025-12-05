"""
models/post.py
==============
Pydantic models cho Post entity.

Pydantic giúp:
- Validate data (kiểm tra đúng format, đúng type)
- Serialize/Deserialize (chuyển đổi giữa Python object và JSON)
- Auto-generate API documentation
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


# ============================================
# Response Models (data trả về từ API)
# ============================================

class CategoryInfo(BaseModel):
    """Thông tin category kèm theo post (simplified)."""
    name: str
    slug: str


class PostResponse(BaseModel):
    """
    Model cho response khi trả về một post.
    Đây là "hình dạng" của data mà frontend sẽ nhận được.
    """
    id: UUID
    title: str
    slug: str
    content: Optional[str] = None
    excerpt: Optional[str] = None
    cover_image_url: Optional[str] = None
    status: str
    category_id: Optional[UUID] = None
    categories: Optional[CategoryInfo] = None  # Nested category info
    reading_time_minutes: Optional[int] = None
    is_pinned: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None
    published_at: Optional[datetime] = None

    class Config:
        """Pydantic config."""
        from_attributes = True  # Cho phép tạo từ ORM objects


class PostListResponse(BaseModel):
    """Response cho danh sách posts (có pagination info)."""
    posts: List[PostResponse]
    total: int
    page: int
    per_page: int


# ============================================
# Request Models (data gửi đến API)
# ============================================

class PostCreate(BaseModel):
    """
    Model cho request tạo post mới.
    Chỉ chứa các fields mà user cần gửi lên.
    """
    title: str = Field(..., min_length=1, max_length=255)
    slug: Optional[str] = Field(None, max_length=255)
    content: Optional[str] = None
    excerpt: Optional[str] = None
    cover_image_url: Optional[str] = None
    category_id: Optional[UUID] = None
    tags: Optional[List[str]] = []  # List of tag names
    status: str = Field(default="draft", pattern="^(draft|published)$")

    class Config:
        json_schema_extra = {
            "example": {
                "title": "My First Post",
                "content": "# Hello World\n\nThis is my first post.",
                "status": "draft"
            }
        }


class PostUpdate(BaseModel):
    """
    Model cho request cập nhật post.
    Tất cả fields đều optional - chỉ update những gì được gửi.
    """
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    slug: Optional[str] = Field(None, max_length=255)
    content: Optional[str] = None
    excerpt: Optional[str] = None
    cover_image_url: Optional[str] = None
    category_id: Optional[UUID] = None
    tags: Optional[List[str]] = None
    status: Optional[str] = Field(None, pattern="^(draft|published)$")
    is_pinned: Optional[bool] = None