"""
services/project_repository.py
===============================
Repository cho Project entity (Portfolio).
"""

from typing import List, Optional
from uuid import UUID

from app.database import supabase

from app.models.project import ProjectCreate, ProjectUpdate, ProjectResponse


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

    def create(self, project_data: ProjectCreate) -> Optional[dict]:
        """Tạo project mới."""
        data = project_data.model_dump(exclude_none=True)

        response = supabase.table(self.TABLE_NAME).insert(data).execute()

        return response.data[0] if response.data else None

    def update(self, project_id: UUID, project_data: ProjectUpdate) -> Optional[dict]:
        """Cập nhật project theo ID."""
        data = project_data.model_dump(exclude_none=True)

        if not data:
            return self.get_by_id(project_id)

        response = supabase.table(self.TABLE_NAME).update(data).eq(
            "id", str(project_id)
        ).execute()

        return response.data[0] if response.data else None
    
    def delete(self, project_id: UUID) -> bool:
        """Xoá project theo ID."""
        response = supabase.table(self.TABLE_NAME).delete().eq(
            "id", str(project_id)
        ).execute()
        
        return len(response.data) > 0

# Singleton instance
project_repository = ProjectRepository()