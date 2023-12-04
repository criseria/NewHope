const express = require('express');
const { create, list, content, clear, update } = require("../controllers/board.controller");

const router = express.Router();

router.post('/board/boardcreate', create);
router.get('/board', list);
router.get('/board/:id', content); 
router.put('/board/update/:id', update); 
router.delete('/board/delete/:id', clear);



module.exports = router