const express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const { create, list, content, clear, update } = require("../controllers/board.controller");


const router = express.Router();

// 업로드를 처리할 미들웨어 생성
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // 업로드된 파일 저장 경로
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop(); // 파일 확장자 추출
        const uniqueFilename = `${uuid.v4()}.${extension}`; // UUID를 이용한 고유한 파일명 생성
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });

// 파일 업로드를 처리할 엔드포인트 설정 (upload.single 메소드로 한 파일씩 처리)
router.post('/board/boardcreate', upload.single('file'), create);

router.get('/board', list);
router.get('/board/:id', content);
router.put('/board/update/:id', update);
router.delete('/board/delete/:id', clear);

module.exports = router;