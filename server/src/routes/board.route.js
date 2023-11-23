// const express = require('express');
// const { login, register } = require('../controllers/auth.controller');

// const router = express.Router()

// router.post('/register', register)
// router.post("/login", login);

// module.exports = router;

const { Router } = require("express");

const router = Router();

router.get('/voc/write/:idx', (req, res, next) => {
    if (typeof req.session.useName !== undefined) {
        res.render('/vocview', {id : req.params.idx});
    }
    else {
        res.send(alert('로그인을 해주시기 바랍니다.'));
    }

});


module.exports = router;