// routes/cancel.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// PATCH /api/order/:id/cancel
router.patch('/order/:id/cancel', (req, res) => {
  const orderId = req.params.id;

  // 只能取消「已建立」或「已接受」的訂單
  const sql = `
    UPDATE Orders 
    SET status = '已取消' 
    WHERE order_id = ? 
    AND status IN ('已建立', '已接受')
  `;

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error('❌ 取消訂單失敗：', err);
      return res.status(500).json({ success: false, message: '取消訂單失敗' });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: '無法取消：此訂單可能不存在或已完成'
      });
    }

    res.json({
      success: true,
      message: '訂單已取消',
      order_id: orderId,
      new_status: '已取消'
    });
  });
});

module.exports = router;
