"""
Coffee's Personal Blog - Backend API
=====================================
This is the main entry point for the FastAPI application.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import supabase

# Create the FastAPI application instance
app = FastAPI(
    title="Coffee's Blog API",
    description="Backend API for Coffee's personal blog",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    """Root endpoint - confirms the server is running."""
    return {
        "message": "Welcome to Coffee's Blog API",
        "status": "running",
        "environment": settings.ENVIRONMENT,
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


@app.get("/api/test-db")
def test_database_connection():
    """
    Test endpoint để kiểm tra kết nối với Supabase.
    Thử query bảng categories để xem có hoạt động không.
    """
    try:
        # Query tất cả categories từ database
        response = supabase.table("categories").select("*").execute()
        
        return {
            "status": "connected",
            "message": "Successfully connected to Supabase!",
            "categories_count": len(response.data),
            "categories": response.data
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to connect: {str(e)}"
        }


@app.get("/api/test-posts")
def test_get_posts():
    """
    Test endpoint để lấy posts từ database.
    """
    try:
        # Query posts với thông tin category
        response = supabase.table("posts").select(
            "*, categories(name, slug)"
        ).execute()
        
        return {
            "status": "success",
            "posts_count": len(response.data),
            "posts": response.data
        }
    except Exception as e:
        return {
            "status": "error", 
            "message": f"Failed to fetch posts: {str(e)}"
        }