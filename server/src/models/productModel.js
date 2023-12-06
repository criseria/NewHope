const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productImage: { type: String, default: '' },
  productPrice: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  schedule: { type: Date },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  date: { type: Number, required: true },
  address: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  category: { type: String, default: '기타' }
}, { timestamps: true, collection: 'products' });

module.exports = mongoose.model("products", productSchema);
