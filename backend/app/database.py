"""
database.py
===========
Khởi tạo và quản lý Supabase client.
Đây là nơi duy nhất tạo connection đến database.
"""

from supabase import create_client, Client
from app.config import settings


def get_supabase_client() -> Client:
    """
    Tạo và trả về Supabase client.
    
    Returns:
        Client: Supabase client đã được khởi tạo
        
    Raises:
        ValueError: Nếu thiếu SUPABASE_URL hoặc SUPABASE_KEY
    """
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise ValueError(
            "Supabase credentials not found. "
            "Please check your .env file."
        )
    
    return create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_KEY
    )


# Tạo một instance dùng chung (singleton pattern)
# Điều này tránh việc tạo nhiều connections không cần thiết
supabase: Client = get_supabase_client()