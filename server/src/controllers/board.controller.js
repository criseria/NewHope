const boardModel = require('../models/boardModel');
const userModel = require('../models/userModel');
// const commentModel = require('../models/commentModel');
const axios = require('axios');
const { login } = require('./auth.controller');


const create = async(req, res) => {
    const boardModel = req.axios.boardModel;
    const {categoryId, title, content, userName} = req.body;
    
    

    try {
        res.status(200).json({message : '글 작성이 완료되었습니다.'});
        res.redirect("/board");    
        }

    catch(error){
         res.status(500).json({ error: "서버 오류", message: error.message });
        }   
};

module.exports = { create };