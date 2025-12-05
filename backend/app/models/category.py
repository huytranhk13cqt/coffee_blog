"""
models/category.py
==================
Pydantic models cho Category entity.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class CategoryResponse(BaseModel):
    """Response model cho category."""
    id: UUID
    name: str
    slug: str
    description: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class CategoryCreate(BaseModel):
    """Request model để tạo category mới."""
    name: str = Field(..., min_length=1, max_length=100)
    slug: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = None


class CategoryUpdate(BaseModel):
    """Request model để update category."""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    slug: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = None