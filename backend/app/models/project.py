"""
models/project.py
=================
Pydantic models cho Project entity (Portfolio).
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class ProjectResponse(BaseModel):
    """Response model cho project."""
    id: UUID
    title: str
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    tech_stack: Optional[List[str]] = []
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    sort_order: int = 0
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectCreate(BaseModel):
    """Request model để tạo project mới."""
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    tech_stack: Optional[List[str]] = []
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    sort_order: int = 0
    
class ProjectUpdate(BaseModel):
    """Request model để update project."""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    sort_order: Optional[int] = None