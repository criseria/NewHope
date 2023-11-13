const express = require('express')
const authRoute = require('./auth.route')
const productRoute = require('./product.route')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/product', productRoute)

module.exports = router