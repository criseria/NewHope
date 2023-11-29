const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  itemId: { type: mongoose.Types.ObjectId, required: true, ref: 'products' },
  checked: { type: Boolean, default: true }
});

module.exports = cartItemSchema