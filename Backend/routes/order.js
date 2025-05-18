const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// POST /api/order
router.post('/', async (req, res) => {
  const { name, phone, orders } = req.body;

  console.log('✅ Express 收到訂單:', req.body)

  if (!name || !phone || !orders || !Array.isArray(orders)) {
    return res.status(400).json({ success: false, message: '格式錯誤：缺少姓名、電話或訂單內容' });
  }

  const itemNames = orders.map(o => o.item);
  const sql = 'SELECT dish_id AS menu_id, dish_name, price AS unit_price FROM Menu WHERE dish_name IN (?)';

  db.query(sql, [itemNames], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: '查詢餐點錯誤', error: err });

    const menuMap = {};
    results.forEach(row => {
      menuMap[row.dish_name] = { menu_id: row.menu_id, unit_price: row.unit_price };
    });

    const notFound = itemNames.filter(name => !menuMap[name]);
    if (notFound.length > 0) {
      return res.status(400).json({
        success: false,
        message: `找不到以下餐點：${notFound.join(', ')}`
      });
    }

    const order_id = uuidv4();
    const total_price = orders.reduce((sum, o) => {
      const { unit_price } = menuMap[o.item];
      return sum + unit_price * o.quantity;
    }, 0);

    const orderSQL = `
      INSERT INTO Orders (order_id, customer_name, phone, total_price, status)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(orderSQL, [order_id, name, phone, total_price, '已建立'], (err2) => {
      if (err2) return res.status(500).json({ success: false, message: '新增訂單失敗', error: err2 });

      const items = orders.map(o => [
        order_id,
        menuMap[o.item].menu_id,
        o.quantity
      ]);

      const itemSQL = `
        INSERT INTO OrderItems (order_id, menu_id, quantity)
        VALUES ?
      `;

      db.query(itemSQL, [items], (err3) => {
        if (err3) return res.status(500).json({ success: false, message: '新增訂單明細失敗', error: err3 });

        return res.json({
          success: true,
          message: '訂單建立成功！',
          status: '已建立',
          total_price: total_price,
          order_id
        });
      });
    });
  });
});

module.exports = router;
