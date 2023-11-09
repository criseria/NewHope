const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userId: { type: String, required: true },
    userPassword: { type: String, required: true },
    userEmail: { type: String, required: true },
    userAddress: { type: String, required: true },
    userPhoneNum: { type: String, required: true }
});

const userModel = mongoose.model("user", userSchema);

router.post('/signup', async (req, res) => {
    const userData = req.body;

    try {
        const user = new userModel(userData);
        await user.save();
        res.status(200).json({ message: '회원가입 성공' });
    } catch (error) {
        res.status(500).json({ error: '서버 오류', message: error.message });
    }
});

module.exports = router;
