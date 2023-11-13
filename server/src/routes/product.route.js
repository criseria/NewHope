const express = require('express');
const { product, productDetail } = require('../controllers/product.controller');

const router = express.Router()

router.get('/', product)
router.get('/:id', productDetail);

module.exports = router