const express = require('express');
const { product, productDetail, productCreate, likes } = require('../controllers/product.controller');

const router = express.Router()

router.get('/', product)
router.post('/create', productCreate);
router.post('/likes', likes);
router.get('/:id', productDetail);

module.exports = router