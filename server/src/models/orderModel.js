const mongoose = require('mongoose')
const orderItemSchema = require('./productItemModel')

const orderSchema = new mongoose.Schema({
  username: { type: mongoose.Types.ObjectId, ref: 'user' },
  orderItems: [orderItemSchema]
}, {
  timestamps: true,
  collection: 'orders'
});

module.exports = mongoose.model("orders", orderSchema);
