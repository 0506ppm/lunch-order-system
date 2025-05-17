// routes/order.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // 用來產生 orderId

router.post('/', (req, res) => {
  const { name, phone, orders } = req.body;

  console.log('✅ Express 收到訂單:', req.body)

  // 基本驗證
  if (!name || !phone || !orders || !Array.isArray(orders)) {
    return res.status(400).json({
      success: false,
      message: '缺少必要欄位'
    });
  }

  // 這邊可以寫處理邏輯（例如記錄到資料庫）
  const orderId = 'ORD-' + uuidv4().split('-')[0]; // 簡化版 ID

  return res.json({
    success: true,
    message: '訂單已成功送出！',
    orderId
  });
});

module.exports = router;

