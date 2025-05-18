const express = require('express');
const app = express();
const cors = require('cors');

const orderRouter = require('./routes/order');
const searchRouter = require('./routes/search');
const acceptRouter = require('./routes/accept');
const completeRouter = require('./routes/complete');
const cancelRouter = require('./routes/cancel'); // ✅ 加上這行

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`🛰️ [Express] 收到請求：${req.method} ${req.url}`)
  next()
});

app.use('/api/order', orderRouter);
app.use('/api/search', searchRouter);
app.use('/api', acceptRouter);
app.use('/api', completeRouter);
app.use('/api', cancelRouter); // ✅ 掛上 cancel route

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
