// const { default: BoardCreate } = require('../../../client/src/pages/BoardCreate');
const axios = require('axios');
const boardModel = require("../models/boardModel");


// 글 작성
const create = async (req, res) => {
  const body = req.body;

  try {
    const { categoryId, title, content, userName } = req.body;

    console.log(categoryId, title, content, userName);
    const board = new boardModel(body);
    await board.save();
    res.status(201).json({ message: '글 작성이 완료되었습니다.' });
  }

  catch (error) {
    console.log(error);
    res.status(500).json({ error: "서버 오류", message: error.message });
  }
};

// 게시글 불러오기
const list = async (req, res) => {

  try {
    const boards = await boardModel.find();
    console.log(boards);

    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: '가져올 정보가 없습니다.' });
  }
};


// 특정 게시물 상세 조회
const content = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }

  try {
    const board = await boardModel.findById(id);

    if (!board) {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }

    res.status(200).json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: '서버 오류', message: error.message });
  }
};

// 게시물 수정
const update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedBoard = await boardModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBoard) {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '게시물이 업데이트되었습니다.', updatedBoard });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: '서버 오류', message: error.message });
  }
};



// 게시물 삭제
const clear = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBoard = await boardModel.findByIdAndDelete(id);

    if (!deletedBoard) {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '게시물이 삭제되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: '서버 오류', message: error.message });
  }
};


module.exports = { create, list, content, clear , update };