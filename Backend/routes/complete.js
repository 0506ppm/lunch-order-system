// routes/complete.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// PATCH /api/order/:id/complete
router.patch('/order/:id/complete', (req, res) => {
  const orderId = req.params.id;

  const sql = `UPDATE Orders SET status = '已完成' WHERE order_id = ? AND status = '已接受'`;
  db.query(sql, [orderId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '完成訂單失敗' });

    if (result.affectedRows === 0) {
      return res.status(400).json({ success: false, message: '此訂單不是「已接受」，無法完成' });
    }

    res.json({
      success: true,
      message: '訂單已完成',
      order_id: orderId,
      new_status: '已完成'
    });
  });
});

module.exports = router;
