const express = require('express');
const { create, list, update, clear } = require("../controllers/board.controller");

const router = express.Router();

router.post('/board/boardcreate', create);
router.get('/board/boardlist', list);
router.put('/board/boardupdate', update);
router.delete('/board/boardclear', clear);

module.exports = router