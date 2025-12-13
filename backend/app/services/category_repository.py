"""
services/category_repository.py
================================
Repository cho Category entity.
"""

from typing import List, Optional
from uuid import UUID
from datetime import datetime

from app.database import supabase
from app.models import CategoryResponse, CategoryCreate, CategoryUpdate


class CategoryRepository:
    """Repository class cho Category operations."""
    
    TABLE_NAME = "categories"
    
    # ============================================
    # READ Operations
    # ============================================
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
    
    # ============================================
    # WRITE Operations
    # ============================================
    def create(self, category_data:CategoryCreate) -> dict:
        data = category_data.model_dump(exclude_none=True)
        
        # Auto-generated slug if not provided
        if not data.get("slug"):
            data["slug"] = self._generate_slug(data["name"])
        
        response = supabase.table(self.TABLE_NAME).insert(data).execute()
        
        return response.data[0] if response.data else None
    
    def update(self, category_id: UUID, category_data: CategoryUpdate) -> Optional[dict]:
        data = category_data.model_dump(exclude_none=True)
        
        if not data:
            return self.get_by_id(category_id)
        
        response = supabase.table(self.TABLE_NAME).update(data).eq("id",str(category_id)).execute()
        
        return response.data[0] if response.data else None
    
    def delete(self, category_id: UUID) -> bool:
        
        response = supabase.table(self.TABLE_NAME).delete().eq("id",str(category_id)).execute()
        
        return len(response.data) > 0
    
    # ============================================
    # Helper Methods
    # ============================================
    def _generate_slug(self, title: str) -> str:
        """
        Generate URL-friendly slug từ title.
        Ví dụ: "Hello World!" -> "hello-world"
        """
        import re
        
        # Lowercase
        slug = title.lower()
        
        # Replace spaces với dashes
        slug = re.sub(r'\s+', '-', slug)
        
        # Remove special characters
        slug = re.sub(r'[^a-z0-9\-]', '', slug)
        
        # Remove multiple dashes
        slug = re.sub(r'-+', '-', slug)
        
        # Remove leading/trailing dashes
        slug = slug.strip('-')
        
        return slug
    


# Singleton instance
category_repository = CategoryRepository()