const express = require('express')
const authRoute = require('./auth.route')
const productRoute = require('./product.route')
const anmalRoute = require('./animal.route')
const board = require('./board.route')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/product', productRoute)
router.use('/animal', anmalRoute)
router.use('/board' , board)


module.exports = router