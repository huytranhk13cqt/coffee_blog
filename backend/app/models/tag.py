"""
models/tag.py
=============
Pydantic models cho Tag entity.
"""

from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID


class TagResponse(BaseModel):
    """Response model cho tag."""
    id: UUID
    name: str
    slug: str

    class Config:
        from_attributes = True


class TagCreate(BaseModel):
    """Request model để tạo tag mới."""
    name: str = Field(..., min_length=1, max_length=50)
    slug: Optional[str] = Field(None, max_length=50)