## 📸 頁面功能簡介

| 畫面 | 功能說明 |
|------|----------|
| `/menu` | 顯示所有菜單品項（圖片、價格），可選擇數量並加入購物車 |
| `/cart` | 顯示已加入的品項，會要求填寫電話號碼，可清空購物車、點選「結帳」送出訂單 |
| `Clerk` 登入 | 使用 Google 登入後，系統會記錄姓名並搭配電話提交訂單 |

---

## ⚙️ 開發環境設定

```bash
# 安裝依賴
npm install

# 啟動開發伺服器（預設 PORT 8000）
npm run dev

```

---

## 📦 與後端串接說明

```
- 前端結帳時會對後端發送 `POST /api/order` 請求  
- 後端會將訂單記錄至 MySQL 的 `Orders`、`OrderItems` 資料表中  
- 傳送的訂單格式如下：

```json
{
  "name": "使用者名稱",
  "phone": "0912345678",
  "orders": [
    { "item": "炸雞腿飯", "quantity": 2 },
    { "item": "瓶裝酸梅湯", "quantity": 1 }
  ]
}
```

---

## 📁 專案結構簡介

```text
Frontend/
├── pages/           # Nuxt 頁面（menu.vue, cart.vue）
├── components/      # 共用元件（TheHeader.vue 等）
├── composables/     # 自定義邏輯（useCart.ts）
├── assets/          # 樣式、字體、圖片等資源
├── public/images/   # 菜單圖片（JPG 檔）
└── README.md        # 本說明文件
```