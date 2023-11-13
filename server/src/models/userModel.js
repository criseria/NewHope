const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  userPassword: { type: String, required: true },
  userEmail: { type: String, required: true },
  userAddress: { type: String, required: true },
  userPhoneNum: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
});

module.exports = mongoose.model("user", userSchema);
