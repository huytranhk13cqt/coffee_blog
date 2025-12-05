"""
models/__init__.py
==================
Export tất cả models để import dễ dàng hơn.

Thay vì: from app.models.post import PostResponse
Có thể: from app.models import PostResponse
"""

from app.models.post import (
    PostResponse,
    PostListResponse,
    PostCreate,
    PostUpdate,
    CategoryInfo,
)
from app.models.category import (
    CategoryResponse,
    CategoryCreate,
    CategoryUpdate,
)
from app.models.tag import (
    TagResponse,
    TagCreate,
)

__all__ = [
    # Post models
    "PostResponse",
    "PostListResponse", 
    "PostCreate",
    "PostUpdate",
    "CategoryInfo",
    # Category models
    "CategoryResponse",
    "CategoryCreate",
    "CategoryUpdate",
    # Tag models
    "TagResponse",
    "TagCreate",
]