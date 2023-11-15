const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  userPassword: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPostcode: { type: String, required: true },
  userAddress: { type: String, required: true },
  userDetailAddress: { type: String, required: true},
  userPhoneNum: { type: String, required: true },
});

module.exports = mongoose.model("users", userSchema);
