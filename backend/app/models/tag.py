from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID


class TagResponse(BaseModel):
    id: UUID
    name: str
    slug: str

    class Config:
        from_attributes = True

class TagCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    slug: Optional[str] = Field(None, max_length=50)
    
class TagUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=50)
    slug: Optional[str] = Field(None, max_length=50)