"""
services/project_repository.py
===============================
Repository cho Project entity (Portfolio).
"""

from typing import List, Optional
from uuid import UUID

from app.database import supabase


class ProjectRepository:
    """Repository class cho Project operations."""
    
    TABLE_NAME = "projects"
    
    def get_all(self) -> List[dict]:
        """
        Lấy tất cả projects, sắp xếp theo sort_order.
        """
        response = supabase.table(self.TABLE_NAME).select("*").order(
            "sort_order"
        ).order(
            "created_at", desc=True
        ).execute()
        
        return response.data
    
    def get_by_id(self, project_id: UUID) -> Optional[dict]:
        """Lấy project theo ID."""
        response = supabase.table(self.TABLE_NAME).select("*").eq(
            "id", str(project_id)
        ).single().execute()
        
        return response.data if response.data else None


# Singleton instance
project_repository = ProjectRepository()