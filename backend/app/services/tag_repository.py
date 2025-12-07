"""
services/tag_repository.py
===========================
Repository cho Tag entity.
"""

from typing import List, Optional
from uuid import UUID

from app.database import supabase


class TagRepository:
    """Repository class cho Tag operations."""
    
    TABLE_NAME = "tags"
    
    def get_all(self) -> List[dict]:
        """Lấy tất cả tags, sắp xếp theo tên."""
        response = supabase.table(self.TABLE_NAME).select("*").order("name").execute()
        return response.data
    
    def get_by_slug(self, slug: str) -> Optional[dict]:
        """Lấy tag theo slug."""
        response = supabase.table(self.TABLE_NAME).select("*").eq(
            "slug", slug
        ).single().execute()
        return response.data if response.data else None
    
    def get_by_id(self, tag_id: UUID) -> Optional[dict]:
        """Lấy tag theo ID."""
        response = supabase.table(self.TABLE_NAME).select("*").eq(
            "id", str(tag_id)
        ).single().execute()
        return response.data if response.data else None
    
    def get_tags_for_post(self, post_id: UUID) -> List[dict]:
        """Lấy tất cả tags của một post."""
        response = supabase.table("post_tags").select(
            "tags(*)"
        ).eq("post_id", str(post_id)).execute()
        
        # Extract tags from nested response
        tags = []
        for item in response.data:
            if item.get("tags"):
                tags.append(item["tags"])
        return tags
    
    def get_posts_by_tag(self, tag_slug: str, page: int = 1, per_page: int = 10) -> tuple[List[dict], int]:
        """
        Lấy tất cả published posts có tag cụ thể.
        
        Args:
            tag_slug: Slug của tag
            page: Số trang
            per_page: Số posts mỗi trang
            
        Returns:
            Tuple của (list posts, total count)
        """
        # Đầu tiên lấy tag ID
        tag = self.get_by_slug(tag_slug)
        if not tag:
            return [], 0
        
        # Lấy tất cả post_ids có tag này
        post_tags_response = supabase.table("post_tags").select(
            "post_id"
        ).eq("tag_id", tag["id"]).execute()
        
        post_ids = [item["post_id"] for item in post_tags_response.data]
        
        if not post_ids:
            return [], 0
        
        # Query posts với các post_ids
        offset = (page - 1) * per_page
        
        response = supabase.table("posts").select(
            "*, categories(name, slug)",
            count="exact"
        ).in_(
            "id", post_ids
        ).eq(
            "status", "published"
        ).order(
            "published_at", desc=True
        ).range(offset, offset + per_page - 1).execute()
        
        return response.data, response.count or 0


# Singleton instance
tag_repository = TagRepository()