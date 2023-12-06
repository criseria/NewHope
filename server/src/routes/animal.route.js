const express = require('express');
const { AnimalInfo , getAnimalInfo } = require('../controllers/animal.controller');

const router = express.Router()


router.get('/animal' , AnimalInfo);
router.get('/animalInfo/:aniNo', getAnimalInfo);


module.exports = router