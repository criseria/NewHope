const userModel = require('../models/userModel')
const mailer = require('nodemailer');
const dotenv = require('dotenv')
const bcrypt = require('bcrypt');
dotenv.config();

const { EMAIL_USER, EMAIL_PASSWORD } = process.env

// 회원가입
const register = async (req, res) => {
  const userData = req.body;

  try {
    const findUser = await userModel.findOne({ userId: userData.userId });

    if (findUser) {
      return res.status(400).json({ message: '이미 등록된 아이디 입니다' });
    }

    // 비밀번호 해싱 (10은 salt rounds를 나타낸다.)
    const hashedPassword = await bcrypt.hash(userData.userPassword, 10);

    const user = new userModel({
      ...userData,
      userPassword: hashedPassword,
    });
    await user.save();
    res.status(200).json({ message: '회원가입 성공' });
  } catch (error) {
    res.status(500).json({ error: '서버 오류', message: error.message });
  }
}

// 아이디 중복 검사
const checkDuplicate = async (req, res) => {
  const { userId } = req.body;

  try {
    const existingUser = await userModel.findOne({ userId });

    if (existingUser) {
      return res.status(200).json({ duplicate: true, message: '이미 등록된 아이디입니다.' });
    }

    // 중복이 아닌 경우
    res.status(200).json({ duplicate: false, message: '사용 가능한 아이디입니다.' });
  } catch (error) {
    console.error('Error in check-duplicate:', error);
    res.status(500).json({ error: '서버 오류', message: error.message });
  }
};

// 로그인
const login = async (req, res) => {
  const { userId, userPassword } = req.body;

  try {
    const user = await userModel.findOne({ userId });

    if (user) {
      const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);

      if (passwordMatch) {
        req.session.user = user;
        console.log(req.session);
        res.cookie('dkfjdkfjaksfjddksjf3232', 'sadf12j8er893qndfs', { maxAge: 3600000, httpOnly: true });
        res.status(200).json({ message: "로그인 성공" });
      } else {
        res.status(401).json({ message: "비밀번호가 일치하지 않습니다" });
      }
    } else {
      res.status(401).json({ message: "등록되지않은 사용자입니다" });
    }
  } catch (error) {
    res.status(500).json({ error: "서버 오류", message: error.message });
  }
};

// 유저의 정보 가져오기
const getUserInfo = async (req, res) => {
  const userInfo = req.session.user;

  if (userInfo) {
    res.status(200).json({
      userName: userInfo.userName,
      userEmail: userInfo.userEmail,
      userPostcode: userInfo.userPostcode,
      userAddress: userInfo.userAddress,
      userDetailAddress: userInfo.userDetailAddress,
      userPhoneNum: userInfo.userPhoneNum
    });
  } else {
    res.status(401).json({ message: "인증되지 않은 사용자 입니다." });
  }
}

// 로그아웃
const logout = (req, res) => {
  // 클라이언트 쿠키 제거
  res.clearCookie('dkfjdkfjaksfjddksjf3232');

  // 서버 측 세션 제거 (express-session 사용 시)
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: '서버 오류', message: '세션 제거 중 에러 발생' });
    } else {
      // 클라이언트와 서버 측 캐시 무시 헤더 추가
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json({ message: '로그아웃 성공' });
    }
  });
};

// 비밀번호 인증하기
const passwordVerification = async (req, res) => {
  const { userPassword } = req.body;

  try {
    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ message: "세션이 만료되었습니다." });
    }

    const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);

    if (passwordMatch) {
      // 비밀번호 일치 시, 클라이언트와 서버 측 캐시 무시 헤더 추가
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json({ message: "비밀번호 확인 성공" });
    } else {
      res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error("Error in passwordVerification:", error);
    res.status(500).json({ error: "서버 오류", message: error.message });
  }
};

