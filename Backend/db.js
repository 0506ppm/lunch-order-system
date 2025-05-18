// db.js
const mysql = require('mysql2');

// ⬇️ 把你的密碼改成你自己的密碼
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Tt920506',  // ← 這邊換成你自己的密碼
  database: 'lunch'
});

// 連線測試
connection.connect((err) => {
  if (err) {
    console.error('❌ 無法連線到資料庫：', err);
    return;
  }
  console.log('✅ 成功連線到 MySQL！');
});

module.exports = connection;
