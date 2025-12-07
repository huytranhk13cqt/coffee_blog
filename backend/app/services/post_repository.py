"""
services/post_repository.py
===========================
Repository cho Post entity.

Repository Pattern:
- Tập trung tất cả database operations cho một entity
- API routes chỉ cần gọi repository methods
- Dễ test, dễ thay đổi database sau này
"""

from typing import List, Optional
from uuid import UUID
from datetime import datetime

from app.database import supabase
from app.models import PostResponse, PostCreate, PostUpdate

class PostRepository:
    """
    Repository class cho Post operations.
    Tất cả database queries liên quan đến posts đều ở đây.
    """
    
    TABLE_NAME = "posts"
    
    # ============================================
    # READ Operations
    # ============================================
    def get_all_published(
        self,
        page: int = 1,
        per_page: int = 10,
        category_slug: Optional[str] = None
    ) -> tuple[List[dict], int]:
        """
        Lấy tất cả published posts với pagination.
        
        Args:
            page: Số trang (bắt đầu từ 1)
            per_page: Số posts mỗi trang
            category_slug: Filter theo category (optional)
            
        Returns:
            Tuple của (list posts, total count)
        """
        # Calculate offset
        offset = (page - 1) * per_page
        
        # Nếu có category filter
        if category_slug:
            # Đầu tiên, lấy category_id từ slug
            from app.services.category_repository import category_repository
            category = category_repository.get_by_slug(category_slug)
            
            if not category:
                return [], 0
            
            # Query với category_id
            response = supabase.table(self.TABLE_NAME).select(
                "*, categories(name, slug)",
                count="exact"
            ).eq(
                "status", "published"
            ).eq(
                "category_id", category["id"]
            ).order(
                "published_at", desc=True
            ).range(offset, offset + per_page - 1).execute()
        else:
            # Query tất cả published posts
            response = supabase.table(self.TABLE_NAME).select(
                "*, categories(name, slug)",
                count="exact"
            ).eq(
                "status", "published"
            ).order(
                "published_at", desc=True
            ).range(offset, offset + per_page - 1).execute()
        
        return response.data, response.count or 0
    
    def get_all_admin(self, page: int = 1, per_page: int = 20) -> tuple[List[dict], int]:
        """
        Lấy tất cả posts cho admin (cả draft và published).
        """
        offset = (page - 1) * per_page
        
        response = supabase.table(self.TABLE_NAME).select(
            "*, categories(name, slug)",
            count="exact"
        ).order("created_at", desc=True).range(offset, offset + per_page - 1).execute()
        
        return response.data, response.count or 0
    
    def get_by_slug(self, slug: str) -> Optional[dict]:
        """
        Lấy một post theo slug.
        
        Args:
            slug: URL-friendly identifier của post
            
        Returns:
            Post data hoặc None nếu không tìm thấy
        """
        response = supabase.table(self.TABLE_NAME).select(
            "*, categories(name, slug)"
        ).eq("slug", slug).single().execute()
        
        return response.data if response.data else None
    
    def get_by_id(self, post_id: UUID) -> Optional[dict]:
        """Lấy một post theo ID."""
        response = supabase.table(self.TABLE_NAME).select(
            "*, categories(name, slug)"
        ).eq("id", str(post_id)).single().execute()
        
        return response.data if response.data else None
    
    # ============================================
    # WRITE Operations
    # ============================================
    
    def create(self, post_data: PostCreate) -> dict:
        """
        Tạo post mới.
        
        Args:
            post_data: Data để tạo post
            
        Returns:
            Post vừa được tạo
        """
        # Prepare data
        data = post_data.model_dump(exclude={"tags"}, exclude_none=True)
        
        # Auto-generate slug if not provided
        if not data.get("slug"):
            data["slug"] = self._generate_slug(data["title"])
        
        # Set published_at if publishing
        if data.get("status") == "published":
            data["published_at"] = datetime.utcnow().isoformat()
        
        # Convert UUID to string
        if data.get("category_id"):
            data["category_id"] = str(data["category_id"])
        
        # Insert
        response = supabase.table(self.TABLE_NAME).insert(data).execute()
        
        return response.data[0] if response.data else None
    
    def update(self, post_id: UUID, post_data: PostUpdate) -> Optional[dict]:
        """
        Cập nhật post.
        
        Args:
            post_id: ID của post cần update
            post_data: Data cần update
            
        Returns:
            Post sau khi update hoặc None nếu không tìm thấy
        """
        # Chỉ lấy những fields có giá trị (không None)
        data = post_data.model_dump(exclude={"tags"}, exclude_none=True)
        
        if not data:
            # Không có gì để update
            return self.get_by_id(post_id)
        
        # Handle publishing
        if data.get("status") == "published":
            # Check if this is first time publishing
            existing = self.get_by_id(post_id)
            if existing and not existing.get("published_at"):
                data["published_at"] = datetime.utcnow().isoformat()
        
        # Convert UUID to string
        if data.get("category_id"):
            data["category_id"] = str(data["category_id"])
        
        # Update
        response = supabase.table(self.TABLE_NAME).update(data).eq(
            "id", str(post_id)
        ).execute()
        
        return response.data[0] if response.data else None
    
    def delete(self, post_id: UUID) -> bool:
        """
        Xóa post.
        
        Args:
            post_id: ID của post cần xóa
            
        Returns:
            True nếu xóa thành công, False nếu không tìm thấy
        """
        response = supabase.table(self.TABLE_NAME).delete().eq(
            "id", str(post_id)
        ).execute()
        
        return len(response.data) > 0 if response.data else False
    
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
    
    def get_post_with_tags(self, slug: str) -> Optional[dict]:
        """
        Lấy post với đầy đủ thông tin bao gồm tags.
        """
        # Lấy post
        post = self.get_by_slug(slug)
        if not post:
            return None
        
        # Lấy tags cho post
        from app.services.tag_repository import tag_repository
        tags = tag_repository.get_tags_for_post(post["id"])
        post["tags"] = tags
        
        return post


# Singleton instance
post_repository = PostRepository()