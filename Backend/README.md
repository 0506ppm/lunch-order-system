<h1 align="center"> 蘭亭池上便當訂購系統</h1>

<p align="center">
  使用 Node.js + Express 建立的簡易便當訂購 API<br/>
</p>

---
## 快速開始

### Clone 專案

```bash
git clone https://github.com/0506ppm/lunch-order-system.git
cd lunch-order-system
```

### 安裝依賴並啟動伺服器

```bash
npm install
npm start
```

伺服器會啟動在 [http://localhost:3000](http://localhost:3000)

---

## API 文件
[https://docs.google.com/document/d/14WYneD5z-UrhUbR2oNvRdVYHlu6yoOn7lsZ-zz-RHIk/edit?usp=sharing](https://docs.google.com/document/d/14WYneD5z-UrhUbR2oNvRdVYHlu6yoOn7lsZ-zz-RHIk/edit?usp=sharing)

### `POST /api/order` — 提交訂單

#### Request Body

```json
{
  "name": "陳",
  "phone": "0912345678",
  "orders": [
    { "item": "雞腿便當", "quantity": 2 },
    { "item": "排骨便當", "quantity": 1 }
  ]
}
```

#### Response 範例

成功：

```json
{
  "success": true,
  "message": "訂單已成功送出！",
  "orderId": "ORD-abc123"
}
```

錯誤：

```json
{
  "success": false,
  "message": "缺少必要欄位（name、phone、orders）"
}
```

---

## 使用技術

| 技術     | 說明             |
|----------|------------------|
| Node.js  | JavaScript 執行環境 |
| Express  | 後端 Web 框架      |
| CORS     | 支援跨來源請求     |
| UUID     | 產生唯一訂單編號   |
