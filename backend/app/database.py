import os
import time
from functools import wraps
from supabase import create_client, Client
from dotenv import load_dotenv
import httpx

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Retry decorator for transient connection errors
def with_retry(max_retries=3, delay=0.5):
    """Decorator to retry database operations on transient failures."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except (httpx.RemoteProtocolError, httpx.ConnectError) as e:
                    last_exception = e
                    if attempt < max_retries - 1:
                        time.sleep(delay * (attempt + 1))  # Exponential backoff
                    continue
            raise last_exception
        return wrapper
    return decorator