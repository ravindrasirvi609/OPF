const express = require('express');
const { json } = require('body-parser');
const { connect } = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(json());

// Connect to MongoDB
connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use(cors());

// Import route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const studentData = require('./routes/studentdata');

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/student', studentData);

const razorpay = new Razorpay({
  key_id: 'rzp_live_T0PhG3UQLalPrS',
  key_secret: 'ABQLrvvEMfcm2oQFpoJ2oWd9',
});

app.post('/payment', (req, res) => {
  const { amount, currency, receipt } = req.body;

  razorpay.orders.create({ amount, currency, receipt }, (error, order) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Payment request failed' });
    } else {
      res.status(200).json({ order });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
