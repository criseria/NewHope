// const { default: BoardCreate } = require('../../../client/src/pages/BoardCreate');
// const boardModel = require('../models/boardModel');
const axios = require('axios');

const boardModel = require("../models/boardModel");


// 글 작성
const create = async(req, res) => {
    const body = req.body;

    try {        
        const { categoryId, title, content, userName } = req.body;

        console.log(categoryId, title, content, userName);
        const board = new boardModel(body);
        await board.save();
        res.status(201).json({message : '글 작성이 완료되었습니다.'});
     }     

    catch(error){
        console.log(error);
        res.status(500).json({ error: "서버 오류", message: error.message });
    }   
};

module.exports = { create };