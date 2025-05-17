// index.js
const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/order');

const app = express();
const PORT = 3000;

console.log('🚀 ✅ 正在啟動我的後端 index.js')


// 中介層
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`🛰️ [Express] 收到請求：${req.method} ${req.url}`)
  next()
});

// 路由
app.use('/api/order', orderRoutes);

// 啟動 server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

