const express = require('express');
const { create } = require("../controllers/board.controller");

const router = express.Router();

router.post('/board/boardcreate', create);

module.exports = router;