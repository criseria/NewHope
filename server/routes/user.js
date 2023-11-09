const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userPassword: { type: String, required: true },
});

const userModel = mongoose.model("users", userSchema);

router.post("/login", async (req, res) => {
  const { userId, userPassword } = req.body;

  try {
    const user = await userModel.findOne({ userId, userPassword });

    if (user) {
      res.status(200).json({ message: "로그인 성공" });
    } else {
      res.status(401).json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    res.status(500).json({ error: "서버 오류", message: error.message });
  }
});

module.exports = router;