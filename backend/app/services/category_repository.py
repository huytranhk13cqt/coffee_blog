"""
services/category_repository.py
================================
Repository cho Category entity.
"""

from typing import List, Optional
from uuid import UUID

from app.database import supabase


class CategoryRepository:
    """Repository class cho Category operations."""
    
    TABLE_NAME = "categories"
    
    def get_all(self) -> List[dict]:
        """Lấy tất cả categories."""
        response = supabase.table(self.TABLE_NAME).select("*").order("name").execute()
        return response.data
    
    def get_by_slug(self, slug: str) -> Optional[dict]:
        """Lấy category theo slug."""
        response = supabase.table(self.TABLE_NAME).select("*").eq(
            "slug", slug
        ).single().execute()
        return response.data if response.data else None
    
    def get_by_id(self, category_id: UUID) -> Optional[dict]:
        """Lấy category theo ID."""
        response = supabase.table(self.TABLE_NAME).select("*").eq(
            "id", str(category_id)
        ).single().execute()
        return response.data if response.data else None


# Singleton instance
category_repository = CategoryRepository()