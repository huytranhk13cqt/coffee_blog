"""
config.py
=========
Load và validate environment variables.
Tập trung tất cả config ở một nơi để dễ quản lý.
"""

import os
from dotenv import load_dotenv

# Load biến môi trường từ file .env
load_dotenv()


class Settings:
    """
    Class chứa tất cả settings của application.
    Đọc từ environment variables, có giá trị mặc định nếu không tìm thấy.
    """
    
    # Supabase
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_SERVICE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY", "")
    
    # JWT
    JWT_SECRET: str = os.getenv("JWT_SECRET", "your-secret-key")
    
    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Validation: Kiểm tra các biến bắt buộc
    @classmethod
    def validate(cls):
        """Kiểm tra xem các config quan trọng đã được set chưa."""
        errors = []
        
        if not cls.SUPABASE_URL:
            errors.append("SUPABASE_URL is missing")
        if not cls.SUPABASE_KEY:
            errors.append("SUPABASE_KEY is missing")
            
        if errors:
            raise ValueError(f"Missing environment variables: {', '.join(errors)}")
        
        return True


# Tạo instance để dùng trong toàn bộ app
settings = Settings()