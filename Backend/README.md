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

---

## 使用技術

| 技術     | 說明             |
|----------|------------------|
| Node.js  | JavaScript 執行環境 |
| Express  | 後端 Web 框架      |
| CORS     | 支援跨來源請求     |
| UUID     | 產生唯一訂單編號   |



## 📦 資料庫初始化（for local 測試用）

```sql
CREATE DATABASE lunch;
USE lunch;

CREATE TABLE Menu (
  dish_id INT AUTO_INCREMENT PRIMARY KEY,
  dish_name VARCHAR(100) NOT NULL,
  price INT NOT NULL
);

CREATE TABLE Orders (
  order_id VARCHAR(50) PRIMARY KEY,
  customer_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  total_price INT NOT NULL,
  status VARCHAR(20) DEFAULT '已建立',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE OrderItems (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50),
  menu_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id),
  FOREIGN KEY (menu_id) REFERENCES Menu(dish_id)
);

INSERT INTO Menu (dish_name, price) VALUES
  ('菜飯', 75),
  ('炸花枝排飯', 80),
  ('招牌飯', 95),
  ('滷雞腿飯', 105),
  ('控肉飯', 105),
  ('檸檬雞排飯', 95),
  ('炸蝦捲飯', 100),
  ('炸排骨飯', 105),
  ('蒲燒鯛魚飯', 110),
  ('炸雞腿飯', 135),
  ('炸鱈魚飯', 110),
  ('瓶裝酸梅湯', 80);


