const mongoose = require('mongoose')
const orderItemSchema = require('./productItemModel')

const orderListSchema = new mongoose.Schema({
  username: { type: mongoose.Types.ObjectId, ref: 'user' },
  orderItems: [orderItemSchema],
}, {
  timestamps: true,
  collection: 'orderLists'
});

module.exports = mongoose.model("orderLists", orderListSchema);
