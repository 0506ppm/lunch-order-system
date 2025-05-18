const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/search
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      o.order_id,
      o.customer_name,
      o.phone,
      o.order_time,
      o.status,
      o.total_price,
      m.dish_name,
      i.quantity,
      m.price AS unit_price
    FROM Orders o
    JOIN OrderItems i ON o.order_id = i.order_id
    JOIN Menu m ON i.menu_id = m.dish_id
    WHERE o.status IN ('已建立', '已接受')
    ORDER BY o.order_time DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ 查詢訂單失敗：', err);
      return res.status(500).json({ success: false, message: '查詢訂單失敗', error: err });
    }

    const ordersMap = {};

    results.forEach(row => {
      const { order_id, customer_name, phone, order_time, status, total_price } = row;
      const item = {
        dish_name: row.dish_name,
        quantity: row.quantity,
        unit_price: row.unit_price,
        subtotal: row.unit_price * row.quantity
      };

      if (!ordersMap[order_id]) {
        ordersMap[order_id] = {
          order_id,
          customer_name,
          phone,
          order_time,
          status,
          total_price,
          items: []
        };
      }

      ordersMap[order_id].items.push(item);
    });

    const response = Object.values(ordersMap);
    res.json(response);
  });
});

module.exports = router;
