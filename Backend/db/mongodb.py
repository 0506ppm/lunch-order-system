from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_URI)

# 指定使用哪個資料庫
db = client["auto_scheduling_db"]
