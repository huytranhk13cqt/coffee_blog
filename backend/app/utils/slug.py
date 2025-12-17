import re

def generate_slug(text: str) -> str:
    """Generate a URL-friendly slug from the given text."""
    # Lowercase
    slug = text.lower()
    
    # Replace spaces với dashes
    slug = re.sub(r'\s+', '-', slug)
    
    # Remove special characters
    slug = re.sub(r'[^a-z0-9\-]', '', slug)
    
    # Remove multiple dashes
    slug = re.sub(r'-+', '-', slug)
    
    # Remove leading/trailing dashes
    slug = slug.strip('-')
    
    return slug