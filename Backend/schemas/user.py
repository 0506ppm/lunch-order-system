# schemas/user.py

from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    clerk_id: str
    email: EmailStr
    name: str

class UserInDB(UserCreate):
    id: str  # MongoDB 的 ObjectId 被轉成字串後傳回

class UserPublic(BaseModel):
    id: str
    name: str
