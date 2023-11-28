// const { default: BoardCreate } = require('../../../client/src/pages/BoardCreate');
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

const list = async(req, res) => {

    try {        
        const boards = await boardModel.find();

        res.status(200).json(boards);
      } catch (error) {
        console.log(error);
        res.status(401).json({ message : '가져올 정보가 없습니다.' });
      }
    };


    
const update = async (req, res) => {


}



const clear = async (req, res) => {

}


module.exports = { create, list, update, clear };