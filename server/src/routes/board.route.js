const express = require('express');
const { create, list } = require("../controllers/board.controller");

const router = express.Router();

router.post('/board/boardcreate', create);
router.get('/board', list);

module.exports = router