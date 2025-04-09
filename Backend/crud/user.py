from db.mongodb import db
from schemas.user import UserCreate
from bson import ObjectId

# 建立使用者
async def insert_user(user: UserCreate) -> str:
    result = await db.users.insert_one(user.dict())
    return str(result.inserted_id)

# 透過 ID 取得使用者
async def get_user_by_id(user_id: str):
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return None
    user["id"] = str(user["_id"])
    del user["_id"]
    return user

# 更新使用者
async def update_user_by_id(user_id: str, data: dict):
    result = await db.users.update_one({"_id": ObjectId(user_id)}, {"$set": data})
    return result.modified_count > 0

# 刪除使用者
async def delete_user_by_id(user_id: str):
    result = await db.users.delete_one({"_id": ObjectId(user_id)})
    return result.deleted_count > 0
