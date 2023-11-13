const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productImage: { type: String, default: '' },
  productPrice: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
}, { timestamps: true, collection: 'products' });

module.exports = mongoose.model("products", productSchema);
