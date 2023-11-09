const userModel = require('../models/userModel')

const register = async (req, res) => {
  const userData = req.body;

  try {
    const findUser = await userModel.findOne({ userId: userData.userId })
    if (findUser) return console.log('이미 등록된 아이디')

    const user = new userModel(userData);
    // await user.save();
    res.status(200).json({ message: '회원가입 성공' });
  } catch (error) {
    res.status(500).json({ error: '서버 오류', message: error.message });
  }
}

const login = async (req, res) => {
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
}

module.exports = { register, login }