from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException
from app.database import supabase

# initialize HTTPBearer instance
security = HTTPBearer()

# create skeleton of function
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        response = supabase.auth.get_user(token)
        if response.user:
            return response.user
        raise HTTPException(status_code=401,detail="Unauthorized")
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid / Expired token")