// 회원정보 수정하기
const editProfile = async (req, res) => {
  // 현재 로그인한 사용자의 아이디를 가져오고
  const userId = req.session.user.userId;
  // 클라이언트에서 전달된 업데이트할 데이터를 가져와서 아래와 같이 업데이트
  const updatedData = req.body;

  try {
    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 업데이트할 datalist
    user.userName = updatedData.userName || user.userName;
    user.userEmail = updatedData.userEmail || user.userEmail;
    user.userPostcode = updatedData.userPostcode || user.userPostcode;
    user.userAddress = updatedData.userAddress || user.userAddress;
    user.userDetailAddress = updatedData.userDetailAddress || user.userDetailAddress;
    user.userPhoneNum = updatedData.userPhoneNum || user.userPhoneNum;

    // 비밀번호를 변경할 때에는 안전한 방법으로 업데이트
    if (updatedData.userPassword) {
      user.userPassword = updatedData.userPassword;
    }

    await user.save();
    req.session.user = user;

    res.status(200).json({ message: '회원정보가 수정 되었습니다.' });
  } catch (error) {
    res.status(500).json({ error: '서버 오류', message: error.message });
  }
};

// 회원 탈퇴
const deleteAccount = async (req, res) => {
  const { userPassword } = req.body;

  console.log('Received password:', userPassword);

  try {
    const user = req.session.user;

    if (user.userPassword === userPassword) {
      await userModel.findByIdAndDelete(user._id);
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        }
      });
      res.clearCookie('dkfjdkfjaksfjddksjf3232');
      res.status(200).json({ message: '회원 탈퇴 성공' });
    } else {
      res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    console.error('Error in deleteAccount:', error);
    res.status(500).json({ error: '서버 오류', message: error.message });
  }
};



// 이메일 인증하기
const smtpTransport = mailer.createTransport({
  pool: true,
  maxConnections: 1,
  service: "naver",
  host: "smtp.naver.com",
  port: 465,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER, // 보내는 사람 이메일
    pass: process.env.EMAIL_PASSWORD, // 비밀번호
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// 이메일 인증을 위해 사용될 난수를 생성
const generateRandomNumber = function (min, max) {
  var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
};

const emailAuth = async (req, res) => {
  const number = generateRandomNumber(111111, 999999);
  const { email, verificationCode } = req.body;

  res.json({ ok: true, msg: "인증 코드를 성공적으로 받아왔습니다.", authNum: number });

  // 이메일 전송 양식 ( html에 원하는대로 양식을 변경하면 된다.)
  const mailOptions = {
    from: "criseria4212@naver.com",
    // 사용자가 회원가입 페이지에서 입력한 이메일 주소
    to: email,
    subject: "인증 관련 메일 입니다.",
    html: `<h1>인증번호를 입력해주세요<br><br><br><br></h1>${number}`,
  };

  smtpTransport.sendMail(mailOptions, (err, response) => {
    console.log("error", err);
    console.log("response", response);

    if (err) {
      res.json({ ok: false, msg: "메일 전송에 실패하였습니다." });
      smtpTransport.close();
      return;
    } else {
      res.json({ ok: true, msg: "메일 전송에 성공하였습니다.", authNum: verificationCode });
      smtpTransport.close();
      return;
    }
  });
};

// 아이디 찾기
const findId = async (req, res) => {
  const { userEmail } = req.body;

  try {
    const user = await userModel.findOne({ userEmail });

    if (user) {
      res.status(200).json({ ok: true, userId: user.userId });
    } else {
      res.status(404).json({ ok: false, message: '해당 이메일에 등록된 사용자가 없습니다.' });
    }
  } catch (error) {
    console.error('Error in findId:', error);
    res.status(500).json({ ok: false, message: '서버 오류', error: error.message });
  }
};

// 비밀번호 찾기
const resetPassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    // 사용자가 존재하는지 확인
    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 비밀번호 해싱 (10은 salt rounds를 나타냅니다.)
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 비밀번호 업데이트
    user.userPassword = hashedPassword;
    await user.save();

    res.status(200).json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (error) {
    res.status(500).json({ error: '서버 오류', message: error.message });
  }
};


module.exports = { register, login, getUserInfo, logout, editProfile, passwordVerification, deleteAccount, checkDuplicate, emailAuth, findId, resetPassword };