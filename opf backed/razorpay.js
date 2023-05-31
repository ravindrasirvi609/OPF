const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_live_T0PhG3UQLalPrS',
  key_secret: 'ABQLrvvEMfcm2oQFpoJ2oWd9',
});

function createPaymentOrder(amount, currency, receipt, callback) {
  razorpay.orders.create({ amount, currency, receipt }, callback);
}

module.exports = {
  createPaymentOrder,
};
