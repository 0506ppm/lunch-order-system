from fastapi import APIRouter, HTTPException
from crud import user as user_crud
from schemas.user import UserCreate
from typing import Optional

router = APIRouter(prefix="/users", tags=["users"])

# 建立使用者
@router.post("/create")
async def create_user(user: UserCreate):
    user_id = await user_crud.insert_user(user)
    return {"id": user_id}

# 查詢使用者
@router.get("/{user_id}")
async def get_user(user_id: str):
    user = await user_crud.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# 更新使用者
@router.put("/{user_id}")
async def update_user(user_id: str, data: dict):
    success = await user_crud.update_user_by_id(user_id, data)
    if not success:
        raise HTTPException(status_code=404, detail="User not found or no changes made")
    return {"success": True}

# 刪除使用者
@router.delete("/{user_id}")
async def delete_user(user_id: str):
    success = await user_crud.delete_user_by_id(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"deleted": True}
