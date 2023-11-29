const express = require('express');
const { login, register, getUserInfo, editProfile, passwordVerification, deleteAccount, checkDuplicate, emailAuth, findId, resetPassword } = require('../controllers/auth.controller');

const router = express.Router()

router.post('/register', register);
router.post('/checkDuplicate', checkDuplicate);
router.post('/sendVerificationEmail', emailAuth);
router.post("/login", login);
router.get("/Mypage", getUserInfo)
router.put('/Mypage/editProfile', editProfile);
router.post('/passwordVerification', passwordVerification);
router.delete('/Mypage/DeleteAccount', deleteAccount);
router.post('/findId', findId);
router.put('/resetPassword', resetPassword)
router.delete('/Mypage/DeleteAccount', deleteAccount);
router.get('/getUserInfo', getUserInfo);

module.exports = router