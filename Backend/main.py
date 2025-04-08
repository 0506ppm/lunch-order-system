from fastapi import FastAPI
from routers import user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Auto Scheduling API",
    description="這是自排程系統的後端 API",
    version="0.1.0",
)

# CORS 設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 路由註冊
app.include_router(user.router)

# 健康檢查 endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok"}
