// routes/accept.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// PATCH /api/order/:id/accept
router.patch('/order/:id/accept', (req, res) => {
  const orderId = req.params.id;

  const sql = `UPDATE Orders SET status = '已接受' WHERE order_id = ? AND status = '已建立'`;
  db.query(sql, [orderId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '接受訂單失敗' });

    if (result.affectedRows === 0) {
      return res.status(400).json({ success: false, message: '此訂單不是「已建立」，無法接受' });
    }

    res.json({
      success: true,
      message: '訂單已接受',
      order_id: orderId,
      new_status: '已接受'
    });
  });
});

module.exports = router;
