"""
這是一個Clerk JWT 保護的單元測試，測試 get_current_clerk_user 函式的行為。
1. 在 import 前設置假環境變數
2. 模擬不同 credentials 狀況並驗證回應
"""

import os
# 設定假的 JWKs 與 Issuer
os.environ["CLERK_JWKS_URL"] = "https://example.com/jwks"
os.environ["CLERK_ISSUER"]  = "https://example.com/issuer"

import pytest
from fastapi import HTTPException, status
from db.security import get_current_clerk_user

# 模擬 Clerk 回傳的 credentials 物件
class DummyCred:
    def __init__(self, decoded):
        # 當 clerk 驗證成功，ClerkHTTPBearer 會把解碼後的 payload 放到 .decoded
        self.decoded = decoded

@pytest.mark.asyncio
async def test_no_credentials():
    # credentials = None 時應該丟 401
    with pytest.raises(HTTPException) as exc:
        await get_current_clerk_user(credentials=None)
    assert exc.value.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.asyncio
async def test_invalid_credentials():
    # credentials.decoded = None 時也應該丟 401
    bad = DummyCred(decoded=None)
    with pytest.raises(HTTPException) as exc:
        await get_current_clerk_user(credentials=bad)
    assert exc.value.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.asyncio
async def test_valid_credentials():
    # credentials.decoded 有值時，直接回傳 payload
    payload = {"sub": "user_abc123", "email": "you@example.com"}
    good = DummyCred(decoded=payload)
    result = await get_current_clerk_user(credentials=good)
    assert result == payload