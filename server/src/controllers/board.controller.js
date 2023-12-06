const boardModel = require("../models/boardModel");

const create = async (req, res) => {
  try {
    // 파일 업로드 여부 확인
    if (req.file) {
      // 파일 처리, 예를 들어 데이터베이스나 파일 시스템에 저장
      // 파일의 세부 정보는 req.file에서 사용 가능
      console.log('Uploaded file:', req.file);
      // 파일 경로를 body에 추가
      req.body.filePath = req.file.path.replace(/\\/g, '/');
    }

    // 기존의 요청 본문에서 필요한 데이터 추출
    const { categoryId, title, content, userName } = req.body;

    // 새로운 boardModel 인스턴스 생성 및 저장
    const board = new boardModel({ categoryId, title, content, userName, file: req.body.filePath });
    await board.save();
    res.status(201).json({ message: '글 작성이 완료되었습니다.' });
  } catch (error) {
    console.error('에러 발생:', error);
    res.status(500).json({ error: '서버 오류', message: error.message });
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


module.exports = { create, list, content, clear, update };